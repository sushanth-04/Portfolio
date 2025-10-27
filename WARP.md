# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A modern, responsive portfolio website built with pure HTML, CSS, and JavaScript. This is a vanilla web implementation showcasing AI/ML projects and professional experience. No build tools, bundlers, or package managers required.

## Development Commands

### Local Development Server

Since this is a static site, use any simple HTTP server:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js (if available)
npx serve .

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

### Opening the Site

Simply open `index.html` directly in a browser - no build step required.

## Architecture

### File Structure

```
portfolio/
├── index.html          # Single-page application structure with semantic sections
├── styles.css          # Complete CSS with design system, animations, responsive styles
├── script.js           # All JavaScript functionality and interactions
├── README.md           
└── src/
    └── assets/         # Images and project screenshots
```

### Design System

**CSS Custom Properties** (`:root` in `styles.css`):
- Color palette uses HSL format with variables like `--primary`, `--accent`, `--gradient-*`
- All colors, spacing, and design tokens centralized at top of `styles.css`
- Dark theme with cyan primary (`--primary: 180 100% 50%`) and gradient accents

**Typography**:
- Body: Inter (loaded from Google Fonts)
- Headings: Space Grotesk (loaded from Google Fonts)
- Gradient text class uses multi-color linear gradients

### Core JavaScript Patterns

**Event-Driven Architecture**:
- All interactions initialized in `DOMContentLoaded` event listener
- Modular functions for each feature (navigation, animations, scroll effects)
- Uses Intersection Observer API for scroll-triggered animations
- Throttled scroll handlers for performance (~60fps)

**Key Functions**:
- `scrollToSection(targetId)` - Smooth scrolling with 80px offset for fixed nav
- `toggleMobileMenu()` - Mobile menu state management
- `handleScroll()` - Navigation background on scroll
- `typeWriter()` - Character-by-character typing animation
- `animateStats()` - Number counter animation for statistics
- `handleParallax()` - Parallax effect for floating orbs

### Animation System

**CSS Animations**:
- `@keyframes fadeIn`, `float`, `glow`, `bounce` defined in `styles.css`
- Applied via utility classes: `.animate-fade-in`, `.animate-float`, etc.

**Intersection Observer**:
- Elements observe: `.hero-content`, `.about-text`, `.education-card`, `.skills-card`, `.project-card`, `.contact-card`
- Triggers `.animate-fade-in` class when scrolled into view
- 10% threshold with -50px bottom margin

### Responsive Breakpoints

Mobile-first approach:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

Use CSS media queries at these breakpoints for responsive adjustments.

### Navigation System

**Dual Navigation**:
- Desktop: Horizontal links (`.nav-links-desktop`)
- Mobile: Hamburger menu (`.mobile-menu`)
- Both use `data-target` attributes pointing to section IDs

**Scroll Behavior**:
- Fixed navigation with `.scrolled` class on scroll
- Smooth scrolling accounts for 80px nav height offset
- Back-to-top button appears after 300px scroll

## Content Sections

All content lives in `index.html`:
1. **Hero** - Animated introduction with typing effect, gradient orbs, status badge
2. **About** - Two-column layout with text and image, floating badge overlay
3. **Education** - Timeline cards with degree information
4. **Skills** - Grid layout with technical/soft skills organized by category
5. **Projects** - Card-based showcase with images, descriptions, tech tags
6. **Contact** - Contact information and social links

## External Dependencies

**CDN Resources**:
- Lucide Icons: `https://cdnjs.cloudflare.com/ajax/libs/lucide/0.462.0/`
- Google Fonts: Inter and Space Grotesk
- Icons initialized via `lucide.createIcons()` in JavaScript

No package manager or build dependencies.

## Customization Guidelines

**Colors**: Edit CSS variables in `:root` at top of `styles.css`

**Content**: Directly edit HTML in `index.html` sections

**Animations**: Modify timing/behavior in `@keyframes` rules or JavaScript functions

**Images**: Place in `src/assets/` and reference with relative paths

## Performance Optimizations

- Throttled scroll events (16ms interval for 60fps)
- Intersection Observer for efficient animation triggers
- Minimal CDN dependencies
- CSS custom properties for consistent theming
- Images should be optimized before adding to `src/assets/`

## Common Editing Tasks

**Update Personal Information**:
- Hero section: name, title, description, badges
- Contact section: email, phone, social links
- About section: bio text and highlights

**Add/Edit Projects**:
- Duplicate `.project-card` structure in Projects section
- Update image src, title, description, tech tags, and links
- Follow existing card structure for consistency

**Modify Colors/Theme**:
- All colors in CSS variables at top of `styles.css`
- Use HSL format: `--variable-name: hue saturation lightness;`
- Apply via `hsl(var(--variable-name))`

**Add New Sections**:
- Create section with unique `id` in `index.html`
- Add navigation link with `data-target="#section-id"`
- Add to Intersection Observer in `observeElements()` function
- Follow existing section structure with `.section-title` and `.section-subtitle`
