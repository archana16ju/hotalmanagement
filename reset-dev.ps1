# reset-dev.ps1 - Clears Next.js cache and restarts dev server

Write-Host "Deleting .next folder..."
if (Test-Path .next) {
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue .next
}

# Force [...slug] detection
$slugPath = "src\app\api\[...slug]"
if (Test-Path $slugPath) {
    Write-Host "Re-naming [...slug] folder to force detection..."
    Rename-Item $slugPath "[...slug]_temp"
    Rename-Item "[...slug]_temp" "[...slug]"
} else {
    Write-Host "[...slug] folder not found!"
}

Write-Host "Starting dev server..."
npm run dev