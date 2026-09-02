@echo off
title Visual Grid Prompt Studio
cd /d "%~dp0"
echo ========================================================
echo   📐 Visual Grid Prompt Studio (Web Version)
echo   Starting local web server on http://localhost:8080 ...
echo ========================================================
start "" "http://localhost:8080"
python -m http.server 8080
pause
