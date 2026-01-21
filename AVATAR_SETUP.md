# Avatar Setup Guide

The current SVG avatars are placeholders. To get recognizable caricatures, use one of these free services:

## Option 1: Use Free Caricature Generator (Recommended)

1. Visit **Fotor AI Avatar Generator**: https://www.fotor.com/features/ai-avatar-generator/
2. For each person in `src/data/people.ts`:
   - Find a reference photo of the person (from public domain sources)
   - Upload to Fotor
   - Select "Caricature" or "Cartoon" style (NOT photorealistic)
   - Download the generated caricature
   - Save as PNG/SVG in `public/avatars/[person-id].png`

## Option 2: Use Free Illustration Libraries

1. **Pixabay**: https://pixabay.com/images/search/caricature/
   - Search for "[Person Name] caricature"
   - Download free illustrations
   - Ensure they're recognizable

2. **OpenClipart**: https://openclipart.org/
   - Search for caricature illustrations
   - Public domain, free to use

## Option 3: Use UI Avatars with Customization

For a quick MVP solution, you can use a service that generates avatars based on names/features, but these won't be as recognizable.

## Current Status

The app currently uses simple SVG placeholders. Replace the files in `public/avatars/` with actual caricature images to make them recognizable.

## File Names Required

Make sure your caricature files match these names:
- einstein.png (or .svg)
- tesla.png
- jobs.png
- musk.png
- gates.png
- obama.png
- trump.png
- churchill.png
- curie.png
- darwin.png
- bezos.png
- zuckerberg.png

