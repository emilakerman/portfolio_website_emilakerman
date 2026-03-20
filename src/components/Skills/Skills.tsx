'use client';

import styled from 'styled-components';
import { theme } from '@/lib/theme';
import { SectionWrapper, SectionTitle } from '@/components/shared/Section';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const Chip = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.colors.bgCard};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.full};
  font-size: ${theme.fontSize.small};
  font-weight: 500;
  color: ${theme.colors.textMuted};
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accentLight};
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.15);
  }
`;

const skills = [
  'React Native', 'Expo', 'Flutter', 'Next.js', 'TypeScript',
  'JavaScript', 'Swift', 'Kotlin', 'Firebase', 'Git',
  'Figma', 'Node.js', 'REST APIs',
];

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <AnimatedReveal>
        <SectionTitle>Skills</SectionTitle>
      </AnimatedReveal>
      <AnimatedReveal delay={0.2}>
        <ChipGrid>
          {skills.map((skill) => (
            <Chip key={skill}>{skill}</Chip>
          ))}
        </ChipGrid>
      </AnimatedReveal>
    </SectionWrapper>
  );
}
