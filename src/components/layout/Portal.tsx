import { useState, useEffect, ReactNode } from "react";
import styled from "styled-components/native";

const PortalLayer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

let portalAdd: (key: string, component: ReactNode) => void;

let portalRemove: (key: string) => void;

export function PortalHost() {
  const [nodes, setNodes] = useState<Record<string, ReactNode>>({});

  useEffect(() => {
    portalAdd = (key, component) => setNodes(prev => ({ ...prev, [key]: component }));
    portalRemove = key =>
      setNodes(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
  }, []);

  return (
    <>
      {Object.entries(nodes).map(([key, node]) => (
        <PortalLayer key={key} pointerEvents="box-none">
          {node}
        </PortalLayer>
      ))}
    </>
  );
}

export function Portal({ children, id }: { children: ReactNode; id: string }) {
  useEffect(() => {
    portalAdd?.(id, children);
    return () => portalRemove?.(id);
  }, [children, id]);

  return null;
}
