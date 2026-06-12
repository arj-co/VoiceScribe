'use client';

import { PracticeSession } from '@/types/app';

export interface ProgressChartProps {
  sessions: PracticeSession[];
}

export default function ProgressChart({ sessions }: ProgressChartProps) {
  if (sessions.length < 2) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Complete at least 2 sessions to see your progress chart
      </p>
    );
  }

  // Oldest → newest, capped at last 10
  const dataPoints = sessions.slice(0, 10).reverse();

  const width = 600;
  const height = 200;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 20;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number): number =>
    paddingLeft + (index / (dataPoints.length - 1)) * chartWidth;

  const getY = (score: number): number =>
    paddingTop + chartHeight - (score / 100) * chartHeight;

  // Build smooth cubic bezier path
  const buildPath = (): string => {
    if (dataPoints.length === 0) return '';

    const points = dataPoints.map((s, i) => ({
      x: getX(i),
      y: getY(s.analysis?.fluencyScore ?? s.stats.fluencyScore),
    }));

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` C ${cpx} ${prev.y} ${cpx} ${curr.y} ${curr.x} ${curr.y}`;
    }

    return d;
  };

  // Build the filled area path (same curve, closed below)
  const buildAreaPath = (): string => {
    if (dataPoints.length === 0) return '';

    const points = dataPoints.map((s, i) => ({
      x: getX(i),
      y: getY(s.analysis?.fluencyScore ?? s.stats.fluencyScore),
    }));

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` C ${cpx} ${prev.y} ${cpx} ${curr.y} ${curr.x} ${curr.y}`;
    }

    // Close the area below
    const bottomY = paddingTop + chartHeight;
    d += ` L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;

    return d;
  };

  // Horizontal grid lines at score levels 25, 50, 75, 100
  const gridLines = [25, 50, 75, 100];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      aria-label="Fluency score progress chart"
      role="img"
    >
      <defs>
        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {gridLines.map((score) => {
        const y = getY(score);
        return (
          <g key={score}>
            <line
              x1={paddingLeft}
              y1={y}
              x2={width - paddingRight}
              y2={y}
              stroke="#888"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
            {/* Y axis labels */}
            <text
              x={paddingLeft - 6}
              y={y + 4}
              fontSize="10"
              fill="currentColor"
              opacity="0.4"
              textAnchor="end"
            >
              {score}
            </text>
          </g>
        );
      })}

      {/* Gradient fill area */}
      <path d={buildAreaPath()} fill="url(#scoreGradient)" />

      {/* Line */}
      <path
        d={buildPath()}
        stroke="#3B82F6"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points, labels, and date labels */}
      {dataPoints.map((session, i) => {
        const score = session.analysis?.fluencyScore ?? session.stats.fluencyScore;
        const x = getX(i);
        const y = getY(score);
        const dateLabel = new Date(session.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });

        return (
          <g key={session.id}>
            {/* Score label above the point */}
            <text
              x={x}
              y={y - 14}
              fontSize="10"
              fill="currentColor"
              textAnchor="middle"
            >
              {score}
            </text>

            {/* Data point circle */}
            <circle
              cx={x}
              cy={y}
              r="4"
              fill="#3B82F6"
              stroke="white"
              strokeWidth="2"
            />

            {/* X axis date label */}
            <text
              x={x}
              y={195}
              fontSize="9"
              fill="currentColor"
              opacity="0.5"
              textAnchor="middle"
            >
              {dateLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
