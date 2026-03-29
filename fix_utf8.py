#!/usr/bin/env python3
"""Fix UTF-8 character encoding corruption across all HTML files"""
import os
import glob

workspace = r"c:\Users\abhis\source\repos\loan-emi-calculator"
replacements = {
    "â‚¹": "₹",
    "Ã·": "÷",
    "Ã—": "×",
    "âˆ'": "−",
    "â€"": "—",
    "â€™": "'",
    "â‰ˆ": "≈",
    "â€¢": "•",
    "â†'": "→",
}

html_files = glob.glob(os.path.join(workspace, "**", "*.html"), recursive=True)
files_modified = 0
total_replacements = 0

print(f"Processing {len(html_files)} HTML files...\n")

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        replacement_count = 0
        for old, new in replacements.items():
            old_count = content.count(old)
            if old_count > 0:
                content = content.replace(old, new)
                replacement_count += old_count
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            files_modified += 1
            total_replacements += replacement_count
            rel_path = os.path.relpath(filepath, workspace)
            print(f"✓ Fixed {rel_path} ({replacement_count} replacements)")
    except Exception as e:
        print(f"✗ Error in {filepath}: {e}")

print(f"\n✓ Complete: Fixed {files_modified} files with {total_replacements} total replacements")
