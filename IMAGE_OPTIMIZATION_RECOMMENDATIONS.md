# Image Optimization Recommendations

This document outlines recommendations for optimizing images on the GangotriEBS website to improve performance.

## Current Large Images

The following images are currently quite large and should be optimized:

### School Gallery Images (2.7MB - 4.2MB each)
- `assets/img/School1.jpg` - 3.8MB
- `assets/img/School2.jpg` - 3.2MB
- `assets/img/School3.jpg` - 2.7MB
- `assets/img/School4.jpg` - 4.2MB

### Faculty Images
- `assets/img/MD.JPG` - 1.1MB

## Recommended Actions

### 1. Compress Existing Images

Use image optimization tools to reduce file sizes without significantly affecting quality:

**Online Tools:**
- [TinyPNG](https://tinypng.com/) - Free online compression
- [Squoosh](https://squoosh.app/) - Google's image optimization tool
- [ImageOptim](https://imageoptim.com/) - Desktop app for Mac

**Command Line Tools:**
```bash
# Using ImageMagick (if installed)
convert input.jpg -quality 85 -resize 1920x1080\> output.jpg

# Using jpegoptim
jpegoptim --max=85 --strip-all *.jpg

# Using mozjpeg
cjpeg -quality 85 -optimize input.jpg > output.jpg
```

### 2. Target File Sizes

For best performance, aim for these target file sizes:

- **Banner/Hero Images**: < 200KB (dimensions: 1920x1080 or smaller)
- **Gallery Images**: < 150KB (dimensions: 1280x720 or smaller)
- **Faculty Photos**: < 100KB (dimensions: 400x400 or smaller)
- **Icons/Logos**: < 50KB

### 3. Implement Responsive Images

Use the `srcset` attribute to serve appropriately sized images for different screen sizes:

```html
<img 
  src="assets/img/School1-800w.jpg"
  srcset="assets/img/School1-400w.jpg 400w,
          assets/img/School1-800w.jpg 800w,
          assets/img/School1-1200w.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1000px) 800px,
         1200px"
  alt="School building"
  loading="lazy"
>
```

### 4. Convert to Modern Formats

Consider converting images to modern formats for better compression:

- **WebP**: 25-35% smaller than JPEG with similar quality
- **AVIF**: Even better compression than WebP (newer format)

Example:
```html
<picture>
  <source srcset="assets/img/School1.webp" type="image/webp">
  <source srcset="assets/img/School1.jpg" type="image/jpeg">
  <img src="assets/img/School1.jpg" alt="School building" loading="lazy">
</picture>
```

## Current Optimizations Applied

✅ Added `loading="lazy"` to all below-the-fold images
✅ Added `width` and `height` attributes to prevent layout shift
✅ Added descriptive `alt` text for accessibility
✅ Deferred non-critical JavaScript
✅ Reduced header padding for better mobile experience

## Next Steps

1. Download all large images listed above
2. Compress them using one of the recommended tools
3. Test quality to ensure it's acceptable
4. Replace the original files with optimized versions
5. Optionally, create responsive image variants
6. Monitor performance improvements using Lighthouse or PageSpeed Insights

## Expected Performance Improvements

After optimization, you should see:
- **Faster page load times** (2-4 seconds faster)
- **Improved Lighthouse scores** (especially LCP - Largest Contentful Paint)
- **Reduced bandwidth usage** (40-60% savings)
- **Better mobile experience** (faster load on slower connections)
