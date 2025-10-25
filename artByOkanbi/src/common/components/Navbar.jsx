import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const NavbarContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
`;

const NavHeader = styled(motion.h1)`
  color: #fff;
  font-size: 24px;
`;

const NavItems = styled(motion.ul)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  padding-right: 120px;


  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.li)`
  margin: 0 10px;
  cursor: pointer;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    transition: transform 0.3s ease-in-out;
    display: block;
  }

  &:hover {
    a {
      transform: scale(1.1);
    }
  }
`;

const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  background-color: #333;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 100;

  @media (min-width: 769px) {
    display: none;
  }
`;

const DrawerItems = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
`;

const DrawerItem = styled.li`
  margin: 20px 0;
  cursor: pointer;
  width: 100%;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    display: block;
    text-align: center;
  }
`;

const HamburgerMenu = styled.div`
  display: block;
  width: 30px;
  height: 20px;
  position: relative;
  cursor: pointer;
  z-index: 101;
  padding-right: 2rem;

  @media (min-width: 769px) {
    display: none;
  }

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 30px;
    background-color: #fff;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: all 0.3s ease-in-out;

    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2) {
      top: 8px;
    }

    &:nth-child(3) {
      top: 16px;
    }

    &.open {
        &:nth-child(1) {
            top: 8px;
            width: 0%;
            left: 50%;
        }

        &:nth-child(2) {
            transform: rotate(45deg);
        }

        &:nth-child(3) {
            transform: rotate(-45deg);
        }

    }
    }
`;

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
        <NavbarContainer
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
        >
          <NavHeader variants={itemVariants}>Art by Okanbi.</NavHeader>
          <HamburgerMenu onClick={toggleDrawer}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerMenu>
          <NavItems variants={navbarVariants}>
            <NavItem variants={itemVariants}>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem variants={itemVariants}>
              <Link to="/about">About</Link>
            </NavItem>
            <NavItem variants={itemVariants}>
              <Link to="/contact">Contact</Link>
            </NavItem>
          </NavItems>
        </NavbarContainer>
        <DrawerWrapper style={{ transform: showDrawer ? "translateX(0)" : "" }}>
          <DrawerItems>
            <DrawerItem onClick={toggleDrawer}>
              <Link to="/">Home</Link>
            </DrawerItem>
            <DrawerItem onClick={toggleDrawer}>
              <Link to="/about">About</Link>
            </DrawerItem>
            <DrawerItem onClick={toggleDrawer}>
              <Link to="/contact">Contact</Link>
            </DrawerItem>
          </DrawerItems>
        </DrawerWrapper>
      </>
    );
  };
  
  export default Navbar;
  
 
