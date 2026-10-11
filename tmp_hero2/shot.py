import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width':1440,'height':900})
        errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('http://localhost:8080/index.html', wait_until='domcontentloaded')
        await pg.wait_for_timeout(4500)
        await pg.screenshot(path='/home/user/tmp_hero2/hero.png')
        await pg.evaluate("document.getElementById('diagnostico').scrollIntoView()")
        await pg.wait_for_timeout(800)
        await pg.screenshot(path='/home/user/tmp_hero2/diag.png')
        pg2 = await b.new_page(viewport={'width':390,'height':844})
        await pg2.goto('http://localhost:8080/index.html', wait_until='domcontentloaded')
        await pg2.wait_for_timeout(4500)
        await pg2.screenshot(path='/home/user/tmp_hero2/mob.png')
        print('errors', errs)
        await b.close()
asyncio.run(main())
