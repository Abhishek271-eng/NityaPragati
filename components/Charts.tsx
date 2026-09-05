import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Polygon, Rect, Text as SvgText } from 'react-native-svg';
import { colors, fonts } from '../theme';

// ═══════════════════════════════════════════════════════════════
// Charts — lightweight SVG charts (no external chart lib).
// LineChart → accuracy trend · BarChart → weekly volume
// DonutChart → subject split · RadarChart → subject performance
// ═══════════════════════════════════════════════════════════════

interface SeriesPoint {
  label: string;
  value: number; // 0..100 for line/radar
}

/* ── Line / area trend ──────────────────────────────────────── */
export const LineChart: React.FC<{ data: SeriesPoint[]; height?: number; color?: string }> = ({
  data,
  height = 150,
  color = colors.primary,
}) => {
  const w = 300;
  const h = height;
  const padX = 8;
  const padY = 18;

  if (!data.length) return null;
  const max = Math.max(100, ...data.map((d) => d.value));
  const min = 0;
  const range = Math.max(1, max - min);
  const stepX = (w - padX * 2) / Math.max(1, data.length - 1);

  const pts = data.map((d, i) => ({
    x: padX + i * stepX,
    y: h - padY - ((d.value - min) / range) * (h - padY * 2),
    ...d,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L ${pts[pts.length - 1].x},${h - padY} L ${pts[0].x},${h - padY} Z`;

  return (
    <Svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`}>
      {[0.25, 0.5, 0.75, 1].map((f) => {
        const y = padY + (1 - f) * (h - padY * 2);
        return <Line key={f} x1={padX} x2={w - padX} y1={y} y2={y} stroke={colors.line} strokeDasharray="3 4" />;
      })}
      <Path d={areaPath} fill={color} opacity={0.12} />
      <Path d={linePath} stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
      {pts.map((p, i) =>
        i % Math.ceil(data.length / 6) === 0 || i === data.length - 1 ? (
          <Circle key={i} cx={p.x} cy={p.y} r={3} fill={colors.surface} stroke={color} strokeWidth={2} />
        ) : null,
      )}
      {pts.filter((_, i) => i % Math.ceil(data.length / 6) === 0 || i === data.length - 1).map((p, i) => (
        <SvgText key={i} x={p.x} y={h - 5} fontSize={9} fill={colors.slate} textAnchor="middle" fontFamily={fonts.body}>
          {p.label}
        </SvgText>
      ))}
    </Svg>
  );
};

/* ── Bar chart (7-day volume) ───────────────────────────────── */
export const BarChart: React.FC<{ data: SeriesPoint[]; height?: number; color?: string }> = ({
  data,
  height = 130,
  color = colors.primary,
}) => {
  const w = 300;
  const h = height;
  const padBottom = 18;
  const max = Math.max(1, ...data.map((d) => d.value));
  const barW = Math.min(34, (w - 20) / Math.max(1, data.length * 1.35));
  const gap = ((w - 20) - barW * data.length) / Math.max(1, data.length - 1);

  return (
    <Svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`}>
      {[0.25, 0.5, 0.75, 1].map((f) => {
        const y = 8 + (1 - f) * (h - padBottom - 8);
        return <Line key={f} x1={10} x2={w - 10} y1={y} y2={y} stroke={colors.line} strokeDasharray="3 4" />;
      })}
      {data.map((d, i) => {
        const bh = ((h - padBottom - 8 - 8) * d.value) / max;
        const x = 10 + i * (barW + gap);
        const y = h - padBottom - bh;
        return <Rect key={i} x={x} y={y} width={barW} height={bh} rx={Math.min(6, barW / 2)} fill={color} opacity={d.value > 0 ? 0.92 : 0.1} />;
      })}
      {data.map((d, i) => {
        const x = 10 + i * (barW + gap) + barW / 2;
        return (
          <SvgText key={i} x={x} y={h - 5} fontSize={9} fill={colors.slate} textAnchor="middle" fontFamily={fonts.body}>
            {d.label}
          </SvgText>
        );
      })}
    </Svg>
  );
};

/* ── Multi-segment donut (subject split) ────────────────────── */
export const DonutChart: React.FC<{
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
  strokeWidth?: number;
}> = ({ data, size = 170, strokeWidth = 22 }) => {
  const total = Math.max(1, data.reduce((s, d) => s + d.value, 0));
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;

  const segments = data
    .filter((d) => d.value > 0)
    .map((d, i) => {
      const frac = d.value / total;
      const from = acc;
      acc += frac;
      return { ...d, i, from, to: acc };
    });

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.line} strokeWidth={strokeWidth} fill="none" />
        {segments.map((s) => (
          <Circle
            key={s.i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={s.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${(s.to - s.from) * c} ${c}`}
            strokeDashoffset={-s.from * c}
            fill="none"
            strokeLinecap="butt"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        ))}
      </Svg>
    </View>
  );
};

/* ── Radar chart (subject performance) ──────────────────────── */
export const RadarChart: React.FC<{
  axes: string[]; // short labels
  values: number[]; // 0..100
  max?: number;
  size?: number;
  color?: string;
}> = ({ axes, values, max = 100, size = 220, color = colors.primary }) => {
  const cx = size / 2;
  const cy = size / 2;
  const R = (size - 30) / 2;
  const n = axes.length;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i: number, v: number) => {
    const rad = (v / max) * R;
    return [cx + rad * Math.cos(angle(i)), cy + rad * Math.sin(angle(i))];
  };

  // rings
  const rings = [0.25, 0.5, 0.75, 1].map((f) => {
    const pts = axes.map((_, i) => pt(i, max * f).join(',')).join(' ');
    return <Polygon key={f} points={pts} fill="none" stroke={colors.line} strokeWidth={1} />;
  });

  // spokes
  const spokes = axes.map((_, i) => {
    const [x2, y2] = pt(i, max);
    return <Line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke={colors.line} strokeWidth={1} />;
  });

  // value polygon
  const valPts = axes.map((_, i) => pt(i, values[i] ?? 0).join(',')).join(' ');
  const dotPts = axes.map((_, i) => {
    const [x, y] = pt(i, values[i] ?? 0);
    return <Circle key={i} cx={x} cy={y} r={3} fill={color} />;
  });

  // labels
  const labels = axes.map((label, i) => {
    const [x, y] = pt(i, max * 1.18);
    return (
      <SvgText key={i} x={x} y={y} fontSize={10} fill={colors.inkSoft} textAnchor="middle" fontFamily={fonts.body}>
        {label}
      </SvgText>
    );
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings}
      {spokes}
      <Polygon points={valPts} fill={color} opacity={0.18} stroke={color} strokeWidth={2} strokeLinejoin="round" />
      {dotPts}
      {labels}
    </Svg>
  );
};

export const ChartCard: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    <View style={styles.body}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
  },
  title: {
    color: colors.ink,
    fontFamily: fonts.heading,
    fontSize: 16,
  },
  subtitle: {
    color: colors.slate,
    fontFamily: fonts.body,
    fontSize: 12,
    marginTop: 2,
  },
  body: {
    alignItems: 'center',
    marginTop: 12,
  },
});