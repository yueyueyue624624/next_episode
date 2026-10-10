# NEXT EPISODE visual QA

## Test target

- Visual source: `C:\Users\YUE'YU~1\AppData\Local\Temp\codex-clipboard-d7e380a1-e581-4e65-abbc-25b1c7f50a17.jpg`
- Implementation: `E:\Condex\next-episode`
- Test viewport: 375 × 812, device scale factor 1
- Source board: 1536 × 1024; the phone panels were normalized to the implementation viewport for comparison.
- Browser runner: Playwright with local Chrome. The Codex Browser plugin was not available in this workspace.

## Verified states and interactions

- Splash / WeChat login entry
- Visual onboarding and profile setup
- TODAY empty state and daily draw entry
- Three-card manual selection and confirm action
- Daily unique-card lock
- Card result, matching card art, story entry, signal, and bonus state
- Archive calendar and issue list
- ME profile and membership panel
- Responsive phone layout at the target viewport

## Comparison history

1. The original implementation did not reproduce the reference's immersive splash, photographic card assets, calendar, or profile imagery.
2. Added full-screen portal art, cinematic onboarding art, a real Star tarot illustration, the archive calendar, cat avatar, and compact dark editorial proportions.
3. Removed the duplicate membership block, tightened calendar spacing, and corrected the final card mapping so the artwork, Roman numeral, and title stay consistent.

## Automated result

- Navigation and primary interaction flow: passed
- Browser console errors: 0
- TypeScript validation: passed
- H5 production build: passed
- Residual P3 differences: H5 intentionally does not reproduce WeChat's native top-right capsule; generated illustrations vary in small details from the concept board; typography uses system Songti/Georgia fallbacks.

final result: passed
