// backend/utils/openai.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateAcademicFeedback(studentData) {
  const prompt = `
You are an academic mentor assistant. Based on the following student data, provide personalized, actionable feedback to improve academic performance:

Student Name: ${studentData.name}
CGPA: ${studentData.cgpa}
Attendance: ${studentData.attendance}%
Subjects and Grades:
${studentData.marks.map(m => `- ${m.subject}: ${m.grade}`).join('\n')}

Provide suggestions on how the student can improve their grades and attendance.
`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 250,
    temperature: 0.7,
  });

  return response.data.choices[0].text.trim();
}

module.exports = { generateAcademicFeedback };