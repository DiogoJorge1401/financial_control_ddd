# Caixa de orçamento - Aggregate Root

```json
  {
  "id": "uuid",
  "ownerId": "uuid",
  "description": "valid_description",
  "balanceAvailable": 1000,
  "isPercentual": true,
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
- BudgetBox: Aggregate
  - budgetId: Value Object - OK
  - reasonId: Value Object - OK
  - reasondescription: Value Object - OK
  - budgetDescription: Value Object - OK
  - budgetPercentage: Value Object - OK
  - reasons: Entity