'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/lib/theme';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: rgba(10, 10, 15, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.text};
  letter-spacing: -0.5px;

  span {
    color: ${theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled.a<{ $active: boolean }>`
  font-size: ${theme.fontSize.small};
  font-weight: 500;
  color: ${({ $active }) => ($active ? theme.colors.accent : theme.colors.textMuted)};
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const HamburgerLine = styled.span<{ $open: boolean; $index: number }>`
  display: block;
  width: 24px;
  height: 2px;
  background: ${theme.colors.text};
  transition: all 0.3s ease;
  transform: ${({ $open, $index }) => {
    if (!$open) return 'none';
    if ($index === 0) return 'rotate(45deg) translate(5px, 5px)';
    if ($index === 1) return 'scaleX(0)';
    return 'rotate(-45deg) translate(5px, -5px)';
  }};
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
`;

const MobileNavLink = styled.a<{ $active: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? theme.colors.accent : theme.colors.textMuted)};
  padding: ${theme.spacing.sm} 0;
`;

const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy();

  const handleClick = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Nav>
        <NavInner>
          <Logo href="#hero" onClick={() => handleClick('hero')}>
            emil<span>.</span>dev
          </Logo>
          <NavLinks>
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                href={`#${item.id}`}
                $active={activeSection === item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.id);
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>
          <Hamburger onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {[0, 1, 2].map((i) => (
              <HamburgerLine key={i} $open={mobileOpen} $index={i} />
            ))}
          </Hamburger>
        </NavInner>
      </Nav>
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.id}
                href={`#${item.id}`}
                $active={activeSection === item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.id);
                }}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
