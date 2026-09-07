# Full-Stack Dockerized Login & Signup Application

A clean, beginner-friendly full-stack authentication web application running entirely on Docker with **React (Vite)**, **FastAPI (Python)**, and **PostgreSQL**.

---

## 📚 Docker Concepts for Beginners

### 1. What is Docker?
Think of **Docker** like a shipping container for software. Before Docker, apps often failed with the phrase *"It works on my machine!"* because of different operating systems, Python versions, or missing packages. Docker packages your application code, libraries, and runtime environment into an isolated container that runs identically everywhere (Windows, macOS, Linux, or the cloud).

### 2. What is a Docker Image?
A **Docker Image** is a read-only blueprint or template that contains the instructions to build an environment.
```text
Dockerfile (Text Instructions) ──> Docker Build ──> Docker Image (Blueprint)
```

### 3. What is a Docker Container?
A **Docker Container** is a running instance of a Docker Image. If an image is a recipe, the container is the cooked dish.
```text
Docker Image (Blueprint) ──> Docker Run ──> Running Container (Live Process)
```

### 4. What is Docker Compose?
Instead of manually typing long terminal commands to start three separate containers (Frontend, Backend, and PostgreSQL Database) and connect their networks, **Docker Compose** allows you to define and run multi-container applications using a single configuration file: `docker-compose.yml`.

---

## 🏗️ System Architecture

```text
               Windows Host Machine
                        │
                  Docker Compose
                        │
    ┌───────────────────┴───────────────────┐
    │                                       │
┌───▼────────────────┐             ┌────────▼───────────┐
│ Frontend Container │             │ Backend Container  │
│ (React + Vite)     │             │ (FastAPI + Uvicorn)│
│ Port: 5173         │             │ Port: 8000         │
└───┬────────────────┘             └────────┬───────────┘
    │                                       │
    │ (Browser sends API requests)          │ (Internal Docker DNS:
    │                                       │  'postgres:5432')
    ▼                                       ▼
User's Browser                     ┌────────────────────┐
(http://localhost:5173)            │ Database Container │
                                   │ (PostgreSQL 16)    │
                                   │ Port: 5432         │
                                   └────────┬───────────┘
                                            │
                                            ▼
                                   ┌────────────────────┐
                                   │   Docker Volume    │
                                   │  (postgres_data)   │
                                   │ Persistent Storage │
                                   └────────────────────┘
```

---

## 📁 Project Structure

```text
login-fullstack/
├── docker-compose.yml       # Orchestrates frontend, backend, and postgres containers
├── .env.example             # Example environment variables template
├── README.md                # Full documentation and guide
│
├── frontend/                # React + Vite application
│   ├── Dockerfile           # Docker configuration for frontend
│   ├── package.json         # Node.js dependencies
│   ├── vite.config.js       # Vite server host & port configuration
│   ├── index.html           # HTML root
│   └── src/
│       ├── main.jsx         # React application entry point
│       ├── App.jsx          # React Router setup
│       ├── api.js           # Axios API client configured for backend
│       ├── index.css        # Modern, responsive styling
│       ├── components/
│       │   └── ProtectedRoute.jsx  # Route guard checking JWT token
│       └── pages/
│           ├── Signup.jsx   # Signup page (username & password registration)
│           ├── Login.jsx    # Login page (JWT authentication)
│           └── Home.jsx     # Dashboard (displays user info & logout)
│
└── backend/                 # FastAPI application
    ├── Dockerfile           # Docker configuration for backend
    ├── requirements.txt     # Python dependencies
    ├── .env                 # Local backend environment variables
    └── app/
        ├── __init__.py
        ├── main.py          # FastAPI application entry & CORS middleware
        ├── database.py      # SQLAlchemy connection & startup retry logic
        ├── models.py        # Database models (users table)
        ├── schemas.py       # Pydantic validation models
        ├── auth.py          # Bcrypt hashing & JWT token handling
        └── routes/
            ├── __init__.py
            ├── auth.py      # Signup & Login API endpoints
            └── users.py     # Protected /api/users/me endpoint
```

---

## 🚀 Quick Start Instructions

### Prerequisites
Make sure **Docker Desktop** is installed on your Windows machine and running.

