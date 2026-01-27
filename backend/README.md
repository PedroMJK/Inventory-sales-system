# Inventory-sales-system - Backend

## Description
RESTful API responsible for authentication, inventory management, sales processing, and stock control, designed following clean architecture principles.

## Tech Stack

### Back-end

- Node.js
- Express
- Database (MongoDB)
- Authentication (JWT)
- dotenv

## Project Structure

```text
├─ src/
│  ├─ config/           # Database and environment configurations
│  ├─ controllers/      # Request handling and business logic
│  ├─ models/           # Database schemas (Mongoose)
│  ├─ routes/           # API routes
│  ├─ middlewares/      # Auth and validation middlewares
│  ├─ services/         # Business rules and reusable logic
│  └─ app.js            # Express app setup
│
├─ .env.example
├─ package.json
└─ package-lock.json
└─ server.js
```

## Setup & Installation

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally or MongoDB Atlas
- Git

Clone the repository:

```bash
git clone https://github.com/PedroMJK/Inventory-sales-system
cd inventory-sales-system/backend
```

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Running the Project

1. Navigate to the backend directory:

```bash
cd backend 
```

2. Install dependencies

```bash
npm install
```
3. Start the development server:

```bash
npm run dev
```

## Application URLs

Once the application is running, you can access it at:

- **Backend API:** http://localhost:3000

## API / Features
- User authentication
- Product management
- Inventory control
- Sales registration with stock validation

## Author

**Pedro Monteiro**

- GitHub: https://github.com/PedroMJK
- LinkedIn: https://www.linkedin.com/in/pedro-monteiro-3173b8241/