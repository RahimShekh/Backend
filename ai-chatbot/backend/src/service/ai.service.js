// const { GoogleGenAI } = require("@google/genai");
// const ai = new GoogleGenAI({});

// // async function generateResponse(prompt)
// async function generateResponse(chatHistory)
// {
//     const response = await ai.models.generateContent({
//         model:"gemini-2.0-flash",
//         // contents:prompt
//         contents: chatHistory
//     })
//     return response.text;
// }

// module.exports = generateResponse;

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({});

async function generateResponse(chatHistory) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: chatHistory
    });

    // Call the function to get the text
    return response.text;
}

module.exports = generateResponse;
