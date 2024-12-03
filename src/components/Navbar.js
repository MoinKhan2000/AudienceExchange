import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/LOGO.jpg';

const Navbar = () => {
  // State management
  const [toggle, setToggle] = useState(false); // Toggle for mobile menu
  const [active, setActive] = useState('home'); // Active navigation item

  const navItems = ['home', 'about', 'work', 'skills', 'contact']; // List of navigation items

  // Handle setting the active item and closing the menu
  const handleSetActive = (item) => {
    setActive(item);
    setToggle(false);
  };

  return (
    <nav className="w-full flex justify-between items-center z-20 drop-shadow-2xl bg-[#050913] px-8 py-6 text-white relative backdrop-blur-lg">
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full object-cover" />
      </div>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-white">
        {navItems.map((item) => (
          <motion.li
            key={item}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="transition-transform"
          >
            <a
              href={`#${item}`}
              onClick={() => handleSetActive(item)}
              className={`uppercase font-medium text-sm px-6 py-2 transition-all duration-300 hover:text-blue-600 ${active === item
                ? 'text-white hover:text-white bg-blue-600 rounded-full shadow-lg animate-gradient-motion'
                : ''
                }`}
            >
              {item}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden">
        {!toggle ? (
          // Hamburger Icon
          <HiMenuAlt4
            onClick={() => setToggle(true)}
            className="w-8 h-8 text-blue-600 cursor-pointer"
          />
        ) : (
          // Mobile Menu
          <AnimatePresence>
            {toggle && (
              <motion.div
                className="fixed inset-0 bg-black h-screen bg-opacity-90 flex flex-col items-center justify-center z-30"
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-100%' }}
                transition={{ duration: 0.5 }}
              >
                {/* Close Icon */}
                <HiX
                  onClick={() => setToggle(false)}
                  className="w-8 h-8 text-white absolute top-6 right-6 cursor-pointer"
                />
                <ul className="flex flex-col space-y-8 text-center text-white text-lg">
                  {navItems.map((item) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{
                        delay: 0.1 * navItems.indexOf(item),
                      }}
                    >
                      <a
                        href={`#${item}`}
                        onClick={() => handleSetActive(item)}
                        className={`uppercase font-medium text-sm px-6 py-2 transition-all duration-300 hover:text-blue-600 ${active === item
                          ? 'text-white hover:text-white bg-blue-600 rounded-full shadow-lg animate-gradient-motion'
                          : ''
                          }`}
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
