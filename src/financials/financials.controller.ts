import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { FinancialsService } from './financials.service';

@Controller('financials')
export class FinancialsController {
	constructor(private readonly financialsService: FinancialsService) {}

	@Get()
	async getFinanncials(@Query('ticker') ticker: string) {
		const response = await this.financialsService.getFinanncials({
			ticker: ticker,
			order: 'desc',
			limit: 10,
		});

		return response.results;
	}

	@Post('analyze')
	async analyzeStock(
		@Body()
		params: {
			ticker?: string;
		},
	) {
		const response = await this.financialsService.analyzeStock(params);
		return {
			message: 'Financials data saved successfully',
			response,
		};
	}

	@Get('/news')
	async getNews(@Query('ticker') ticker: string) {
		const response = await this.financialsService.getNews({
			ticker: ticker,
			order: 'desc',
			limit: 10,
		});

		return response.results;
	}

	@Get('/sma')
	async getSMA(@Query('ticker') ticker: string) {
		const response = await this.financialsService.getSMA({
			stockTicker: ticker,
			timespan: 'day',
			order: 'desc',
			limit: 40,
		});

		return response.results;
	}
	@Get('/macd')
	async getMACD(@Query('ticker') ticker: string) {
		const response = await this.financialsService.getMACD({
			stockTicker: ticker,
			timespan: 'day',
			expand_underlying: true,
			order: 'desc',
			limit: 40,
		});

		return response.results;
	}
	@Get('/ema')
	async getEMA(@Query('ticker') ticker: string) {
		const response = await this.financialsService.getEMA({
			stockTicker: ticker,
			timespan: 'day',
			expand_underlying: true,
			order: 'desc',
			limit: 40,
		});

		return response.results;
	}
	@Get('/rsi')
	async getRSI(@Query('ticker') ticker: string) {
		const response = await this.financialsService.getRSI({
			stockTicker: ticker,
			timespan: 'day',
			expand_underlying: true,
			window: 14,
			order: 'desc',
			limit: 40,
		});

		return response.results;
	}
}
