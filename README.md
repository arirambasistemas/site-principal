# site-principal

Site institucional da Ariramba Sistemas (Vite, HTML/CSS/JS puro), publicado no GitHub Pages.

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local
npm run build    # gera dist/
npm run preview  # serve o dist/ localmente
```

## Deploy (GitHub Pages)

O deploy é automático via `.github/workflows/deploy.yml` a cada push na `main`.

Configuração única no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

O build usa `base: './'` (caminhos relativos), então funciona em
`https://arirambasistemas.github.io/site-principal/` e também em domínio próprio.
O domínio próprio `arirambasistemas.com.br` está definido em `public/CNAME` (copiado para o `dist/` no build). Falta apontar o DNS (veja abaixo).

## Pendências de conteúdo

Em `index.html`, a seção de contato ainda tem placeholders (`[e-mail de contato]`, `[número de contato]`)
e os links de redes sociais do rodapé apontam para `#contato`.

## DNS do domínio

No provedor do domínio, crie:

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | arirambasistemas.github.io |

Depois, em Settings → Pages, confirme o domínio e ative **Enforce HTTPS**.
