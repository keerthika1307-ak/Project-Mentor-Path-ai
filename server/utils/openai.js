// server/utils/openai.js
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LOW_CGPA_THRESHOLD = 5.0;

async function generateAcademicFeedback(studentData) {
  const { name, cgpa, attendance, marks } = studentData;

  if (cgpa >= LOW_CGPA_THRESHOLD) {
    return `Student ${name} has a satisfactory CGPA of ${cgpa}. Keep up the good work!`;
  }

  const prompt = `
You are an academic mentor assistant. Provide constructive feedback for the student based on the following data:

Name: ${name}
CGPA: ${cgpa}
Attendance: ${attendance}%
Marks: ${marks.map(m => `${m.subject}: ${m.grade}`).join(', ')}

Give suggestions on how the student can improve academically and maintain good attendance.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful academic mentor.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate academic feedback');
  }
}

module.exports = {
  generateAcademicFeedback,
};
