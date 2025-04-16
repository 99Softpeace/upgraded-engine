"use client"; // Mark this as a Client Component

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Initialize the canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const text = "Peace Tech";
    const fontSize = 70; // Increased font size
    const fontFamily = "'Dancing Script', cursive";
    const strokeColor = isDarkMode ? "white" : "#0F172A";
    const textColor = isDarkMode ? "white" : "#0F172A";
    const glowColor = isDarkMode ? "#00ffcc" : "#6366F1"; // Neon glow color

    // Set up canvas dimensions
    canvas.width = 600; // Adjusted width for larger text
    canvas.height = 120; // Adjusted height for larger text

    // Clear the canvas
    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Configure text styles
    const configureStyles = () => {
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = textColor;
      ctx.lineWidth = 2;

      // Add neon glow effect
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 15; // Adjust blur intensity for glow
    };

    // Animation function
    const animate = () => {
      let progress = 0;
      const totalLength = text.length;

      const drawFrame = () => {
        if (progress < totalLength) {
          clearCanvas();
          configureStyles();

          // Render the current text progressively
          const currentText = text.substring(0, Math.ceil(progress));
          ctx.fillText(currentText, 0, 80); // Adjust vertical position for larger font

          progress += 0.1; // Slightly faster animation speed
          requestAnimationFrame(drawFrame);
        } else {
          // Ensure the full text is rendered at the end
          clearCanvas();
          configureStyles();
          ctx.fillText(text, 0, 80);
        }
      };

      drawFrame();
    };

    // Start the animation immediately
    animate();

    // Restart animation on hover
    const handleHover = () => {
      clearCanvas(); // Reset the canvas
      configureStyles(); // Reapply styles
      animate(); // Restart the animation
    };

    // Add hover listeners
    const canvasElement = canvasRef.current;
    canvasElement?.addEventListener("mouseenter", handleHover);

    // Cleanup hover listeners
    return () => {
      canvasElement?.removeEventListener("mouseenter", handleHover);
    };
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#0F172A] py-4 px-8 flex justify-between items-center shadow-md">
      {/* Animated Handwritten Canvas Logo */}
      <div className="flex items-center gap-2">
        <canvas ref={canvasRef} className="w-60 h-16"></canvas> {/* Adjusted canvas size */}
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-[#6366F1] transition-colors">
          Home
        </Link>
        <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-[#6366F1] transition-colors">
          About
        </Link>
        <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-[#6366F1] transition-colors">
          Projects
        </Link>
        <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-[#6366F1] transition-colors">
          Contact
        </Link>
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2 rounded-full bg-[#6366F1] text-white transition-colors"
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 0v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default Navbar;