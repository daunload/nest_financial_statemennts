import { Controller, Get, Query } from '@nestjs/common';
import { FinancialsService } from './financials.service';

@Controller('financials')
export class FinancialsController {
	constructor(private readonly financialsService: FinancialsService) {}

	@Get()
	async getFinanncials(@Query('ticker') ticker: string) {
		const financials = await this.financialsService.getFinanncials({
			ticker: ticker,
			order: 'asc',
			limit: 10,
		});

		return financials.results;
	}
}
