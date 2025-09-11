import {
	createPartFromUri,
	createUserContent,
	GoogleGenAI,
} from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function runTextGenerate(text: string) {
	const response = await ai.models.generateContent({
		model: 'gemini-2.0-flash-001',
		contents: [{ role: 'user', parts: [{ text: text }] }],
	});

	return response.text;
}

export async function runTextGenerateWithFile(text: string, filePath: string) {
	const file = await ai.files.upload({
		file: filePath,
		config: { mimeType: 'text/plain' },
	});
	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: createUserContent([
			createPartFromUri(file.uri, file.mimeType),
			text,
		]),
	});

	console.log(response.text);
	return response.text;
}
