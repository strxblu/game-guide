import { ReactNode } from "react";

export default function CircleBadge({
  color,
  glow,
  children,
  done = false,
}: {
  color: string;
  glow: string;
  children: ReactNode;
  done?: boolean;
}) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        flexShrink: 0,
        borderRadius: "50%",
        background: done ? "#141210" : `${color}1a`,
        border: `1.5px solid ${done ? "#2a2218" : color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: "bold",
        color: done ? "#383028" : glow,
        marginTop: 2,
      }}
    >
      {children}
    </div>
  );
}
