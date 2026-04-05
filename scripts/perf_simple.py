#!/usr/bin/env python3
"""Simple mobile perf test — 390px viewport, throttled."""
import time
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "https://www.82labs.io"

with sync_playwright() as p:
    browser = p.chromium.launch()
    # Use emulation closer to real mobile
    iphone = p.devices['iPhone 13']
    context = browser.new_context(**iphone)
    page = context.new_page()
    client = page.context.new_cdp_session(page)
    client.send('Network.emulateNetworkConditions', {
        'offline': False,
        'downloadThroughput': 1.5 * 1024 * 1024 / 8,
        'uploadThroughput': 750 * 1024 / 8,
        'latency': 300,
    })
    client.send('Emulation.setCPUThrottlingRate', {'rate': 4})

    t0 = time.time()
    page.goto(URL, wait_until='commit', timeout=60000)

    for target_ms, name in [(400, '400ms'), (800, '800ms'), (1500, '1500ms'), (3000, '3s')]:
        while (time.time() - t0) * 1000 < target_ms:
            time.sleep(0.02)
        page.screenshot(path=f'/tmp/sim_{name}.png')

    page.wait_for_load_state('load', timeout=60000)
    print(f"Load: {(time.time()-t0)*1000:.0f}ms")

    metrics = page.evaluate("""() => {
        const t = performance.getEntriesByType('paint');
        const fp = t.find(x => x.name === 'first-paint');
        const fcp = t.find(x => x.name === 'first-contentful-paint');
        const lcpE = performance.getEntriesByType('largest-contentful-paint');
        return {fp: fp?.startTime, fcp: fcp?.startTime, lcp: lcpE.length ? lcpE[lcpE.length-1].startTime : null};
    }""")
    print(f"FP: {metrics.get('fp'):.0f}ms  FCP: {metrics.get('fcp'):.0f}ms  LCP: {metrics.get('lcp', 0) or 0:.0f}ms")

    browser.close()
