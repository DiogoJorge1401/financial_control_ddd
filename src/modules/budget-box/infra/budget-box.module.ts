import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetBoxService } from './budget-box.service';
import { BudgetBox, BudgetBoxSchema } from './entities';
import { BudgetBoxRepository } from './repository';
import { BudgetBoxResolver } from './resolver/budget-box.resolver';

@Module({
	providers: [
		{ provide: 'BudgetBoxRepository', useClass: BudgetBoxRepository },
		BudgetBoxService,
		BudgetBoxResolver
	],
	imports: [
		MongooseModule.forFeature([{ name: BudgetBox.name, schema: BudgetBoxSchema }]),
	]
})
export class BudgetBoxModule { }