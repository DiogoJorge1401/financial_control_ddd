# Caixa de orçamento - Aggregate Root

```json
{
  "id": "uuid",
  "ownerId": "uuid",
  "description": "valid_description",
  "balanceAvailable": 1000,
  "isPercentage": true,
  "budgetPercentage": 80,
  "transactionsIds": [
    "uuid",
    "uuid"
  ],
  "reasons": [
    {
      "id": "uuid",
      "description": "valid_description"
    }
  ]
}
```
## Structure
- BudgetBox: Aggregate - OK
  - budgetId: Value Object - OK
  - reasonId: Value Object - OK
  - reasonDescription: Value Object - OK
  - budgetDescription: Value Object - OK
  - budgetPercentage: Value Object - OK
  - reasons: Entity - OK