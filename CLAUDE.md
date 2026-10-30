# Kafé · contexto do projeto

Landing page da Kafé, agência de tecnologia para restaurantes (sites, cardápio digital e delivery próprio, sistema de caixa com comandas e estoque, Instagram). Fundador: Kaique Antunes. Atende Ourinhos-SP e região.

## Stack

HTML, CSS e JavaScript puro. Sem framework, sem build, sem dependências. Manter assim, a menos que o Kaique peça outra coisa.

## Marca

- Nome: **Kafé** (K.A.F. de Kaique Antunes Ferreira, lido como "café")
- Logo: palavra "kafé" em Bricolage Grotesque 800, minúscula, com o acento do é desenhado como uma chama (cor Brasa)
- Ícone secundário: xícara com K e fumaça
- Fontes: Bricolage Grotesque (títulos), DM Sans (textos)
- Cores (tokens em `css/styles.css`, `:root`):
  - Espresso `#1F1410`: topo, menu, textos
  - Brasa `#E4572E`: só botões e destaques
  - Off-white `#FFFBF5`: seções de conteúdo
  - Crema `#F4EADB`: blocos de destaque
  - Grão `#8A5A3B`: uso mínimo
- Regra de contraste: texto sobre Brasa é sempre Espresso, nunca branco. Para texto pequeno em laranja sobre fundo claro, usar `--brasa-texto` (`#B8401C`).

## Tom de voz

Português do Brasil, direto, falando com dono de restaurante, sem jargão técnico. Foco em benefício: vender direto sem comissão, ser encontrado no Google, caixa organizado.
Não inventar números, estatísticas ou depoimentos. Dado que não existe vira placeholder entre colchetes.

## Clientes no portfólio

- Recanto Restaurante e Choperia (Ourinhos-SP): sistema de caixa + app de comandas
- Santo Fogo (Chavantes-SP): delivery próprio de hambúrgueres
- Império Prime Alimentos (Ourinhos-SP): sistema de caixa + estoque

## Estrutura

- `index.html`: página única (topo, faixa de clientes, apresentação animada, serviços, calculadora de comissão, carrossel de projetos, como funciona, quem faz a Kafé, depoimento escondido com `hidden`, outros negócios, dúvidas, contato, botão fixo do WhatsApp)
- `css/styles.css`: estilos, tokens no topo
- `js/main.js`: apresentação estilo stories (`[data-story]`) e carrossel (`[data-carousel]`); barras e bolinhas são geradas pelo JS a partir dos `<article>` no HTML. Também monta os links do WhatsApp (`data-wa` = mensagem pronta, número em `WA_NUMBER`), a calculadora (`[data-calc]`) e o botão fixo (`[data-wa-float]`, some sobre os elementos com `data-wa-hide`)

## Posicionamento e oferta

- Foco em restaurante no topo e na maior parte da página. Outros negócios (clínicas, oficinas, imobiliárias) ficam numa seção própria mais abaixo.
- Preço público: landing page a partir de R$ 500. Delivery e sistema de caixa: orçamento na conversa.
- Seção "Quem faz a Kafé": empresas citadas vêm do currículo do Kaique (projetos via consultorias). Não acrescentar empresas sem confirmação.
- Acessibilidade: manter botões reais, `aria-label` em botões só com ícone, alvos de toque de 44px e respeito a `prefers-reduced-motion`
