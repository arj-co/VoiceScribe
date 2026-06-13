'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Animated orb that reacts to sidebar state ────────────── */
function SidebarOrb({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 pointer-events-none select-none">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(62,139,92,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: isOpen ? [1, 1.3, 1] : [1, 1.1, 1],
          opacity: isOpen ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Core orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: '25%', left: '25%', width: '50%', height: '50%',
          background: 'radial-gradient(circle at 35% 35%, #5BAA78, #3E8B5C 60%, #2D6B44)',
          boxShadow: '0 0 30px rgba(62,139,92,0.3), inset 0 -4px 8px rgba(0,0,0,0.15)',
        }}
        animate={{
          scale: isOpen ? [1, 1.15, 0.95, 1.08, 1] : [1, 1.05, 1],
          borderRadius: isOpen
            ? ['50%', '45% 55% 50% 50%', '55% 45% 45% 55%', '48% 52% 55% 45%', '50%']
            : ['50%', '50%', '50%'],
        }}
        transition={{
          duration: isOpen ? 3 : 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orbiting particle 1 */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-sage-light"
        style={{ top: '50%', left: '50%', marginTop: -4, marginLeft: -4 }}
        animate={{
          x: isOpen ? [0, 40, 0, -40, 0] : [0, 20, 0, -20, 0],
          y: isOpen ? [-40, 0, 40, 0, -40] : [-20, 0, 20, 0, -20],
          opacity: [0.8, 0.4, 0.8],
          scale: [1, 0.6, 1],
        }}
        transition={{ duration: isOpen ? 3 : 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbiting particle 2 */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-copper-light"
        style={{ top: '50%', left: '50%', marginTop: -3, marginLeft: -3 }}
        animate={{
          x: isOpen ? [30, -10, -30, 10, 30] : [15, -5, -15, 5, 15],
          y: isOpen ? [10, 35, -10, -35, 10] : [5, 18, -5, -18, 5],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: isOpen ? 4 : 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbiting particle 3 */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-sage"
        style={{ top: '50%', left: '50%', marginTop: -2, marginLeft: -2 }}
        animate={{
          x: isOpen ? [-25, 30, -25] : [-12, 12, -12],
          y: isOpen ? [30, -20, 30] : [15, -10, 15],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{ duration: isOpen ? 2.5 : 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ── Nav item data ────────────────────────────────────────── */
const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Practice',
    href: '/app',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
        <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    label: 'History',
    href: '/app/history',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
  {
    label: 'Analysis',
    href: '/app/analysis',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: 'About',
    href: '/about',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
];

/* ── Main Sidebar component ───────────────────────────────── */
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close sidebar on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* ── Hamburger trigger ──────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        className="fixed top-2 left-4 z-[60] w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-paper/80 backdrop-blur-md border border-rule-faint hover:bg-paper-warm transition-colors duration-200 cursor-pointer"
      >
        <motion.span
          className="block w-4 h-[1.5px] bg-ink rounded-full origin-center"
          animate={isOpen ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="block w-4 h-[1.5px] bg-ink rounded-full"
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-4 h-[1.5px] bg-ink rounded-full origin-center"
          animate={isOpen ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
      </button>

      {/* ── Backdrop ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-[55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar panel ──────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-0 left-0 h-full w-64 bg-paper/95 backdrop-blur-xl border-r border-rule-faint z-[58] flex flex-col overflow-hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            {/* Logo area */}
            <div className="pt-2 pb-6">
              <div className="h-10 flex items-center pl-16 pr-6">
                <Link href="/" className="flex items-center gap-2.5 group">
                  <span className="w-2.5 h-2.5 rounded-full bg-sage group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-display text-xl font-bold tracking-tight text-ink">
                    Voice<span className="text-sage">Scribe</span>
                  </span>
                </Link>
              </div>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink-ghost pl-16 mt-2">
                AI speech coaching
              </p>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-rule-faint" />

            {/* Nav links */}
            <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-display tracking-tight transition-all duration-200 group ${
                        isActive
                          ? 'bg-sage-faint text-sage font-semibold'
                          : 'text-ink-muted hover:text-ink hover:bg-paper-warm'
                      }`}
                    >
                      <span className={`transition-colors duration-200 ${isActive ? 'text-sage' : 'text-ink-ghost group-hover:text-ink-muted'}`}>
                        {item.icon}
                      </span>
                      {item.label}
                      {isActive && (
                        <motion.span
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-sage"
                          layoutId="sidebar-active"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Animated orb at bottom */}
            <SidebarOrb isOpen={isOpen} />

            {/* Footer */}
            <motion.div
              className="px-6 py-4 border-t border-rule-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-mono text-[9px] text-ink-ghost uppercase tracking-widest">
                Free · Private · Browser-based
              </p>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
