import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const SCENARIOS = {
    etios: {
        id: "etios",
        label: "UberX ⇄ Etios",
        carroMensal: 3000,
    },
    mini: {
        id: "mini",
        label: "Comfort ⇄ Dolphin Mini PCD",
        carroMensal: 2500,
    },
    plus: {
        id: "plus",
        label: "Black ⇄ Dolphin Plus",
        carroMensal: 3500,
    },
};

interface State {
    preco: number;
    dias: number;
    trajetos: number;
    scenario: string; // 'etios' | 'mini' | 'plus'

    setPreco: (preco: number) => void;
    setDias: (dias: number) => void;
    setTrajetos: (trajetos: number) => void;
    setScenario: (id: string) => void;
}

export const useStore = create<State>()(
    persist(
        (set) => ({
            preco: 38,
            dias: 24,
            trajetos: 2,
            scenario: "mini",

            setPreco: (preco) => set({ preco }),
            setDias: (dias) => set({ dias }),
            setTrajetos: (trajetos) => set({ trajetos }),
            setScenario: (scenario) => set({ scenario }),
        }),
        {
            name: "antigravity-storage-vfinal",
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        }
    )
);
