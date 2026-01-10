import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { OPTIMIZE_RESUME_PROMPT, PARSE_RESUME_TEXT_PROMPT } from "@/lib/ai/prompts";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Simple in-memory rate limiting (per IP)
const requestCounts = new Map();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip) {
    const now = Date.now();
    const userRequests = requestCounts.get(ip) || [];

    // Remove old requests outside the window
    const recentRequests = userRequests.filter(time => now - time < RATE_WINDOW);

    if (recentRequests.length >= RATE_LIMIT) {
        return false;
    }

    recentRequests.push(now);
    requestCounts.set(ip, recentRequests);
    return true;
}

export async function POST(request) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get("x-forwarded-for") || "unknown";

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please try again in a minute." },
                { status: 429 }
            );
        }

        // Validate API key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "API key not configured. Please add GEMINI_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { action, background, jobRequirements, resumeText } = body;

        // Validate input
        if (!action) {
            return NextResponse.json(
                { error: "Action is required" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        if (action === "optimize") {
            // Optimize resume based on background and job requirements
            if (!background || !jobRequirements) {
                return NextResponse.json(
                    { error: "Background and job requirements are required" },
                    { status: 400 }
                );
            }

            const prompt = OPTIMIZE_RESUME_PROMPT(background, jobRequirements);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Parse JSON response
            let optimizedResume;
            try {
                // Remove markdown code blocks if present
                const cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
                optimizedResume = JSON.parse(cleanText);
            } catch (parseError) {
                console.error("Failed to parse AI response:", text);
                return NextResponse.json(
                    { error: "Failed to parse AI response. Please try again." },
                    { status: 500 }
                );
            }

            return NextResponse.json({ optimizedResume });

        } else if (action === "parse") {
            // Parse resume text
            if (!resumeText) {
                return NextResponse.json(
                    { error: "Resume text is required" },
                    { status: 400 }
                );
            }

            const prompt = PARSE_RESUME_TEXT_PROMPT(resumeText);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            let parsedData;
            try {
                const cleanText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
                parsedData = JSON.parse(cleanText);
            } catch (parseError) {
                console.error("Failed to parse AI response:", text);
                return NextResponse.json(
                    { error: "Failed to parse resume. Please try again." },
                    { status: 500 }
                );
            }

            return NextResponse.json({ parsedData });

        } else {
            return NextResponse.json(
                { error: "Invalid action" },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your request. Please try again." },
            { status: 500 }
        );
    }
}
