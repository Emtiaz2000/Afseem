from rembg import remove, new_session
from PIL import Image, ImageEnhance, ImageOps
import sys

# -----------------------------
# CONFIG: choose the right model
# Options:
# "u2net" -> general objects (default)
# "u2netp" -> faster, less accurate
# "u2net_human_seg" -> for humans
# "silueta" -> best for products / simple objects
MODEL_NAME = "silueta"  

# Alpha matting settings (tweak as needed)
ALPHA_MATTING = True
FOREGROUND_THRESHOLD = 240
BACKGROUND_THRESHOLD = 10
ERODE_SIZE = 5

# Optional: contrast enhancement
CONTRAST_ENHANCE = True
CONTRAST_FACTOR = 1.2  # 1.0 = no change, >1 increases contrast

# Create session once
session = new_session(MODEL_NAME)
# -----------------------------

def remove_bg(input_path, output_path):
    try:
        inp = Image.open(input_path)

        # Fix orientation using EXIF data
        inp = ImageOps.exif_transpose(inp)

        # Convert to RGB if not already
        if inp.mode != "RGB":
            inp = inp.convert("RGB")

        # Optional: enhance contrast
        if CONTRAST_ENHANCE:
            enhancer = ImageEnhance.Contrast(inp)
            inp = enhancer.enhance(CONTRAST_FACTOR)

        # Remove background with alpha matting
        output = remove(
            inp,
            session=session,
            alpha_matting=ALPHA_MATTING,
            alpha_matting_foreground_threshold=FOREGROUND_THRESHOLD,
            alpha_matting_background_threshold=BACKGROUND_THRESHOLD,
            alpha_matting_erode_size=ERODE_SIZE
        )

        # Save output as PNG
        output.save(output_path, format="PNG")
        print(f"{output_path}")

    except Exception as e:
        print(f"ERROR: {str(e)}")

# Run from command line
if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    remove_bg(input_file, output_file)
