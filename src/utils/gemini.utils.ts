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

export async function runTextGenerateWithFiles(
	text: string,
	files: { path: string; mimeType: string }[],
) {
	const uploadFiles = await Promise.all(
		files.map(async (file) => {
			return await ai.files.upload({
				file: file.path,
				config: { mimeType: file.mimeType },
			});
		}),
	);

	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: createUserContent([
			...uploadFiles.map((file) =>
				createPartFromUri(file.uri, file.mimeType),
			),
			text,
		]),
	});

	return response.text;
}
