import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/financial_control')
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
