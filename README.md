# 🔐 Secure Password Generator

Aplicação web simples e funcional para geração de senhas seguras, desenvolvida com Node.js e Express. Permite personalizar a composição da senha e utilizá-la com segurança em sistemas e plataformas. Ideal para estudo de boas práticas de testes automatizados e integração contínua.

---

## 👥 Membros do Grupo

- Elissandro Caetano Júnior
- Gustavo Viveiros
- Vitor Fagundes Alves Nogueira

---

## 🧠 Descrição do Sistema

Este projeto foi desenvolvido como parte do trabalho prático de Engenharia de Software II. O objetivo é demonstrar o desenvolvimento de um sistema simples que:

- Possui interface web para interação do usuário.
- Gera senhas seguras com parâmetros customizáveis.
- Contém ao menos 15 testes de unidade com **Jest**.
- Utiliza integração contínua com **GitHub Actions**, executando testes automaticamente a cada commit nos sistemas operacionais Linux, MacOS e Windows.

---

## 💻 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **Express** – Framework web backend
- **Jest** – Framework de testes de unidade
- **HTML + CSS + JavaScript** – Interface web
- **GitHub Actions** – Pipeline CI/CD para execução automática de testes

---

## 🚀 Como Executar o Projeto

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

## 📌 Funcionalidades

- Escolher tamanho da senha
- Incluir/excluir: letras maiúsculas, minúsculas, números e símbolos
- Interface amigável e responsiva
- Geração imediata de senha com apenas um clique

---

## ✅ Exemplo de Uso

![Demo](https://via.placeholder.com/600x300?text=Secure+Password+Generator+Demo)
