from PIL import Image
import colorsys

def process_logo():
    img = Image.open('src/assets/mylogo.png').convert('RGBA')
    data = img.getdata()

    new_data = []
    for r, g, b, a in data:
        if a == 0:
            new_data.append((r, g, b, a))
            continue
        
        # Convert RGB to HSV
        h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
        
        # If the pixel is mostly white/gray (low saturation) and bright (high value)
        if s < 0.25 and v > 0.4:
            # Invert the brightness to make it dark, giving it a slight dark-blue/gray tint
            new_r = 255 - r + 17
            new_g = 255 - g + 24
            new_b = 255 - b + 39
            
            # Clamp values
            new_r = max(0, min(255, int(new_r)))
            new_g = max(0, min(255, int(new_g)))
            new_b = max(0, min(255, int(new_b)))
            
            new_data.append((new_r, new_g, new_b, a))
        else:
            # Keep original colors (like the blue gradient) exactly the same
            new_data.append((r, g, b, a))

    img.putdata(new_data)
    img.save('src/assets/mylogo-light.png')
    print("Success: Generated mylogo-light.png")

if __name__ == "__main__":
    process_logo()
