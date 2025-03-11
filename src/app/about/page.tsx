import React from "react";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen  text-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-4">À propos de nous</h1>
      <p className="text-lg text-center max-w-2xl">
        Bienvenue sur notre application ! Ce projet est construit avec Next.js et Tailwind CSS.
      </p>
    </main>
  );
}
