# Transação - Aggregate Root

```json
{
  "userId": "uuid",
  "totalValue": 100,
  "reasonId": "uuid",
  "paymentDate": "2021-01-01 10:00:00",
  "transactionType": ["ENTRADA","SAIDA"],
  "status": ["PENDENTE","CONCLUIDO"],
  "note": "valid_description",
  "attachment": "url",
  "calculations": [
    {
      "budgetBoxId": "uuid",
      "value": 50
    },
    {
      "budgetBoxId": "uuid",
      "value": 50
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
    - note: Value Object
    - attachment: Value Object
    - calculations: Calculation[]
      - calculation: Value Object