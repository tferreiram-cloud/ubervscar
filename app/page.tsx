"use client";

import { useStore } from "./store";
import { useEffect, useState } from "react";

const brl = (n: number) => `R$ ${Math.floor(n)}`;

// CENÁRIOS CORRIGIDOS - PROGRESSÃO LÓGICA
// Uber mais barato → Carro mais barato
// Uber mais caro → Carro mais caro
const MODES = {
  x: {
    id: "x",
    name: "Uber X",
    carName: "Dolphin Mini",
    carCost: 2500,  // Carro mais barato para Uber mais barato
    defaultPrice: 32,
    minPrice: 15,
    maxPrice: 70
  },
  comfort: {
    id: "comfort",
    name: "Comfort",
    carName: "Etios",
    carCost: 3000,  // Carro intermediário para Uber intermediário
    defaultPrice: 40,
    minPrice: 25,
    maxPrice: 90
  },
  black: {
    id: "black",
    name: "Black",
    carName: "Dolphin Plus",
    carCost: 3500,  // Carro mais caro para Uber mais caro
    defaultPrice: 55,
    minPrice: 35,
    maxPrice: 120
  },
};

type ModeKey = "x" | "comfort" | "black";

// ZONA POR PERCENTUAL
function getZona(pct: number, carName: string) {
  if (pct >= 50) return { label: "ZONA SONHO", punch: "Uber esmurrando carro. Vai feliz.", cor: "#22c55e" };
  if (pct >= 35) return { label: "EXCELENTE", punch: "Você venceu a vida.", cor: "#22c55e" };
  if (pct >= 30) return { label: "BOA", punch: "Preço saudável. Chama!", cor: "#4ade80" };
  if (pct >= 20) return { label: "ATENÇÃO", punch: "Pode aceitar, não é bom negócio.", cor: "#facc15" };
  if (pct >= 10) return { label: "QUASE RUIM", punch: "Só se cansado.", cor: "#f97316" };
  if (pct >= 0) return { label: "SEU TETO", punch: "Limite máximo.", cor: "#f97316" };
  return { label: "CARRO VENCE", punch: `Paga mais que ter um ${carName}.`, cor: "#ef4444" };
}

// Calcular preço máximo para atingir X% de economia
function calcMaxPrice(targetPct: number, carCost: number, trajetos: number, dias: number) {
  const maxUber = carCost * (1 - targetPct / 100);
  return Math.floor(maxUber / (trajetos * dias));
}

