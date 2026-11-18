import { defineConfig } from 'vite'

// base relativa: funciona tanto em https://<org>.github.io/site-principal/
// quanto em domínio próprio (CNAME) na raiz.
export default defineConfig({
  base: './',
})
