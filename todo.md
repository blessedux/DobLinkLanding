
# DOBLink Landing Page – To-Do List

URL: https://dobprotocol.com/doblink
Stack: Next.js + React + Tailwind

---

## Core Widget Adjustments

### Clean Up Top UI (Inside Widget)
- [X] Remove the following elements inside the widget:
  - [X] “Connect Wallet” button (top right)
  - [X] “Invest in DePIN” title (top center)
- [X] Keep only:
  - [X] The "Invest Now" CTA button
  - [X] The three main input boxes (token selection, USD amount, output)

### UI Styling
- [X] Replace default browser dropdown on "Invest in Token" with a Tailwind-styled custom component
- [X] Ensure dropdown matches overall visual style of the widget

### Tooltip Functionality
- [X] On hover of the "API" section tooltip:
  - [X] Display distribution frequency
  - [X] Include information on any related fees
- [X] On hover of the EHive EV Charger logo tooltip:
  - [X] Show relevant hover content
  - [X] Include a link to https://home.dobprotocol.com

### Simulated Investment Flow
- [ ] On click of the "Invest Now" button:
  - [ ] Trigger a simulation of what happens next
  - [ ] Guide the user through the investment process visually
  - [ ] Include dummy confirmation states or loading animations if needed

---

## UI and Visual Enhancements

- [ ] Add minimalist animated background behind main content
- [ ] Ensure animation is lightweight and non-distracting

---

## QA and Testing

- [ ] Test tooltip hover behavior for API and EHive logo
- [ ] Test layout responsiveness across mobile, tablet, and desktop
- [ ] Ensure background animation doesn’t affect performance
- [ ] Validate all visual and layout changes against design spec

---

## Scroll-Based Storytelling (Final Phase)

- [ ] Implement scroll-triggered storytelling experience:
  - [ ] Keep Dublink widget fixed/sticky while user scrolls
  - [ ] Design content blocks that scroll beneath or alongside the widget
  - [ ] Align section content with widget states to reinforce narrative
