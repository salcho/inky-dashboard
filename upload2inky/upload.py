#!/usr/bin/env python3

import sys
from PIL import Image
from inky.auto import auto

inky = auto(ask_user=True, verbose=True)

if len(sys.argv) == 1:
    print("""
Usage: {file} image-file
""".format(file=sys.argv[0]))
    sys.exit(1)

image = Image.open(sys.argv[1])
resized = image.resize(inky.resolution)

inky.set_image(resized, saturation=0.1)
inky.show()
