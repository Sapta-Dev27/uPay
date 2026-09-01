# 💳 uPay — Digital Payment Backend

> A secure, scalable Node.js backend for digital payments, wallet management, UPI transactions, P2P transfers, mobile recharges, and bill payments.

**uPay** is a backend-focused digital payment platform designed to simulate the core services of a modern payment application. It provides secure user authentication, wallet operations, dynamic UPI ID management, MPIN-protected transactions, P2P money transfers, mobile recharge, electricity bill payments, service-provider management, and transaction tracking.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication
- Secure password hashing using **bcrypt**
- Protected API routes through authentication middleware
- MPIN-based transaction authorization
- Access-token and refresh-token handling
- Environment-based configuration using `.env`

### 👤 User Management
- User registration
- User login
- Profile management
- Secure account handling
- Account and wallet association

### 💰 Wallet Management
- Create and manage user wallets
- Wallet balance management
- Credit and debit operations
- Transaction-linked wallet updates
- Secure wallet operations

### 📱 UPI Functionality
- Dynamic UPI ID generation
- UPI ID management
- UPI-based transactions
- P2P money transfers
- MPIN verification before sensitive transactions

### 💸 P2P Transfers
Users can transfer money directly between accounts while maintaining transaction records.

The transfer flow includes:

```text
Sender
   │
   ▼
Authenticate User
   │
   ▼
Verify MPIN
   │
   ▼
Validate Receiver
   │
   ▼
Check Wallet Balance
   │
   ▼
Debit Sender
   │
   ▼
Credit Receiver
   │
   ▼
Create Transaction Record
```

### 📲 Recharge & Bill Payments
The backend also supports service-based payments such as:

- 📱 Mobile recharge
- ⚡ Electricity bill payments
- 💧 Water payments
- 🔥 Gas payments
- 🛡️ Insurance payments
- 💳 Loan payments

### 🏢 Service Provider Management
Service providers can be stored and managed with information such as:

- Provider name
- Provider type
- Provider email
- Supported services

### 📊 Transaction Management
- Transaction creation
- Transaction history
- Sender/receiver tracking
- Transaction status
- Refund handling
- Transaction categorization

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Backend runtime |
| **Express.js** | REST API framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **bcrypt** | Password/MPIN hashing |
| **dotenv** | Environment configuration |
| **Nodemon** | Development server |

The current project uses ES Modules and Express with MongoDB/Mongoose.

---

## 📂 Project Structure

```text
uPay/
│
├── src/
│   │
│   ├── config/
│   │   └── Database configuration
│   │
│   ├── controllers/
│   │   ├── Transactions/
│   │   ├── MPIN.js
│   │   ├── UPID.js
│   │   ├── account.js
│   │   ├── login.js
│   │   ├── profile.js
│   │   ├── register.js
│   │   ├── serviceProvider.js
│   │   └── wallet.js
│   │
│   ├── lib/
│   │   ├── accessToken.js
│   │   └── refershToken.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── info.js
│   │
│   ├── models/
│   │   ├── AccountService.js
│   │   ├── AccountUser.js
│   │   ├── MPIN.js
│   │   ├── UPID.js
│   │   ├── serviceProvider.js
│   │   ├── transactions.js
│   │   ├── user.js
│   │   └── wallet.js
│   │
│   ├── routes/
│   │   ├── MPIN.js
│   │   ├── UPID.js
│   │   ├── account.js
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── serviceprovider.js
│   │   ├── transactions.js
│   │   └── wallet.js
│   │
│   └── index.js
│
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

The repository currently follows a controller → middleware → model → route organization, keeping business logic and API routing separated.

---

## 🔄 System Architecture

```text
                   ┌──────────────────┐
                   │     Client       │
                   │ Web / Mobile App │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │   Express API    │
                   └────────┬─────────┘
                            │
                     Authentication
                            │
                            ▼
                   ┌──────────────────┐
                   │   Middleware     │
                   │  JWT Validation  │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │   Controllers    │
                   │ Business Logic   │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │     Models       │
                   │    Mongoose      │
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │     MongoDB      │
                   └──────────────────┘
```

---

## 🔑 Authentication Flow

uPay uses JWT-based authentication to protect private APIs.

```text
Register
   │
   ▼
Hash Password
   │
   ▼
Store User
   │
   ▼
Login
   │
   ▼
Verify Credentials
   │
   ▼
Generate JWT
   │
   ▼
