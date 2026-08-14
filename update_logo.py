import os

files = [
    "src/app/layout.tsx",
    "src/app/(marketing)/services/page.tsx",
    "src/app/(marketing)/uses/page.tsx",
    "src/app/(blog)/blog/[slug]/page.tsx",
    "src/app/(blog)/essays/[slug]/page.tsx",
    "src/app/ne/blog/[slug]/page.tsx",
    "src/assets/index.ts"
]

for f in files:
    if os.path.exists(f):
        with open(f, 'r') as file:
            content = file.read()
        content = content.replace("mylogo.png", "mylogo.webp")
        with open(f, 'w') as file:
            file.write(content)
        print(f"Updated {f}")
    else:
        print(f"File not found: {f}")
