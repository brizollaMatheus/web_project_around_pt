# TripleTen web_project_around_pt

# Around The U.S.

## Descrição do projeto

Around The U.S. é uma página interativa desenvolvida durante o bootcamp de Desenvolvimento Web da TripleTen.

O projeto permite visualizar cartões de diferentes locais, editar as informações do perfil, adicionar novos cartões, curtir e excluir cartões e visualizar imagens em tamanho ampliado.

Nesta etapa, o código JavaScript foi refatorado utilizando Programação Orientada a Objetos (POO), com a criação de classes responsáveis por diferentes partes da aplicação. Também foram aplicados conceitos de herança, encapsulamento e separação de responsabilidades.

## Funcionalidades

- Editar nome e descrição do perfil;
- Adicionar novos cartões;
- Curtir e remover cartões;
- Visualizar imagens em um pop-up;
- Validação dos formulários em tempo real;
- Exibição de mensagens de erro;
- Ativação e desativação dos botões conforme a validade dos formulários;
- Fechamento dos pop-ups pelo botão de fechar;
- Fechamento dos pop-ups ao clicar na sobreposição;
- Fechamento dos pop-ups utilizando a tecla Esc;
- Redefinição dos formulários ao fechar os pop-ups.

## Arquitetura JavaScript

O projeto utiliza classes para separar as responsabilidades da aplicação:

- `Card` — responsável pela criação e comportamento dos cartões;
- `Section` — responsável por renderizar listas de elementos na página;
- `Popup` — classe base responsável pela abertura e fechamento dos pop-ups;
- `PopupWithImage` — herda de `Popup` e controla o pop-up de visualização de imagens;
- `PopupWithForm` — herda de `Popup` e controla os pop-ups que possuem formulários;
- `UserInfo` — responsável por obter e atualizar as informações do perfil;
- `FormValidator` — responsável pela validação dos formulários.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Programação Orientada a Objetos (POO)
- Classes e herança
- DOM
- Eventos
- Constraint Validation API
- Metodologia BEM
- Flexbox
- CSS Grid
- Media Queries

## Validação dos formulários

O projeto utiliza a API de validação nativa do navegador para verificar os campos dos formulários.

### Editar Perfil

- Nome obrigatório;
- Nome entre 2 e 40 caracteres;
- Sobre mim obrigatório;
- Sobre mim entre 2 e 200 caracteres.

### Novo Local

- Título obrigatório;
- Título entre 2 e 30 caracteres;
- Link da imagem obrigatório;
- Link deve possuir uma URL válida.

Enquanto algum campo estiver inválido, o botão de envio permanece desativado.

## Responsividade

A página foi desenvolvida para se adaptar a diferentes tamanhos de tela, incluindo desktop, tablet e dispositivos móveis.

## Autor

Matheus Brizolla

## Link do projeto

[Visualizar projeto no GitHub Pages](https://brizollamatheus.github.io/web_project_around_pt/)
