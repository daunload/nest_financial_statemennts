import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { jsonToTxtFile } from '../utils/file.utils';
import { runTextGenerateWithFiles } from 'src/utils/gemini.utils';

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

	async getSMA(params: {
		stockTicker?: string;
		timespan?: string;
		adjusted?: string;
		window?: string;
		order?: string;
		limit?: number;
	}): Promise<any> {
		const queryParams: Record<string, any> = {
			apiKey: this.apiKey,
		};

		if (params.timespan) queryParams.timespan = params.timespan;
		if (params.adjusted) queryParams.adjusted = params.adjusted;
		if (params.window) queryParams.window = params.window;
		if (params.order) queryParams.order = params.order;
		if (params.limit) queryParams.limit = params.limit;

		try {
			const response = await this.axiosClient.get(
				`/v1/indicators/sma/${params.stockTicker}`,
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

	async getMACD(params: {
		stockTicker?: string;
		timestamp?: string;
		timespan?: string;
		adjusted?: boolean;
		short_window?: number;
		long_window?: number;
		signal_window?: number;
		series_type?: number;
		expand_underlying: boolean;
		order: string;
		limit: number;
	}): Promise<any> {
		const queryParams: Record<string, any> = {
			apiKey: this.apiKey,
		};
		if (params.timestamp) queryParams.timestamp = params.timestamp;
		if (params.timespan) queryParams.timespan = params.timespan;
		if (params.adjusted) queryParams.adjusted = params.adjusted;
		if (params.short_window) queryParams.short_window = params.short_window;
		if (params.long_window) queryParams.long_window = params.long_window;
		if (params.signal_window)
			queryParams.signal_window = params.signal_window;
		if (params.series_type) queryParams.series_type = params.series_type;
		if (params.expand_underlying)
			queryParams.expand_underlying = params.expand_underlying;
		if (params.order) queryParams.order = params.order;
		if (params.limit) queryParams.limit = params.limit;

		try {
			const response = await this.axiosClient.get(
				`/v1/indicators/macd/${params.stockTicker}`,
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

	async getEMA(params: {
		stockTicker?: string;
		timestamp?: string;
		timespan?: string;
		adjusted?: boolean;
		window?: number;
		series_type?: number;
		expand_underlying: boolean;
		order: string;
		limit: number;
	}): Promise<any> {
		const queryParams: Record<string, any> = {
			apiKey: this.apiKey,
		};
		if (params.timestamp) queryParams.timestamp = params.timestamp;
		if (params.timespan) queryParams.timespan = params.timespan;
		if (params.adjusted) queryParams.adjusted = params.adjusted;
		if (params.window) queryParams.window = params.window;
		if (params.series_type) queryParams.series_type = params.series_type;
		if (params.expand_underlying)
			queryParams.expand_underlying = params.expand_underlying;
		if (params.order) queryParams.order = params.order;
		if (params.limit) queryParams.limit = params.limit;

		try {
			const response = await this.axiosClient.get(
				`/v1/indicators/ema/${params.stockTicker}`,
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

	async getRSI(params: {
		stockTicker?: string;
		timestamp?: string;
		timespan?: string;
		adjusted?: boolean;
		window?: number;
		series_type?: number;
		expand_underlying: boolean;
		order: string;
		limit: number;
	}): Promise<any> {
		const queryParams: Record<string, any> = {
			apiKey: this.apiKey,
		};
		if (params.timestamp) queryParams.timestamp = params.timestamp;
		if (params.timespan) queryParams.timespan = params.timespan;
		if (params.adjusted) queryParams.adjusted = params.adjusted;
		if (params.window) queryParams.window = params.window;
		if (params.series_type) queryParams.series_type = params.series_type;
		if (params.expand_underlying)
			queryParams.expand_underlying = params.expand_underlying;
		if (params.order) queryParams.order = params.order;
		if (params.limit) queryParams.limit = params.limit;

		try {
			const response = await this.axiosClient.get(
				`/v1/indicators/rsi/${params.stockTicker}`,
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

		const newsData = await this.getNews(params);
		const newsFileName = `news_${params.ticker || 'data'}_${Date.now()}.txt`;
		const newsFilePath = await jsonToTxtFile(newsData, newsFileName);

		return await runTextGenerateWithFiles(
			`You are a financial analyst specializing in equity research.  
            Analyze the following company's financial statement and recent stock performance.  
            Use only the provided numbers and news summaries.  
            Do not make up additional data.  
            If something is unknown, state "N/A".  
            ⚠️ 반드시 한국어로 답변하세요. (Always respond in Korean)

            📊 제공 데이터에는 회사의 **재무제표**와 **최근 뉴스 요약**이 포함되어 있습니다.  
            → 따라서 분석 시 반드시 이 데이터만 근거로 판단해야 합니다.  

            TASKS:
            1. 수익성 (매출, 순이익, 이익률) 분석
            2. 성장성 (매출/이익 전년 대비 증감률) 평가
            3. 안정성 (부채비율, 유동비율) 분석
            4. 밸류에이션 간단 분석 (EPS, PER 계산 가능 시)
            5. 최근 주가 하락 또는 상승 요인 분석 (재무적 요인, 외부 환경, 뉴스/시장 요인 근거)
            6. 종합 요약 (투자자 관점에서 3줄 이내)
            `,
			[
				{ path: filePath, mimeType: 'text/plain' },
				{ path: newsFilePath, mimeType: 'text/plain' },
			],
		);
	}
}
