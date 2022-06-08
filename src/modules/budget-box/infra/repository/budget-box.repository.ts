import { BudgetBoxAggregate } from '@budget-box/domain/aggregate';
import { IBudgetBoxRepository } from '@budget-box/domain/interfaces';
import { BudgetBox, BudgetBoxDocument } from '@budget-box/infra/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IBudgetBox } from '@shared/interfaces/budget-box-model.interface';
import { Model } from 'mongoose';
import { Filter } from 'types-ddd';

@Injectable()
export class BudgetBoxRepository implements IBudgetBoxRepository {

	constructor (
    @InjectModel(BudgetBox.name)
    private readonly conn: Model<BudgetBoxDocument>
	) { }

	async find (filter: Filter<Partial<IBudgetBox>>): Promise<BudgetBoxAggregate[]> {
		filter;
		throw new Error('Method not implemented!');
	}
	async findOne (filter: Filter<Partial<IBudgetBox>>): Promise<BudgetBoxAggregate> {
		filter;
		throw new Error('Method not implemented!');
	}
	async delete (filter: Filter<Partial<IBudgetBox>>): Promise<void> {
		filter;
		throw new Error('Method not implemented!');
	}
	async exists (filter: Filter<Partial<IBudgetBox>>): Promise<boolean> {
		filter;
		throw new Error('Method not implemented!');
	}
	async save (target: BudgetBoxAggregate): Promise<void> {

		try {
			const transaction = new this.conn(target.toObject());

			await transaction.save();
		} catch (err) {
			console.log(err);
		}


	}
}