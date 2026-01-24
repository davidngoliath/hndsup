# HNDSUP Static Build for S3

This is a self-contained static build of the HNDSUP website configured for deployment to AWS S3.

## Setup

1. Install dependencies:
```bash
cd static
npm install
```

## Build for S3

2. Build the static site:
```bash
npm run build
```

This will create an `out` folder with all static files bundled and ready for S3.

## What Gets Bundled

The static export includes:
- All React components and dependencies
- GSAP animation library
- Swiper carousel library
- All CSS modules and global styles
- Images and video assets
- Google Analytics and Tag Manager scripts
- All fonts

## Deploy to S3

3. Upload the **contents** of the `out` folder to your S3 bucket subfolder:

```bash
cd out
aws s3 sync . s3://your-bucket-name/clients/hndsup/awards/ --delete
```

**IMPORTANT:** 
- Upload the **contents** of `out/` (the files inside), NOT the `out/` folder itself
- Your S3 path should be: `s3://bucket/clients/hndsup/webbyawards/index.html`
- Access via: `https://your-bucket.s3.amazonaws.com/clients/hndsup/awards/`

### S3 Bucket Configuration

Make sure your S3 bucket is configured for static website hosting:
1. Go to S3 bucket → Properties → Static website hosting
2. Enable static website hosting
3. Index document: `index.html`
4. Error document: `404.html`

### CloudFront (Optional)

If using CloudFront, set the origin to your S3 website endpoint, not the bucket directly.

## Important Notes

- The `output: 'export'` configuration in `next.config.mjs` enables static export
- Images are unoptimized for S3 compatibility
- All dependencies are bundled into the static build
- No server-side rendering - everything is client-side

## Configuration

Static export settings are in [next.config.mjs](next.config.mjs):
- `output: 'export'` - Enables static HTML export
- `images.unoptimized: true` - Required for S3 deployment
- `trailingSlash: true` - Better S3 routing compatibility
