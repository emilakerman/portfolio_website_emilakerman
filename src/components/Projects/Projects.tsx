'use client';

import styled from 'styled-components';
import { theme } from '@/lib/theme';
import { SectionWrapper, SectionTitle } from '@/components/shared/Section';
import AnimatedReveal from '@/components/shared/AnimatedReveal';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <AnimatedReveal>
        <SectionTitle>Projects</SectionTitle>
      </AnimatedReveal>
      <ProjectGrid>
        {projects.map((project, i) => (
          <AnimatedReveal key={project.id} delay={i * 0.1}>
            <ProjectCard project={project} index={i} />
          </AnimatedReveal>
        ))}
      </ProjectGrid>
    </SectionWrapper>
  );
}
