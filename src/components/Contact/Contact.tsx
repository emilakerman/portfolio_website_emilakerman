"use client";

import styled from "styled-components";
import { theme } from "@/lib/theme";
import { SectionWrapper, SectionTitle } from "@/components/shared/Section";
import AnimatedReveal from "@/components/shared/AnimatedReveal";

const ContactText = styled.p`
  font-size: 18px;
  color: ${theme.colors.textMuted};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
`;

const LinksRow = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.bgCard};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  font-size: ${theme.fontSize.body};
  font-weight: 500;
  color: ${theme.colors.textMuted};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.15);
  }
`;

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <AnimatedReveal>
        <SectionTitle>Get in Touch</SectionTitle>
      </AnimatedReveal>
      <AnimatedReveal delay={0.1}>
        <ContactText>
          Interested in working together or have a question about one of my
          apps? Feel free to reach out through any of the channels below.
        </ContactText>
      </AnimatedReveal>
      <AnimatedReveal delay={0.2}>
        <LinksRow>
          <ContactLink href="mailto:dev@emilakerman.com">Email</ContactLink>
          <ContactLink
            href="https://github.com/emilakerman"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </ContactLink>
          <ContactLink
            href="https://linkedin.com/in/emilakerman"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </ContactLink>
        </LinksRow>
      </AnimatedReveal>
    </SectionWrapper>
  );
}
