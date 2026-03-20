'use client';

import styled from 'styled-components';
import { theme } from '@/lib/theme';

export const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.accent};
  color: white;
  font-size: ${theme.fontSize.body};
  font-weight: 600;
  border-radius: ${theme.radius.full};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  }
`;

export const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: transparent;
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.body};
  font-weight: 600;
  border-radius: ${theme.radius.full};
  border: 1px solid ${theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accentLight};
    transform: translateY(-2px);
  }
`;
