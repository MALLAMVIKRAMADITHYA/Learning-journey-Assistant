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
# 🖥️ Important Commands Used in the Project

## 📦 Install Project Dependencies

```bash
npm install
```

This command installs all required project dependencies listed in the `package.json` file, including React, Next.js, Prisma, Tailwind CSS, and other libraries used in the application.

---

# ▶️ Start Development Server

```bash
npm run dev
```

This command starts the Next.js development server and runs the application locally for development and testing.

---

# 🏗️ Build the Application

```bash
npm run build
```

This command creates an optimized production build of the application for deployment.

---

# 🚀 Start Production Server

```bash
npm start
```

This command runs the production version of the application after building the project.

---

# 🧠 Prisma Commands

## Generate Prisma Client

```bash
npx prisma generate
```

This command generates the Prisma Client used to interact with the SQLite database through Prisma ORM.

---

## Push Database Schema

```bash
npx prisma db push
```

This command synchronizes the Prisma schema with the SQLite database and creates database tables automatically.

---

## Run Database Migrations

```bash
npx prisma migrate dev
```

This command creates and applies database migrations during development.

---

## Open Prisma Studio

```bash
npx prisma studio
```

This command opens Prisma Studio, which provides a graphical interface for viewing and managing database records.

---

## Seed Database with Sample Data

```bash
npx prisma db seed
```

This command inserts sample student, subject, quiz, recommendation, and feedback data into the database.

---

# 🌐 Next.js Commands

## Create Next.js Project

```bash
npx create-next-app@latest
```

This command creates a new Next.js application with the latest configuration and project setup.

---

# 🎨 Tailwind CSS Installation

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

This command installs Tailwind CSS and related PostCSS dependencies for frontend styling.

---

# 📊 Install Recharts

```bash
npm install recharts
```

This command installs the Recharts library used for dashboard analytics and performance visualization charts.

---

# 🗄️ Install Prisma Packages

```bash
npm install prisma @prisma/client
```

This command installs Prisma ORM and Prisma Client for database management and backend integration.

---

# ⚙️ Initialize Prisma

```bash
npx prisma init
```

This command initializes Prisma in the project and creates the `prisma` folder and configuration files.

---

# 🤖 Install Google Generative AI Package

```bash
npm install @google/generative-ai
```

This command installs the Google Generative AI package used for chatbot and AI integration features.

---

# 📂 Git Commands

## Initialize Git Repository

```bash
git init
```

This command initializes a new Git repository for version control.

---

## Check Git Status

```bash
git status
```

This command displays modified, added, and untracked project files.

---

## Add Files to Git

```bash
git add .
```

This command adds all project files to the Git staging area before committing.

---

## Commit Changes

```bash
git commit -m "Project update"
```

This command creates a Git commit with a message describing the project changes.

---

## Push Project to GitHub

```bash
git push
```

This command uploads local project commits to the GitHub repository.

---

## Pull Latest Changes

```bash
git pull
```

This command downloads the latest changes from the GitHub repository.

---

# 🧪 Testing & Maintenance Commands

## Run ESLint

```bash
npm run lint
```

This command checks the project for coding errors, formatting issues, and TypeScript or React warnings.

---

## Remove Node Modules (Windows PowerShell)

```powershell
Remove-Item -Recurse -Force node_modules
```

This command deletes the `node_modules` folder to fix dependency or package installation issues.

---

## Reinstall Project Packages

```bash
npm install
```

This command reinstalls all project dependencies after removing `node_modules`.

---

# 📁 Environment Variables

## Example `.env`

```env
DATABASE_URL="file:./dev.db"
```

This environment variable defines the SQLite database location used by Prisma ORM.

---

## Example `.env.local`

```env
GOOGLE_API_KEY=your_api_key
```

This environment variable stores the API key used for AI chatbot integration.

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