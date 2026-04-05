#!/usr/bin/env python3
"""Mobile performance measurement with CDP throttling."""
import time
import json
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "https://www.82labs.io"
LABEL = sys.argv[2] if len(sys.argv) > 2 else "before"

def measure():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            device_scale_factor=3,
            is_mobile=True,
            has_touch=True,
        )
        page = context.new_page()
        client = page.context.new_cdp_session(page)
        client.send('Network.emulateNetworkConditions', {
            'offline': False,
            'downloadThroughput': 1.5 * 1024 * 1024 / 8,
            'uploadThroughput': 750 * 1024 / 8,
            'latency': 300,
        })
        client.send('Emulation.setCPUThrottlingRate', {'rate': 4})

        requests = []
        def on_request(req):
            requests.append({
                'url': req.url,
                'method': req.method,
                'resource_type': req.resource_type,
                'start': time.time(),
            })
        def on_response(resp):
            for r in requests:
                if r['url'] == resp.url and 'status' not in r:
                    r['status'] = resp.status
                    try:
                        body = resp.body()
                        r['size'] = len(body)
                    except Exception:
                        r['size'] = 0
                    r['end'] = time.time()
                    break
        page.on('request', on_request)
        page.on('response', on_response)

        t0 = time.time()
        screenshots_taken = {}
        def take(name):
            try:
                page.screenshot(path=f'/tmp/shot_{LABEL}_{name}.png', full_page=False)
                screenshots_taken[name] = time.time() - t0
            except Exception as e:
                print(f"  Screenshot {name} failed: {e}")

        try:
            page.goto(URL, wait_until='commit', timeout=60000)
        except Exception as e:
            print(f"goto commit: {e}")

        for target_ms, name in [(300, '300ms'), (600, '600ms'), (1000, '1s'), (2000, '2s'), (3000, '3s'), (5000, '5s')]:
            while (time.time() - t0) * 1000 < target_ms:
                time.sleep(0.02)
            take(name)

        try:
            page.wait_for_load_state('load', timeout=60000)
        except Exception as e:
            print(f"wait load: {e}")
        load_time = time.time() - t0
        take('load')

        try:
            page.wait_for_load_state('networkidle', timeout=30000)
        except Exception:
            pass
        nid_time = time.time() - t0

        metrics = page.evaluate("""() => {
            const t = performance.getEntriesByType('paint');
            const nav = performance.getEntriesByType('navigation')[0];
            const fp = t.find(x => x.name === 'first-paint');
            const fcp = t.find(x => x.name === 'first-contentful-paint');
            let lcp = null;
            const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
            if (lcpEntries.length) lcp = lcpEntries[lcpEntries.length - 1].startTime;
            return {
                firstPaint: fp ? fp.startTime : null,
                firstContentfulPaint: fcp ? fcp.startTime : null,
                largestContentfulPaint: lcp,
                domContentLoaded: nav ? nav.domContentLoadedEventEnd : null,
                loadEventEnd: nav ? nav.loadEventEnd : null,
                transferSize: nav ? nav.transferSize : null,
                encodedBodySize: nav ? nav.encodedBodySize : null,
                decodedBodySize: nav ? nav.decodedBodySize : null,
            };
        }""")

        print(f"\n=== {LABEL.upper()} — {URL} ===")
        print(f"Load event: {load_time*1000:.0f}ms | NetworkIdle: {nid_time*1000:.0f}ms")
        if metrics.get('firstPaint'):
            print(f"First Paint (FP):  {metrics['firstPaint']:.0f}ms")
        if metrics.get('firstContentfulPaint'):
            print(f"First Contentful (FCP): {metrics['firstContentfulPaint']:.0f}ms")
        if metrics.get('largestContentfulPaint'):
            print(f"Largest Contentful (LCP): {metrics['largestContentfulPaint']:.0f}ms")
        if metrics.get('domContentLoaded'):
            print(f"DOMContentLoaded: {metrics['domContentLoaded']:.0f}ms")
        if metrics.get('transferSize'):
            print(f"Transfer total: {metrics.get('transferSize', 0)/1024:.1f}KB encoded, {metrics.get('decodedBodySize', 0)/1024:.1f}KB decoded")

        print("\n-- Screenshots taken at --")
        for k, v in screenshots_taken.items():
            print(f"  {k}: {v*1000:.0f}ms -> /tmp/shot_{LABEL}_{k}.png")

        print("\n-- Request waterfall (top 30 by duration) --")
        for r in requests:
            if 'end' in r:
                r['dur_ms'] = (r['end'] - r['start']) * 1000
                r['offset_ms'] = (r['start'] - t0) * 1000
            else:
                r['dur_ms'] = -1
                r['offset_ms'] = (r['start'] - t0) * 1000
        requests_sorted = sorted(requests, key=lambda x: x.get('dur_ms', 0), reverse=True)
        for r in requests_sorted[:30]:
            url_short = r['url'].replace('https://www.82labs.io', '').replace('https://82labs.io', '')
            if len(url_short) > 70:
                url_short = url_short[:30] + '...' + url_short[-30:]
            size_k = r.get('size', 0) / 1024
            print(f"  [+{r['offset_ms']:6.0f}ms] {r['dur_ms']:6.0f}ms  {size_k:6.1f}KB  {r['resource_type']:10s}  {url_short}")

        print("\n-- Request waterfall (first 20 chronological) --")
        requests_chrono = sorted(requests, key=lambda x: x.get('offset_ms', 0))
        for r in requests_chrono[:20]:
            url_short = r['url'].replace('https://www.82labs.io', '').replace('https://82labs.io', '')
            if len(url_short) > 70:
                url_short = url_short[:30] + '...' + url_short[-30:]
            size_k = r.get('size', 0) / 1024
            print(f"  [+{r['offset_ms']:6.0f}ms] {r['dur_ms']:6.0f}ms  {size_k:6.1f}KB  {r['resource_type']:10s}  {url_short}")

        with open(f'/tmp/perf_{LABEL}.json', 'w') as f:
            json.dump({
                'url': URL,
                'label': LABEL,
                'metrics': metrics,
                'load_ms': load_time * 1000,
                'networkidle_ms': nid_time * 1000,
                'screenshots': screenshots_taken,
                'requests': requests,
            }, f, indent=2, default=str)

        browser.close()

if __name__ == '__main__':
    measure()
