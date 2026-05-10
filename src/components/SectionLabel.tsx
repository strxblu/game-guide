import { ReactNode, CSSProperties } from "react";

export default function SectionLabel({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ fontSize: 11, color: "#7a6040", letterSpacing: "1.5px", marginBottom: 10, fontFamily: "'Montserrat', sans-serif", ...style }}>
      {children}
    </div>
  );
}
