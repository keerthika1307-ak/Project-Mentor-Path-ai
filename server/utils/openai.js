// server/utils/openai.js

require('dotenv').config(); // Load environment variables

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key from .env
});

const openai = new OpenAIApi(configuration);

const LOW_CGPA_THRESHOLD = 5.0; // Define your low CGPA threshold here

/**
 * Generate academic feedback for a student using OpenAI
 * @param {Object} studentData - Object containing student info (name, cgpa, attendance, marks)
 * @returns {string} Generated feedback text
 */
async function generateAcademicFeedback(studentData) {
  const { name, cgpa, attendance, marks } = studentData;

  if (cgpa >= LOW_CGPA_THRESHOLD) {
    return `Student ${name} has a satisfactory CGPA of ${cgpa}. Keep up the good work!`;
  }

  // Prepare a prompt for the AI
  const prompt = `
You are an academic mentor assistant. Provide constructive feedback for the student based on the following data:

Name: ${name}
CGPA: ${cgpa}
Attendance: ${attendance}%
Marks: ${marks.map(m => `${m.subject}: ${m.grade}`).join(', ')}

Give suggestions on how the student can improve academically and maintain good attendance.
`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4', // Use GPT-4 or any other chat model you prefer
      messages: [
        { role: 'system', content: 'You are a helpful academic mentor.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const feedback = response.data.choices[0].message.content.trim();
    return feedback;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate academic feedback');
  }
}

module.exports = {
  openai,
  generateAcademicFeedback,
};
