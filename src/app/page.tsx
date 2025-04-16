import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-[#0F172A] min-h-screen text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen gap-8 text-center relative">
        {/* Abstract Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6366F14D] to-transparent blur-lg"></div>

        {/* Content */}
        <h1 className="text-5xl font-bold z-10">Hi, I’m [Your Name]</h1>
        <p className="text-lg text-gray-300 z-10 max-w-md">
          I’m a developer passionate about building futuristic web experiences with cutting-edge technologies.
        </p>
        <Image
          src="/profile.jpg" // Replace with your profile image path
          alt="Profile Picture"
          width={200}
          height={200}
          className="rounded-full border-4 border-[#6366F1] shadow-lg z-10"
        />
        <a
          href="/about"
          className="px-6 py-3 text-white bg-[#6366F1] rounded-full hover:bg-[#4F46E5] transition-colors z-10"
        >
          Learn More About Me
        </a>
      </div>
    </div>
  );
}