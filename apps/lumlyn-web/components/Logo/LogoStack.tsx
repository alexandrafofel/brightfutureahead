'use client';

import { motion } from "framer-motion";
import React from 'react';

import {Logo} from "./LogoImages";

export function LogoStack(): JSX.Element {
  return (
    <>
      <div className="hidden xl:block">
        <motion.div
          id="logo-cloud"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{duration: 6 }}
          >
          {Logo.cloud}
        </motion.div>
              <motion.div
          id="logo-solmon-letters"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5}}
          transition={{ delay: 2, duration: 6 }}
          className="absolute z-9 absolute top-[20%] left-[24%] xl:top-[36%] xl:left-[24%]"
          >
          {Logo.solmonLetters}
        </motion.div>   
        <motion.div
          id="logo-white-letters"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{ delay: 0.1, duration: 6 }}
          className="absolute z-10 absolute xl:top-[36%] xl:left-[24%]"
          >
          {Logo.whiteLetters}
        </motion.div>      
      </div>
      
      <div className="xl:hidden">
        <motion.div
          id="logo-cloud"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{duration: 6 }}
          >
          {Logo.cloud}
        </motion.div>
              <motion.div
          id="logo-solmon-letters"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5}}
          transition={{ delay: 2, duration: 6 }}
          className="absolute z-9 absolute top-[11%] left-[38%] xl:top-[36%] xl:left-[24%]"
          >
          {Logo.solmonLetters}
        </motion.div>   
        <motion.div
          id="logo-white-letters"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{ delay: 0.1, duration: 6 }}
          className="absolute z-10 absolute top-[11%] left-[38%] xl:top-[36%] xl:left-[24%]"
          >
          {Logo.whiteLetters}
        </motion.div>      
      </div>
    </>
  );
};
