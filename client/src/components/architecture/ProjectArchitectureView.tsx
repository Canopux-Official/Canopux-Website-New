import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type NodeTypes,
  type NodeMouseHandler,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import InputNode from "./nodes/Inputnode";
import DefaultNode from "./nodes/Defaultnode";
import OutputNode from "./nodes/Outputnode";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RawArchNode = {
  id: string;
  type: "input" | "default" | "output";
  label: string;
  desc?: string;
};

export type RawArchEdge = {
  id: string;
  from: string;
  to: string;
};

export type ArchitectureData = {
  title?: string;
  description?: string;
  nodes: RawArchNode[];
  edges: RawArchEdge[];
};

type Props = {
  data: ArchitectureData;
  accentColor?: string;
};

// ─── Node types ───────────────────────────────────────────────────────────────
const nodeTypes: NodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
};

// ─── Layout ───────────────────────────────────────────────────────────────────
const NODE_W = 160;
const H_GAP  = 100;   // gap between siblings
const V_GAP  = 180;  // gap between rows
const X_OFFSET = -120;

function buildLayout(rawNodes: RawArchNode[]): Node[] {
  const groups: Record<string, RawArchNode[]> = {
    input: [],
    default: [],
    output: [],
  };
  rawNodes.forEach((n) => groups[n.type]?.push(n));

  const result: Node[] = [];
  const rowOrder = ["input", "default", "output"] as const;

  rowOrder.forEach((rowType, rowIndex) => {
    const group = groups[rowType];
    const totalW = group.length * NODE_W + (group.length - 1) * H_GAP;
    const startX = -totalW / 2 + X_OFFSET; // ← add offset here
    const y = rowIndex * V_GAP;

    group.forEach((n, i) => {
      result.push({
        id: n.id,
        type: n.type,
        position: {
          x: startX + i * (NODE_W + H_GAP),
          y,
        },
        data: { label: n.label, desc: n.desc },
      });
    });
  });
  return result;
}

function buildEdges(rawEdges: RawArchEdge[]): Edge[] {
  return rawEdges.map((e) => ({
    id: e.id,
    source: e.from,
    target: e.to,
    type: "smoothstep",
  }));
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ProjectArchitectureView({
  data,
  accentColor = "#10B981",
}: Props) {
  const initialNodes = useMemo(() => buildLayout(data.nodes), [data.nodes]);
  const initialEdges = useMemo(() => buildEdges(data.edges), [data.edges]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleNodeClick: NodeMouseHandler = useCallback((_e, node) => {
    setSelectedId((prev) => (prev === node.id ? null : node.id));
  }, []);

  const highlightedEdgeIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    return new Set(edges.filter((e) => e.source === selectedId).map((e) => e.id));
  }, [selectedId, edges]);

  const themedNodes = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        selected: false,
        data: {
          ...n.data,
          accentColor,
          isSelected: n.id === selectedId,
        },
      })),
    [nodes, accentColor, selectedId]
  );

  const themedEdges = useMemo(
    () =>
      edges.map((e) => {
        const isHighlight = selectedId !== null
          ? highlightedEdgeIds.has(e.id)
          : false;
        return {
          ...e,
          style: {
            stroke: isHighlight ? accentColor : "rgba(255,255,255,0.15)",
            strokeWidth: isHighlight ? 2 : 1,
            opacity: selectedId !== null && !isHighlight ? 0.15 : 1,
            transition: "stroke 0.2s, opacity 0.2s, stroke-width 0.2s",
          },
          animated: isHighlight,
        };
      }),
    [edges, accentColor, selectedId, highlightedEdgeIds]
  );

  const onInit = useCallback((instance: any) => {
    setTimeout(() => instance.fitView({ padding: 0.45, duration: 600 }), 100);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>

      {/* ── Kill React Flow's default white node wrapper ── */}
      <style>{`
        .react-flow__node {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          font-size: inherit !important;
          color: inherit !important;
          width: auto !important;
        }
        .react-flow__node.selected,
        .react-flow__node:focus,
        .react-flow__node:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        .react-flow__controls button {
          background: rgba(18,18,24,0.9) !important;
          border-color: rgba(255,255,255,0.08) !important;
          color: rgba(255,255,255,0.5) !important;
        }
        .react-flow__controls button:hover {
          background: rgba(30,30,40,0.95) !important;
          color: rgba(255,255,255,0.9) !important;
        }
        .react-flow__minimap {
          border-radius: 8px !important;
          overflow: hidden !important;
        }
      `}</style>

      {/* Header */}
      {(data.title || data.description) && (
        <div style={{
          position: "absolute",
          top: 16, left: 20,
          zIndex: 10,
          pointerEvents: "none",
        }}>
          {data.title && (
            <div style={{
              color: accentColor,
              fontFamily: "'DM Sans', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}>
              {data.title}
            </div>
          )}
          {data.description && (
            <div style={{
              color: "rgba(255,255,255,0.30)",
              fontFamily: "'DM Sans', 'Inter', sans-serif",
              fontSize: "10px",
            }}>
              {data.description}
            </div>
          )}
        </div>
      )}

      {/* Deselect hint */}
      {selectedId && (
        <div
          onClick={() => setSelectedId(null)}
          style={{
            position: "absolute",
            bottom: 56, left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            background: "rgba(10,10,14,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "5px 14px",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "'DM Sans', 'Inter', sans-serif",
            fontSize: "10px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          click node again · or pane · to deselect
        </div>
      )}

      <ReactFlow
        nodes={themedNodes}
        edges={themedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={onInit}
        onNodeClick={handleNodeClick}
        onPaneClick={() => setSelectedId(null)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(255,255,255,0.05)"
        />
        <Controls
          style={{
            background: "rgba(10,10,14,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            backdropFilter: "blur(12px)",
            boxShadow: "none",
          }}
        />
        <MiniMap
          style={{
            background: "rgba(10,10,14,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
          }}
          nodeColor={() => accentColor + "55"}
          maskColor="rgba(0,0,0,0.65)"
        />
      </ReactFlow>
    </div>
  );
}