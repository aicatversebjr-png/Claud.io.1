@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;
  
  --color-brand-purple: #9333ea;
  --color-brand-blue: #3b82f6;
  --color-brand-pink: #ec4899;
  
  --color-background: #050508;
  --color-foreground: #fafafa;
  --color-card: rgba(255, 255, 255, 0.05);
  --color-border: rgba(255, 255, 255, 0.1);
  --color-input: rgba(255, 255, 255, 0.05);
  --color-primary: #ffffff;
  --color-secondary: #27272a;
  --color-muted: #27272a;
  --color-accent: #27272a;
}

@layer base {
  body {
    @apply bg-background text-foreground font-sans antialiased selection:bg-purple-500/30;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-sans font-black tracking-tighter uppercase leading-[0.85];
  }
}

@layer components {
  .glass {
    @apply bg-white/5 backdrop-blur-2xl border border-white/10;
  }
  
  .glass-dark {
    @apply bg-black/40 backdrop-blur-3xl border border-white/5;
  }

  .glow-purple {
    @apply shadow-[0_0_50px_-10px_rgba(147,51,234,0.4)];
  }

  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400;
  }

  .bg-mesh {
    background-color: #050508;
    background-image: 
      radial-gradient(at 0% 0%, rgba(147, 51, 234, 0.15) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
      radial-gradient(at 50% 50%, rgba(99, 102, 241, 0.05) 0px, transparent 50%);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
