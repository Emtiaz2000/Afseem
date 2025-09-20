from rembg import remove
from PIL import Image
import sys
import os

def remove_bg(input_path, output_path):
    try:
        inp = Image.open(input_path)
        output = remove(inp)
        output.save(output_path, format="PNG")
        print(output_path)  # Send file path back
    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    remove_bg(input_file, output_file)