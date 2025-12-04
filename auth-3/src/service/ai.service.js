const  { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();

async function generateCaption(base64ImageFile)
{
const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config:{
    systemInstruction:`
    you are an expert in genrating captions for images,
    you generate single line caption for the image,
    your caption should be short and concise,
    you use hashtags ans emojis in the caption`,
    generationConfig: {
      temperature: 1.2,   // adds randomness
      topK: 40,
      topP: 0.9,
      maxOutputTokens: 80
    }
  }
});
// console.log(response.text);
return response.text;
}

module.exports = generateCaption;
