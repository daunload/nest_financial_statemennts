import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { FinancialsService } from './financials.service';

@Controller('financials')
export class FinancialsController {
	constructor(private readonly financialsService: FinancialsService) {}

	@Get()
	async getFinanncials(@Query('ticker') ticker: string) {
		const financials = await this.financialsService.getFinanncials({
			ticker: ticker,
			order: 'desc',
			limit: 10,
		});

		return financials.results;
	}

	@Post('analyze')
	async analyzeStock(
		@Body()
		params: {
			ticker?: string;
		},
	) {
		const filePath = await this.financialsService.analyzeStock(params);
		return {
			message: 'Financials data saved successfully',
			filePath,
		};
	}

	@Get('/news')
	async getNews(@Query('ticker') ticker: string) {
		const financials = await this.financialsService.getNews({
			ticker: ticker,
			order: 'desc',
			limit: 10,
		});

		return financials.results;
	}
}
