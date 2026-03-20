'use client';

import { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/lib/theme';

type City = 'hamburg' | 'berlin';

interface PollData {
  hamburg: number;
  berlin: number;
}

export default function AmsterdampPage() {
  const [votes, setVotes] = useState<PollData>({ hamburg: 0, berlin: 0 });
  const [voted, setVoted] = useState<City | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchVotes = useCallback(async () => {
    try {
      const res = await fetch('/api/poll');
      if (res.ok) {
        const data = await res.json();
        setVotes({ hamburg: data.hamburg, berlin: data.berlin });
      }
    } catch {
      // silently retry on next interval
    }
  }, []);

  // Poll for updates every 2 seconds
  useEffect(() => {
    fetchVotes();
    const interval = setInterval(fetchVotes, 2000);
    return () => clearInterval(interval);
  }, [fetchVotes]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) return 0;
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVote = async (city: City) => {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setCooldown(data.retryAfter || 60);
        setError('Wait a bit before voting again!');
      } else if (res.ok) {
        setVotes({ hamburg: data.hamburg, berlin: data.berlin });
        setVoted(city);
        setCooldown(60);
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = votes.hamburg + votes.berlin;
  const hamburgPct = total > 0 ? Math.round((votes.hamburg / total) * 100) : 50;
  const berlinPct = total > 0 ? Math.round((votes.berlin / total) * 100) : 50;

  return (
    <PageWrapper>
      <Content
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Where should I move?</Title>
        <Subtitle>Help me decide — cast your vote!</Subtitle>

        <PollContainer>
          <VoteOption
            onClick={() => handleVote('hamburg')}
            $disabled={cooldown > 0 || loading}
            $selected={voted === 'hamburg'}
            as={motion.button}
            whileHover={cooldown > 0 ? {} : { scale: 1.02 }}
            whileTap={cooldown > 0 ? {} : { scale: 0.98 }}
          >
            <CityEmoji>🏗️</CityEmoji>
            <CityName>Hamburg</CityName>
            <VoteCount>{votes.hamburg} votes</VoteCount>
          </VoteOption>

          <VsLabel>VS</VsLabel>

          <VoteOption
            onClick={() => handleVote('berlin')}
            $disabled={cooldown > 0 || loading}
            $selected={voted === 'berlin'}
            as={motion.button}
            whileHover={cooldown > 0 ? {} : { scale: 1.02 }}
            whileTap={cooldown > 0 ? {} : { scale: 0.98 }}
          >
            <CityEmoji>🐻</CityEmoji>
            <CityName>Berlin</CityName>
            <VoteCount>{votes.berlin} votes</VoteCount>
          </VoteOption>
        </PollContainer>

        {total > 0 && (
          <BarContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <BarTrack>
              <BarFillHamburg
                as={motion.div}
                initial={{ width: '50%' }}
                animate={{ width: `${hamburgPct}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <BarFillBerlin
                as={motion.div}
                initial={{ width: '50%' }}
                animate={{ width: `${berlinPct}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </BarTrack>
            <BarLabels>
              <BarLabel>Hamburg {hamburgPct}%</BarLabel>
              <BarLabel>Berlin {berlinPct}%</BarLabel>
            </BarLabels>
            <TotalVotes>{total} total votes</TotalVotes>
          </BarContainer>
        )}

        {cooldown > 0 && (
          <CooldownText>
            You can vote again in {cooldown}s
          </CooldownText>
        )}

        {error && <ErrorText>{error}</ErrorText>}

        <BackLink href="/">← Back to portfolio</BackLink>
      </Content>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['2xl']};
  background: ${theme.colors.bg};
`;

const Content = styled.div`
  max-width: 560px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.hero};
  font-weight: 700;
  background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSize.h1};
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.body};
  margin-bottom: ${theme.spacing['2xl']};
`;

const PollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
`;

const VoteOption = styled.button<{ $disabled: boolean; $selected: boolean }>`
  flex: 1;
  background: ${({ $selected }) =>
    $selected ? `${theme.colors.accent}15` : theme.colors.bgCard};
  border: 2px solid ${({ $selected }) =>
    $selected ? theme.colors.accent : theme.colors.border};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: border-color 0.2s, background 0.2s, opacity 0.2s;
  width: 100%;
  font-family: inherit;
  animation: ${({ $selected }) => ($selected ? pulse : 'none')} 2s infinite;

  &:hover {
    border-color: ${({ $disabled }) =>
      $disabled ? theme.colors.border : theme.colors.accentLight};
    background: ${({ $disabled }) =>
      $disabled ? theme.colors.bgCard : `${theme.colors.accent}10`};
  }
`;

const CityEmoji = styled.div`
  font-size: 48px;
  margin-bottom: ${theme.spacing.sm};
`;

const CityName = styled.div`
  font-size: ${theme.fontSize.h2};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const VoteCount = styled.div`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.textMuted};
`;

const VsLabel = styled.span`
  font-size: ${theme.fontSize.h3};
  font-weight: 700;
  color: ${theme.colors.textDim};

  @media (max-width: ${theme.breakpoints.sm}) {
    margin: -${theme.spacing.sm} 0;
  }
`;

const BarContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const BarTrack = styled.div`
  display: flex;
  height: 12px;
  border-radius: ${theme.radius.full};
  overflow: hidden;
  background: ${theme.colors.bgLight};
`;

const BarFillHamburg = styled.div`
  background: linear-gradient(90deg, #6366f1, #818cf8);
  height: 100%;
  min-width: 2%;
`;

const BarFillBerlin = styled.div`
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  height: 100%;
  min-width: 2%;
`;

const BarLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.sm};
`;

const BarLabel = styled.span`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.textMuted};
`;

const TotalVotes = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textDim};
  margin-top: ${theme.spacing.xs};
`;

const CooldownText = styled.p`
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.accentLight};
  margin-bottom: ${theme.spacing.md};
`;

const ErrorText = styled.p`
  font-size: ${theme.fontSize.small};
  color: #ef4444;
  margin-bottom: ${theme.spacing.md};
`;

const BackLink = styled.a`
  display: inline-block;
  font-size: ${theme.fontSize.small};
  color: ${theme.colors.textDim};
  margin-top: ${theme.spacing.lg};
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.accentLight};
  }
`;
