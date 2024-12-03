import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  // Footer Links and Social Media
  const footerLinks = ['Privacy Policy', 'Terms of Service', 'Contact Us'];
  const socialLinks = [
    { icon: FaFacebookF, url: 'https://facebook.com' },
    { icon: FaTwitter, url: 'https://twitter.com' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com' },
    { icon: FaInstagram, url: 'https://instagram.com' },
  ];

  return (
    <footer className="w-full px-8 py-6 bg-[#050913] text-white backdrop-blur-lg relative">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Footer Navigation Links */}
        <ul className="flex space-x-6 text-sm">
          {footerLinks.map((link) => (
            <motion.li
              key={link}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
              <a
                href={`#${link.replace(' ', '').toLowerCase()}`}
                className="hover:text-blue-600 transition-all duration-300"
              >
                {link}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          {socialLinks.map(({ icon: Icon, url }, index) => (
            <motion.a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="text-xl text-blue-600 hover:text-white transition-all duration-300"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-xs text-gray-400">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          &copy; {new Date().getFullYear()} Built with ❤ by{' '}
          <a
            className="font-bold text-white hover:underline"
            href="https://portfolio-mkhan.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Moin Khan
          </a>{' '}
          All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
