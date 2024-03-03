@echo off

echo Starting phonebook json-server...
start cmd /k npm run server

echo Starting react vite frontend environment...
start cmd /k npm run dev

echo Waiting for servers to start...

timeout /t 10

echo Opening Chrome in incognito mode...
start "" chrome.exe --incognito "http://localhost:5173"

echo Batch file execution complete.
pause
