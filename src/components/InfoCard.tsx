import { ReactNode } from "react";

export default function InfoCard({
  children,
  borderColor = "#c8a86a",
  bg = "linear-gradient(135deg, #1a1200, #0e0c08)",
}: {
  children: ReactNode;
  borderColor?: string;
  bg?: string;
}) {
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${borderColor}44`,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 8,
        padding: "13px 15px",
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}
