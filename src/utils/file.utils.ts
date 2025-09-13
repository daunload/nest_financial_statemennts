import * as fs from 'fs/promises';
import * as path from 'path';

export async function ensureDirectoryExists(dirPath: string): Promise<void> {
	try {
		await fs.access(dirPath);
	} catch {
		await fs.mkdir(dirPath, { recursive: true });
	}
}

export async function jsonToTxtFile(
	jsonData: any,
	fileName: string,
): Promise<string> {
	const filePath = path.join('./uploads', fileName);

	await ensureDirectoryExists('./uploads');

	await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

	return filePath;
}
