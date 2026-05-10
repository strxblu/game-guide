import { Skill } from "../types";
import CircleBadge from "./CircleBadge";

export default function SkillCard({
  skill,
  isDone,
  toggle,
}: {
  skill: Skill;
  isDone: boolean;
  toggle: (step: number) => void;
}) {
  const { step, treeColor, treeGlow, treeBg, treeIcon, treeLabel, name, tag, why } = skill;
  return (
    <div
      onClick={() => toggle(step)}
      style={{
        background: isDone ? "#0a0908" : `linear-gradient(135deg, ${treeBg}cc, #0b0908)`,
        border: `1px solid ${isDone ? "#201a10" : treeColor + "50"}`,
        borderLeft: `3px solid ${isDone ? "#201a10" : treeColor}`,
        borderRadius: 8,
        padding: "12px 14px",
        display: "flex",
        gap: 12,
        cursor: "pointer",
        opacity: isDone ? 0.38 : 1,
        transition: "opacity 0.2s, border-color 0.2s",
        userSelect: "none",
      }}
    >
      <CircleBadge color={treeColor} glow={treeGlow} done={isDone}>
        {isDone ? "✓" : step}
      </CircleBadge>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 10,
              padding: "1px 6px",
              borderRadius: 4,
              background: `${treeColor}15`,
              border: `1px solid ${treeColor}38`,
              color: treeGlow,
            }}
          >
            {treeIcon} {treeLabel}
          </span>
          <span style={{ fontSize: 10, color: "#504030" }}>{tag}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: "bold", color: isDone ? "#302820" : "#ede0c0", marginBottom: 3 }}>
          {name}
        </div>
        <div style={{ fontSize: 11.5, color: isDone ? "#252015" : "#7a6a48", lineHeight: 1.65 }}>{why}</div>
      </div>
    </div>
  );
}
