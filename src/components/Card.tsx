import { ReactNode, CSSProperties } from "react";

export default function Card({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ borderRadius: 8, padding: "12px 14px", display: "flex", gap: 12, ...style }}>
      {children}
    </div>
  );
}
