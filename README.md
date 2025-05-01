## 📄 Documentação do Projeto – Desafio FURIA

### 🧠 Sobre o Projeto

Este projeto foi desenvolvido como resposta ao desafio da FURIA e tem como objetivo criar uma solução integrada que:

- Coleta dados pessoais e comportamentais do usuário.
- Valida documentos de identificação utilizando inteligência artificial (OCR).
- Integra perfis de redes sociais com leitura de interações e páginas relacionadas a e-sports.

A aplicação foi construída como uma **landing page** usando **React**, **Tailwind CSS** e **TypeScript**.

---

### 🚀 Funcionalidades

- [x] Formulário de cadastro com campos para nome, CPF, endereço, interesses e histórico de eventos/compras.
- [x] Upload de documentos com suporte a **JPG, PNG e PDF**.
- [x] Validação automática de RG/CPF via **OCR.space**.
- [x] Integração de redes sociais e leitura de páginas seguidas/interações.
- [x] Validação de links externos de e-sports via OCR/AI.

---

### 💻 Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- OCR.space API (para validação por AI)
- Vite (recomendado para build)

---

### 🛠️ Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/fatekkl/seu-repo.git
cd seu-repo
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz com sua chave da OCR.space:

```env
VITE_OCR_API_KEY=sua-chave-aqui
```

Decidi não fazer isso no processo, pra facilitar a clonagem do repositório caso seja necessário. Mas em um projeto real, é INVIAVEL, fazer dessa forma.
Então caso, você clone este repositório, não precisa criar o .env, pois uma chave de API já esta inserida hardcoded


4. Rode o projeto:

```bash
npm run dev
```

---

### 🔐 Observação sobre a Validação de Documentos

A validação é feita localmente via OCR.space. A imagem/PDF é analisado e o texto extraído passa por expressões regulares para encontrar padrões válidos de **CPF** e **RG**. Nenhum dado sensível é armazenado.

---


