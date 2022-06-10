export interface CreateBudgetBoxDTO {
  ownerId: string

  description: string
  
  isPercentage: boolean

  budgetPercentage: number
}