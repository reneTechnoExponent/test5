import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-gray-900">FitLife</a>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#programs" className="text-gray-600 hover:text-gray-900">Programs</a>
            <a href="#trainers" className="text-gray-600 hover:text-gray-900">Trainers</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#programs" className="text-gray-600 hover:text-gray-900">Programs</a>
              <a href="#trainers" className="text-gray-600 hover:text-gray-900">Trainers</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;