Access Protected APIs
```

Protected requests require a valid authentication token.

```http
Authorization: Bearer <access_token>
```

---

## 💳 Transaction Security

Financial operations are treated as sensitive operations.

Before performing a transaction, the backend can validate:

1. User authentication
2. MPIN
3. Receiver/account details
4. Wallet balance
5. Transaction amount
6. Transaction state
7. Transaction record

This helps prevent unauthorized wallet operations and inconsistent transaction states.

---

## 🗄️ Core Data Models

The backend currently contains models for:

### User

Stores user identity and authentication-related information.

### Account

Represents the user's payment/account relationship.

### Wallet

Handles the user's available balance and wallet-related operations.

### MPIN

Stores the secured MPIN information required for sensitive operations.

### UPI ID

Manages dynamically generated UPI identifiers.

### Transaction

Stores payment and transfer information including transaction state and participants.

### Service Provider

Stores supported service providers and their service categories.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sapta-Dev27/uPay.git
```

### 2. Navigate into the project

```bash
cd uPay
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

> ⚠️ Never commit your `.env` file or production secrets to GitHub.

### 5. Start the development server

```bash
npm run start
```

Or:

```bash
npm run dev
```

The project currently defines `start` and `dev` scripts for running the backend.

---

## 🌐 API Modules

The API is organized around the following modules:

| Module | Purpose |
|---|---|
| 🔐 Auth | Registration & login |
| 👤 Profile | User profile management |
| 💳 Account | Account operations |
| 💰 Wallet | Wallet management |
| 🔢 UPI ID | Dynamic UPI ID operations |
| 🔑 MPIN | MPIN creation & verification |
| 💸 Transactions | P2P transfers & transaction history |
| 🏢 Service Provider | Recharge & bill-payment providers |

---

## 🔮 Example Payment Flow

A typical P2P transaction can be represented as:

```text
POST /transaction

        │
        ▼
Validate JWT
        │
        ▼
Validate MPIN
        │
        ▼
Find Sender
        │
        ▼
Find Receiver
        │
        ▼
Check Sender Balance
        │
        ▼
Debit Sender Wallet
        │
        ▼
Credit Receiver Wallet
        │
        ▼
Create Transaction
        │
        ▼
Return Transaction Status
```

---

## 🛡️ Security Considerations

uPay implements several security-oriented practices:

- Password hashing with **bcrypt**
- JWT authentication
- Protected routes
- MPIN-based transaction authorization
- Environment variables for secrets
- Database-level validation through Mongoose schemas
- Separation of authentication middleware from business logic

For a production deployment, additional measures such as rate limiting, request validation, HTTPS, audit logging, idempotency, and stricter transaction concurrency controls should also be considered.

---

## 📌 Current Status

> 🚧 **Development Project**

uPay is currently a backend-focused payment system and is intended as a learning/portfolio project demonstrating how payment-platform backend architecture can be designed using Node.js, Express, MongoDB, JWT, and Mongoose.

---

## 🛣️ Future Improvements

Planned improvements can include:

- [ ] API documentation with Swagger/OpenAPI
- [ ] Rate limiting
- [ ] Input validation using Zod/Joi
- [ ] Redis-based caching
- [ ] Transaction idempotency
- [ ] Improved wallet concurrency handling
- [ ] Automated test suite
- [ ] Docker support
- [ ] CI/CD pipeline
- [ ] Payment gateway integration
- [ ] Webhook support
- [ ] Admin dashboard
- [ ] Detailed transaction analytics
- [ ] Notification service
- [ ] Production monitoring and logging

---

## 🧪 Testing

Automated tests are not currently configured in the repository.

A test suite using tools such as **Jest** or **Vitest** can be added to cover:

```text
Authentication
      │
      ├── Registration
      ├── Login
      └── Token validation

Wallet
      │
      ├── Credit
      ├── Debit
      └── Balance validation

Transactions
      │
      ├── P2P transfer
      ├── MPIN validation
      ├── Insufficient balance
      └── Transaction history
```

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push the branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 👨‍💻 Author

### Saptarshi Paul

Backend / Full-Stack Developer

- GitHub: [@Sapta-Dev27](https://github.com/Sapta-Dev27)
- Project: [uPay](https://github.com/Sapta-Dev27/uPay)

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is currently distributed under the **ISC License** as specified in the project's `package.json`.

---

<p align="center">
  Built with ❤️ using Node.js, Express & MongoDB
</p>
