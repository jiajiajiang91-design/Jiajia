@echo off
cd /d "%~dp0"
set "URL=http://127.0.0.1:8765/Barking%%20Reach%%20Timeline%%203D.html"
set "BUNDLED_PY=C:\Users\jiang\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if exist "%BUNDLED_PY%" (
  start "Programming Decay local server" /min "%BUNDLED_PY%" -m http.server 8765 --bind 127.0.0.1
) else (
  start "Programming Decay local server" /min python -m http.server 8765 --bind 127.0.0.1
)

timeout /t 2 >nul
start "" "%URL%"
