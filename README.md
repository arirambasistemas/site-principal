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
Para domínio próprio, crie `public/CNAME` com o domínio e configure o DNS.

## Pendências de conteúdo

Em `index.html`, a seção de contato ainda tem placeholders (`[e-mail de contato]`, `[número de contato]`)
e os links de redes sociais do rodapé apontam para `#contato`.
