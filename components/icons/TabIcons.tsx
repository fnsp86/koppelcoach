import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * TabVandaag - A cozy house with a small heart in the center.
 * Rounded roof line, warm proportions.
 */
export const TabVandaag: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Rounded roof */}
    <Path
      d="M3.5 11C3.5 11 6 8 12 4C18 8 20.5 11 20.5 11"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* House body */}
    <Path
      d="M5.5 10V18.5C5.5 19.3 6.2 20 7 20H17C17.8 20 18.5 19.3 18.5 18.5V10"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Heart in center */}
    <Path
      d="M12 13.2C11.3 12.4 10.2 12.3 9.7 12.9C9.2 13.5 9.4 14.4 12 16C14.6 14.4 14.8 13.5 14.3 12.9C13.8 12.3 12.7 12.4 12 13.2Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * TabOntdek - A compass with organic curved cardinal points
 * and a diamond in the center.
 */
export const TabOntdek: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Outer circle */}
    <Circle
      cx={12}
      cy={12}
      r={9.5}
      stroke={color}
      strokeWidth={strokeWidth}
    />
    {/* Inner compass diamond - organic rhombus shape */}
    <Path
      d="M14.5 9.5L13.2 13.2L9.5 14.5L10.8 10.8L14.5 9.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Small center dot */}
    <Circle
      cx={12}
      cy={12}
      r={1}
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
    />
    {/* Cardinal soft ticks */}
    <Path
      d="M12 2.5V5"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
    />
    <Path
      d="M21.5 12H19"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
    />
    <Path
      d="M12 21.5V19"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
    />
    <Path
      d="M2.5 12H5"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      strokeLinecap="round"
    />
  </Svg>
);

/**
 * TabVerhaal - An open book with a heart rising from the pages.
 * Gently curved spine.
 */
export const TabVerhaal: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Left page */}
    <Path
      d="M12 7C12 7 10 5 6.5 5C4 5 2.5 6 2.5 7.5V18C2.5 18 4.5 17 6.5 17C9.5 17 12 19 12 19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right page */}
    <Path
      d="M12 7C12 7 14 5 17.5 5C20 5 21.5 6 21.5 7.5V18C21.5 18 19.5 17 17.5 17C14.5 17 12 19 12 19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Spine line */}
    <Path
      d="M12 19V7"
      stroke={color}
      strokeWidth={strokeWidth * 0.7}
      strokeLinecap="round"
    />
    {/* Small heart rising above book */}
    <Path
      d="M12 4C11.5 3.3 10.6 3.2 10.2 3.7C9.8 4.2 9.9 4.8 12 6C14.1 4.8 14.2 4.2 13.8 3.7C13.4 3.2 12.5 3.3 12 4Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * TabBespreek - Two overlapping speech bubbles, one slightly smaller.
 * Rounded corners, conversational feel.
 */
export const TabBespreek: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Larger bubble (left, behind) */}
    <Path
      d="M3 5C3 3.9 3.9 3 5 3H14C15.1 3 16 3.9 16 5V10.5C16 11.6 15.1 12.5 14 12.5H9L6 15.5C6 15.5 6.2 13.5 6.3 12.5H5C3.9 12.5 3 11.6 3 10.5V5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Smaller bubble (right, front) */}
    <Path
      d="M16 7.5H19C20.1 7.5 21 8.4 21 9.5V14.5C21 15.6 20.1 16.5 19 16.5H18.7C18.8 17.5 19 19.5 19 19.5L16 16.5H11C9.9 16.5 9 15.6 9 14.5V12.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * TabWij - Two hearts interlinked/overlapping, forming a unified shape.
 * They share a center point and meet at the bottom.
 */
export const TabWij: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Left heart */}
    <Path
      d="M8.5 6C6.8 6 5 7.2 5 9.5C5 13.5 9 16.5 12 20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.5 6C10.2 6 11.5 7 12 8.2"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right heart */}
    <Path
      d="M15.5 6C17.2 6 19 7.2 19 9.5C19 13.5 15 16.5 12 20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.5 6C13.8 6 12.5 7 12 8.2"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
