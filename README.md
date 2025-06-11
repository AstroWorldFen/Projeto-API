Nome: João Vitor de Oliveira sampaio
Matricula:2314290084
Relatório: Projeto NBA Oeste - App React Native 
Descrição do Projeto
Este projeto é um aplicativo mobile desenvolvido em React Native que exibe informações detalhadas sobre os 15 times da Conferência Oeste da NBA, utilizando a API pública balldontlie.io para consumir estatísticas reais da temporada 2024.

Além da exibição de dados, o aplicativo permite que o usuário registre uma conta, visualize o perfil, edite o nome, e favorite seus times preferidos, salvando tudo em Firebase Firestore.

Objetivos
Aplicar os conhecimentos de hooks, navegação e consumo de API.
Desenvolver um projeto completo com Firebase Authentication e Firestore.
Criar uma interface interativa e responsiva com React Native.
Cumprir todos os requisitos técnicos propostos para o projeto da disciplina.

ecnologias Utilizadas
React Native
React Navigation (Stack e Drawer)
Firebase (Authentication e Firestore)
API pública balldontlie.io
Expo
JavaScript (ES6)
Hooks: useState, useEffect, custom hook useTeams()

/src
  /components        → Componentes reutilizáveis
  /screens           → Telas principais (Login, Times, Detalhes, Perfil)
  /navigation        → Configuração de Stack e Drawer Navigation
  /services          → Conexões com APIs externas (balldontlie e Firebase)
  /hooks             → Custom hooks como useTeams()
firebaseConfig.js     → Configuração do Firebase
App.js                → Arquivo principal da aplicação

