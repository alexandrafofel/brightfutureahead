'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

/**
 * MobileMenu – stable, accessible, no external deps
 * - a11y: role="dialog", aria-modal, aria-current, focus trap, Escape
 * - UX: overlay click to close, body scroll lock
 * - Active state: Home only on "/", others via startsWith
 * - Home special: localhost -> "/", prod -> https://www.lumlyn.com, refresh if already at root
 */
export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const firstRef = React.useRef<HTMLButtonElement | null>(null);
  const lastRef = React.useRef<HTMLAnchorElement | null>(null);

  const close = React.useCallback(() => setOpen(false), []);

  // Lock body scroll while menu is open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus trap + Escape
  React.useEffect(() => {
    if (!open) return;

    const to = window.setTimeout(() => {
      panelRef.current?.focus();
      firstRef.current?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
      if (e.key === 'Tab') {
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === firstRef.current) {
            e.preventDefault();
            lastRef.current?.focus();
          }
        } else {
          if (active === lastRef.current) {
            e.preventDefault();
            firstRef.current?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(to);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const NAV: { href: string; label: string }[] = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/about-app', label: 'About App' },
    { href: '/books', label: 'Books' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href);

  // Special handling for Home:
  // - localhost -> "/" (or hard refresh if already at "/")
  // - production -> "https://www.lumlyn.com" (or hard refresh if already at "/")
  const onHomeClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;

    const atRoot = window.location.pathname === '/';
    const isLocal = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
    const PROD_HOME = 'https://www.lumlyn.com';

    if (isLocal) {
      if (atRoot) window.location.reload();
      else window.location.assign('/');
      return;
    }

    if (atRoot) window.location.reload();
    else window.location.assign(PROD_HOME);
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        className="inline-flex flex-col justify-center items-center gap-1 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Open menu"
      >
        <span className="block h-[2px] w-[24px] bg-[#111] rounded" />
        <span className="block h-[2px] w-[24px] bg-[#111] rounded" />
        <span className="block h-[2px] w-[24px] bg-[#111] rounded" />
      </button>

      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[60] bg-black/30"
            onClick={close}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <aside
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            ref={panelRef}
            tabIndex={-1}
            className="fixed right-4 top-4 z-[70] w-[320px] max-w-[92vw] h-[416px] rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.10)] p-5 outline-none"
          >
            {/* Close */}
            <div className="absolute top-3 right-3">
              <button
                ref={firstRef}
                onClick={close}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]"
              >
                {/* inline X icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="mt-8 grid gap-3">
              {NAV.map(({ href, label }, idx) =>
                label === 'Home' ? (
                  // Special Home link: local vs prod + refresh if at root
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      onHomeClick(e);
                      close();
                    }}
                    className={
                      'inline-flex items-center justify-center w-full h-14 rounded-[12px] border-2 transition-colors ' +
                      (pathname === '/'
                        ? 'border-[#6C63FF] text-[#111] bg-[#F2F2FF] shadow-[0_2px_6px_rgba(0,0,0,0.08)]'
                        : 'border-[#E5E7EB] text-[#1A1A1A] bg-white hover:bg-[#F7F7F9]')
                    }
                  >
                    <span className="text-xl font-bold leading-normal">Home</span>
                  </a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    className={
                      'inline-flex items-center justify-center w-full h-14 rounded-[12px] border-2 transition-colors ' +
                      (isActive(href)
                        ? 'border-[#6C63FF] text-[#111] bg-[#F2F2FF] shadow-[0_2px_6px_rgba(0,0,0,0.08)]'
                        : 'border-[#E5E7EB] text-[#1A1A1A] bg-white hover:bg-[#F7F7F9]')
                    }
                    aria-current={isActive(href) ? 'page' : undefined}
                    ref={idx === NAV.length - 1 ? lastRef : undefined}
                  >
                    <span className="text-xl font-bold leading-normal">{label}</span>
                  </Link>
                )
              )}
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
