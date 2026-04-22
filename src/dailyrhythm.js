import { useState } from "react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');`;

const SEGS = [
  { id:1, icon:"♡", label:"Connection Time",      sub:"Evening with Andy",               time:"7:30 – 10:00 PM",      startH:19.5, endH:22,   color:"#E8956D" },
  { id:2, icon:"✦", label:"Prayer & Alignment",   sub:"With Andy & God",                 time:"10:00 PM – 1:00 AM",   startH:22,   endH:25,   color:"#F0C040" },
  { id:3, icon:"✧", label:"Deep Work + Worship",  sub:"UNAIDS & spiritual immersion",    time:"1:00 – 5:00 AM",       startH:25,   endH:29,   color:"#9B8BD8" },
  { id:4, icon:"☽", label:"Sleep & Rest",          sub:"Deep restoration",                time:"5:00 – 9:00 AM",       startH:29,   endH:33,   color:"#6B9BC3" },
  { id:5, icon:"☀", label:"Wake & Prepare",        sub:"Morning reset",                   time:"9:00 – 10:00 AM",      startH:33,   endH:34,   color:"#F4A96A" },
  { id:6, icon:"◆", label:"UNAIDS Focus Block",   sub:"Primary productivity hours",       time:"10:00 AM – 4:00 PM",   startH:34,   endH:40,   color:"#5BAD8C" },
  { id:7, icon:"✿", label:"Admin & Wildflower",   sub:"Workflow tasks",                   time:"4:00 – 6:00 PM",       startH:40,   endH:42,   color:"#C8789E" },
  { id:8, icon:"◑", label:"Nap & Recovery",        sub:"Energy reset before evening",     time:"6:00 – 7:30 PM",       startH:42,   endH:43.5, color:"#8AB4D4" },
];

const CX = 250, CY = 250, OR = 198, IR = 108, GAP = 1.2;

function h2deg(h) { return (h % 24) / 24 * 360; }
function polar(r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}
function f(n) { return n.toFixed(2); }
function arc(startH, endH, oR = OR, iR = IR) {
  const span = (endH - startH) / 24 * 360;
  const sa = h2deg(startH) + GAP / 2;
  const ea = h2deg(startH) + span - GAP / 2;
  const lg = span > 180 ? 1 : 0;
  const [x1,y1] = polar(oR, sa), [x2,y2] = polar(oR, ea);
  const [x3,y3] = polar(iR, ea), [x4,y4] = polar(iR, sa);
  return `M${f(x1)} ${f(y1)} A${oR} ${oR} 0 ${lg} 1 ${f(x2)} ${f(y2)} L${f(x3)} ${f(y3)} A${iR} ${iR} 0 ${lg} 0 ${f(x4)} ${f(y4)}Z`;
}

const STARS = (() => {
  let s = 77;
  const r = () => { s = (s * 1664525 + 1013904223) & 0x7fffffff; return s / 0x7fffffff; };
  return Array.from({length:80}, () => ({ x:r()*500, y:r()*500, rad:r()*1.3+0.2, op:r()*0.55+0.2, d:r()*4 }));
})();

const TICK_HOURS = [0,3,6,9,12,15,18,21];
const CARD_LABELS = [[0,"12 am"],[6,"6 am"],[12,"12 pm"],[18,"6 pm"]];

