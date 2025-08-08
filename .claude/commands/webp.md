# WebP

## Convert to WebP

Look at the directory public/assets/images/ and check for images that are not
WebP format.

You can skip any non-image file, files that are already WebP, or GIFs.

SKIP GIFs.

Example:

```bash
magick convert input.png -quality 70 output.webp && rm input.png
```

You can delete the original file after converting to WebP.

When you have finished, show the amounts and percentage of saved space of images
converted.
