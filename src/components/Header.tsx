import React from 'react';
import furiaLogo from '../assets/furia_logo.png'

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white py-4 mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {/* Logo da FURIA */}
          <div className="w-12 h-12 bg-black flex items-center justify-center mr-2">
              <img src={furiaLogo} />
          </div>
          <div>
            <h1 className="text-xl  font-bold">FURIA</h1>
            <p className="text-sm text-gray-300">Know Your Fan</p>
          </div>
        </div>
        
        <nav>
          <ul className="flex space-x-6 ">
            <li>
              <a href="/" className="hover:text-red-400 ">Início</a>
            </li>
            <li>
              <a href="https://furia.gg" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Site Oficial</a>
            </li>
            <li>
              <a href="/help" className="hover:text-blue-400">Ajuda</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;