# TripleTen web_project_around_pt

# Around The U.S.

## Descrição do projeto

Around The U.S. é uma aplicação web interativa desenvolvida durante o bootcamp de Desenvolvimento Web da TripleTen.

A aplicação permite visualizar cartões de diferentes locais, editar as informações do perfil, alterar a foto do usuário, adicionar novos cartões, curtir e excluir cartões e visualizar imagens em tamanho ampliado.

Nesta etapa do projeto, a aplicação foi integrada a uma API REST, permitindo que as informações do usuário, cartões, curtidas e demais alterações sejam armazenadas no servidor e persistam mesmo após recarregar a página.

O projeto utiliza Programação Orientada a Objetos (POO), Promises e requisições HTTP para organizar a aplicação e realizar a comunicação com o servidor.

## Funcionalidades

- Carregamento das informações do usuário através da API;
- Carregamento dos cartões armazenados no servidor;
- Editar nome e descrição do perfil;
- Alterar a foto do perfil;
- Adicionar novos cartões;
- Curtir e remover curtidas dos cartões;
- Excluir cartões criados pelo próprio usuário;
- Confirmação antes da exclusão de um cartão;
- Persistência das alterações através da API;
- Visualizar imagens em um pop-up;
- Validação dos formulários em tempo real;
- Exibição de mensagens de erro;
- Ativação e desativação dos botões conforme a validade dos formulários;
- Feedback visual durante o envio dos formulários com a mensagem "Salvando...";
- Fechamento dos pop-ups pelo botão de fechar;
- Fechamento dos pop-ups ao clicar na sobreposição;
- Fechamento dos pop-ups utilizando a tecla Esc;
- Redefinição dos formulários ao fechar os pop-ups.

## Integração com API

A aplicação utiliza uma API REST para buscar e atualizar os dados da página.

As requisições permitem:

- Obter as informações do usuário;
- Obter os cartões iniciais;
- Atualizar nome e descrição do perfil;
- Atualizar a foto do perfil;
- Adicionar novos cartões;
- Excluir cartões;
- Adicionar curtidas;
- Remover curtidas.

As requisições são realizadas utilizando `fetch` e Promises. As respostas do servidor são verificadas antes da conversão para JSON e possíveis erros são tratados através de `catch()`.

O carregamento inicial das informações do usuário e dos cartões é realizado em conjunto utilizando `Promise.all()`.

## Arquitetura JavaScript

O projeto utiliza classes para separar as responsabilidades da aplicação:

- `Card` — responsável pela criação e comportamento dos cartões;
- `Section` — responsável por renderizar listas de elementos na página;
- `Popup` — classe base responsável pela abertura e fechamento dos pop-ups;
- `PopupWithImage` — herda de `Popup` e controla o pop-up de visualização de imagens;
- `PopupWithForm` — herda de `Popup` e controla os pop-ups que possuem formulários;
- `PopupWithConfirmation` — herda de `Popup` e controla o pop-up de confirmação para exclusão de cartões;
- `UserInfo` — responsável por obter e atualizar as informações do perfil;
- `FormValidator` — responsável pela validação dos formulários;
- `Api` — responsável pela comunicação da aplicação com o servidor.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Programação Orientada a Objetos (POO)
- Classes e herança
- DOM
- Eventos
- Fetch API
- REST API
- Promises
- JSON
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

### Alterar Foto do Perfil

- Link da imagem obrigatório;
- Link deve possuir uma URL válida.

Enquanto algum campo estiver inválido, o botão de envio permanece desativado.

## Responsividade

A página foi desenvolvida para se adaptar a diferentes tamanhos de tela, incluindo desktop, tablet e dispositivos móveis.

## Autor

Matheus Brizolla

## Link do projeto

[Visualizar projeto no GitHub Pages](https://brizollamatheus.github.io/web_project_around_pt/)
