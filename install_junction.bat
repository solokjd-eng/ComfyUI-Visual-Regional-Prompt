@echo off
chcp 65001 > nul
echo ========================================================
echo   ComfyUI Visual Regional Prompt - 정션(Junction) 연결
echo ========================================================
echo.

set "TARGET_DIR=D:\utill\AI\Data\Packages\ComfyUI_new\custom_nodes\ComfyUI-Visual-Regional-Prompt"
set "SOURCE_DIR=%~dp0"
set "SOURCE_DIR=%SOURCE_DIR:~0,-1%"

echo [원본 폴더]: %SOURCE_DIR%
echo [연결 대상]: %TARGET_DIR%
echo.

if exist "%TARGET_DIR%" (
    echo 이미 대상 폴더/정션이 존재합니다.
    echo 기존 연결을 제거하고 다시 생성합니다...
    rmdir "%TARGET_DIR%" 2>nul
)

mklink /J "%TARGET_DIR%" "%SOURCE_DIR%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo [성공] 정션이 성공적으로 생성되었습니다!
    echo ComfyUI를 실행/새로고침하시면 노드를 사용하실 수 있습니다.
    echo ========================================================
) else (
    echo.
    echo [오류] 정션 생성에 실패했습니다. 경로를 확인해 주세요.
)

echo.
pause
