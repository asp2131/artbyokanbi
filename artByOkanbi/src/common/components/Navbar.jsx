import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  const navbarVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center p-5 bg-transparent fixed top-0 left-0 w-full z-[2]"
      >
        <motion.h1 variants={itemVariants} className="text-white text-2xl">
          Art by Okanbi.
        </motion.h1>

        <div
          onClick={toggleDrawer}
          className="block w-[30px] h-5 relative cursor-pointer z-[101] pr-8 md:hidden"
        >
          <span className={`block absolute h-0.5 w-[30px] bg-white opacity-100 left-0 transition-all duration-300 ease-in-out top-0 ${showDrawer ? 'top-2 w-0 left-1/2' : ''}`}></span>
          <span className={`block absolute h-0.5 w-[30px] bg-white opacity-100 left-0 transition-all duration-300 ease-in-out top-2 ${showDrawer ? 'rotate-45' : ''}`}></span>
          <span className={`block absolute h-0.5 w-[30px] bg-white opacity-100 left-0 transition-all duration-300 ease-in-out top-4 ${showDrawer ? '-rotate-45 top-2' : ''}`}></span>
        </div>

        <motion.ul
          variants={navbarVariants}
          className="flex justify-center items-center m-0 p-0 list-none pr-[120px] max-md:hidden"
        >
          <motion.li variants={itemVariants} className="mx-2.5 cursor-pointer">
            <Link to="/" className="text-white no-underline text-lg p-2.5 transition-transform duration-300 ease-in-out block hover:scale-110">
              Home
            </Link>
          </motion.li>
          <motion.li variants={itemVariants} className="mx-2.5 cursor-pointer">
            <Link to="/about" className="text-white no-underline text-lg p-2.5 transition-transform duration-300 ease-in-out block hover:scale-110">
              About
            </Link>
          </motion.li>
          <motion.li variants={itemVariants} className="mx-2.5 cursor-pointer">
            <Link to="/contact" className="text-white no-underline text-lg p-2.5 transition-transform duration-300 ease-in-out block hover:scale-110">
              Contact
            </Link>
          </motion.li>
        </motion.ul>
      </motion.nav>

      <div
        className="fixed top-0 right-0 w-4/5 h-full bg-[#333] transition-transform duration-300 ease-in-out z-[100] min-[769px]:hidden"
        style={{ transform: showDrawer ? "translateX(0)" : "translateX(100%)" }}
      >
        <ul className="flex flex-col justify-center items-center m-0 p-0 list-none h-full">
          <li onClick={toggleDrawer} className="my-5 cursor-pointer w-full">
            <Link to="/" className="text-white no-underline text-lg p-2.5 block text-center">
              Home
            </Link>
          </li>
          <li onClick={toggleDrawer} className="my-5 cursor-pointer w-full">
            <Link to="/about" className="text-white no-underline text-lg p-2.5 block text-center">
              About
            </Link>
          </li>
          <li onClick={toggleDrawer} className="my-5 cursor-pointer w-full">
            <Link to="/contact" className="text-white no-underline text-lg p-2.5 block text-center">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
