'use client';

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/lib/theme';
import { PrimaryButton, SecondaryButton } from '@/components/shared/Button.styles';

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  position: relative;
  overflow: hidden;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${pulse} 6s ease-in-out infinite;
  pointer-events: none;
`;

const GradientName = styled(motion.h1)`
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 800;
  letter-spacing: -2px;
  background: linear-gradient(135deg, ${theme.colors.text} 0%, ${theme.colors.accent} 50%, ${theme.colors.accentLight} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: ${theme.spacing.md};
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(18px, 3vw, 24px);
  color: ${theme.colors.textMuted};
  font-weight: 400;
  margin-bottom: ${theme.spacing['2xl']};
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Hero() {
  return (
    <HeroSection id="hero">
      <BackgroundGlow />
      <GradientName
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Emil Akerman
      </GradientName>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Mobile App Developer
      </Subtitle>
      <ButtonGroup
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <PrimaryButton href="#projects">View Projects</PrimaryButton>
        <SecondaryButton href="#contact">Get in Touch</SecondaryButton>
      </ButtonGroup>
    </HeroSection>
  );
}
