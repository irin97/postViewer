@echo off
echo ==========================================
echo      Building Sipspeak Panel...
echo ==========================================
call npm install
call npm run build
echo ==========================================
echo      Build finished successfully!
echo ==========================================
pause