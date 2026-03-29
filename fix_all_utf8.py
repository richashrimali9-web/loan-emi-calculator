import os, re, glob

workspace = r"C:\Users\abhis\source\repos\loan-emi-calculator"
files = sorted(glob.glob(os.path.join(workspace, "**", "*.html"), recursive=True))
changed = []

# replacement map
repls = {
    "Ã—": "×", "Ã·": "÷", "âˆ'": "−", "â€\"": "—", "â€™": "'", "â€˜": "'",
    "â€œ": '"', "â€": '"', "â‚¹": '₹', "â‰ˆ": '≈', "Â·": '·',
    "ðŸ\"Š": '📊', "ðŸ'°": '💰', "ðŸ\"ˆ": '📈', "ðŸ§®": '🧮', "ðŸ¦": '🏦'
}

for fp in files:
    with open(fp, 'r', encoding='utf-8', errors='replace') as f:
        txt = f.read()
    orig = txt

    # Step 1: ensure charset first in <head>
    mhead = re.search(r'<head[^>]*>', txt, flags=re.I)
    mclose = re.search(r'</head>', txt, flags=re.I)
    if mhead and mclose:
        head_start = mhead.end()
        head_end = mclose.start()
        head_content = txt[head_start:head_end]

        m_charset = re.search(r'<meta\s+charset\s*=\s*(["\']?)utf-8\1\s*/?>', head_content, flags=re.I)
        if m_charset:
            # if charset is not at first non-space position
            prefix = head_content[:m_charset.start()]
            if re.search(r'\S', prefix):
                # move it
                meta_tag = m_charset.group(0)
                rest = (head_content[:m_charset.start()] + head_content[m_charset.end():]).lstrip('\n\r')
                txt = txt[:head_start] + '\n  ' + meta_tag + '\n' + rest + txt[head_end:]
        else:
            # insert if missing
            txt = txt[:head_start] + '\n  <meta charset="UTF-8">\n' + head_content + txt[head_end:]

    # Step 2: replacements
    for old, new in repls.items():
        if old in txt:
            txt = txt.replace(old, new)

    # Optional: do not replace stray 'ðŸ' globally - keep only known mapping.  
    # no generic ðŸ change.

    if txt != orig:
        with open(fp, 'w', encoding='utf-8', newline='\n') as f:
            f.write(txt)
        changed.append(fp)

changed = sorted(set(changed))
print(f"Processed {len(files)} HTML files.")
print(f"Modified {len(changed)} files:")
for c in changed:
    print(c)

# Step 3: verify priority files exist and are in changed list
priority = [
    os.path.join(workspace, 'index.html'),
    os.path.join(workspace, 'about', 'index.html'),
    os.path.join(workspace, 'blog', 'index.html'),
    os.path.join(workspace, 'guides', 'index.html'),
    os.path.join(workspace, 'contact', 'index.html')
]
print('\nPriority file check:')
for p in priority:
    status = 'FOUND' if os.path.exists(p) else 'MISSING'
    modified = 'modified' if p in changed else 'unchanged'
    print(f"{p}: {status}, {modified}")
