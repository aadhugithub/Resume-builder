/**
 * AI Prompt Templates for Resume Optimization
 */

export const OPTIMIZE_RESUME_PROMPT = (background, jobRequirements) => `
You are an expert resume writer and ATS optimization specialist. Your task is to create a highly optimized, ATS-friendly resume.

**USER BACKGROUND:**
${JSON.stringify(background, null, 2)}

**JOB REQUIREMENTS:**
${jobRequirements}

**INSTRUCTIONS:**
1. Analyze the job requirements and identify key skills, qualifications, and keywords
2. Match the user's background to the job requirements
3. Create an optimized resume that:
   - Highlights relevant experience and skills
   - Uses keywords from the job description naturally
   - Quantifies achievements where possible
   - Is ATS-friendly (simple formatting, standard sections)
   - Emphasizes the most relevant points first

**OUTPUT FORMAT:**
Return a JSON object with this exact structure:
{
  "profile": {
    "name": "Full Name",
    "title": "Professional Title matching job",
    "email": "email@example.com",
    "phone": "+1234567890",
    "location": "City, State",
    "linkedin": "linkedin.com/in/username",
    "github": "github.com/username",
    "website": "portfolio.com"
  },
  "summary": "2-3 sentence professional summary tailored to the job, highlighting key qualifications and value proposition",
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "location": "City, State",
      "startDate": "Month Year",
      "endDate": "Month Year or Present",
      "current": false,
      "description": "• Achievement with quantified result\\n• Another achievement using job keywords\\n• Third achievement showing impact",
      "tool": "Tool1, Tool2",
      "tech": "Tech1, Tech2, Tech3",
      "matchScore": 95
    }
  ],
  "education": [
    {
      "school": "University Name",
      "degree": "Degree and Major",
      "location": "City, State",
      "startDate": "Month Year",
      "endDate": "Month Year",
      "current": false,
      "description": "GPA: X.X, Honors, Relevant coursework"
    }
  ],
  "skills": [
    {
      "category": "Technical Skills",
      "items": ["Skill1", "Skill2", "Skill3"]
    },
    {
      "category": "Soft Skills",
      "items": ["Skill1", "Skill2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "date": "Month Year",
      "link": "github.com/project",
      "tools": "Tech1, Tech2, Tech3",
      "description": "• What you built and its impact\\n• Technologies used and problems solved"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "Month Year"
    }
  ],
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "matchScore": 85,
  "recommendations": [
    "Add more quantified achievements",
    "Include specific technology X mentioned in job posting"
  ]
}

CRITICAL: Return ONLY valid JSON, no markdown formatting, no explanations.
`;

export const EXTRACT_JOB_REQUIREMENTS_PROMPT = (jobDescription) => `
Extract key requirements from this job description and return them in a structured format.

**JOB DESCRIPTION:**
${jobDescription}

**OUTPUT FORMAT:**
Return a JSON object:
{
  "title": "Job Title",
  "company": "Company Name (if mentioned)",
  "requiredSkills": ["skill1", "skill2"],
  "preferredSkills": ["skill1", "skill2"],
  "experience": "X+ years",
  "education": "Degree requirement",
  "responsibilities": ["responsibility1", "responsibility2"],
  "keywords": ["keyword1", "keyword2"]
}

Return ONLY valid JSON, no markdown.
`;

export const PARSE_RESUME_TEXT_PROMPT = (resumeText) => `
Extract structured information from this resume text.

**RESUME TEXT:**
${resumeText}

**OUTPUT FORMAT:**
Return a JSON object matching this structure:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "+1234567890",
  "location": "City, State",
  "linkedin": "linkedin url",
  "github": "github url",
  "website": "website url",
  "summary": "Professional summary if present",
  "experience": [
    {
      "role": "Job Title",
      "company": "Company",
      "startDate": "Month Year",
      "endDate": "Month Year or Present",
      "description": "Bullet points of achievements",
      "tool": "Comma separated tools used",
      "tech": "Comma separated technologies used"
    }
  ],
  "education": [
    {
      "school": "University",
      "degree": "Degree",
      "startDate": "Year",
      "endDate": "Year"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"]
}

Return ONLY valid JSON, no markdown.
`;
