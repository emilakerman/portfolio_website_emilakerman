"use client";

import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "@/lib/theme";
import type { Platform } from "@/data/projects";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const PhoneWrapper = styled.div<{ $delay: number }>`
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  perspective: 800px;
`;

const PhoneGlow = styled.div<{ $color: string }>`
  position: absolute;
  inset: -20px;
  border-radius: 60px;
  background: radial-gradient(
    ellipse at center,
    ${({ $color }) => $color}22 0%,
    transparent 70%
  );
  z-index: 0;
  transition: all 0.4s ease;
`;

const PhoneFrame = styled.div<{ $isIos: boolean; $color: string }>`
  position: relative;
  width: 200px;
  height: 410px;
  border-radius: ${({ $isIos }) => ($isIos ? "44px" : "28px")};
  background: #1a1a24;
  border: 3px solid #2a2a3a;
  overflow: hidden;
  z-index: 1;
  transition:
    transform 0.15s ease-out,
    box-shadow 0.3s ease;
  will-change: transform;

  &:hover {
    box-shadow: 0 20px 60px ${({ $color }) => $color}30;
  }

  /* Side buttons */
  &::before {
    content: "";
    position: absolute;
    right: -6px;
    top: 100px;
    width: 3px;
    height: 40px;
    background: #2a2a3a;
    border-radius: 0 2px 2px 0;
  }

  &::after {
    content: "";
    position: absolute;
    left: -6px;
    top: 80px;
    width: 3px;
    height: 30px;
    background: #2a2a3a;
    border-radius: 2px 0 0 2px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 170px;
    height: 348px;
  }
`;

const Notch = styled.div<{ $isIos: boolean }>`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;

  width: 12px;
  height: 12px;
  background: #2a2a3a;
  border-radius: 50%;
`;

const Screen = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #1e1e2e 0%, #16161f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px 20px;
`;

const PlaceholderShimmer = styled.div`
  width: 80%;
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, #2a2a3a 0%, #3a3a4a 50%, #2a2a3a 100%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  margin-bottom: 10px;
`;

const PlaceholderCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(90deg, #2a2a3a 0%, #3a3a4a 50%, #2a2a3a 100%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  margin-bottom: 20px;
`;

const BottomPill = styled.div<{ $isIos: boolean }>`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ $isIos }) => ($isIos ? "100px" : "80px")};
  height: 4px;
  background: #3a3a4a;
  border-radius: 2px;
`;

const ScreenshotImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

interface PhoneMockupProps {
  platform: Platform;
  accentColor: string;
  appId: string;
  index: number;
  screenshotUrl?: string;
}

export default function PhoneMockup({
  platform,
  accentColor,
  appId,
  index,
  screenshotUrl,
}: PhoneMockupProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const isIos = platform === "ios" || (platform === "both" && index % 2 === 0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 10}deg)`;
  };

  const handleMouseLeave = () => {
    const frame = frameRef.current;
    if (frame) frame.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <PhoneWrapper $delay={index * 0.5}>
      <PhoneGlow $color={accentColor} />
      <PhoneFrame
        ref={frameRef}
        $isIos={isIos}
        $color={accentColor}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Notch $isIos={isIos} />
        {screenshotUrl ? (
          <ScreenshotImg src={screenshotUrl} alt={`${appId} screenshot`} />
        ) : (
          <Screen>
            <PlaceholderCircle />
            <PlaceholderShimmer />
            <PlaceholderShimmer style={{ width: "60%" }} />
            <PlaceholderShimmer style={{ width: "70%", marginTop: "20px" }} />
            <PlaceholderShimmer style={{ width: "50%" }} />
          </Screen>
        )}
        <BottomPill $isIos={isIos} />
      </PhoneFrame>
    </PhoneWrapper>
  );
}
