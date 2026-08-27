# Polary — Site Institucional

Site institucional bilíngue da Polary com foco em percepção premium, clareza comercial, UX, responsividade, acessibilidade e performance.

## Recursos principais

- tema claro e escuro com preferência persistida em `localStorage`;
- tema inicial respeita `prefers-color-scheme` quando o visitante ainda não fez uma escolha;
- prevenção de *flash* de tema incorreto na primeira renderização;
- português em `/` e inglês profissional em `/en/`;
- página do case Paulo Ramos em português e inglês;
- `hreflang`, canonical e metadados específicos por idioma;
- sitemap multilíngue;
- Header sticky e menu mobile acessível;
- Hero interativo;
- FAQ acessível;
- formulário com validação e mensagens no idioma da página;
- `prefers-reduced-motion`;
- responsividade 320px+;
- eventos preparados em `window.dataLayer`.

## Estrutura

```text
Site-Polary/
├── index.html                       # Português
├── en/
│   ├── index.html                   # English
│   └── cases/
│       └── paulo-ramos/
│           └── index.html
├── cases/
│   └── paulo-ramos/
│       └── index.html               # Português
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── site.css                  # design system, layout e componentes
│   │   └── theme.css                 # tema claro/escuro + controles de preferência
│   └── js/
│       ├── main.js                  # comportamento localizado PT/EN
│       └── theme.js                 # tema claro/escuro
├── ARQUITETURA.md
├── robots.txt
└── sitemap.xml
```

## Idiomas

A implementação usa URLs reais por idioma em vez de trocar todos os textos somente por JavaScript. Isso melhora SEO, compartilhamento de URLs, acessibilidade e evita conteúdo piscando durante a tradução.

- Português: `https://polary.com.br/`
- English: `https://polary.com.br/en/`

As páginas possuem links `hreflang` para ajudar mecanismos de busca a entender as versões equivalentes.

## Tema

O visitante pode alternar entre claro e escuro pelo botão no Header. A escolha é preservada ao navegar entre páginas e idiomas. Na primeira visita, o site acompanha a preferência do sistema operacional.

## Executar localmente

```bash
cd Site-Polary
python3 -m http.server 8000
```

Acesse:

- `http://localhost:8000/`
- `http://localhost:8000/en/`

## Antes de publicar

1. Validar domínio e e-mail oficiais.
2. Conectar o formulário a um backend ou serviço de formulários se desejado.
3. Configurar Analytics/Tag Manager real.
4. Adicionar screenshots reais do case quando disponíveis.
5. Adicionar WhatsApp somente quando houver número oficial confirmado.
6. Criar política de privacidade e termos com conteúdo juridicamente validado.

## Princípio do projeto

> O site não tenta provar que a Polary sabe tecnologia. Ele mostra que a Polary sabe investigar, estruturar e resolver problemas usando tecnologia.
