"use client";

import React, { useEffect, useState } from "react";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite items yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((item, index) => (
            <li key={index} className="p-2 border rounded">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
