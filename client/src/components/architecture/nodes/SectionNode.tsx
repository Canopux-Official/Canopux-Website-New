import { Handle, Position } from "@xyflow/react";

export type SectionNodeData = {
  label: string;
  icon?: string;
  tag?: string; // e.g. "UI Component", "Route", "Feature"
  accentColor?: string;
};

export default function SectionNode({ data }: { data: SectionNodeData }) {
  const accent = data.accentColor ?? "#10B981";

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />

      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderLeft: `2px solid ${accent}88`,
          borderRadius: "7px",
          padding: "7px 12px",
          minWidth: "110px",
          backdropFilter: "blur(8px)",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "7px",
        }}
      >
        {data.icon && (
          <span style={{ fontSize: "13px", flexShrink: 0 }}>{data.icon}</span>
        )}
        <div>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'DM Sans', 'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "10.5px",
              lineHeight: 1.3,
            }}
          >
            {data.label}
          </div>
          {data.tag && (
            <div
              style={{
                color: accent,
                fontSize: "8.5px",
                marginTop: "2px",
                fontFamily: "monospace",
                opacity: 0.8,
              }}
            >
              {data.tag}
            </div>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </>
  );
}