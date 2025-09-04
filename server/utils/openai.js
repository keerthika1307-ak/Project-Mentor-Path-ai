// server/utils/openai.js

require('dotenv').config(); // Load environment variables

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const LOW_CGPA_THRESHOLD = 5.0; // Define your low CGPA threshold here

/**
 * Generate academic feedback for a student using OpenAI
 * @param {Object} studentData - Object containing student info (name, cgpa, attendance, marks)
 * @returns {string} Generated feedback text
 */
async function generateAcademicFeedback(studentData) {
  const { name, cgpa, attendance, marks } = studentData;

  let prompt;
  if (cgpa >= LOW_CGPA_THRESHOLD) {
    prompt = `Student ${name} has a CGPA of ${cgpa}, attendance of ${attendance}, and marks: ${JSON.stringify(marks)}. Write positive academic feedback.`;
  } else {
    prompt = `Student ${name} has a low CGPA (${cgpa}), attendance of ${attendance}, and marks: ${JSON.stringify(marks)}. Write constructive academic feedback and suggestions for improvement.`;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 150,
  });

  return completion.choices[0].message.content;
}

module.exports = {
  generateAcademicFeedback,
};
