'use client';

import styled from 'styled-components';
import { theme } from '@/lib/theme';

const SectionWrapper = styled.section<{ $noPadTop?: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ $noPadTop }) => ($noPadTop ? '0' : theme.spacing['4xl'])} ${theme.spacing.lg} ${theme.spacing['4xl']};

  @media (min-width: ${theme.breakpoints.md}) {
    padding-left: ${theme.spacing['2xl']};
    padding-right: ${theme.spacing['2xl']};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.h1};
  font-weight: 700;
  margin-bottom: ${theme.spacing['2xl']};
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSize.h2};
  }
`;

export { SectionWrapper, SectionTitle };
