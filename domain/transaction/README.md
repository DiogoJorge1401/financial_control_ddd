# Transação - Aggregate Root

```json
{
  "userId": "uuid",
  "totalValue": 100,
  "reasonId": "uuid",
  "paymentDate": "2021-01-01 10:00:00",
  "transactionType": ["ENTRADA","SAIDA"],
  "status": ["PENDENTE","CONCLUIDO"],
  "transactionNote": "valid_description",
  "attachment": "url",
  "transactionCalculations": [
    {
      "budgetBoxId": "uuid",
      "monetaryValue": 50
    },
    {
      "budgetBoxId": "uuid",
      "monetaryValue": 50
    }
  ]
}
```

## Structure
  - Transaction: Aggregate
    - paymentDate: Value Object - OK
    - reasonId: Value Object - OK
    - transactionType: Value Object (enum) - OK
    - transactionStatus: Value Object (enum) - OK
    - transactionNote: Value Object - OK
    - attachment: Value Object - OK
    - transactioCalculations: TransactioncCalculation[]
      - transactionCalculation: Value Object - OK