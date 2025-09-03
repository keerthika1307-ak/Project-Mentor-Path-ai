// server/utils/openai.js

const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your .env file
});

const openai = new OpenAIApi(configuration);

/**
 * Generate academic feedback for a student using OpenAI
 * @param {Object} studentData - Object containing student info (name, cgpa, attendance, marks)
 * @returns {string} Generated feedback text
 */
async function generateAcademicFeedback(studentData) {
  const { name, cgpa, attendance, marks } = studentData;

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
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // or any other model you prefer
      prompt,
      max_tokens: 200,
      temperature: 0.7,
    });

    const feedback = response.data.choices[0].text.trim();
    return feedback;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate academic feedback');
  }
}

module.exports = { generateAcademicFeedback };
