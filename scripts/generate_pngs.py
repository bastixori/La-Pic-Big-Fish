import os
import time
import subprocess

def generate_png():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    
    pages = [
        ('carta_fisica_hoja1.svg', 'Carta_BigFish_Hoja1_30x14.5cm.png', 'render_p1.html', 'Carta_BigFish_Hoja1_Izquierda.png'),
        ('carta_fisica_hoja2.svg', 'Carta_BigFish_Hoja2_30x14.5cm.png', 'render_p2.html', 'Carta_BigFish_Hoja2_Derecha.png')
    ]

    for svg_name, png_name, html_name, alt_png_name in pages:
        svg_path = os.path.join(base_dir, 'assets', svg_name)
        with open(svg_path, 'r', encoding='utf-8') as f:
            svg_content = f.read()

        # HTML wrapper for exact dimensions (2900x6000 px for 30cm x 14.5cm print)
        html_content = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Inter:wght@400;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    html, body {{
        width: 2900px;
        height: 6000px;
        background: #060913;
        overflow: hidden;
    }}
    svg {{
        width: 2900px;
        height: 6000px;
        display: block;
    }}
</style>
</head>
<body>
{svg_content}
</body>
</html>"""

        temp_html_path = os.path.join(base_dir, html_name)
        with open(temp_html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)

        out_png_path = os.path.join(base_dir, 'assets', png_name)
        
        cmd = [
            edge_path,
            '--headless=new',
            '--disable-gpu',
            '--hide-scrollbars',
            '--window-size=2900,6000',
            '--force-device-scale-factor=1',
            '--virtual-time-budget=10000',
            '--run-all-compositor-stages-before-draw',
            f'--screenshot={out_png_path}',
            f'file:///{temp_html_path}'
        ]
        
        res = subprocess.run(cmd, capture_output=True, text=True)
        print(f"Generated {png_name} - Exit: {res.returncode}")
        if os.path.exists(out_png_path):
            print(f"  Size: {os.path.getsize(out_png_path)} bytes")
            # Also copy to root folder
            root_png_path = os.path.join(base_dir, png_name)
            with open(out_png_path, 'rb') as rf:
                data = rf.read()
                with open(root_png_path, 'wb') as wf:
                    wf.write(data)
                # Also save alt_png_name in assets
                alt_png_path = os.path.join(base_dir, 'assets', alt_png_name)
                with open(alt_png_path, 'wb') as af:
                    af.write(data)

        # Cleanup temp html
        if os.path.exists(temp_html_path):
            os.remove(temp_html_path)

if __name__ == '__main__':
    generate_png()
