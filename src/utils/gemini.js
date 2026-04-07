import { GoogleGenAI } from '@google/genai';
import { foodMap } from '../data/foodDatabase';

// Google Gemini API integration for deeper health insights.
// Demonstrates usage of Google Cloud Services for "Ask AI" functionality.
// 
// Requires an API key from Google AI Studio. 
// Uses user's local storage for configuration to avoid hardcoding.

export async function askGeminiAboutFood(foodId, apiKey) {
  if (!apiKey) {
    throw new Error('Please set your Google Gemini API key in settings.');
  }

  const food = foodMap[foodId];
  if (!food) {
    throw new Error('Food item not found.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Analyze the Indian food item "${food.name}". 
Its description is: "${food.description}".
Its health score is ${food.healthScore}/10 and it is considered ${food.protein} in protein.
Please provide a 3-sentence scientific but easy-to-understand health breakdown of this food. Focus on micronutrients, digestion, and ideal circumstances for eating it.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to analyze food. Ensure your API key is valid.');
  }
}
