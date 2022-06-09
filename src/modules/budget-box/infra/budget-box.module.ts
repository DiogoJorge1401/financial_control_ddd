import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetBoxService } from './budget-box.service';
import { BudgetBox, BudgetBoxSchema } from './entities';
import { BudgetBoxRepository } from './repository';

@Module({
	providers: [
		{ provide: 'BudgetBoxRepository', useClass: BudgetBoxRepository },
		BudgetBoxService
	],
	imports: [
		MongooseModule.forFeature([{ name: BudgetBox.name, schema: BudgetBoxSchema }]),
	]
})
export class BudgetBoxModule { }