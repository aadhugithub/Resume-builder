# Resume Builder - Professional Resume Creator with AI Optimization

A modern, free resume builder with AI-powered optimization using Google Gemini.

## Features

### Custom Builder
- **Real-time Preview**: See changes instantly as you type
- **Multiple Templates**: Clean, ATS-friendly designs
- **Drag & Drop**: Reorder resume sections easily
- **Export Options**: PDF, JSON export
- **Local Storage**: Your data never leaves your browser
- **Customization**: Fonts, colors, spacing controls

### Smart Match (AI Optimizer) ✨
- **Resume Upload**: Upload PDF resume for auto-parsing
- **Job Matching**: Paste job description for AI optimization
- **ATS-Friendly**: Optimized for Applicant Tracking Systems
- **Keyword Highlighting**: See matched keywords and score
- **One-Click Transfer**: Copy optimized resume to Custom Builder

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AI (Optional - for Smart Match feature)

Create a `.env.local` file in the root directory:

```bash
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here
```

> **Note**: The Custom Builder works without an API key. Smart Match requires a Gemini API key.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## How to Use

### Custom Builder
1. Click "Create Resume" on landing page
2. Fill in your information in the left panel
3. See live preview on the right
4. Customize design in the "Design" tab
5. Export as PDF when ready

### Smart Match (AI Optimizer)
1. Go to builder and click "Smart Match" tab
2. **Option A**: Upload your existing resume (PDF)
   - Click "Upload Resume"
   - AI will extract your information
3. **Option B**: Enter manually
   - Fill in name, email, skills, and summary
4. Paste the job description in "Job Requirements"
5. Click "Generate Optimized Resume"
6. Review AI-optimized resume with match score
7. Click "Copy to Custom Builder" to edit further
8. Export as PDF

## Security & Privacy

- ✅ All data stored locally in your browser
- ✅ API calls go through Next.js server (API key never exposed)
- ✅ Rate limiting: 10 requests/minute per IP
- ✅ No user data stored on servers
- ✅ PDF parsing happens client-side

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **PDF**: pdfjs-dist, react-to-print
- **State**: React Context

## Project Structure

```
src/
├── app/
│   ├── page.js                 # Landing page
│   ├── builder/page.js         # Builder entry
│   └── api/optimize-resume/    # AI API route
├── components/
│   ├── landing/                # Landing page components
│   ├── builder/                # Custom builder components
│   ├── ai-optimizer/           # Smart Match components
│   ├── resume/                 # Resume templates
│   └── ui/                     # shadcn/ui components
└── lib/
    ├── resume-store.js         # Builder state management
    └── ai/
        ├── optimizer-store.js  # AI optimizer state
        ├── prompts.js          # AI prompt templates
        └── pdf-parser.js       # PDF text extraction
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No* | Google Gemini API key for Smart Match |

*Required only for Smart Match feature. Custom Builder works without it.

## Troubleshooting

### "API key not configured" error
- Create `.env.local` file in root directory
- Add `GEMINI_API_KEY=your_key`
- Restart dev server

### PDF upload not working
- Ensure file is PDF format
- File size must be under 5MB
- Check browser console for errors

### Rate limit exceeded
- Wait 1 minute before trying again
- Limit: 10 requests per minute

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
