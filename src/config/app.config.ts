import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
	host: process.env.HOST || 'localhost',
	port: parseInt(process.env.PORT, 10) || 3000,
	polygonApiKey: process.env.POLYGON_API_KEY,
}));
