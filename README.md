# 🔐 Gerador e Analisador de Senhas
[![codecov](https://codecov.io/gh/elissandro13/secure-password-generator/graph/badge.svg?token=PT0TN4Q45L)](https://codecov.io/gh/elissandro13/secure-password-generator)

Aplicação web simples e funcional para geração de senhas seguras, desenvolvida com Node.js e Express. Permite personalizar a composição da senha e utilizá-la com segurança em sistemas e plataformas. Ideal para estudo de boas práticas de testes automatizados e integração contínua.

---
![Tela de Geração de Senha](./docs/GeradordeSenhas.png)

## 👥 Membros do Grupo

- Elissandro Caetano Júnior
- Gustavo Henrique Gonçalves Viveiros
- Vitor Fagundes Alves Nogueira

---

## 🧠 Descrição do Sistema

Este projeto foi desenvolvido como parte do trabalho prático de Engenharia de Software II. O objetivo é demonstrar o desenvolvimento de um sistema simples que:

- Possui interface web para interação do usuário.
- Gera senhas seguras com parâmetros customizáveis.
- Contém ao menos 15 testes de unidade com **Jest**.
- Utiliza integração contínua com **GitHub Actions**, executando testes automaticamente a cada commit nos sistemas operacionais Linux, MacOS e Windows.

---

## ✨ Funcionalidades Principais

O projeto é dividido em duas abas principais:

### Gerador de Senhas
* **Comprimento Personalizável:** Escolha o número de caracteres da senha (de 8 a 32).
* **Composição da Senha:** Inclua ou exclua conjuntos de caracteres:
    * Letras Maiúsculas (A-Z)
    * Letras Minúsculas (a-z)
    * Números (0-9)
    * Símbolos (!@#$%^&*)
* **Geração Aleatória e Legível:** Crie senhas totalmente aleatórias ou senhas "legíveis", que são mais fáceis de memorizar.
* **Copiar com um Clique:** Copie a senha gerada diretamente para a área de transferência.

### Analisador de Senhas
* **Análise de Força:** Verifique a robustez de uma senha com base em critérios como comprimento, variedade de caracteres e complexidade.
* **Verificação de Vazamentos:** Consulte APIs de segurança para saber se a senha já apareceu em algum vazamento de dados conhecido.

![Tela de Análise de Senha](./docs/AnalisarSenha.png)

---

## 💻 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **Express** – Framework web backend
- **Jest** – Framework de testes de unidade
- **HTML + CSS + JavaScript** – Interface web
- **GitHub Actions** – Pipeline CI/CD para execução automática de testes

---

## 🚀 Como Executar o Projeto

**Pré-requisitos:**
* Node.js (v18 ou superior)
* Git

1. **Clone o repositório**

```bash
git clone https://github.com/elissandro13/secure-password-generator.git
cd secure-password-generator
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o servidor**

```bash
npm start
```

4. **Acesse no navegador**

```
http://localhost:3000
```

---

## 🧪 Como Executar os Testes

```bash
npm test
```

---

## 📂 Estrutura do Projeto

```
secure-password-generator/
├── public/               # Interface web
│   ├── index.html
│   └── style.css
├── src/                  # Lógica e API
│   ├── app.js
│   └── password.js
├── tests/                # Testes unitários
│   └── password.test.js
├── .github/workflows/    # CI/CD
│   └── ci.yml
├── .gitignore
├── README.md
└── package.json
```

---

## ✅ Exemplo de Uso

![Demo](https://via.placeholder.com/600x300?text=Secure+Password+Generator+Demo)
