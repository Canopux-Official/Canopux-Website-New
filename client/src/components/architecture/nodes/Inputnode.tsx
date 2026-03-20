import { Handle, Position } from "@xyflow/react";

export type InputNodeData = {
  label: string;
  desc?: string;
  accentColor?: string;
  isSelected?: boolean;
};

export default function InputNode({ data }: { data: InputNodeData }) {
  const accent = data.accentColor ?? "#10B981";

  return (
    <>
      <div
        style={{
          background: `linear-gradient(145deg, ${accent}20, ${accent}0D)`,
          border: `1px solid ${accent}55`,
          borderRadius: "12px",
          padding: "8px 12px",
          width: "120px",
          boxShadow: `0 0 20px ${accent}25, inset 0 1px 0 ${accent}30`,
          textAlign: "center",
          position: "relative",
          cursor: "pointer",
        }}
      >
        {/* Top glow line */}
        <div style={{
          position: "absolute",
          top: 0, left: "15%",
          width: "70%", height: "1px",
          background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
          borderRadius: "1px",
        }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          background: `${accent}15`,
          border: `1px solid ${accent}35`,
          borderRadius: "4px",
          padding: "2px 8px",
          marginBottom: "8px",
        }}>
          <div style={{
            width: 5, height: 5,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 5px ${accent}`,
          }} />
          <span style={{
            color: accent,
            fontSize: "8px",
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>source</span>
        </div>

        <div style={{
          color: "#f2f2f2",
          fontFamily: "'DM Sans', 'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "12.5px",
          lineHeight: 1.25,
          marginBottom: data.desc ? "5px" : 0,
        }}>
          {data.label}
        </div>

        {data.desc && (
          <div style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "9.5px",
            fontFamily: "'DM Sans', 'Inter', sans-serif",
            lineHeight: 1.45,
          }}>
            {data.desc}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: accent,
          border: `2px solid rgba(0,0,0,0.6)`,
          width: 8, height: 8,
          bottom: -4,
        }}
      />
    </>
  );
}