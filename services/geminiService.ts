import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { IntegrationType } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHoroscope = async (sign?: string): Promise<string> => {
  try {
    const prompt = sign 
      ? `Gere um horóscopo curto, positivo e motivacional para o signo de ${sign} para o dia de hoje. Mantenha o tom amigável e místico.`
      : `Gere uma mensagem motivacional do dia inspirada na astrologia, curta e positiva.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Os astros estão alinhados, mas a conexão falhou. Tente novamente mais tarde.";
  } catch (error) {
    console.error("Error generating horoscope:", error);
    return "Não foi possível consultar os astros no momento.";
  }
};

export const askAssistant = async (message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "Você é o 'Elefante', um assistente pessoal inteligente, organizado e prestativo. Você tem acesso (simulado) ao Gmail, Google Drive, Agenda e Contatos do usuário. Responda de forma concisa e útil em Português do Brasil.",
      }
    });
    return response.text || "Desculpe, não entendi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estou tendo dificuldades para processar sua solicitação agora.";
  }
};

export const fetchSimulatedGoogleData = async (type: IntegrationType): Promise<any> => {
  let prompt = "";
  let schemaProperty = "";

  switch (type) {
    case IntegrationType.GMAIL:
      prompt = "Gere uma lista JSON de 5 emails fictícios recentes (mas realistas) para um usuário profissional. Campos: id, from, subject, snippet, date (hora), read (boolean).";
      break;
    case IntegrationType.DRIVE:
      prompt = "Gere uma lista JSON de 6 arquivos fictícios do Google Drive. Campos: id, name, type (folder, image, doc, pdf), owner, modified (data curta).";
      break;
    case IntegrationType.CONTACTS:
      prompt = "Gere uma lista JSON de 6 contatos fictícios brasileiros. Campos: id, name, email, phone, avatar (use 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + name).";
      break;
    case IntegrationType.CALENDAR:
      prompt = "Gere uma lista JSON de 4 eventos de agenda para hoje/amanhã. Campos: id, title, time, date, location, attendees (array de nomes).";
      break;
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error);
    return [];
  }
};