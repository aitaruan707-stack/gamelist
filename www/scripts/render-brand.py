"""Render the editable SVG brand assets. Requires Python Playwright + Chromium.
Run from any directory: python3 scripts/render-brand.py
The generated PNGs are committed; this is not needed to build or serve the site.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
    for source, target, width, height in [("logo.svg", "logo.png", 512, 512), ("og.svg", "og.png", 1200, 630)]:
        page.set_viewport_size({"width": width, "height": height})
        page.goto((root / "assets" / source).as_uri(), wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        page.evaluate("""([w,h]) => {
            const svg = document.documentElement;
            svg.setAttribute('width', w); svg.setAttribute('height', h);
        }""", [width, height])
        page.screenshot(path=str(root / "assets" / target), omit_background=True)
        print(f"assets/{target} {width}x{height}")
    browser.close()
