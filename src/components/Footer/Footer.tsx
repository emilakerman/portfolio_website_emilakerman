'use client';

import styled from 'styled-components';
import { theme } from '@/lib/theme';

const FooterWrapper = styled.footer`
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  text-align: center;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const Copyright = styled.p`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.textDim};
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
`;

const FooterLink = styled.a`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.textDim};
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <Copyright>&copy; {new Date().getFullYear()} Emil Akerman</Copyright>
        <FooterLinks>
          <FooterLink href="https://github.com/emilakerman" target="_blank" rel="noopener noreferrer">
            GitHub
          </FooterLink>
          <FooterLink href="https://linkedin.com/in/emilakerman" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </FooterLink>
        </FooterLinks>
      </FooterInner>
    </FooterWrapper>
  );
}
