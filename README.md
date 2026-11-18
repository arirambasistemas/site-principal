# site-principal

Site institucional da Ariramba Sistemas em HTML, CSS e JS puros (sem build, sem dependências).

```
index.html
css/style.css
js/main.js
img/
CNAME        # arirambasistemas.com.br
```

## Desenvolvimento

Abra `index.html` no navegador ou sirva a pasta:

```bash
python3 -m http.server 8000
```

## Deploy (GitHub Pages)

Automático via `.github/workflows/deploy.yml` a cada push na `main`.
Configuração única: **Settings → Pages → Source: GitHub Actions**.

## DNS do domínio

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | arirambasistemas.github.io |

Depois, em Settings → Pages, ative **Enforce HTTPS**.

## Pendências de conteúdo

Placeholders em `index.html`: `[e-mail de contato]`, `[número de contato]`; redes sociais do rodapé apontam para `#contato`.
