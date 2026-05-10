export default function PageHeader({
  title,
  subtitle,
  color = "#f0d89a",
}: {
  title: string;
  subtitle: string;
  color?: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <div style={{ fontSize: 21, fontWeight: "bold", color, textShadow: "0 0 18px #b07800aa", marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: "#6a5a3a", letterSpacing: "2.5px", fontFamily: "'Montserrat', sans-serif" }}>{subtitle}</div>
    </div>
  );
}
