# Kafé · Landing page

Site institucional da Kafé, tecnologia para restaurantes. HTML, CSS e JavaScript puro, sem build.

## Rodar localmente

Abra a pasta no VS Code e use a extensão **Live Server** (clique com o botão direito em `index.html` → *Open with Live Server*).
Ou, no terminal:

```bash
npx serve .
```

## Estrutura

```
index.html                 página única, todo o conteúdo fica aqui
css/styles.css             estilos; cores e fontes da marca em :root
js/main.js                 apresentação animada e carrossel de projetos
assets/img/favicon.svg     ícone da aba
assets/img/clientes/       logos dos clientes
```

## O que falta preencher

Procure por `TODO` e por colchetes `[...]` no `index.html`:

- Número do WhatsApp nos links `https://wa.me/55XXXXXXXXXXX` (formato: 55 + DDD + número)
- `[SEU TELEFONE]` na seção de contato
- `og:url` e `og:image` com o domínio final e uma imagem 1200x630 para o preview no WhatsApp
- Textos de exemplo do mockup do topo (`[Seu restaurante]`, `[Prato 1]`, `[preço]`)

## Publicar

Qualquer hospedagem de site estático serve: Vercel, Netlify ou Cloudflare Pages (todas têm plano grátis).
Conecte o repositório ou arraste a pasta e depois aponte o domínio.

## Ajustes rápidos

- **Cores e fontes:** variáveis em `:root` no `css/styles.css`
- **Tempo de cada cena e de cada slide:** `--scene-ms` e `--slide-ms` no mesmo lugar
- **Novo cliente no carrossel:** copie um `<article class="slide">` no `index.html`, troque a logo, os textos e a cor de fundo (`--slide-bg`). As bolinhas de navegação são criadas sozinhas pelo JS.
- **Nova cena na apresentação:** copie um `<article class="scene">`. A barra de progresso também é criada sozinha.
