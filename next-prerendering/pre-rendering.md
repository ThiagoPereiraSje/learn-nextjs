# Pré-renderização

## React vs Next

Em uma aplicação React, teremos apenas uma div (#root) no código fonte da página. Todos os outros elementos serão adicionados via Javascript posteriormente.

Por padrão, o NextJS pre-renderiza cada página da aplicação.

## O que significa pre-renderizar?

NextJS irá gerar todo o HTML para cada página em vez de ter isso feito pelo JavaScript do lado do cliente.

## Por que pré-renderização?

1. Pré-renderização melhora a performance.

   - Em uma aplicação React, você precisar esperar o Javascript ser executado.
   - Talvez buscar dados de uma API externa e só então renderizar a UI.
   - Isto é um tempo de espera para o usuário.
   - Com a pré-renderização, o HTML já está gerado e o carregamento pode acontecer mais rápido.

2. Pré-renderização ajuda no SEO.
   - Se você estiver construindo um E-commerce ou um Blog é muito importante que os motores de busca possam indexar o seu site.
   - Com uma aplicação React, os motores de busca veem sua página com apenas um tag DIV com ID root.
   - Com pré-renderição todo o conteúdo esta presente no código fonte.

## Pré-renderização em NextJS

NextJs suporta duas formas de pré-renderização:

- Static Generation
- Server-side Rendering

## Static Generation (Recomendado)

É o método de pré-renderização onde o HTML das páginas é gerado no build da aplicação.

NextJS, por padrão irá pré-renderizar cada página da aplicação.
