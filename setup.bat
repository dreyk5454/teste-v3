@echo off
REM Multi Lives - Setup Script for Windows

echo.
echo 4C6D 4C69766573 202D 20536574 7570 20536372 6970 7420666F 7220 5769 6E64 6F77 73
echo ====================================================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker not installed. Please install Docker Desktop.
    exit /b 1
)

echo OK: Docker found

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker Compose not installed.
    exit /b 1
)

echo OK: Docker Compose found

echo.
set /p start="Start services with Docker Compose? (y/n) "

if /i "%start%"=="y" (
    echo.
    echo Starting services...
    docker-compose up --build
) else (
    echo.
    echo Manual Setup:
    echo.
    echo Backend:
    echo   cd backend
    echo   npm install
    echo   copy .env.example .env
    echo   npm run start:dev
    echo.
    echo Frontend:
    echo   cd frontend
    echo   npm install
    echo   copy .env.example .env.local
    echo   npm run dev
    echo.
    echo Access:
    echo   Frontend: http://localhost:3000
    echo   Backend: http://localhost:3000
)
