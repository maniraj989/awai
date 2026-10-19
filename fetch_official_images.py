import urllib.request
import re
import os

products = [
    ('ac-silver-wifi', 'https://awainepal.com/product/air-conditioner-2/'),
    ('fan-wall-awacio', 'https://awainepal.com/product/12-high-speed-wall-np-series-aw4001-awai-fan/'),
    ('ac-wifi-bigbody', 'https://awainepal.com/product/1-ton-invoter-with-wifi-big-body/'),
    ('cooler-boss-125l', 'https://awainepal.com/product/135l-boss-commercial-air-cooler/'),
    ('washer-bldc-14kg', 'https://awainepal.com/product/14-kg-washing-machine-with-bldc-motor/'),
    ('fan-table-16inch', 'https://awainepal.com/product/16-table-hi-speed-fan/'),
    ('fan-wall-16inch', 'https://awainepal.com/product/16-wall-fan-hi-speed-india/'),
    ('fan-farata-20inch', 'https://awainepal.com/product/20-farrata-non-moving-heavy/'),
    ('fan-tornado-22inch', 'https://awainepal.com/product/20-tornado-moving-heavy/'),
    ('fan-pedestal-18inch', 'https://awainepal.com/product/18-pedestal-fan-with-timer-china-copper/'),
    ('cooler-flappy-35l', 'https://awainepal.com/product/9873/'),
    ('cooler-phantom-35l', 'https://awainepal.com/product/35-ltr-phantom-cooler/')
]

out_dir = r'd:\awai\public\images\shop'
os.makedirs(out_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for name, url in products:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
        # Try finding og:image first as it gives the direct full-size product image
        og_match = re.search(r'<meta\s+property=[\"\']og:image[\"\']\s+content=[\"\']([^\"\']+)[\"\']', html, re.I)
        img_url = None
        if og_match:
            img_url = og_match.group(1)
        else:
            # Look for wp-post-image
            post_img = re.search(r'class=[\"\'][^\"\']*wp-post-image[^\"\']*[\"\'][^>]+src=[\"\']([^\"\']+)[\"\']', html, re.I)
            if post_img:
                img_url = post_img.group(1)
                
        if not img_url:
            # Fallback search for uploads
            matches = re.findall(r'https?://awainepal\.com/wp-content/uploads/[^\s\"\'\<\>]+\.(?:jpg|jpeg|png|webp)', html)
            if matches:
                img_url = matches[0]
                
        if img_url:
            print(f'Downloading {name} from {img_url}...')
            # Determine extension
            ext = os.path.splitext(img_url.split('?')[0])[1].lower()
            if not ext:
                ext = '.png'
            out_file = os.path.join(out_dir, f'{name}.png')
            
            img_req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(img_req, timeout=15) as img_resp:
                img_data = img_resp.read()
                
            with open(out_file, 'wb') as f:
                f.write(img_data)
            print(f'Successfully saved {name}.png ({len(img_data)} bytes)')
        else:
            print(f'No image URL found for {name}')
    except Exception as e:
        print(f'Error fetching {name}: {e}')

print('Finished fetching official images!')
