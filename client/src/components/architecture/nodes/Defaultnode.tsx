import { Handle, Position } from "@xyflow/react";

export type DefaultNodeData = {
  label: string;
  desc?: string;
  accentColor?: string;
  isSelected?: boolean;
};

export default function DefaultNode({ data }: { data: DefaultNodeData }) {
  const accent = data.accentColor ?? "#10B981";
  const sel = data.isSelected;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: sel ? accent : "rgba(255,255,255,0.25)",
          border: `2px solid rgba(0,0,0,0.6)`,
          width: 8, height: 8,
          top: -4,
        }}
      />

      <div
        style={{
          background: sel
            ? `linear-gradient(145deg, ${accent}18, ${accent}08)`
            : "rgba(22, 22, 30, 0.95)",
          border: `1px solid ${sel ? accent + "55" : "rgba(255,255,255,0.10)"}`,
          borderRadius: "12px",
          padding: "8px 12px",
          width: "120px",
          boxShadow: sel
            ? `0 0 20px ${accent}25, inset 0 1px 0 ${accent}20`
            : "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: "4px",
          padding: "2px 8px",
          marginBottom: "8px",
        }}>
          <div style={{
            width: 4, height: 4,
            borderRadius: "50%",
            background: sel ? accent : "rgba(255,255,255,0.3)",
          }} />
          <span style={{
            color: sel ? accent : "rgba(255,255,255,0.3)",
            fontSize: "8px",
            fontFamily: "monospace",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}>layer</span>
        </div>

        <div style={{
          color: sel ? "#f2f2f2" : "rgba(255,255,255,0.72)",
          fontFamily: "'DM Sans', 'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "12.5px",
          lineHeight: 1.25,
          marginBottom: data.desc ? "5px" : 0,
          transition: "color 0.2s",
        }}>
          {data.label}
        </div>

        {data.desc && (
          <div style={{
            color: "rgba(255,255,255,0.32)",
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
          background: sel ? accent : "rgba(255,255,255,0.25)",
          border: `2px solid rgba(0,0,0,0.6)`,
          width: 8, height: 8,
          bottom: -4,
        }}
      />
    </>
  );
}