$workspace = "c:\Users\abhis\source\repos\loan-emi-calculator"

# Define replacements using Unicode escape sequences to avoid encoding issues
$replacements = @(
    @{old = [char]0xE2 + [char]0x82 + [char]0xB9; new = "₹" }  # â‚¹ -> ₹
    @{old = [char]0xC3 + [char]0xB7; new = "÷" }               # Ã· -> ÷
    @{old = [char]0xC3 + [char]0x97; new = "×" }               # Ã— -> ×
    @{old = [char]0xE2 + [char]0x88 + [char]0x91; new = "−" }  # âˆ' -> −
    @{old = [char]0xE2 + [char]0x80 + [char]0x94; new = "—" }  # â€" -> —
    @{old = [char]0xE2 + [char]0x80 + [char]0x99; new = "'" }  # â€™ -> '
    @{old = [char]0xE2 + [char]0x89 + [char]0x88; new = "≈" }  # â‰ˆ -> ≈
    @{old = [char]0xE2 + [char]0x80 + [char]0xA2; new = "•" }  # â€¢ -> •
    @{old = [char]0xE2 + [char]0x86 + [char]0x92; new = "→" }  # â†' -> →
)

$htmlFiles = @(Get-ChildItem -Path $workspace -Include "*.html" -Recurse -Force)
$filesModified = 0
$totalReplacements = 0

Write-Host "Processing $($htmlFiles.Count) HTML files..." -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
        $originalContent = $content
        $replacementCount = 0
        
        foreach ($rep in $replacements) {
            if ($content.Contains($rep.old)) {
                $content = $content.Replace($rep.old, $rep.new)
                $replacementCount++
            }
        }
        
        if ($content -ne $originalContent) {
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            $filesModified++
            $totalReplacements += $replacementCount
            $relPath = $file.FullName.Substring($workspace.Length).TrimStart("\")
            Write-Host "Fixed: $relPath" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "Error: $($file.FullName) - $_" -ForegroundColor Red
    }
}

Write-Host "`nComplete: Fixed $filesModified files" -ForegroundColor Green
