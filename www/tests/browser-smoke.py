"""Browser regression for catalogue discovery and responsive templates.
Requires Python Playwright + Chromium and the static preview server.
Run: python3 tests/browser-smoke.py --url http://localhost:8125
"""
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://localhost:8125')
parser.add_argument('--screenshots', default='/tmp/zupilo-qa')
args = parser.parse_args()
shots = Path(args.screenshots); shots.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1040})
    # Keep preview QA out of live analytics. The inline tag and event queue still run.
    context.route('https://**/*', lambda route: route.fulfill(status=200, body=''))
    page = context.new_page(); errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(args.url, wait_until='networkidle'); page.evaluate('document.fonts.ready')
    expect(page.locator('#all-grid .card')).to_have_count(20)
    expect(page.locator('#recent')).to_be_hidden()
    expect(page.locator('[rel=canonical]')).to_have_attribute('href', 'https://www.zupilo.net/')
    assert page.evaluate("Array.from(dataLayer).filter(x=>x[0]==='config' && x[1]==='G-XJVV1PM7D5').length") == 1
    page.screenshot(path=str(shots / 'desktop-home.png'))
    page.screenshot(path=str(shots / 'desktop-full.png'), full_page=True)

    # Search by title/tag, navigate suggestions using the keyboard, clear and recover.
    search = page.get_by_role('combobox', name='Search games')
    search.fill('mahjong'); expect(page.locator('#search-results a')).to_have_count(1)
    search.press('ArrowDown'); expect(search).to_have_attribute('aria-activedescendant', 'search-game-0')
    search.press('Escape'); expect(search).to_have_attribute('aria-expanded', 'false')
    search.fill('no-such-game-xyz'); expect(page.locator('#search-results')).to_contain_text('No games found')
    page.get_by_role('button', name='Clear search').click(); expect(search).to_have_value('')
    search.press('Enter'); assert page.url.rstrip('/') == args.url.rstrip('/'), 'Blank search must not open an old suggestion'

    # Counts, pressed states and sorting agree with the actual catalogue.
    page.locator('[data-cat=action]').click(); expect(page.locator('#all-grid .card')).to_have_count(4)
    expect(page.locator('[data-cat=action]')).to_have_attribute('aria-pressed', 'true')
    page.locator('[data-cat=arcade]').click(); expect(page.locator('#all-grid .card')).to_have_count(2)
    page.locator('[data-cat=puzzle]').click(); expect(page.locator('#all-grid .card')).to_have_count(14)
    page.locator('[data-cat=all]').click()
    page.locator('#game-sort').select_option('az')
    expect(page.locator('#all-grid .card').first).to_have_attribute('data-slug', 'acestrike')
    page.locator('#game-sort').select_option('newest')
    expect(page.locator('#all-grid .card').first).to_have_attribute('data-slug', 'lihuadoku')
    page.locator('#game-sort').select_option('picks')

    # Saving, reloading and removing favorites updates every copy of the card.
    favorite = page.locator('#all-grid [data-card-fav=lihuadoku]')
    favorite.focus(); favorite.click(); expect(favorite).to_have_attribute('aria-pressed', 'true')
    expect(page.locator('#fav-grid .card')).to_have_count(1)
    page.reload(wait_until='networkidle'); expect(page.locator('#fav-grid .card')).to_have_count(1)
    page.locator('#fav-grid [data-card-fav=lihuadoku]').click()
    expect(page.locator('#fav-empty')).to_be_visible()
    expect(page.locator('#all-grid [data-card-fav=lihuadoku]')).to_have_attribute('aria-pressed', 'false')

    # All main page types use the same search catalogue; detail opens the real game engine.
    for path in ['/c/action.html', '/t/sort.html', '/guides/sorting-puzzles.html', '/about.html', '/404.html']:
        page.goto(args.url + path, wait_until='networkidle')
        search = page.get_by_role('combobox', name='Search games')
        search.fill('mahjong'); expect(page.locator('#search-results a')).to_have_count(1)
        assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), path
    page.goto(args.url + '/hyper-feed/lihuadoku/game.html', wait_until='domcontentloaded')
    expect(page.locator('[data-fav]')).to_have_attribute('aria-pressed', 'false')
    frame = page.frame_locator('.phone-frame iframe')
    expect(frame.locator('canvas').first).to_be_visible(timeout=30000)
    expect(frame.locator('#brand-loading-cover')).to_be_hidden(timeout=30000)
    assert page.locator('.phone-frame').bounding_box()['width'] >= 250
    assert page.evaluate("Array.from(dataLayer).some(x=>x[0]==='event' && x[1]==='game_open')")
    page.screenshot(path=str(shots / 'desktop-game.png'))
    page.goto(args.url, wait_until='networkidle')
    expect(page.locator('#continue-grid .card')).to_have_count(1)

    # Fresh mobile visit, tap targets, search overlay and navigation.
    mobile = browser.new_context(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True)
    mobile.route('https://**/*', lambda route: route.fulfill(status=200, body=''))
    phone = mobile.new_page(); phone.on('pageerror', lambda error: errors.append(str(error)))
    phone.goto(args.url, wait_until='networkidle'); phone.evaluate('document.fonts.ready')
    phone.screenshot(path=str(shots / 'mobile-home.png'))
    phone.screenshot(path=str(shots / 'mobile-full.png'), full_page=True)
    expect(phone.locator('.bottomnav')).to_be_visible()
    phone.get_by_role('button', name='Open search').click()
    phone.get_by_role('combobox', name='Search games').fill('water')
    expect(phone.locator('#search-results a')).to_have_count(1)
    phone.get_by_role('combobox', name='Search games').press('ArrowDown')
    phone.get_by_role('combobox', name='Search games').press('Enter')
    phone.wait_for_url('**/hyper-feed/**/game.html')
    expect(phone.locator('.bottomnav')).to_be_visible()
    game_box = phone.locator('.phone-frame').bounding_box()
    nav_box = phone.locator('.bottomnav').bounding_box()
    assert game_box['y'] + game_box['height'] <= nav_box['y'], 'Mobile game must stay above the fixed navigation'
    phone.goto(args.url + '/#recent', wait_until='networkidle')
    expect(phone.locator('#recent')).to_be_visible()

    # Breakpoints include small phones, tablet and a wide desktop.
    for width in [320, 360, 390, 768, 1024, 1280, 1920]:
        page.set_viewport_size({'width':width,'height':900})
        page.goto(args.url, wait_until='networkidle')
        assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), f'Overflow at {width}'
    # Malformed local storage cannot break the site or the catalogue.
    page.evaluate("localStorage.setItem('tapzens:favorites', '{}'); localStorage.setItem('tapzens:recent', 'invalid')")
    page.reload(wait_until='networkidle'); expect(page.locator('#all-grid .card')).to_have_count(20)
    assert not errors, errors
    print('Passed: search keyboard flow, 3 category filters, 3 sort modes, favorite persistence/removal, real game canvas, recent games, analytics queue, all page templates, mobile navigation, 7 breakpoints, malformed storage.')
    print('Screenshots:', shots)
    browser.close()