### Step 1: Open PowerShell / Command Prompt
Navigate to the project root directory:
```powershell
cd F:\Internship\Docker_1\login-fullstack
```

### Step 2: Build and Start All Containers
Run the single compose command:
```powershell
docker compose up --build
```
> **What happens automatically:**
> 1. PostgreSQL starts and initializes the `login_db` database.
> 2. FastAPI backend builds, connects to PostgreSQL, and auto-creates the `users` table.
> 3. React frontend builds dependencies and starts the Vite development server.

### Step 3: Open the Web Application
Open your browser and visit:
* **Frontend Web App:** [http://localhost:5173](http://localhost:5173)
* **Backend API Docs (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)
* **Backend Health Check:** [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

## 🧪 Testing the Complete Application Flow

1. **Sign Up**:
   * Visit [http://localhost:5173/signup](http://localhost:5173/signup).
   * Enter a username (e.g. `vijay`) and password (e.g. `test123`).
   * Click **Create Account**.
   * You will see a success message and be redirected to the Login page.

2. **Log In**:
   * On [http://localhost:5173/login](http://localhost:5173/login), enter your credentials.
   * Click **Login**.
   * The backend validates the password hash, generates a secure JWT token, and logs you in.

3. **Dashboard (Protected Route)**:
   * You are redirected to `/home`.
   * You will see your username, user ID, registration date, and live connection status.
   * If you try to open `/home` in an incognito window without logging in, the **ProtectedRoute** will automatically redirect you to `/login`.

4. **Log Out**:
   * Click **Logout** on the dashboard.
   * The JWT token is cleared from browser storage and you are returned to `/login`.

---

## 🔍 Database Verification (Inspect PostgreSQL Users)

To verify that the user was actually stored inside the PostgreSQL database inside Docker:

1. Open a new terminal window and run:
```powershell
docker compose exec postgres psql -U postgres -d login_db
```

2. Inside the PostgreSQL prompt, query the `users` table:
```sql
SELECT id, username, password_hash, created_at FROM users;
```

3. Notice that the plain text password (`test123`) is **never stored**. Only the secure bcrypt hash (e.g., `$2b$12$...`) is saved in the database.

4. Type `\q` to exit `psql`:
```sql
\q
```

---

## 🛠️ Useful Docker Commands

| Action | Command |
| :--- | :--- |
| **Build & start all services** | `docker compose up --build` |
| **Start in background (detached)** | `docker compose up --build -d` |
| **View running containers** | `docker compose ps` |
| **View all logs in real-time** | `docker compose logs -f` |
| **View backend logs only** | `docker compose logs backend` |
| **View frontend logs only** | `docker compose logs frontend` |
| **View database logs only** | `docker compose logs postgres` |
| **Stop all containers** | `docker compose down` |
| **Reset database & erase volume** | `docker compose down -v` |

> ⚠️ **Warning regarding `docker compose down -v`:**
> The `-v` flag deletes the Docker named volume (`postgres_data`). This will permanently erase all registered users and database records.

---

## 🔧 Troubleshooting & Common Errors

### 1. Port 5173 or 8000 is already in use
* **Cause:** Another service (like an older node or python process) is using the port.
* **Fix:** Stop existing processes or stop lingering containers:
  ```powershell
  docker compose down
  ```

### 2. "Container already exists" error
* **Fix:** Clean up existing stopped containers:
  ```powershell
  docker compose down --remove-orphans
  ```

### 3. Backend cannot connect to database
* **Check 1:** Ensure PostgreSQL is running (`docker compose ps`).
* **Check 2:** In Docker, backend connects using the service name `postgres` (`DATABASE_URL=postgresql://postgres:postgres123@postgres:5432/login_db`), NOT `localhost`.

### 4. Frontend cannot connect to backend
* **Check 1:** Ensure backend is accessible at [http://localhost:8000/api/health](http://localhost:8000/api/health).
* **Check 2:** In the browser, the frontend calls `http://localhost:8000` because the browser runs on your Windows host machine, not inside the Docker internal network.

### 5. Database data disappeared after restarting
* **Explanation:** If you ran `docker compose down -v`, the `-v` flag removed the persistent volume. For regular restarts, always use `docker compose down` without `-v`.
#   L o g i n - P o r t f o l i o  
 