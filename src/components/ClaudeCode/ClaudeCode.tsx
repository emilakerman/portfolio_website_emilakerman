'use client';

import styled, { keyframes } from 'styled-components';
import { theme } from '@/lib/theme';
import { SectionWrapper, SectionTitle } from '@/components/shared/Section';
import AnimatedReveal from '@/components/shared/AnimatedReveal';

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled.div`
  p {
    font-size: ${theme.fontSize.body};
    color: ${theme.colors.textMuted};
    line-height: 1.8;
    margin-bottom: ${theme.spacing.md};
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Terminal = styled.div`
  background: #0d0d14;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #111118;
  border-bottom: 1px solid ${theme.colors.border};
`;

const TerminalDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const TerminalTitle = styled.span`
  color: ${theme.colors.textDim};
  font-size: 12px;
  margin-left: 8px;
`;

const TerminalBody = styled.div`
  padding: 16px;
  line-height: 1.8;
`;

const Line = styled.div<{ $color?: string }>`
  color: ${({ $color }) => $color || theme.colors.textMuted};
  white-space: pre-wrap;
  word-break: break-word;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: ${theme.colors.accent};
  animation: ${blink} 1s step-end infinite;
  vertical-align: text-bottom;
  margin-left: 2px;
`;

const Prompt = styled.span`
  color: ${theme.colors.accent};
`;

export default function ClaudeCode() {
  return (
    <SectionWrapper id="claude-code">
      <AnimatedReveal>
        <SectionTitle>Claude Code</SectionTitle>
      </AnimatedReveal>
      <Content>
        <AnimatedReveal delay={0.1}>
          <TextContent>
            <p>
              I leverage Claude Code as an AI-powered development partner to accelerate my workflow.
              From scaffolding new projects to debugging complex issues, Claude helps me ship faster
              while maintaining high code quality.
            </p>
            <p>
              This entire portfolio was built with Claude Code — from the initial project setup
              to the animated phone mockups and responsive layouts.
            </p>
          </TextContent>
        </AnimatedReveal>
        <AnimatedReveal delay={0.2}>
          <Terminal>
            <TerminalHeader>
              <TerminalDot $color="#ff5f57" />
              <TerminalDot $color="#febc2e" />
              <TerminalDot $color="#28c840" />
              <TerminalTitle>claude-code</TerminalTitle>
            </TerminalHeader>
            <TerminalBody>
              <Line $color={theme.colors.textDim}>$ claude</Line>
              <Line>&nbsp;</Line>
              <Line $color={theme.colors.accent}>{'>'} Build a portfolio with animated</Line>
              <Line $color={theme.colors.accent}>  phone mockups for my 6 apps</Line>
              <Line>&nbsp;</Line>
              <Line $color="#22c55e">✓ Created Next.js project</Line>
              <Line $color="#22c55e">✓ Built CSS phone frames</Line>
              <Line $color="#22c55e">✓ Added 3D hover effects</Line>
              <Line $color="#22c55e">✓ Responsive grid layout</Line>
              <Line>&nbsp;</Line>
              <Line>
                <Prompt>{'>'} </Prompt>
                <Cursor />
              </Line>
            </TerminalBody>
          </Terminal>
        </AnimatedReveal>
      </Content>
    </SectionWrapper>
  );
}
