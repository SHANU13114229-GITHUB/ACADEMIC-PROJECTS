import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// API route to fetch latest official curriculum exam questions using Gemini
app.post('/api/fetch-live-question', async (req, res) => {
  try {
    const { courseId, topic, difficulty = 'Official Exam Level', syllabusYear = '2025-2026' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured on the server. Using built-in official curriculum database.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const courseMap: Record<string, { name: string; syllabus: string; code: string }> = {
      'ap-calc': { name: 'AP Calculus AB', syllabus: 'College Board AP Calculus AB Official Standards 2025-2026', code: 'FUN-4' },
      'ap-cs': { name: 'AP Computer Science A', syllabus: 'College Board AP Computer Science A Syllabus 2025-2026', code: 'CON-1' },
      'sat-math': { name: 'Digital SAT Mathematics', syllabus: 'College Board Digital SAT Official Question Bank 2025-2026', code: 'SAT-3' },
      'gcse-bio': { name: 'GCSE Biology (AQA/Edexcel)', syllabus: 'AQA GCSE Biology Official Specification (8461) 2025-2026', code: 'BIO-3' },
      'gre-quant': { name: 'GRE Quantitative Reasoning', syllabus: 'ETS GRE General Test Quantitative Reasoning Curriculum', code: 'GRE-2' },
      'aws-csa': { name: 'AWS Certified Solutions Architect', syllabus: 'AWS SAA-C03 Official Certification Exam Blueprint', code: 'AWS-1' }
    };

    const courseInfo = courseMap[courseId] || { name: courseId, syllabus: `Official ${courseId} Curriculum ${syllabusYear}`, code: 'STD-1' };
    const topicPrompt = topic && topic !== 'All' ? `specifically on the topic "${topic}"` : 'on a core high-yield topic from the syllabus';

    const prompt = `Generate ONE authentic, rigorous, high-quality practice question for ${courseInfo.name} (${courseInfo.syllabus}) ${topicPrompt}.
The difficulty level must be "${difficulty}".

Return ONLY a valid JSON object with exact structure:
{
  "subjectName": "${courseInfo.name}",
  "topic": "Name of the syllabus topic tested",
  "syllabusStandard": "Official syllabus standard code and title (e.g. 'College Board AP Calculus - Unit 4.3')",
  "questionText": "The rigorous exam question text (clear, precise, and unambiguous)",
  "options": [
    "Option A text",
    "Option B text",
    "Option C text",
    "Option D text"
  ],
  "correctAnswerIndex": 0,
  "rationale": "Comprehensive, step-by-step rationale explaining why the correct answer is right and why distractors are incorrect",
  "difficulty": "${difficulty}"
}

Ensure correctAnswerIndex is an integer from 0 to 3. Do not include markdown formatting or code blocks around JSON if possible, just clean JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from AI model');
    }

    const parsed = JSON.parse(text);
    const question = {
      id: `live-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      courseId,
      subjectName: parsed.subjectName || courseInfo.name,
      topic: parsed.topic || 'Core Curriculum Standard',
      syllabusStandard: parsed.syllabusStandard || `${courseInfo.syllabus} — ${courseInfo.code}`,
      questionText: parsed.questionText,
      options: Array.isArray(parsed.options) && parsed.options.length === 4 ? parsed.options : [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswerIndex: typeof parsed.correctAnswerIndex === 'number' && parsed.correctAnswerIndex >= 0 && parsed.correctAnswerIndex <= 3 ? parsed.correctAnswerIndex : 0,
      rationale: parsed.rationale || 'Official syllabus standard rationale.',
      difficulty: parsed.difficulty || difficulty,
      source: 'official-curriculum-ai',
      lastUpdated: new Date().toISOString().split('T')[0],
      tags: ['Live Official Curriculum', syllabusYear, courseInfo.name]
    };

    return res.json({
      success: true,
      question,
      sourceAuthority: courseInfo.syllabus
    });
  } catch (error: any) {
    console.error('Error fetching live curriculum question:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch live question from curriculum database'
    });
  }
});

// Vite middleware setup for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ExamBook server running on http://localhost:${PORT}`);
  });
}

startServer();
