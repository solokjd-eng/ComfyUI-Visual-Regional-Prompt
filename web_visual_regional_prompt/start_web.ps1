Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  📐 Visual Grid Prompt Studio (Web Version) Starting..." -ForegroundColor Green
Write-Host "  http://localhost:8080 에서 웹 앱이 열립니다." -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan

$serverProcess = Start-Process python -ArgumentList "-m http.server 8080 --directory `"$PSScriptRoot`"" -PassThru
Start-Sleep -Seconds 1
Start-Process "http://localhost:8080"

Write-Host "서버가 실행 중입니다. 종료하려면 이 창을 닫으세요." -ForegroundColor Gray
$serverProcess.WaitForExit()
