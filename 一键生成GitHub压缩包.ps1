$ErrorActionPreference = 'Stop'

$sourceRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$zipPath = Join-Path $sourceRoot 'NEXT-EPISODE-GitHub.zip'

$excludedDirectories = @(
  '.git',
  'node_modules',
  '.pnpm-store',
  '.swc',
  'dist',
  'preview-h5',
  'work'
)

$excludedFiles = @(
  'project.private.config.json',
  'NEXT-EPISODE-GitHub.zip',
  '一键生成GitHub压缩包.ps1',
  '一键生成GitHub压缩包.cmd'
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

$archive = [System.IO.Compression.ZipFile]::Open(
  $zipPath,
  [System.IO.Compression.ZipArchiveMode]::Create
)

function Add-SourceDirectory {
  param([string]$directoryPath)

  Get-ChildItem -LiteralPath $directoryPath -File -ErrorAction SilentlyContinue | ForEach-Object {
    $file = $_
    $relativePath = $file.FullName.Substring($sourceRoot.Length + 1)
    $skipFile = ($excludedFiles -contains $file.Name) -or
      $file.Name.EndsWith('.log') -or
      $file.Name.StartsWith('.env') -or
      ($file.DirectoryName -eq $sourceRoot -and $file.Name.StartsWith('Codex 图像'))

    if (-not $skipFile) {
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $archive,
        $file.FullName,
        ($relativePath -replace '\\', '/'),
        [System.IO.Compression.CompressionLevel]::Optimal
      ) | Out-Null
    }
  }

  Get-ChildItem -LiteralPath $directoryPath -Directory -ErrorAction SilentlyContinue |
    Where-Object { $excludedDirectories -notcontains $_.Name } |
    ForEach-Object { Add-SourceDirectory -directoryPath $_.FullName }
}

try {
  Add-SourceDirectory -directoryPath $sourceRoot
}
finally {
  $archive.Dispose()
}

$sizeMb = [Math]::Round((Get-Item -LiteralPath $zipPath).Length / 1MB, 2)
Write-Host ''
Write-Host 'GitHub upload package created:' -ForegroundColor Green
Write-Host $zipPath -ForegroundColor Cyan
Write-Host "Size: $sizeMb MB"
Write-Host ''
Read-Host 'Press Enter to close'
