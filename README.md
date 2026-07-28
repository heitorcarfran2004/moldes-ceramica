# 500 Moldes de Ceramica Fria — Pagina de Vendas

Site da oferta **500 moldes digitais de ceramica fria** (prontos para imprimir, sem forno).

Codigo em `funis/500-moldes-ceramica-fria/`.

## Rodar localmente

```bash
cd funis/500-moldes-ceramica-fria
npm install
node server.cjs
```

Abre em `http://localhost:3000` (serve `pagina-vendas.html` na raiz).

## Estrutura

```
funis/500-moldes-ceramica-fria/
├── pagina-vendas.html      # a pagina de vendas completa (HTML + CSS + JS inline)
├── server.cjs              # servidor estatico local, porta 3000
└── assets/
    ├── hero.png / .webp    # imagem principal
    ├── bonus/              # imagens dos bonus (JPG + WebP)
    ├── pecas/              # fotos originais das pecas
    └── pecas-web/          # versoes otimizadas (800x800) usadas na pagina
```

## Scripts de imagem (sharp)

| Script | O que faz |
|---|---|
| `otimizar.cjs` | Le `assets/pecas/*.jpg` e gera `assets/pecas-web/` em 800x800 (JPG + WebP) |
| `check.cjs` | Confere se toda imagem em `pecas-web/` saiu quadrada |
| `hero.cjs` | Gera `assets/hero.webp` e `hero.png`, recortando o fundo branco por luminancia |
| `bonus.cjs` | Gera `assets/bonus/` a partir das imagens de origem (1000px, JPG + WebP) |
| `deps.cjs` | Gera os avatares de depoimento em `assets/depoimentos/` (160x160) |
| `limpar.cjs` | Remove as `<figcaption>` dos slides do carrossel em `pagina-vendas.html` |

O unico que roda sem preparo e o `otimizar.cjs` (le de `assets/pecas/`, ja versionado).
Os demais — `hero.cjs`, `bonus.cjs`, `deps.cjs` — apontam para caminhos fixos em
`C:/Users/thorz/Downloads/`. Sao scripts de uso unico: para reaproveitar, ajuste a
constante de origem no topo do arquivo.

Atencao com o `limpar.cjs`: ele reescreve `pagina-vendas.html` no lugar e ja foi
aplicado. Rodar de novo nao quebra nada (nao ha mais figcaption), mas edite com
cuidado.
