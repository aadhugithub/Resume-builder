import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with the key from environment variables
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

/**
 * Extracts keywords from a job description using Gemini.
 * @param {string} jobDescription 
 * @returns {Promise<string[]>} List of keywords
 */
export async function extractKeywords(jobDescription) {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error("Gemini API Key is missing. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Extract the most important keywords from the following job description.
Return only a clean list of:
- skills
- tools
- technologies
- role-related keywords

Do not include explanations.

Job Description:
${jobDescription}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean up the response to get an array of keywords
        // Usually it comes as a bulleted list or comma separated
        return text
            .split(/[\n,•*]/)
            .map(kw => kw.trim())
            .filter(kw => kw.length > 0 && kw.length < 50);
    } catch (error) {
        console.error("Error extracting keywords:", error);
        throw error;
    }
}

/**
 * Optimizes a resume based on a job description using Gemini.
 * @param {string} jobDescription 
 * @param {object} resumeData 
 * @returns {Promise<object>} Optimized resume data and metadata
 */
export async function optimizeResume(jobDescription, resumeData) {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error("Gemini API Key is missing. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file.");
    }

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const resumeText = JSON.stringify(resumeData);

    const prompt = `You are an ATS resume optimization expert.

Tasks:
1. Analyze the job description and resume
2. Identify missing keywords from the resume
3. Calculate ATS match score (percentage)
4. Improve the resume by naturally adding relevant keywords
5. Do NOT rewrite completely — only enhance content

Return the output strictly in JSON format:
{
  "keywords": ["list", "of", "detected", "keywords"],
  "missing_keywords": ["list", "of", "missing", "keywords"],
  "match_score": "85",
  "optimized_resume": { ...the full updated resume object structure... }
}

Job Description:
${jobDescription}

Resume:
${resumeText}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return JSON.parse(text);
    } catch (error) {
        console.error("Error optimizing resume:", error);
        throw error;
    }
}

/**
 * Parses raw resume text into structured JSON using Gemini.
 * @param {string} rawText 
 * @returns {Promise<object>} Structured resume data
 */
export async function parseResumeFromFile(rawText) {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        throw new Error("Gemini API Key is missing.");
    }

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are an expert resume parser.
Extract information from the provided raw text and convert it into a structured JSON format exactly matching this schema:

{
  "profile": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "website": "",
    "linkedin": "",
    "github": ""
  },
  "summary": "professional summary text",
  "experience": [
    { "role": "", "company": "", "location": "", "startDate": "", "endDate": "", "current": false, "description": "" }
  ],
  "education": [
    { "degree": "", "school": "", "location": "", "startDate": "", "endDate": "", "current": false, "description": "" }
  ],
  "projects": [
    { "name": "", "link": "", "tech": "", "description": "" }
  ],
  "skills": [
    { "category": "Technical Skills", "items": ["Skill 1", "Skill 2"] }
  ],
  "certifications": [
    { "name": "", "issuer": "", "date": "" }
  ]
}

If a field is missing, use an empty string or empty array.
Raw Resume Text:
${rawText}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Error parsing resume file:", error);
        throw error;
    }
}
