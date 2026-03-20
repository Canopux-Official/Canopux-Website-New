import { Handle, Position } from "@xyflow/react";

export type OutputNodeData = {
  label: string;
  desc?: string;
  accentColor?: string;
  isSelected?: boolean;
};

export default function OutputNode({ data }: { data: OutputNodeData }) {
  const accent = data.accentColor ?? "#10B981";
  const sel = data.isSelected;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: accent,
          border: `2px solid rgba(0,0,0,0.6)`,
          width: 8, height: 8,
          top: -4,
        }}
      />

      <div
        style={{
          background: sel
            ? `linear-gradient(145deg, ${accent}30, ${accent}15)`
            : `linear-gradient(145deg, ${accent}18, ${accent}08)`,
          border: `1.5px solid ${sel ? accent + "cc" : accent + "50"}`,
          borderRadius: "12px",
          padding: "8px 12px",
          width: "120px",
          boxShadow: sel
            ? `0 0 30px ${accent}45, 0 0 60px ${accent}15, inset 0 1px 0 ${accent}40`
            : `0 0 18px ${accent}20, inset 0 1px 0 ${accent}25`,
          textAlign: "center",
          position: "relative",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {/* Live indicator dot */}
        <div style={{
          position: "absolute",
          top: 10, right: 12,
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 6px ${accent}, 0 0 12px ${accent}88`,
            animation: "pulse 2s infinite",
          }} />
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          background: `${accent}18`,
          border: `1px solid ${accent}40`,
          borderRadius: "4px",
          padding: "2px 8px",
          marginBottom: "8px",
        }}>
          <span style={{
            color: accent,
            fontSize: "8px",
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>output</span>
        </div>

        <div style={{
          color: accent,
          fontFamily: "'DM Sans', 'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          lineHeight: 1.25,
          marginBottom: data.desc ? "5px" : 0,
        }}>
          {data.label}
        </div>

        {data.desc && (
          <div style={{
            color: `${accent}88`,
            fontSize: "9.5px",
            fontFamily: "'DM Sans', 'Inter', sans-serif",
            lineHeight: 1.45,
          }}>
            {data.desc}
          </div>
        )}
      </div>
    </>
  );
}