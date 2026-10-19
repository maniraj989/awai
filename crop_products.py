from PIL import Image
import os

source_path = r'C:\Users\Dell\.gemini\antigravity-ide\brain\a09439e3-bafd-4651-b146-f3f58a2da82b\.user_uploaded\media_1792438077133.png'
im = Image.open(source_path)
out_dir = r'd:\awai\public\images\shop'
os.makedirs(out_dir, exist_ok=True)

# Product grid coordinates in 427x577 image
cols = [(119, 214), (218, 313), (317, 412)]
rows = [
    (107, 168), # Row 1
    (212, 274), # Row 2
    (317, 378), # Row 3
    (422, 483)  # Row 4
]

product_names = [
    'ac-silver-wifi', 'fan-wall-awacio', 'ac-wifi-bigbody',
    'cooler-boss-125l', 'washer-bldc-14kg', 'fan-table-16inch',
    'fan-wall-16inch', 'fan-farata-20inch', 'fan-tornado-22inch',
    'fan-pedestal-18inch', 'cooler-flappy-35l', 'cooler-phantom-35l'
]

idx = 0
for r_idx, (y1, y2) in enumerate(rows):
    for c_idx, (x1, x2) in enumerate(cols):
        # Crop product image
        p_img = im.crop((x1 + 4, y1 + 2, x2 - 4, y2 - 2))
        # Upscale with LANCZOS to 300px for crisp high-resolution display
        aspect = p_img.width / p_img.height
        target_w = 320
        target_h = int(target_w / aspect)
        upscaled = p_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        fname = os.path.join(out_dir, f'{product_names[idx]}.png')
        upscaled.save(fname)
        print(f'Saved {product_names[idx]}: {upscaled.size}')
        idx += 1

# Top rated sidebar products:
# 1. Exhaust fan: x ~ 48 to 102, y ~ 362 to 392
# 2. Gas stove: x ~ 48 to 102, y ~ 410 to 438
# 3. AC normal: x ~ 48 to 102, y ~ 455 to 482
top_rated = [
    ('sidebar-exhaust-fan', (52, 362, 98, 394)),
    ('sidebar-gas-stove', (48, 410, 102, 436)),
    ('sidebar-ac-normal', (48, 456, 102, 478))
]

for name, (tx1, ty1, tx2, ty2) in top_rated:
    t_img = im.crop((tx1, ty1, tx2, ty2))
    t_aspect = t_img.width / t_img.height
    t_w = 120
    t_h = int(t_w / t_aspect)
    t_upscaled = t_img.resize((t_w, t_h), Image.Resampling.LANCZOS)
    t_fname = os.path.join(out_dir, f'{name}.png')
    t_upscaled.save(t_fname)
    print(f'Saved {name}: {t_upscaled.size}')

print('All 12 shop products and 3 sidebar thumbnails extracted successfully!')
