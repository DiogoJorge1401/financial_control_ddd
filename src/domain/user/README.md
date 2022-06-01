# Usuário - Aggregate Root

```json
 {
  "id": "uuid",
  "email": "example@mail.com",
  "password": "password1234",
  "terms": [
    {
      "ip": "127.0.0.1",
      "acceptedAt": "2021-01-01T10:00:00",
      "userAgent": {
        "name": "firefox",
        "version": "86.0.0",
        "os": "Linux",
        "type": "browser"
      }
    }
  ]
}
```
## Structure
- User: Aggregate - OK
  - id: Value Object - OK
  - email: Value Object - OK
  - password: Value Object - OK
  - terms:
    - term: Value Object - OK
      - ip: Value Object - OK
      - acceptedAt: Value Object - OK
      - userAgent: Object - Ok