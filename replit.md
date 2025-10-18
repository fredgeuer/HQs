# HQs Premium Landing Page

## Overview

This is a Brazilian Portuguese landing page for selling adult comic books (HQs) in PDF format. The site is built as a single-page application using vanilla HTML, CSS, and JavaScript with a modern, dark-themed design featuring purple and gold accent colors. The landing page follows a conversion-focused structure with multiple sections designed to showcase the product and drive purchases at R$10.00.

## Recent Changes

**October 18, 2025** - Initial implementation completed
- Created complete landing page with all sections (header, hero, comics, benefits, testimonials, purchase, footer)
- Implemented dark premium design with purple (#8b5cf6) and gold (#fbbf24) accent colors
- Added all JavaScript animations: fade-in on scroll, parallax hero background, stat counter animations, hover effects
- Mobile menu functionality implemented with hamburger button
- All 6 comic cards created with gradient placeholders, ratings, tags, and descriptions
- Purchase section with prominent R$10 pricing and conversion-focused CTA
- Footer with 18+ warning and legal links
- Fully responsive design optimized for mobile and desktop

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- Vanilla HTML5, CSS3, and JavaScript (no frameworks)
- Google Fonts (Poppins) for typography
- Pure CSS animations and transitions

**Design Pattern**
- Single-page application with section-based navigation
- Mobile-first responsive design using Flexbox and CSS Grid
- Fixed header with scroll-based state changes
- Component-based CSS structure using CSS custom properties (variables)

**Key Architectural Decisions**

1. **No Framework Approach**: Built entirely with vanilla web technologies to minimize bundle size and maximize performance
   - **Rationale**: Landing pages benefit from fast load times; avoiding framework overhead improves initial page load
   - **Trade-off**: More manual DOM manipulation but better performance for simple interactions

2. **CSS Custom Properties for Theming**: Centralized color scheme and design tokens in `:root`
   - **Colors**: Dark background (`--dark-bg`, `--darker-bg`), purple accents (`--primary-purple`, `--secondary-purple`), gold highlights (`--gold`)
   - **Rationale**: Easy theme modifications and consistent design system
   - **Benefits**: Maintainable styling, quick theme changes

3. **Scroll-Based Animations**: Intersection-based fade-in animations triggered on scroll
   - **Implementation**: JavaScript monitors element positions and adds `.visible` class when in viewport
   - **Rationale**: Enhances user engagement without overwhelming initial load

4. **Fixed Header with State Management**: Header changes appearance on scroll
   - **Implementation**: Adds `.scrolled` class after 100px scroll
   - **Purpose**: Improves navigation UX while maintaining visual hierarchy

### File Structure

```
/
├── index.html          # Main HTML structure with all sections
├── style.css           # Complete styling including responsive design
├── script.js           # Scroll handlers, animations, smooth navigation
└── attached_assets/    # Project requirements documentation
```

### Page Sections

1. **Header**: Fixed navigation with logo, menu links, and CTA button
2. **Hero Section**: Primary call-to-action with headline and pricing
3. **Comics Showcase**: Card-based display of featured HQs with ratings
4. **Benefits Section**: Icon-based feature highlights (PDF access, immediate delivery, etc.)
5. **Testimonials**: Social proof section with customer reviews
6. **Purchase Section**: Final conversion point with pricing emphasis
7. **Footer**: Legal links, contact info, and age restriction notice

### Responsive Design Strategy

- **Breakpoints**: Mobile-first approach with media queries for tablet and desktop
- **Layout**: CSS Grid for card layouts, Flexbox for navigation and spacing
- **Mobile Menu**: Hamburger menu button (JavaScript toggle functionality to be implemented)

### Animation System

**Fade-In Observer**
- Elements with `.fade-in` class animate into view on scroll
- Initial visibility check on page load
- Threshold: 100px from viewport bottom
- State managed via `.visible` class addition

**Interactive Elements**
- Hover effects on cards (scaling transform)
- Button shine effects (animated pseudo-elements)
- Smooth scroll behavior for anchor navigation

## External Dependencies

### Third-Party Services

1. **Google Fonts API**
   - **Font Family**: Poppins (weights: 300, 400, 500, 600, 700)
   - **Purpose**: Modern, professional typography
   - **Load Strategy**: Preconnect optimization for performance

### Content Delivery

- **Images**: Currently using placeholder references (to be replaced with actual comic cover images)
- **Icons**: Emoji-based favicon (📖) - no icon library dependency
- **Benefits Icons**: Implementation pending (may use emoji or inline SVG)

### Payment Integration

- **Status**: Placeholder links (`#`) for checkout flow
- **Expected Integration**: External payment processor for R$10.00 transactions
- **Note**: No payment gateway currently implemented; links prepared for future integration

### Browser APIs

- **DOM API**: Element selection, classList manipulation, event listeners
- **Scroll API**: `window.scrollY`, `getBoundingClientRect()`, smooth scroll behavior
- **IntersectionObserver Alternative**: Custom scroll-based visibility detection implemented manually

### Language and Localization

- **Primary Language**: Portuguese (Brazil) - `pt-BR`
- **Currency**: Brazilian Real (R$)
- **Content**: All text, metadata, and CTAs in Portuguese
- **No i18n System**: Hardcoded text (no internationalization framework)