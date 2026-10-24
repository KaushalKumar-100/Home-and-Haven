$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$envFile = Join-Path $repoRoot "automation\.env"
if (-not (Test-Path $envFile)) {
    throw "Missing automation\.env. Copy automation\.env.example to automation\.env and fill it in locally. Never commit the real .env file."
}

$venvPython = Join-Path $repoRoot ".venv\Scripts\python.exe"
if (Test-Path $venvPython) {
    $python = $venvPython
} else {
    $python = "python"
}

& $python -m automation.bot.telegram_bot
