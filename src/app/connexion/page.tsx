"use client"; // Ajoutez cette ligne pour marquer ce fichier comme un composant client

import { useState, FormEvent } from 'react';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Fonction pour gérer la soumission du formulaire
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Ajoutez la logique de connexion ici, comme une requête API pour authentifier l'utilisateur.
    console.log("Connexion avec", email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Se connecter
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm">
            Pas encore de compte ?{' '}
            <Link href="/inscription" className="text-blue-500 hover:underline">
              Inscrivez-vous
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
