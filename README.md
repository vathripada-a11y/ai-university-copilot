# AI University Copilot & Intelligent Campus Management Platform
**SDMIT Ujire — 5th Semester ISE Mini Project**

## Description
The **AI University Copilot & Intelligent Campus Management Platform** is a unified, intelligent web platform designed for Shri Dharmasthala Manjunatheshwara Institute of Technology (SDMIT), Ujire. It streamlines campus administration, academic routines, and communication across students, faculty, and administrative staff by integrating modules for attendance management, course timetables, assignment distribution and grading, announcements, and an AI-powered conversational campus copilot.

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Lucide React
- **Backend:** Spring Boot 3.3.x, Java 17, Spring Security, Spring Data JPA, Hibernate, Bean Validation, springdoc-openapi (Swagger UI)
- **Database:** MySQL 8
- **Build Tools:** npm (Frontend), Apache Maven (Backend)

---

## Folder Overview

```text
ai-university-copilot/
├── ROOT/
│   ├── README.md                 # Project documentation and setup instructions
│   ├── .gitignore                # Global git ignore configuration
│   ├── docs/                     # Project documentation (.gitkeep)
│   └── database/                 # SQL schemas and seed scripts
│       ├── schema.sql            # MySQL table schemas
│       └── seed.sql              # Initial development seed data
│
├── frontend/                     # React + Vite + Tailwind CSS frontend
│   ├── index.html                # Entry HTML
│   ├── package.json              # NPM dependencies and scripts
│   ├── postcss.config.js         # PostCSS configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── vite.config.js            # Vite bundler configuration
│   └── src/
│       ├── App.jsx               # Root application component
│       ├── main.jsx              # React DOM entry point
│       ├── index.css             # Global styles and Tailwind directives
│       ├── api/                  # Axios/Fetch API client functions
│       ├── mock/                 # Mock datasets and stubbed services
│       ├── context/              # React Context state providers
│       ├── components/           # Reusable UI component library
│       ├── routes/               # Application routing and route guards
│       └── pages/
│           ├── auth/             # Login, signup, password reset pages
│           ├── student/          # Student dashboard & self-service views
│           ├── faculty/          # Faculty grading & attendance views
│           ├── admin/            # Departmental & campus administration
│           └── shared/           # Common pages (404, notifications, profiles)
│
└── backend/                      # Spring Boot 3 REST API backend
    ├── pom.xml                   # Maven project object model and dependencies
    ├── mvnw / mvnw.cmd           # Maven wrapper scripts
    └── src/
        ├── main/
        │   ├── java/com/sdmit/campuscopilot/
        │   │   ├── CampusCopilotApplication.java # Spring Boot entrypoint
        │   │   ├── config/       # Security, CORS, OpenAPI configs
        │   │   ├── security/     # JWT filters & auth utilities
        │   │   ├── auth/         # Authentication services & controllers
        │   │   ├── user/         # Student & faculty user management
        │   │   ├── attendance/   # Attendance tracking domain
        │   │   ├── timetable/    # Timetable scheduling domain
        │   │   ├── assignment/   # Assignment submission & grading
        │   │   ├── notice/       # Campus circulars & notice board
        │   │   ├── copilot/      # AI assistant & LLM integrations
        │   │   └── common/       # Common utilities & HealthController
        │   └── resources/
        │       └── application.properties # Spring configuration with env overrides
        └── test/
            └── java/com/sdmit/campuscopilot/
                └── CampusCopilotApplicationTests.java # Context load test
```

---

## How to Run

### Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **Java JDK**: 17+
- **Maven**: 3.8+ (or use the included `./mvnw` / `mvn.cmd` wrapper)
- **MySQL**: 8.0+

---

### 1. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The development server will start at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

### 2. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Configure Environment Variables (Optional):**
   The application uses safe development defaults, but can be configured using environment variables:
   - `DB_URL` (default: `jdbc:mysql://localhost:3306/campus_copilot?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true`)
   - `DB_USER` (default: `root`)
   - `DB_PASSWORD` (default: `password`)
   - `JWT_SECRET` (default: development secret key)
   - `PORT` (default: `8080`)

3. **Build the application package:**
   ```bash
   # Using local Maven:
   mvn clean package

   # Or using the wrapper (Windows):
   .\mvnw.cmd clean package

   # Or using the wrapper (Linux/macOS):
   ./mvnw clean package
   ```

4. **Run the backend application:**
   ```bash
   # Using Spring Boot plugin:
   mvn spring-boot:run

   # Or running the packaged JAR:
   java -jar target/campuscopilot-0.0.1-SNAPSHOT.jar
   ```

5. **Verify Backend Health & API Docs:**
   - **Health Check Endpoint:** `http://localhost:8080/api/health` (Returns `{"status":"ok"}`)
   - **Swagger UI:** `http://localhost:8080/swagger-ui.html`
   - **OpenAPI JSON:** `http://localhost:8080/v3/api-docs`
