$workspace = "c:\Users\abhis\source\repos\loan-emi-calculator"
$replacements = @{
    "â‚¹" = "₹"
    "Ã·" = "÷"
    "Ã—" = "×"
    "âˆ'" = "−"
    "â€"" = "—"
    "â€™" = "'"
    "â‰ˆ" = "≈"
    "â€¢" = "•"
    "â†'" = "→"
}

$htmlFiles = Get-ChildItem -Path $workspace -Filter "*.html" -Recurse -Force
$filesModified = 0
$totalReplacements = 0

Write-Host "Processing $($htmlFiles.Count) HTML files...`n" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $originalContent = $content
    $replacementCount = 0
    
    foreach ($old in $replacements.Keys) {
        $count = ([regex]::Matches($content, [regex]::Escape($old))).Count
        if ($count -gt 0) {
            $content = $content.Replace($old, $replacements[$old])
            $replacementCount += $count
        }
    }
    
    if ($content -ne $originalContent) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $filesModified++
        $totalReplacements += $replacementCount
        $relPath = $file.FullName.Replace($workspace, "").TrimStart("\")
        Write-Host "✓ Fixed $relPath ($replacementCount replacements)" -ForegroundColor Green
    }
}

Write-Host "`n✓ Complete: Fixed $filesModified files with $totalReplacements total replacements" -ForegroundColor Green
