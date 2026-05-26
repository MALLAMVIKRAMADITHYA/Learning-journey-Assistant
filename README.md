# 🚀 Learning Journey Assistant

Learning Journey Assistant is an AI-supported academic analytics web application developed using Next.js, React, TypeScript, Prisma ORM, and SQLite. The system is designed to help students monitor academic performance, identify weak areas, receive personalized feedback, and improve learning outcomes through intelligent recommendations and AI-assisted support.

The application focuses on adaptive learning, personalized student analytics, dashboard visualization, and interactive learning assistance.

> Built using Next.js App Router, Prisma ORM, SQLite, TypeScript, and Tailwind CSS.

---

# 📱 Application Features

## 🔐 Student Authentication
- Student login system
- Session-based access
- Secure API route handling

## 📊 Dashboard Analytics
- Student performance visualization
- Subject-wise analytics
- Overall academic performance tracking
- Interactive charts and analytics

## 📚 Subject Management
- View enrolled subjects
- Subject detail pages
- Subject modules and SILOs
- Assessment and quiz tracking

## 🧠 Weak Area & Skill Gap Analysis
- Identifies low-performing modules
- Detects weak academic areas
- Generates personalized recommendations

## 🤖 Learning AI Assistant
- Personalized AI chatbot
- Subject explanations
- Study recommendations
- Quiz support
- Performance feedback
- Application-related guidance

## 📝 Adaptive Feedback System
- Positive and motivational feedback
- Personalized learning suggestions
- Student improvement guidance

## 📈 Performance Visualization
- Interactive charts using Recharts
- Dashboard analytics
- Learning progress tracking

---

# 🧠 Technologies Used

## Frontend
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Recharts

## Backend
- Next.js API Routes
- Prisma ORM
- SQLite Database

## AI & Analytics
- AI Chatbot Architecture
- Personalized Recommendation Logic
- Weak Area Detection
- Adaptive Learning Logic

---

# 🏁 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/MALLAMVIKRAMADITHYA/Learning-journey-Assistant
cd learning-journey-assistant
2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables
   DATABASE_URL="file:./dev.db"
   GOOGLE_API_KEY=your_api_key
4️⃣ Generate Prisma Client
    npx prisma generate
5️⃣ Push Database Schema
   npx prisma db push
   npx prisma db seed
   10 sample students
Subjects
Assessments
Quizzes
Recommendations
Feedback
Modules
Learning Outcomes
7️⃣ Start Development Server
   npm run dev
   http://localhost:3000
#Project Structure
learning-journey-assistant/
│
├── app/
│   ├── api/
│   │   ├── chatbot/
│   │   ├── login/
│   │   └── student/
│   │
│   ├── dashboard/
│   ├── subjects/[id]/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── Chatbot.tsx
│
├── lib/
│   ├── prisma.ts
│   └── questionBank.ts
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   ├── seed.ts
│   └── dev.db
│
├── public/
├── .env
├── .env.local
├── package.json
└── README.md

Main Application Pages
Page	Description
/	Student login page
/dashboard	Main student dashboard
/subjects/[id]	Subject detail page
/api/login	Login API
/api/student	Student data API
/api/chatbot	AI chatbot API
🗄 Database Models

The system uses Prisma ORM with SQLite database.

Main Models
Student
University
Subject
Enrollment
Assessment
Quiz
Recommendation
SubjectModule
LearningOutcome
StudentFeedback

🔒 Security Features
API-based backend routing
Prisma ORM validation
Environment variable protection
Session-based authentication
Database relationship validation
📈 Future Enhancements
Full Gemini/OpenAI integration
Moodle integration
Admin dashboard
Cloud deployment
Real-time analytics
Predictive AI analytics
JWT authentication
Advanced adaptive quizzes
🤝 Team Collaboration

The project uses:

GitHub for version control
Jira for sprint management
Agile Scrum methodology
Sprint-based development workflow
✅ Next.js frontend
✅ React dashboard
✅ Prisma ORM
✅ SQLite database
✅ Seeded sample data
✅ API routes
✅ AI chatbot
✅ Weak-area analysis
✅ Recommendations
✅ Subject analytics
✅ Performance visualization
✅ Adaptive feedback system
✅ README documentation
✅ Sprint documentation
✅ Agile/Jira workflow
✅ GitHub project structure