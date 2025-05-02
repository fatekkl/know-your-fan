## 📄 Documentação do Projeto – Desafio FURIA

### 🧠 Sobre o Projeto

Este projeto foi desenvolvido como resposta ao **desafio da FURIA** com o objetivo de criar uma solução digital que:

* Coleta dados pessoais e comportamentais do usuário.
* Valida documentos de identificação (RG e CPF) por meio de inteligência artificial (OCR).
* Integra perfis de redes sociais com análise de interações e envolvimento com o cenário de e-sports.

A aplicação foi construída como uma **landing page interativa** utilizando **React**, **Tailwind CSS** e **TypeScript**.

---

### 🚀 Funcionalidades

* ✅ Formulário de cadastro com campos para nome, CPF, endereço, interesses e histórico de eventos ou compras.
* ✅ Upload de documentos com suporte a arquivos **JPG, PNG e PDF**.
* ✅ Validação automática de RG e CPF utilizando **OCR.space**.
* ✅ Integração de redes sociais com leitura de interações e páginas relacionadas a e-sports.
* ✅ Validação de links externos (ex: perfis em sites de e-sports) com uso de inteligência artificial para confirmar relevância ao perfil do usuário.
* ✅ Dados salvos em um mini-backend que simula uma base de dados.

---

### 💻 Tecnologias Utilizadas

* **React**
* **TypeScript**
* **Tailwind CSS**
* **OCR.space API** (validação de documentos)
* **SQLITE** (banco de dados)
* **Express** (servidor)
* **Vite** (empacotador recomendado)

---

### 🛠️ Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/fatekkl/know-your-fan.git
cd know-your-fan
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com sua chave da API do OCR.space:

```env
VITE_OCR_API_KEY=sua-chave-aqui
```

> 💡 **Nota:** neste projeto, a chave da API foi embutida diretamente no código (hardcoded) para facilitar a execução do desafio. Contudo, em ambientes reais, essa prática é fortemente desaconselhada por motivos de segurança e escalabilidade.

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

---

### 🔐 Sobre a Validação de Documentos

A validação é realizada localmente via **OCR.space**, sem persistência de dados sensíveis. O conteúdo dos documentos é analisado com expressões regulares para identificar padrões válidos de **CPF** e **RG**, garantindo que os dados submetidos sejam consistentes e autênticos.

---

## 📈 Possíveis Melhorias Futuras

* 🔗 **Integração oficial com APIs de redes sociais**, como Instagram, Facebook, Twitter (X) e Twitch, para verificar automaticamente interações com páginas e perfis ligados à FURIA e ao ecossistema de e-sports.
* 🗃️ **Persistência de dados**: envio automático dos dados de cadastro para uma base de dados (ex: Firebase, Supabase ou PostgreSQL), possibilitando envio de conteúdo personalizado via e-mail ou newsletter.
* 📱 **Responsividade total**: otimização da interface para garantir acesso fluido em smartphones, tablets e outros dispositivos móveis.
* 🤖 **Validação aprimorada de links externos** com modelos de IA mais robustos, treinados especificamente para reconhecer perfis legítimos de e-sports.

---
