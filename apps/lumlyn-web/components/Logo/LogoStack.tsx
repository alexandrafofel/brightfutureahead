'use client';'use client';

import React, { CSSProperties } from 'react';
import Image from 'next/image';
import styles from './LogoStack.module.css';
import clsx from 'clsx';

type LogoStackProps = {
  className?: string;
  style?: React.CSSProperties;
  top?: string;   // ex. "2rem"
  left?: string;  // ex. "3rem"
};

export default function LogoStack({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className={styles.logoWrap}
      style={{
        ...style,
        position: style?.top || style?.left ? "absolute" : undefined,
      }}
    >
        <Image
          src="/images/lumlyn-logo-letters.svg"
          alt="Lumlyn Logo Letters"
          width={100}
          height={200}
          className={styles.letterswhite}
          priority
      />

        <Image
          src="/images/logo-text-pressed-dark-solmon.svg"
          alt="Lumlyn Logo Letters Solmon"
          width={100}
          height={200}
          className={styles.letterssolmon}
          priority

      />
        {/* Norul – “ancora” layout-ului */}  
        <Image
          src="/images/lumlyn-logo-cloud.svg"
          alt="Lumlyn Logo Cloud"
          width={160}
          height={160}
          className={styles.cloud}
          priority
      />
    </div>
  );
};