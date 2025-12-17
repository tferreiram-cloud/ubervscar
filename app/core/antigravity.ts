// Core logic for Antigravity Final Layout (v1.0)
// Rules: 40% (Green), 30% (Yellow), <30% (Red)

export interface AntigravityInput {
    precoTrajeto: number;
    trajetosDia: number;
    diasMes: number;
    custoCarroMensal: number;
}

export interface AntigravityResult {
    custoUberMensal: number;
    diferenca: number;
    percentualMaisBarato: number; // 0.3 = 30%
    veredito: string;
    subtexto: string;
    cor: string;
}

export function calcularAntigravity({
    precoTrajeto,
    trajetosDia,
    diasMes,
    custoCarroMensal,
}: AntigravityInput): AntigravityResult {
    const custoUberMensal = precoTrajeto * trajetosDia * diasMes;
    const diferenca = custoCarroMensal - custoUberMensal;
    const percentualMaisBarato = diferenca / custoCarroMensal;

    let veredito = "";
    let subtexto = "";
    let cor = "";

    if (percentualMaisBarato >= 0.40) {
        // ≥ 40% (Verde)
        cor = "text-[#22C55E]"; // Green
        veredito = "Zona Sonho";
        subtexto = "Uber esmurrando carro. Vai feliz.";
    } else if (percentualMaisBarato >= 0.30) {
        // 30% - 39% (Amarelo)
        cor = "text-[#FACC15]"; // Yellow
        veredito = "Zona Boa";
        subtexto = "Financeiramente saudável. Chama.";
    } else if (percentualMaisBarato >= 0) {
        // 0% - 29% (Vermelho) - "Stress começa" / "Zona de Risco"
        cor = "text-[#EF4444]"; // Red
        veredito = "Zona de Risco";
        subtexto = "Abaixo de 30%. Você está comprando stress.";
    } else {
        // < 0% (Vermelho)
        cor = "text-[#EF4444]"; // Red
        veredito = "Zona Burra";
        subtexto = "Mais caro que ter carro. Esquece.";
    }

    return {
        custoUberMensal,
        diferenca,
        percentualMaisBarato,
        veredito,
        subtexto,
        cor
    };
}
