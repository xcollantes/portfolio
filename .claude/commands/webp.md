# WebP

## Convert to WebP

Look at the directory public/assets/images/ and check for images that are not
WebP format.

You can skip any non-image file, files that are already WebP, or GIFs.

Example:

```bash
cwebp -q 70 input.png -o output.webp && rm input.png
```
