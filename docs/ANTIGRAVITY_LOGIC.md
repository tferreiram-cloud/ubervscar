# ANTIGRAVITY — LÓGICA MATEMÁTICA & PREMISSAS DE DECISÃO

## 1. Princípio Fundamental

O Antigravity não decide se Uber é barato.
Ele decide se Uber é financeiramente melhor que ter um carro, considerando:
*   Custos reais
*   Frequência real de uso
*   Cansaço e tempo perdido
*   Custo de oportunidade do capital
*   Comparação percentual clara

A unidade-base de comparação é sempre: **Uber vs Carro (custo mensal equivalente)**

---

## 2. Premissas Fixas do Modelo (Defaults)

Essas premissas são configuráveis, mas existem valores de referência.

**Uso**
*   Trajetos por dia: 2 (ida + volta)
*   Dias por mês: 18 a 24 (default: 22)
*   Total mensal de trajetos: `trajetos_mensais = trajetos_dia × dias_mês`

---

## 3. Custo Mensal Real de Carro (Baseline)

O Antigravity NÃO usa custo idealizado.
Usa custo realista e conservador, incluindo:

**Componentes do custo mensal do carro**
*   Parcela ou amortização
*   Seguro
*   IPVA (diluído)
*   Energia / combustível
*   Manutenção média
*   Estacionamento (quando aplicável)
*   Custo de oportunidade do capital imobilizado

**Baselines usados no sistema**

| Cenário de Carro | Custo Mensal Real |
| :--- | :--- |
| Toyota Etios | ~R$ 3.000 |
| BYD Dolphin Mini (PCD) | ~R$ 2.500 |
| BYD Dolphin Plus | ~R$ 3.500 |

Esses valores já incluem custo de oportunidade médio (~R$ 1.000/mês) quando há entrada relevante.

---

## 4. Cálculo do Custo Mensal de Uber

**Fórmula base**

`custo_uber_mensal = preço_por_trajeto × trajetos_por_dia × dias_por_mês`

Exemplo típico:
`R$ 40 × 2 × 22 = R$ 1.760 / mês`

---

## 5. Métrica Central: % Mais Barato que o Carro

Essa é a variável-mestre do Antigravity.

**Fórmula**

`percentual_economia = 1 - (custo_uber_mensal / custo_carro_mensal)`

Exemplo:
`1 - (1.760 / 2.500) = 29,6%`

➡️ Uber ~30% mais barato que o carro.

---

## 6. Interpretação dos Percentuais

O Antigravity nunca analisa valor absoluto isolado.
Tudo é interpretado em relação ao carro equivalente.

**Regra de Ouro**

> Uber só vale a pena se for no mínimo 30% mais barato que o carro.

Abaixo disso:
*   você está pagando conveniência
*   o stress + tempo perdido começam a anular a economia

---

## 7. ZONAS DE DECISÃO (LÓGICA FINAL)

Baseadas em preço por trajeto, assumindo:
*   2 trajetos/dia
*   ~22 dias/mês
*   Comparação com carro equivalente

| Zona | Máx / trajeto | % aprox vs carro | Interpretação |
| :--- | :--- | :--- | :--- |
| **Zona Sonho** | ≤ R$ 20 | ≥ 50% | Uber esmurrando carro |
| **Zona Excelente** | ≤ R$ 30 | ~35–45% | Você venceu a vida |
| **Zona Boa** | R$ 30–35 | ~20–30% | Financeiramente saudável |
| **Zona Atenção** | R$ 36–37 | ~15–20% | Aceitável, não ótimo |
| **Zona Quase Ruim** | R$ 38–39 | ~10–15% | Só se cansado |
| **SEU TETO REAL** | R$ 40–42 | ~0–10% | Limite máximo aceitável |
| **Zona de Risco** | R$ 43–55 | Negativo | Ainda mais barato que carro, mas sofrido |
| **Zona Burra** | R$ 55–60 | ~0% | Pagando igual ou mais que carro |
| **Zona Autossabotagem** | ≥ R$ 70 | Negativo grave | Pagando para sofrer |

---

## 8. Importante: Uber ≠ Carro

Mesmo quando Uber é ligeiramente mais barato, ele tem custos ocultos:
*   Tempo de espera
*   Stress cognitivo
*   Decisão repetida
*   Atrasos
*   Perda de liberdade

Por isso o sistema exige margem, não empate.

---

## 9. Decisão Final do Sistema

O Antigravity responde uma pergunta simples:

> “Isso ainda é financeiramente inteligente considerando a vida real?”

E não:
*   “É o menor preço possível?”
*   “Dá para aguentar mais um pouco?”

---

## 10. Filosofia de Design da Lógica
*   Matemática simples
*   Percentual > valor absoluto
*   Carro como baseline emocional
*   Uber como variável volátil
*   Decisão em segundos, não planilhas
