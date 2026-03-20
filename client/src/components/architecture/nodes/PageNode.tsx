import { Handle, Position } from "@xyflow/react";

export type PageNodeData = {
  label: string;
  icon?: string;
  description?: string;
  isRoot?: boolean;
  accentColor?: string;
  url?: string;
};

export default function PageNode({ data }: { data: PageNodeData }) {
  const accent = data.accentColor ?? "#10B981";

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

      <div
        style={{
          background: data.isRoot
            ? `linear-gradient(135deg, ${accent}22, ${accent}44)`
            : "rgba(15, 15, 20, 0.85)",
          border: `1px solid ${data.isRoot ? accent : "rgba(255,255,255,0.08)"}`,
          borderRadius: data.isRoot ? "14px" : "10px",
          padding: data.isRoot ? "14px 20px" : "10px 16px",
          minWidth: data.isRoot ? "160px" : "130px",
          backdropFilter: "blur(12px)",
          boxShadow: data.isRoot
            ? `0 0 28px ${accent}55, 0 4px 20px rgba(0,0,0,0.5)`
            : "0 2px 16px rgba(0,0,0,0.4)",
          textAlign: "center",
          cursor: "default",
          position: "relative",
          transition: "box-shadow 0.2s ease",
        }}
      >
        {/* Glow dot top-left for root */}
        {data.isRoot && (
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 8,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 8px ${accent}`,
            }}
          />
        )}

        {data.icon && (
          <div style={{ fontSize: data.isRoot ? "22px" : "16px", marginBottom: 4 }}>
            {data.icon}
          </div>
        )}

        <div
          style={{
            color: data.isRoot ? accent : "#e8e8e8",
            fontFamily: "'DM Sans', 'Inter', sans-serif",
            fontWeight: data.isRoot ? 700 : 500,
            fontSize: data.isRoot ? "13px" : "11.5px",
            letterSpacing: "0.02em",
            lineHeight: 1.3,
          }}
        >
          {data.label}
        </div>

        {data.description && (
          <div
            style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "9.5px",
              marginTop: 4,
              fontFamily: "'DM Sans', 'Inter', sans-serif",
              lineHeight: 1.4,
            }}
          >
            {data.description}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  );
}