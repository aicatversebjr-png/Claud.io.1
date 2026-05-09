import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const models = {
  chat: "gemini-3-flash-preview",
  vision: "gemini-3-flash-preview",
  pro: "gemini-3.1-pro-preview"
};

export async function* chatWithAIStream(message: string, history: any[] = []) {
  try {
    const stream = await ai.models.generateContentStream({
      model: models.chat,
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: "You are Claud io, a premium AI assistant. You help users build websites, games, and apps. Be professional, concise, and helpful."
      }
    });

    for await (const chunk of stream) {
      yield chunk.text;
    }
  } catch (error) {
    console.error("AI Streaming Error:", error);
    throw error;
  }
}

export async function generateWebsite(prompt: string) {
  const systemPrompt = `You are an expert web developer. Generate a complete, single-file HTML/CSS/JS website for the requested topic. 
  Include Tailwind CSS via CDN. Ensure the design is premium, modern, and high-conversion. 
  Use glassmorphism and animations if appropriate.
  Output ONLY the HTML code. No talk, just the code block.`;
  
  try {
    const response = await ai.models.generateContent({
      model: models.chat,
      contents: [{ role: "user", parts: [{ text: `Generate code for: ${prompt}` }] }],
      config: { systemInstruction: systemPrompt }
    });
    return response.text.replace(/```html|```/g, "").trim();
  } catch (error) {
    console.error("Website Generation Error:", error);
    throw error;
  }
}

export async function generateGame(prompt: string) {
  const systemPrompt = `You are an expert game developer. Generate a complete, single-file HTML5 game using Canvas or a library like Phaser (via CDN). 
  The game should be fun, interactive, and responsive. 
  Include all necessary logic, styles, and assets (use placeholder colors/shapes).
  Output ONLY the HTML code. No talk, just the code block.`;
  
  try {
    const response = await ai.models.generateContent({
      model: models.chat,
      contents: [{ role: "user", parts: [{ text: `Generate game code for: ${prompt}` }] }],
      config: { systemInstruction: systemPrompt }
    });
    return response.text.replace(/```html|```/g, "").trim();
  } catch (error) {
    console.error("Game Generation Error:", error);
    throw error;
  }
}

export async function analyzeImage(imageBase64: string, prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: models.vision,
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
          { text: prompt || "Describe this image in detail." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Image Analysis Error:", error);
    throw error;
  }
}

export function downloadAsHtml(code: string, fileName: string) {
  const blob = new Blob([code], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
