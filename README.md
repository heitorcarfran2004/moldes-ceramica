# Moldes Ceramica Fria — Low Ticket

Projeto de low ticket para o nicho de **moldes de ceramica fria** (500 moldes digitais, sem forno).
Reune pesquisa de mercado, criativos de concorrentes, briefing e a pagina de vendas.

## Estrutura

| Pasta | O que tem |
|---|---|
| `analises/` | Analise de mercado e de ofertas escaladas do nicho |
| `criativos/` | Criativos raspados da Biblioteca de Anuncios (por pagina), midias e copies |
| `funis/` | Funil completo: pagina de vendas + assets otimizados |
| `briefing-criativos-video.md` | Briefing dos criativos em video (angulos, ganchos, roteiros) |

### `funis/500-moldes-ceramica-fria/`

- `pagina-vendas.html` — pagina de vendas completa
- `assets/pecas/` — fotos originais das pecas
- `assets/pecas-web/` — versoes otimizadas (JPG + WebP) usadas na pagina
- `assets/bonus/`, `assets/hero.*` — imagens de bonus e hero
- `*.cjs` — scripts de build/otimizacao de imagem (sharp) e servidor local

## Rodar a pagina localmente

```bash
cd funis/500-moldes-ceramica-fria
npm install
node server.cjs
```

Abre em `http://localhost:3000`.

## Configuracao

Copie `config-automatico.example.json` para `config-automatico.json` e preencha suas credenciais:

```bash
cp config-automatico.example.json config-automatico.json
```

O arquivo `config-automatico.json` esta no `.gitignore` — nunca commite ele.