export default function Antigravity() {
  const { dias, trajetos, setDias, setTrajetos } = useStore();
  const [ready, setReady] = useState(false);
  const [activeMode, setActiveMode] = useState<ModeKey>("x");

  const [prices, setPrices] = useState({
    x: MODES.x.defaultPrice,
    comfort: MODES.comfort.defaultPrice,
    black: MODES.black.defaultPrice,
  });

  useEffect(() => {
    useStore.persist.rehydrate();
    setReady(true);
  }, []);

  const mode = MODES[activeMode];
  const preco = prices[activeMode];
  const custoCarro = mode.carCost;

  const uberMensal = preco * trajetos * dias;
  const economia = custoCarro - uberMensal;
  const pct = Math.round((economia / custoCarro) * 100);
  const zona = getZona(pct, mode.carName);

  const setPreco = (val: number) => setPrices(prev => ({ ...prev, [activeMode]: val }));

  // Limites dinâmicos
  const precoExcelente = calcMaxPrice(35, custoCarro, trajetos, dias);
  const precoBoa = calcMaxPrice(30, custoCarro, trajetos, dias);
  const precoTeto = calcMaxPrice(0, custoCarro, trajetos, dias);

  const cardOrder: ModeKey[] = ["x", "comfort", "black"];

  if (!ready) return null;

  const status = pct >= 30 ? "✓ UBER VENCE" : pct >= 0 ? "⚠ ZONA CINZA" : "✗ CARRO VENCE";
  const statusCor = pct >= 30 ? "#22c55e" : pct >= 0 ? "#facc15" : "#ef4444";

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "24px 20px 48px", fontFamily: "system-ui, sans-serif", maxWidth: 480, margin: "0 auto" }}>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: "#444", letterSpacing: 4, fontWeight: 600 }}>ANTIGRAVITY</div>
      </div>

      {/* NÚMERO */}
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 72, fontWeight: 800, color: zona.cor, lineHeight: 1 }}>{pct}%</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
          {mode.name} vs {mode.carName} ({brl(custoCarro)}/mês)
        </div>
      </div>

      {/* VEREDITO */}
      <div style={{ background: `${zona.cor}11`, border: `2px solid ${zona.cor}`, borderRadius: 12, padding: "14px 18px", marginBottom: 20, textAlign: "center" }}>
        <div style={{ fontSize: 10, color: zona.cor, letterSpacing: 2, marginBottom: 6, fontWeight: 600 }}>{zona.label}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{zona.punch}</div>
      </div>

      {/* LIMITES - agora progressivos! */}
      <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: 12, marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: "#666", marginBottom: 8, fontWeight: 600 }}>LIMITES {mode.name.toUpperCase()} ({trajetos}x/dia, {dias}d):</div>
        <div style={{ display: "flex", gap: 8, fontSize: 11 }}>
          <div style={{ flex: 1, textAlign: "center", padding: 8, background: "#22c55e22", borderRadius: 6 }}>
            <div style={{ color: "#22c55e", fontWeight: 600 }}>EXCELENTE</div>
            <div style={{ color: "#fff", fontWeight: 700 }}>≤ {brl(precoExcelente)}</div>
          </div>
          <div style={{ flex: 1, textAlign: "center", padding: 8, background: "#4ade8022", borderRadius: 6 }}>
            <div style={{ color: "#4ade80", fontWeight: 600 }}>BOA</div>
            <div style={{ color: "#fff", fontWeight: 700 }}>≤ {brl(precoBoa)}</div>
          </div>
          <div style={{ flex: 1, textAlign: "center", padding: 8, background: "#ef444422", borderRadius: 6 }}>
            <div style={{ color: "#ef4444", fontWeight: 600 }}>TETO</div>
            <div style={{ color: "#fff", fontWeight: 700 }}>≤ {brl(precoTeto)}</div>
          </div>
        </div>
      </div>

      {/* STATUS */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 6, background: statusCor + "22", color: statusCor, border: `1px solid ${statusCor}44` }}>{status}</div>
      </div>

      {/* COMPARAÇÃO */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, background: "#111", padding: 12, borderRadius: 10, textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#555", marginBottom: 4 }}>{mode.name.toUpperCase()}/MÊS</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{brl(uberMensal)}</div>
        </div>
        <div style={{ flex: 1, background: "#111", padding: 12, borderRadius: 10, textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#555", marginBottom: 4 }}>{mode.carName.toUpperCase()}/MÊS</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{brl(custoCarro)}</div>
        </div>
      </div>

      {/* ECONOMIA */}
      <div style={{ background: economia > 0 ? "#0a1a0a" : "#1a0a0a", padding: 14, borderRadius: 10, marginBottom: 24, border: `1px solid ${economia > 0 ? "#22c55e33" : "#ef444433"}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, color: "#555" }}>{economia > 0 ? "ECONOMIA" : "PREJUÍZO"}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: economia > 0 ? "#4ade80" : "#ef4444" }}>{brl(Math.abs(economia))}/mês</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#555" }}>ANUAL</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: economia > 0 ? "#4ade80" : "#ef4444" }}>{brl(Math.abs(economia * 12))}</div>
          </div>
        </div>
      </div>

      {/* 3 CARDS - Ordem lógica: X < Comfort < Black */}
      <div style={{ fontSize: 10, color: "#555", marginBottom: 8, textAlign: "center" }}>MODALIDADE</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
        {cardOrder.map((modeId) => {
          const m = MODES[modeId];
          const mPreco = prices[modeId];
          const mUber = mPreco * trajetos * dias;
          const mEco = m.carCost - mUber;
          const mPct = Math.round((mEco / m.carCost) * 100);
          const isActive = modeId === activeMode;
          const modeCor = mPct >= 30 ? "#22c55e" : mPct >= 0 ? "#facc15" : "#ef4444";

          return (
            <div key={m.id} onClick={() => setActiveMode(modeId)} style={{
              flex: 1,
              background: isActive ? "#1a1a1a" : "#0a0a0a",
              padding: "12px 6px",
              borderRadius: isActive ? 10 : 6,
              textAlign: "center",
              cursor: "pointer",
              border: isActive ? `2px solid ${zona.cor}` : "1px solid #1a1a1a",
              opacity: isActive ? 1 : 0.7
            }}>
              <div style={{ fontSize: 10, color: isActive ? "#fff" : "#666", fontWeight: 600, marginBottom: 2 }}>{m.name}</div>
              <div style={{ fontSize: isActive ? 22 : 16, fontWeight: 700, color: modeCor }}>{mPct}%</div>
              <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{brl(mPreco)}/trip</div>
              <div style={{ fontSize: 8, color: "#444" }}>vs {brl(m.carCost)}</div>
            </div>
          );
        })}
      </div>

      {/* SLIDERS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "#555", fontWeight: 600 }}>PREÇO {mode.name.toUpperCase()}</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{brl(preco)}</span>
          </div>
          <input type="range" min={mode.minPrice} max={mode.maxPrice} value={preco} onChange={e => setPreco(+e.target.value)} style={{ width: "100%", accentColor: zona.cor }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "#555", fontWeight: 600 }}>TRAJETOS/DIA</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{trajetos}</span>
          </div>
          <input type="range" min={1} max={6} value={trajetos} onChange={e => setTrajetos(+e.target.value)} style={{ width: "100%", accentColor: zona.cor }} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "#555", fontWeight: 600 }}>DIAS/MÊS</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{dias}</span>
          </div>
          <input type="range" min={10} max={30} value={dias} onChange={e => setDias(+e.target.value)} style={{ width: "100%", accentColor: zona.cor }} />
        </div>
      </div>

    </div>
  );
}
