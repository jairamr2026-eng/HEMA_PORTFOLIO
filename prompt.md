Prompt for Hero Section: The Abyssal Entry
Core Objective: Build a high-end, immersive Hero Section for a personal portfolio using Next.js and Three.js. The theme is a "Deep Space Abyss" characterized by a dark aesthetic and a central, ultra-realistic 3D jellyfish.

1. Visual & Color Palette:

Background: Deepest obsidian black (#000107).

Accents: Soft bioluminescent pink (#FAB7C9) and icy ethereal blue (#E3F6FF).

Styling: Use Glassmorphism for UI panels—high blur, low opacity, and subtle white borders. Integrate shadcn/ui components for buttons and navigation.

2. The Central 3D Asset (Jellyfish):

Structure: Create an ultra-realistic, fictional 3D jellyfish using Three.js shaders. It should feature semi-transparent membranes, flowing tentacles with bioluminescent particles, and a soft "pulse" animation.

Animation: Implement fluid, nature-like physics. The jellyfish should "swim" through the 3D space.

Interactivity: Add a cursor-follow listener. The jellyfish should lean and move slightly toward the user's cursor as it moves across the screen. When the cursor is static, it returns to a natural, drifting path.

Persistence: The jellyfish must stay active in the global state to transition smoothly to other sections during scroll.

3. Typography & Layout:

Primary Font: A bold, prominent, futuristic sans-serif (e.g., Syne or Clash Display). No monospace.

Secondary Font: Poppins or Open Sans for body text.

Header: * Left: Simple text-based logo "Sundas Riasat" in the primary font.

Right: A minimalist navigation bar (Home, About, Projects, Services, Contact).

Center Content:

Headline: "Dimensional Design for the Digital Age" (Bold Primary Font).

Sub-headline: "I am Sundas Riasat, a developer and designer crafting immersive 3D web experiences."

CTA: A glassmorphic button with a subtle glow effect labeled "Explore My Work."

4. Technical Specifications:

Framework: Next.js with Tailwind CSS.

3D Engine: Three.js / React Three Fiber.

Responsiveness: Ensure the jellyfish scales down appropriately for mobile while maintaining the center-focus with the headline.