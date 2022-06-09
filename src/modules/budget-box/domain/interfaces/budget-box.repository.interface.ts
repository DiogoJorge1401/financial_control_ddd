import { BudgetBoxAggregate } from '@budget-box/domain/aggregate';
import { IBudgetBox } from '@shared/interfaces';
import { IBaseRepository } from 'types-ddd';

export type IBudgetBoxRepository = IBaseRepository<BudgetBoxAggregate, IBudgetBox>;