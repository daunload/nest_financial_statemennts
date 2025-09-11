import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { jsonToTxtFile } from '../utils/file.utils';
import { runTextGenerateWithFile } from 'src/utils/gemini.utils';

@Injectable()
export class FinancialsService {
	private readonly axiosClient: AxiosInstance;
	private readonly apiKey: string;
	private readonly baseUrl = 'https://api.polygon.io';

	constructor(private configService: ConfigService) {
		this.apiKey = configService.get('app.polygonApiKey');
		this.axiosClient = axios.create({
			baseURL: this.baseUrl,
			timeout: 5000,
		});
	}

	async getFinanncials(params: {
		ticker?: string;
		cik?: string;
		company_name?: string;
		filing_date_gte?: string;
		filing_date_lt?: string;
		period_of_report_date?: string;
		timeframe?: 'quarterly' | 'annual' | 'ttm';
		include_sources?: boolean;
		limit?: number;
		sort?: string;
		order?: 'asc' | 'desc';
	}): Promise<any> {
		const queryParams: Record<string, any> = {
			apiKey: this.apiKey,
		};

		if (params.ticker) queryParams.ticker = params.ticker;
		if (params.cik) queryParams.cik = params.cik;
		if (params.company_name) queryParams.company_name = params.company_name;
		if (params.filing_date_gte)
			queryParams['filing_date.gte'] = params.filing_date_gte;
		if (params.filing_date_lt)
			queryParams['filing_date.lt'] = params.filing_date_lt;
		if (params.period_of_report_date)
			queryParams.period_of_report_date = params.period_of_report_date;
		if (params.timeframe) queryParams.timeframe = params.timeframe;
		if (params.include_sources !== undefined)
			queryParams.include_sources = params.include_sources;
		if (params.limit) queryParams.limit = params.limit;
		if (params.sort) queryParams.sort = params.sort;
		if (params.order) queryParams.order = params.order;

		try {
			const response = await this.axiosClient.get(
				'/vX/reference/financials',
				{
					params: queryParams,
				},
			);
			return response.data;
		} catch (error) {
			const status =
				error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
			const message = error.response?.data || error.message;
			throw new HttpException(
				`Polygon API error: ${JSON.stringify(message)}`,
				status,
			);
		}
	}

	async analyzeStock(params: {
		ticker?: string;
		cik?: string;
		company_name?: string;
		filing_date_gte?: string;
		filing_date_lt?: string;
		period_of_report_date?: string;
		timeframe?: 'quarterly' | 'annual' | 'ttm';
		include_sources?: boolean;
		limit?: number;
		sort?: string;
		order?: 'asc' | 'desc';
	}): Promise<string> {
		const financialsData = await this.getFinanncials(params);
		const fileName = `financials_${
			params.ticker || 'data'
		}_${Date.now()}.txt`;
		const filePath = await jsonToTxtFile(financialsData, fileName);

		return await runTextGenerateWithFile(
			'이 파일은 회사 재무제표 txt 파일이다. 회사의 전망을 분석해줘',
			filePath,
		);
	}

	async getNews(params: {
		ticker?: string;
		published_utc?: string;
		order?: string;
		limit?: number;
		sort?: string;
	}): Promise<any> {
		const queryParams: Record<string, any> = {
			apiKey: this.apiKey,
		};

		if (params.ticker) queryParams.ticker = params.ticker;
		if (params.published_utc)
			queryParams.published_utc = params.published_utc;
		if (params.order) queryParams.order = params.order;
		if (params.limit) queryParams.limit = params.limit;
		if (params.sort) queryParams.sort = params.sort ?? 'published_utc';

		try {
			const response = await this.axiosClient.get('/v2/reference/news', {
				params: queryParams,
			});
			return response.data;
		} catch (error) {
			const status =
				error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
			const message = error.response?.data || error.message;
			throw new HttpException(
				`Polygon API error: ${JSON.stringify(message)}`,
				status,
			);
		}
	}
}
