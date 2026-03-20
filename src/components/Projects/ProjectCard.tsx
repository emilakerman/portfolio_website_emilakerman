'use client';

import styled from 'styled-components';
import { theme } from '@/lib/theme';
import PhoneMockup from '@/components/PhoneMockup/PhoneMockup';
import type { Project } from '@/data/projects';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.bgCard};
  border: 1px solid ${theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.borderLight};
    background: ${theme.colors.bgLight};
  }
`;

const AppName = styled.h3`
  font-size: ${theme.fontSize.h3};
  font-weight: 700;
  color: ${theme.colors.text};
`;

const AppDescription = styled.p`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.textMuted};
  text-align: center;
  line-height: 1.6;
`;

const PlatformBadge = styled.span<{ $color: string }>`
  font-size: ${theme.fontSize.xs};
  color: ${({ $color }) => $color};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Card>
      <PhoneMockup
        platform={project.platform}
        accentColor={project.accentColor}
        appId={project.id}
        index={index}
        screenshotUrl={project.screenshotUrl}
      />
      <PlatformBadge $color={project.accentColor}>{project.framework}</PlatformBadge>
      <AppName>{project.name}</AppName>
      <AppDescription>{project.description}</AppDescription>
    </Card>
  );
}