export default function DailyRhythm() {
  const [active, setActive] = useState(null);
  const activeSeg = SEGS.find(s => s.id === active);

  return (
    <div style={{
      minHeight:"100vh",
      background:"radial-gradient(ellipse 80% 60% at 50% 20%, #111B35 0%, #070A14 65%)",
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"2rem 1rem 3rem", fontFamily:"'Outfit', sans-serif",
      position:"relative", overflow:"hidden", boxSizing:"border-box"
    }}>
      <style>{FONT_IMPORT + `
        @keyframes twinkle { 0%,100%{opacity:var(--sop)} 50%{opacity:calc(var(--sop)*0.25)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wheelIn { from{opacity:0;transform:scale(0.88) rotate(-4deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
        @keyframes glow    { 0%,100%{opacity:.5} 50%{opacity:1} }
        .seg-path { cursor:pointer; transition: filter 0.25s, fill-opacity 0.25s; }
        .seg-path:hover { filter: drop-shadow(0 0 10px var(--c)); fill-opacity: 0.95 !important; }
        .legend-card { cursor:pointer; transition:background 0.2s, border-color 0.2s; }
        .legend-card:hover { background: var(--lhov) !important; }
      `}</style>

      {/* Star field */}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}
        viewBox="0 0 500 500" preserveAspectRatio="xMidYMid slice">
        {STARS.map((s,i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.rad} fill="white"
            style={{"--sop":s.op, opacity:s.op, animation:`twinkle ${2.5+s.d}s ease-in-out infinite`, animationDelay:`${s.d}s`}}/>
        ))}
      </svg>

      {/* Header */}
      <div style={{animation:"fadeUp 0.8s ease both", textAlign:"center", marginBottom:"1.4rem", zIndex:1}}>
        <p style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(0.6rem,1.8vw,0.78rem)",
          letterSpacing:"0.4em", color:"#5A7090", textTransform:"uppercase", margin:"0 0 0.5rem"}}>
          Night-Centered Living
        </p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
          fontSize:"clamp(2rem,5.5vw,3rem)", color:"#EDE6D4", margin:0, lineHeight:1.05,
          letterSpacing:"0.06em"}}>
          Selasi's Daily Rhythm
        </h1>
        <div style={{width:"56px",height:"1px",
          background:"linear-gradient(90deg,transparent,#F0C040,transparent)",
          margin:"0.9rem auto 0"}}/>
      </div>

      {/* Wheel */}
      <div style={{animation:"wheelIn 1.1s cubic-bezier(.16,1,.3,1) both",
        animationDelay:"0.25s", zIndex:1, width:"min(480px,93vw)", aspectRatio:"1/1"}}>
        <svg viewBox="0 0 500 500" style={{width:"100%",height:"100%",overflow:"visible"}}>
          <defs>
            <radialGradient id="innerBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#18223A"/>
              <stop offset="100%" stopColor="#0C1020"/>
            </radialGradient>
            <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Outer ring subtle bg */}
          <circle cx={CX} cy={CY} r={OR+18} fill="none" stroke="#1A2540" strokeWidth="1"/>
          <circle cx={CX} cy={CY} r={OR+2}  fill="none" stroke="#1E2C46" strokeWidth="0.5"/>

          {/* Hour ticks */}
          {TICK_HOURS.map(h => {
            const [x1,y1] = polar(OR+5, h2deg(h));
            const [x2,y2] = polar(OR+15, h2deg(h));
            return <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2A3D5C" strokeWidth="1.5" strokeLinecap="round"/>;
          })}

          {/* Cardinal time labels */}
          {CARD_LABELS.map(([h, lbl]) => {
            const [x,y] = polar(OR+30, h2deg(h));
            return <text key={h} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              fill="#3D5070" fontSize="9" fontFamily="Outfit,sans-serif" letterSpacing="0.08em">{lbl}</text>;
          })}

          {/* Segment arcs */}
          {SEGS.map(s => (
            <path key={s.id}
              className="seg-path"
              d={arc(s.startH, s.endH)}
              fill={s.color}
              fillOpacity={active === s.id ? 0.95 : 0.72}
              style={{"--c": s.color, filter: active === s.id ? `drop-shadow(0 0 12px ${s.color})` : "none"}}
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === s.id ? null : s.id)}
            />
          ))}

          {/* Segment icons */}
          {SEGS.map(s => {
            const mid = h2deg(s.startH) + (s.endH - s.startH) / 24 * 180;
            const [x,y] = polar((OR + IR) / 2, mid);
            const span = (s.endH - s.startH) / 24 * 360;
            if (span < 13) return null; // skip tiny segments
            return (
              <text key={s.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize={span < 20 ? "10" : "14"} fill={s.color} pointerEvents="none"
                style={{filter:`drop-shadow(0 0 5px ${s.color})`, userSelect:"none"}}>
                {s.icon}
              </text>
            );
          })}

          {/* Inner disc */}
          <circle cx={CX} cy={CY} r={IR-2} fill="url(#innerBg)" stroke="#2A3D5C" strokeWidth="0.8"/>
          <circle cx={CX} cy={CY} r={IR-8} fill="none" stroke="#F0C040" strokeWidth="0.4"
            strokeDasharray="2.5 7" style={{animation:"glow 4s ease-in-out infinite"}}/>

          {/* Center text */}
          <text x={CX} y={CY-18} textAnchor="middle" fill="#EDE6D4" fontSize="14"
            fontFamily="Cormorant Garamond,serif" fontWeight="300" letterSpacing="0.28em">SELASI</text>
          <text x={CX} y={CY} textAnchor="middle" fill="#F0C040" fontSize="8"
            fontFamily="Outfit,sans-serif" fontWeight="300" letterSpacing="0.25em">DAILY</text>
          <text x={CX} y={CY+12} textAnchor="middle" fill="#F0C040" fontSize="8"
            fontFamily="Outfit,sans-serif" fontWeight="300" letterSpacing="0.25em">RHYTHM</text>
          <text x={CX} y={CY+28} textAnchor="middle" fill="#3A5070" fontSize="7"
            fontFamily="Cormorant Garamond,serif" fontStyle="italic" letterSpacing="0.05em">∞ the cycle continues</text>
        </svg>
      </div>

      {/* Active tooltip */}
      <div style={{
        zIndex:2, marginTop:"0.6rem", minHeight:"58px", width:"min(420px,90vw)",
        display:"flex", alignItems:"center", justifyContent:"center"
      }}>
        {activeSeg ? (
          <div key={activeSeg.id} style={{
            padding:"0.65rem 1.4rem", width:"100%", textAlign:"center",
            background:"rgba(10,14,26,0.88)", backdropFilter:"blur(12px)",
            border:`1px solid ${activeSeg.color}35`, borderLeft:`3px solid ${activeSeg.color}`,
            borderRadius:"3px", animation:"fadeUp 0.2s ease both"
          }}>
            <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem",
              color:activeSeg.color, marginBottom:"0.15rem"}}>{activeSeg.label}</div>
            <div style={{fontSize:"0.72rem", color:"#7A8DA8", letterSpacing:"0.05em"}}>{activeSeg.time}</div>
            <div style={{fontSize:"0.7rem", color:"#4A607A", marginTop:"0.12rem",
              fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif"}}>{activeSeg.sub}</div>
          </div>
        ) : (
          <p style={{fontSize:"0.68rem", color:"#2A3A52", letterSpacing:"0.12em",
            fontFamily:"'Outfit',sans-serif", margin:0}}>HOVER OR TAP A SEGMENT</p>
        )}
      </div>

      {/* Legend grid */}
      <div style={{
        zIndex:1, marginTop:"1rem",
        display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"0.5rem",
        width:"min(480px,93vw)",
        animation:"fadeUp 1s ease both", animationDelay:"0.6s"
      }}>
        {SEGS.map(s => (
          <div key={s.id}
            className="legend-card"
            style={{
              display:"flex", alignItems:"flex-start", gap:"0.55rem",
              padding:"0.55rem 0.7rem",
              background:"rgba(255,255,255,0.025)",
              border:`1px solid ${s.color}20`, borderLeft:`2.5px solid ${s.color}`,
              borderRadius:"3px",
              "--lhov": `${s.color}12`
            }}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(active === s.id ? null : s.id)}
          >
            <span style={{fontSize:"0.9rem", lineHeight:1.1, marginTop:"1px", color:s.color, flexShrink:0}}>
              {s.icon}
            </span>
            <div>
              <div style={{fontSize:"0.69rem", fontWeight:500, color:"#C8D4E8", lineHeight:1.25, letterSpacing:"0.02em"}}>
                {s.label}
              </div>
              <div style={{fontSize:"0.62rem", color:"#4A607A", marginTop:"0.18rem", letterSpacing:"0.02em"}}>
                {s.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
