# Medical AI Treatment

Medical AI Treatment is a web-based application that leverages artificial intelligence to analyze medical reports and provide personalized treatment plans using a Kanban-style interface. It is built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **Drizzle ORM** for database management and **Neon PostgreSQL** for storage.

---

## 🚀 Features

- 📑 **Upload and Analyze Medical Reports**
- 🏥 **AI-Powered Treatment Recommendations**
- 🎯 **Kanban-Style Treatment Plan Organization**
- 🔐 **User Authentication & Role-Based Access**
- 🗂 **Manage Folders & Patient Records**
- 📊 **Data Security & HIPAA Compliance**

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Authentication**: JWT, bcrypt
- **AI Integration**: Gemini API (Google AI)

---

## 📂 Project Structure

```
Medical-Ai-Treatment/
│── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages
│   ├── hooks/           # Custom hooks
│   ├── services/        # API calls & backend interactions
│   ├── utils/           # Helper functions
│── backend/
│   ├── controllers/     # API logic
│   ├── routes/          # API endpoints
│   ├── models/          # Database schemas (Drizzle ORM)
│── drizzle/
│   ├── migrations/      # Database migration files
│── public/
│── .env                 # Environment variables
│── package.json         # Project dependencies
│── drizzle.config.js    # Drizzle ORM configuration
```

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/dennis-000/AI-powered-Healthcare-Treatment-.git
cd Medical-Ai-Treatment
```

### **2️⃣ Install Dependencies**
```sh
# Install frontend dependencies
yarn install  # or npm install

# Install backend dependencies
cd backend
yarn install  # or npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
DATABASE_URL=your_neon_postgres_url
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_google_gemini_api_key
```

### **4️⃣ Run the Application**
```sh
# Start the backend
cd backend
yarn dev  # or npm run dev

# Start the frontend
cd ../
yarn dev  # or npm run dev
```

---

## 🛢 Database Setup & Migrations

### **1️⃣ Initialize Drizzle ORM**
```sh
npx drizzle-kit generate
```

### **2️⃣ Apply Migrations to Neon PostgreSQL**
```sh
npx drizzle-kit push
```

### **3️⃣ Reset Database (if needed)**
```sh
psql -d your_database_url -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npx drizzle-kit generate && npx drizzle-kit push
```

---

## 🔥 API Endpoints

### **User Authentication**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### **Medical Records**
- `GET /api/records` - Get all records
- `POST /api/records` - Upload a new medical report

### **AI Treatment Plan**
- `POST /api/ai/analyze` - Analyze medical report using AI
- `GET /api/kanban` - Fetch treatment plan in Kanban format

---

## 🛠 Contribution Guidelines

1. **Fork the Repository**
2. **Create a Feature Branch**
3. **Commit Changes with Meaningful Messages**
4. **Push to GitHub and Open a Pull Request**

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

For any questions or contributions, reach out via **asiedudennis30@gmail.com** or [GitHub](https://github.com/dennis-000).

