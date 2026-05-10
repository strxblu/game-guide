import { useState, useMemo } from "react";
import configData from "./data/config.json";
import skillsData from "./data/skills.json";
import craftingData from "./data/crafting.json";
import spData from "./data/sp.json";
import buildingData from "./data/building.json";
import prismData from "./data/prisms.json";
import PageHeader from "./components/PageHeader";
import SectionLabel from "./components/SectionLabel";
import Card from "./components/Card";
import CircleBadge from "./components/CircleBadge";
import SkillCard from "./components/SkillCard";
import InfoCard from "./components/InfoCard";
import type { Skill } from "./types";

// ─── DATA ────────────────────────────────────────────────────────────────────

const { navTabs, appTitle, credits } = configData;
const { allSkills, filterOptions } = skillsData;
const allSkillsTyped = allSkills as Skill[];

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("skills");
  const [filter, setFilter] = useState("all");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [creditsOpen, setCreditsOpen] = useState(false);

  const toggle = (step: number) => setChecked((p) => ({ ...p, [step]: !p[step] }));

  const filtered = useMemo(
    () => filter === "all" ? allSkillsTyped : allSkillsTyped.filter((s) => s.tree === filter),
    [filter]
  );

  const done = Object.values(checked).filter(Boolean).length;
  const recommendedNext = allSkillsTyped.find((s) => !checked[s.step]);

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg, #070510 0%, #0e0618 55%, #07100e 100%)", fontFamily:"'Inter', sans-serif", color:"#e8dfc8" }}>

      {/* Credits modal */}
      {creditsOpen && (
        <div onClick={() => setCreditsOpen(false)} style={{ position:"fixed", inset:0, background:"#000000b0", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background:"linear-gradient(160deg, #0e0c18, #080510)", border:"1px solid #2a2050", borderRadius:10, padding:"24px 28px", maxWidth:420, width:"100%" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <span style={{ fontFamily:"'Montserrat', sans-serif", fontSize:13, fontWeight:700, color:"#c0b8f8", letterSpacing:"1.5px" }}>CREDITS</span>
              <button onClick={() => setCreditsOpen(false)} style={{ background:"transparent", border:"none", color:"#4a3a60", fontSize:18, cursor:"pointer", lineHeight:1 }}>✕</button>
            </div>
            <p style={{ fontSize:12, color:"#6a5a80", marginBottom:20, lineHeight:1.7 }}>{credits.note}</p>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:10, color:"#5a5070", letterSpacing:"1.5px", marginBottom:10 }}>HUMAN & AI-CONTRIBUTORS</div>
              {credits.contributors.map((c) => (
                <div key={c.name} style={{ marginBottom:8 }}>
                  <span style={{ fontSize:12, color:"#c0b0e8", fontWeight:600 }}>{c.name}</span>
                  <span style={{ fontSize:11, color:"#5a5070", marginLeft:8 }}>{c.role}</span>
                </div>
              ))}
            </div>
            {credits.references.length > 0 && (
              <div>
                <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:10, color:"#5a5070", letterSpacing:"1.5px", marginBottom:10 }}>REFERENCES</div>
                {credits.references.map((r) => (
                  <a key={r.label} href={r.url} target="_blank" rel="noreferrer" style={{ display:"block", fontSize:12, color:"#9080d0", marginBottom:6, textDecoration:"none" }}>
                    ↗ {r.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background:"linear-gradient(90deg, #140a00, #2e1a00, #140a00)", borderBottom:"1px solid #6a4010", padding:"10px 20px", display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:17 }}>⚗</span>
        <span style={{ fontSize:11, color:"#b8983a", letterSpacing:"3px", textTransform:"uppercase", flex:1 }}>{appTitle}</span>
        <button onClick={() => setCreditsOpen(true)} style={{ background:"transparent", border:"1px solid #3a2a10", borderRadius:4, color:"#6a5030", fontSize:10, padding:"3px 10px", cursor:"pointer", letterSpacing:"1px" }}>CREDITS</button>
      </div>

      {/* Nav */}
      <div style={{ display:"flex", borderBottom:"1px solid #201808", background:"#080506" }}>
        {navTabs.map(({ key, label, icon }) => (
          <button key={key} onClick={() => setPage(key)} style={{
            flex:1, padding:"11px 6px",
            background: page === key ? "#0e0c18" : "transparent",
            border:"none", borderBottom: page === key ? "2px solid #9080e0" : "2px solid transparent",
            color: page === key ? "#c0b8f8" : "#4a3a28",
            fontSize:11, cursor:"pointer", letterSpacing:"0.3px",
          }}>
            {icon} {label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"22px 16px 48px" }}>

        {/* ── SKILLS ── */}
        {page === "skills" && <>
          <PageHeader title="First Skills to Unlock" subtitle="IN ORDER · ACROSS ALL THREE TREES" />

          {/* Progress bar */}
          <div style={{ background:"#0e0c08", border:"1px solid #30200a", borderRadius:8, padding:"11px 15px", marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:10, color:"#7a6040", letterSpacing:"1.5px" }}>PROGRESS</span>
              <span style={{ fontSize:11, color:"#c8a86a" }}>{done} / {allSkillsTyped.length} unlocked</span>
            </div>
            <div style={{ height:4, background:"#1a1610", borderRadius:4, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${(done / allSkillsTyped.length) * 100}%`, background:"linear-gradient(90deg, #e8a045, #4caf82)", borderRadius:4, transition:"width 0.35s ease" }} />
            </div>
          </div>

          {/* Recommended next */}
          {recommendedNext && (
            <div style={{ background:"#101018", border:"1px solid #2a2a50", borderLeft:"3px solid #9080e0", borderRadius:8, padding:"10px 14px", marginBottom:14 }}>
              <div style={{ fontSize:10, letterSpacing:"1px", color:"#7070b0", marginBottom:3 }}>RECOMMENDED NEXT</div>
              <div style={{ fontSize:13, fontWeight:"bold", color:"#c8c0f0" }}>
                #{recommendedNext.step} · {recommendedNext.name}
              </div>
            </div>
          )}

          {/* Filters */}
          <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
            {filterOptions.map(({ key, label, color }) => (
              <button key={key} onClick={() => setFilter(key)} style={{
                padding:"5px 13px", fontSize:11, borderRadius:20,
                border: filter === key ? `1px solid ${color}` : "1px solid #251e10",
                background: filter === key ? `${color}15` : "transparent",
                color: filter === key ? color : "#5a4a30",
                cursor:"pointer",
              }}>
                {label}
              </button>
            ))}
          </div>

          {/* Skill list */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {filtered.map((sk) => (
              <SkillCard key={sk.step} skill={sk} isDone={!!checked[sk.step]} toggle={toggle} />
            ))}
          </div>

          <div style={{ marginTop:20, background:"#0e0606", border:"1px solid #2e0e0e", borderRadius:8, padding:"12px 15px", fontSize:11.5, color:"#6a4040", lineHeight:1.7 }}>
            <div style={{ color:"#a04040", fontWeight:"bold", marginBottom:4, letterSpacing:"1px", fontSize:11 }}>🚫 SKIP ENTIRELY</div>
            <strong style={{ color:"#904040" }}>Combat EXP nodes</strong> — EXP is abundant and Training Wrist Weights already cover this.{" "}
            <strong style={{ color:"#904040" }}>Late Combat offensive/defensive nodes</strong> — your synthesized gear handles fights until the final regions.
          </div>
          <div style={{ textAlign:"center", marginTop:16, fontSize:10, color:"#302418", letterSpacing:"1px" }}>TAP ANY SKILL TO MARK IT DONE · BASED ON COMMUNITY GUIDES</div>
        </>}

        {/* ── CRAFTING ── */}
        {page === "crafting" && <>
          <PageHeader title="Crafting Priorities" subtitle="QUALITY · EFFECTS · TRAITS · ORDER OF OPERATIONS" />

          <SectionLabel>ORDER OF OPERATIONS</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
            {craftingData.order.map((item) => (
              <Card key={item.step} style={{ background:"linear-gradient(135deg, #1a1200, #0e0c08)", border:`1px solid ${item.tagColor}44`, borderLeft:`3px solid ${item.tagColor}` }}>
                <CircleBadge color={item.tagColor} glow={item.tagColor}>{item.icon}</CircleBadge>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:10, padding:"1px 6px", borderRadius:4, background:`${item.tagColor}15`, border:`1px solid ${item.tagColor}44`, color:item.tagColor }}>#{item.step} · {item.tag}</span>
                  <div style={{ fontSize:13, fontWeight:"bold", color:"#ede0c0", margin:"4px 0 3px" }}>{item.name}</div>
                  <div style={{ fontSize:11.5, color:"#7a6a48", lineHeight:1.65 }}>{item.detail}</div>
                </div>
              </Card>
            ))}
          </div>

          <SectionLabel>ALCHEMY CORES: WHAT TO PRIORITIZE</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
            {craftingData.coreGuide.map((core) => (
              <div key={core.core} style={{ background:"linear-gradient(135deg, #10101a, #0c0a10)", border:`1px solid ${core.color}44`, borderLeft:`3px solid ${core.color}`, borderRadius:8, padding:"13px 14px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <span style={{ fontSize:16 }}>{core.icon}</span>
                  <span style={{ fontSize:13, fontWeight:"bold", color:core.color }}>{core.core}</span>
                  <span style={{ fontSize:10, color:"#4a3a50", marginLeft:"auto" }}>{core.when}</span>
                </div>
                <div style={{ fontSize:11.5, color:"#7a6a80", lineHeight:1.65, marginBottom:6 }}>{core.howto}</div>
                <div style={{ fontSize:10.5, color:core.color + "cc", fontStyle:"italic" }}>⚡ {core.priority}</div>
              </div>
            ))}
          </div>

          <SectionLabel>ADVANCED TIPS</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {craftingData.tips.map((tip, i) => (
              <div key={i} style={{ background:"#09090e", border:"1px solid #1e1e2a", borderRadius:8, padding:"11px 14px", display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{tip.icon}</span>
                <span style={{ fontSize:11.5, color:"#6a6070", lineHeight:1.65 }}>{tip.text}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:20, fontSize:10, color:"#302418", letterSpacing:"1px" }}>BASED ON COMMUNITY GUIDES · ATELIER YUMIA</div>
        </>}

        {/* ── SP FARMING ── */}
        {page === "sp" && <>
          <PageHeader title="SP Farming Guide" subtitle="SHOULD YOU SYNTHESIZE? · WHAT TO MAKE · HOW TO FARM" />

          <SectionLabel>SHOULD YOU BE SYNTHESIZING?</SectionLabel>
          <InfoCard borderColor="#c8a86a">
            <div style={{ fontSize:13, fontWeight:"bold", color:"#f0d89a", marginBottom:5 }}>✅ Yes — a lot more than you're doing</div>
            <div style={{ fontSize:11.5, color:"#8a7a58", lineHeight:1.7 }}>{spData.shouldYouSynthesize.detail}</div>
          </InfoCard>
          <InfoCard borderColor="#8a6a20" bg="linear-gradient(135deg, #120e00, #0e0c08)">
            <div style={{ fontSize:13, fontWeight:"bold", color:"#d4a840", marginBottom:5 }}>🎯 What to make for SP</div>
            <div style={{ fontSize:11.5, color:"#8a7a58", lineHeight:1.7 }}>{spData.whatToMake.detail}</div>
          </InfoCard>

          <SectionLabel style={{ marginTop:14 }}>METHODS RANKED BY EFFICIENCY</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
            {spData.methods.map((m) => (
              <Card key={m.rank} style={{ background:"linear-gradient(135deg, #131008, #0c0a06)", border:`1px solid ${m.effColor}33`, borderLeft:`3px solid ${m.effColor}` }}>
                <CircleBadge color={m.effColor} glow={m.effColor}>{m.icon}</CircleBadge>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                    <span style={{ fontSize:13, fontWeight:"bold", color:"#ede0c0" }}>{m.name}</span>
                    <span style={{ fontSize:10, padding:"1px 7px", borderRadius:4, background:`${m.effColor}15`, border:`1px solid ${m.effColor}44`, color:m.effColor }}>{m.efficiency}</span>
                  </div>
                  <div style={{ fontSize:11.5, color:"#7a6a48", lineHeight:1.65 }}>{m.detail}</div>
                </div>
              </Card>
            ))}
          </div>

          <SectionLabel>COMMON MISTAKES TO AVOID</SectionLabel>
          <div style={{ background:"#0e0606", border:"1px solid #2e0e0e", borderRadius:8, padding:"13px 15px" }}>
            {spData.avoid.map((tip, i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", paddingBottom: i < spData.avoid.length-1 ? 8 : 0, marginBottom: i < spData.avoid.length-1 ? 8 : 0, borderBottom: i < spData.avoid.length-1 ? "1px solid #1e0a0a" : "none" }}>
                <span style={{ color:"#803030", fontSize:13, flexShrink:0 }}>✗</span>
                <span style={{ fontSize:11.5, color:"#6a4040", lineHeight:1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:20, fontSize:10, color:"#302418", letterSpacing:"1px" }}>BASED ON COMMUNITY GUIDES · ATELIER YUMIA</div>
        </>}

        {/* ── BUILDING ── */}
        {page === "building" && <>
          <PageHeader title="Building Guide" subtitle="WHAT TO BUILD · WHERE · IN WHAT ORDER" />

          <InfoCard borderColor="#c8a86a">
            <div style={{ fontSize:11, color:"#8a7030", letterSpacing:"1px", marginBottom:5 }}>TL;DR</div>
            <div style={{ fontSize:12, color:"#c8b070", lineHeight:1.7 }}>{buildingData.tldr}</div>
          </InfoCard>

          <SectionLabel style={{ marginTop:14 }}>BUILD ZONES</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
            {buildingData.zones.map((z, i) => (
              <div key={i} style={{ background:"linear-gradient(135deg, #121008, #0c0a08)", border:`1px solid ${z.color}33`, borderLeft:`3px solid ${z.color}`, borderRadius:8, padding:"13px 14px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <span style={{ fontSize:18 }}>{z.icon}</span>
                  <span style={{ fontSize:13, fontWeight:"bold", color:z.color }}>{z.name}</span>
                </div>
                <div style={{ fontSize:11, color:"#5a4a30", marginBottom:5, fontStyle:"italic" }}>How to unlock: {z.how}</div>
                <div style={{ fontSize:11.5, color:"#7a6a48", lineHeight:1.65, marginBottom:5 }}>{z.use}</div>
                <div style={{ fontSize:10.5, color:`${z.color}cc`, fontStyle:"italic" }}>⚡ {z.priority}</div>
              </div>
            ))}
          </div>

          <SectionLabel>FACILITIES — RANKED BY PRIORITY</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
            {buildingData.facilities.map((f) => (
              <Card key={f.rank} style={{ background:"linear-gradient(135deg, #101210, #0c0a0c)", border:`1px solid ${f.color}33`, borderLeft:`3px solid ${f.color}` }}>
                <CircleBadge color={f.color} glow={f.color}>{f.icon}</CircleBadge>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                    <span style={{ fontSize:13, fontWeight:"bold", color:"#ede0c0" }}>{f.name}</span>
                    <span style={{ fontSize:10, padding:"1px 6px", borderRadius:4, background:`${f.color}15`, border:`1px solid ${f.color}44`, color:f.color }}>#{f.rank}</span>
                  </div>
                  <div style={{ fontSize:10, color:"#504030", marginBottom:4 }}>Unlock: {f.unlock}</div>
                  <div style={{ fontSize:11.5, color:"#7a6a48", lineHeight:1.65, marginBottom:4 }}>{f.why}</div>
                  {f.warning && <div style={{ fontSize:10.5, color:"#804040", fontStyle:"italic" }}>⚠ {f.warning}</div>}
                </div>
              </Card>
            ))}
          </div>

          <SectionLabel>USEFUL TIPS</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            <div style={{ background:"#080e0a", border:"1px solid #102018", borderRadius:8, padding:"12px 14px", display:"flex", gap:10 }}>
              <span style={{ fontSize:16, flexShrink:0 }}>🪑</span>
              <span style={{ fontSize:11.5, color:"#507060", lineHeight:1.65 }}>{buildingData.comfortTip}</span>
            </div>
            <div style={{ background:"#080a0e", border:"1px solid #10182a", borderRadius:8, padding:"12px 14px", display:"flex", gap:10 }}>
              <span style={{ fontSize:16, flexShrink:0 }}>🍳</span>
              <span style={{ fontSize:11.5, color:"#506070", lineHeight:1.65 }}>{buildingData.campsiteTip}</span>
            </div>
          </div>
          <div style={{ textAlign:"center", marginTop:20, fontSize:10, color:"#302418", letterSpacing:"1px" }}>BASED ON COMMUNITY GUIDES · ATELIER YUMIA</div>
        </>}

        {/* ── PRISMS ── */}
        {page === "prisms" && <>
          <PageHeader title="Energy Prisms" subtitle="HOW TO USE THEM · IN ORDER OF PRIORITY" color="#c0b8f8" />

          <div style={{ background:"#0a0818", border:"1px solid #2a2050", borderRadius:8, padding:"12px 15px", marginBottom:18, fontSize:11.5, color:"#706890", lineHeight:1.7 }}>
            <div style={{ color:"#9080c0", fontWeight:"bold", marginBottom:4, letterSpacing:"1px", fontSize:11 }}>💠 HOW TO GET PRISMS</div>
            {prismData.howToGet}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {prismData.items.map((item) => (
              <Card key={item.order} style={{ background:"linear-gradient(135deg, #0e0a20, #09070e)", border:"1px solid #2a2060", borderLeft:`3px solid ${item.tagColor}` }}>
                <CircleBadge color={item.tagColor} glow={item.tagColor}>{item.icon}</CircleBadge>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:10, padding:"1px 6px", borderRadius:4, background:`${item.tagColor}15`, border:`1px solid ${item.tagColor}44`, color:item.tagColor }}>#{item.order} · {item.tag}</span>
                  <div style={{ fontSize:13, fontWeight:"bold", color:"#d8d0f8", margin:"4px 0 3px" }}>{item.name}</div>
                  <div style={{ fontSize:11.5, color:"#706070", lineHeight:1.65 }}>{item.why}</div>
                </div>
              </Card>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:20, fontSize:10, color:"#252030", letterSpacing:"1px" }}>BASED ON COMMUNITY GUIDES · ATELIER YUMIA</div>
        </>}

      </div>
    </div>
  );
}