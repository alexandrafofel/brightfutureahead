'use client';'use client';

import React, { CSSProperties } from 'react';
import { motion, scale } from "framer-motion";
import {Logo} from "./LogoImages";

export function LogoStack(): JSX.Element {
  return (
    <main>
      <motion.main
        id="logo-cloud"
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: 1, scale: 1.5 }}
        transition={{duration: 6 }}
        >
        {Logo.cloud}
      </motion.main>
            <motion.main
        id="logo-solmon-letters"
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: 0, scale: 1.5}}
        transition={{ delay: 2, duration: 6 }}
        className="absolute z-9"
        style={{ top: '36%', left: '24%' }}
        >
        {Logo.solmonLetters}
      </motion.main>   
      <motion.main
        id="logo-white-letters"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1.5 }}
        transition={{ delay: 0.1, duration: 6 }}
        className="absolute z-10"
        style={{ top: '36%', left: '24%' }}
        >
        {Logo.whiteLetters}
      </motion.main>      
    </main>
  );
};
