import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialsModule } from './financials/financials.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig],
			isGlobal: true,
			cache: true,
		}),
		FinancialsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
