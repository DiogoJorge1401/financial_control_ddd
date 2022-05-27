# Usuário - Aggregate Root

```json
{
  "id": "uuid",
  "email": "example@mail.com",
  "password": "password1234",
  "terms": [
    {
      "ip": "127.0.0.1",
      "acceptedAt": "2021-01-01T10:00:00"
    },
    {
      "ip": "127.0.0.1",
      "acceptedAt": "2021-09-10T14:00:00"
    }
  ]
}
```
## Structure
- User: Aggregate
  - id: Value Object
  - email: Value Object - OK
  - password: Value Object - OK
  - terms:
    - ip: Value Object
    - acceptedAt: Value Object