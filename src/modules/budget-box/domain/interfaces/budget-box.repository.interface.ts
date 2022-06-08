import { BudgetBoxAggregate } from '@budget-box/domain/aggregate';
import { IBudgetBox } from '@shared/interfaces/budget-box-model.interface';
import { IBaseRepository } from 'types-ddd';

export type IBudgetBoxRepository = IBaseRepository<BudgetBoxAggregate, IBudgetBox>;