@echo off
chcp 65001 >nul
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0一键生成GitHub压缩包.ps1"
if errorlevel 1 (
  echo.
  echo 打包失败，请把本窗口的错误截图发给 Codex。
  pause
)
