import React from 'react';
import Svg, { Path, Circle, Defs, ClipPath, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * CheckInHeart - A heart with a subtle pulse/heartbeat line through it.
 */
export const CheckInHeart: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Heart outline */}
    <Path
      d="M12 7.5C10.8 5.8 8.5 5 6.8 6.2C5.1 7.4 4.8 9.8 6.5 12C8.2 14.2 12 19 12 19C12 19 15.8 14.2 17.5 12C19.2 9.8 18.9 7.4 17.2 6.2C15.5 5 13.2 5.8 12 7.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Heartbeat line */}
    <Path
      d="M5 12.5H8.5L10 10.5L12 14L14 10.5L15.5 12.5H19"
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * ConnectionLink - Two chain links softly connected, curved.
 */
export const ConnectionLink: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Left link */}
    <Path
      d="M9 7.5C9 7.5 5 7 4.5 10.5C4 14 7.5 15 9 14.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 7.5C9 7.5 12 7 12 11C12 15 9 14.5 9 14.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right link */}
    <Path
      d="M15 9.5C15 9.5 12 9 12 13C12 17 15 16.5 15 16.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 9.5C15 9.5 19 9 19.5 12.5C20 16 16.5 17 15 16.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * StarMoment - A warm star with organic rounded points.
 */
export const StarMoment: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3C12 3 13.5 8 14 9.5C15.5 9.5 20 9 20 9C20 9 16.5 12 15.5 13C16 14.5 18 19.5 18 19.5C18 19.5 14 16.5 12 15.5C10 16.5 6 19.5 6 19.5C6 19.5 8 14.5 8.5 13C7.5 12 4 9 4 9C4 9 8.5 9.5 10 9.5C10.5 8 12 3 12 3Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * MilestoneFlag - A small pennant/flag on a curved pole.
 */
export const MilestoneFlag: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Curved pole */}
    <Path
      d="M6.5 3C6.5 3 6 10 6.5 15C6.8 18 7 21 7 21"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Flag pennant */}
    <Path
      d="M6.5 4C6.5 4 10 3.5 13 5C16 6.5 19 6 19 6C19 6 16.5 8 13.5 9.5C10.5 11 6.5 11 6.5 11"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Small base circle */}
    <Circle
      cx={7}
      cy={21}
      r={0.5}
      stroke={color}
      strokeWidth={strokeWidth * 0.5}
    />
  </Svg>
);

/**
 * GratitudeHeart - A heart with small petal/leaf shapes around it,
 * like a flower blooming.
 */
export const GratitudeHeart: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Central heart */}
    <Path
      d="M12 10C11 8.8 9.5 8.5 8.5 9.3C7.5 10.1 7.3 11.5 8.5 13C9.5 14.2 12 17 12 17C12 17 14.5 14.2 15.5 13C16.7 11.5 16.5 10.1 15.5 9.3C14.5 8.5 13 8.8 12 10Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Top petal */}
    <Path
      d="M12 6.5C12 6.5 11 4.5 12 3.5C13 4.5 12 6.5 12 6.5Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Top-right petal */}
    <Path
      d="M15.5 7.5C15.5 7.5 16.5 5.5 18 5.5C17.5 7 15.5 7.5 15.5 7.5Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Top-left petal */}
    <Path
      d="M8.5 7.5C8.5 7.5 7.5 5.5 6 5.5C6.5 7 8.5 7.5 8.5 7.5Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right petal */}
    <Path
      d="M18 11C18 11 20 10.5 20.5 12C19 12.5 18 11 18 11Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Left petal */}
    <Path
      d="M6 11C6 11 4 10.5 3.5 12C5 12.5 6 11 6 11Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * ReflectionPen - A pen/quill with a gentle curve, writing on a line.
 */
export const ReflectionPen: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Quill body - curved */}
    <Path
      d="M18 3C18 3 20 3 20.5 5C21 7 19 9 16 12C13 15 9.5 17.5 8 18.5L6 20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Quill feather curve */}
    <Path
      d="M18 3C18 3 15 5 14 8"
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Nib detail */}
    <Path
      d="M8 18.5L5 21.5"
      stroke={color}
      strokeWidth={strokeWidth * 0.75}
      strokeLinecap="round"
    />
    {/* Writing line */}
    <Path
      d="M3 21.5C3 21.5 8 21 13 20.5"
      stroke={color}
      strokeWidth={strokeWidth * 0.7}
      strokeLinecap="round"
    />
  </Svg>
);

/**
 * GraduatedHeart - A heart that fills from bottom to top based on fillLevel.
 * Used for Likert scales in quiz and check-in screens.
 * fillLevel: 0 = empty outline, 1 = quarter, 2 = half, 3 = three-quarter, 4 = full
 */
const HEART_PATH =
  'M12 7.5C10.8 5.8 8.5 5 6.8 6.2C5.1 7.4 4.8 9.8 6.5 12C8.2 14.2 12 19 12 19C12 19 15.8 14.2 17.5 12C19.2 9.8 18.9 7.4 17.2 6.2C15.5 5 13.2 5.8 12 7.5Z';

// Heart path bounds: y=5 (top of bumps) to y=19 (bottom tip), height ~14
// Fill from bottom: fillY values for each level
const FILL_Y: Record<number, number> = { 1: 15.5, 2: 12, 3: 8.5, 4: 5 };

interface GraduatedHeartProps {
  size?: number;
  color?: string;
  fillLevel: 0 | 1 | 2 | 3 | 4;
  strokeWidth?: number;
}

export const GraduatedHeart: React.FC<GraduatedHeartProps> = ({
  size = 24,
  color = '#C4704B',
  fillLevel = 0,
  strokeWidth = 1.8,
}) => {
  const fillY = FILL_Y[fillLevel];

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {fillLevel > 0 && (
        <>
          <Defs>
            <ClipPath id="hc">
              <Path d={HEART_PATH} />
            </ClipPath>
          </Defs>
          <Rect
            x="0"
            y={fillY}
            width="24"
            height={24 - fillY}
            fill={color}
            clipPath="url(#hc)"
            opacity={fillLevel === 4 ? 1 : 0.85}
          />
        </>
      )}
      <Path
        d={HEART_PATH}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

/**
 * MomentCamera - A camera shape with a heart in the lens, rounded corners.
 */
export const MomentCamera: React.FC<IconProps> = ({
  size = 24,
  color = '#1B2838',
  strokeWidth = 2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Camera body - rounded */}
    <Path
      d="M3 8.5C3 7.4 3.9 6.5 5 6.5H6.5L8 4.5H16L17.5 6.5H19C20.1 6.5 21 7.4 21 8.5V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V8.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lens circle */}
    <Circle
      cx={12}
      cy={13}
      r={4}
      stroke={color}
      strokeWidth={strokeWidth}
    />
    {/* Heart inside lens */}
    <Path
      d="M12 11.8C11.5 11.2 10.7 11.1 10.3 11.6C9.9 12.1 10 12.7 12 14.2C14 12.7 14.1 12.1 13.7 11.6C13.3 11.1 12.5 11.2 12 11.8Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.65}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
