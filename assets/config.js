/* ============================================================
   POLARY — configuração central
   Preencha as constantes abaixo. Valores vazios escondem o
   elemento correspondente; o site continua funcionando.
   ============================================================ */

window.POLARY_CONFIG = {
    email: 'contato@polary.com.br',

    /* TODO: WhatsApp no formato internacional, somente números.
       Ex.: Brasil + DDD + número => 5519999999999

       message = saudação inicial. Nome, necessidade e mensagem do
       formulário são acrescentados automaticamente. Vazio = "Olá, Polary!". */
    whatsapp: {
        number: '',
        message: { pt: '', en: '' }
    },

    /* TODO: endpoint real de envio.
       Formspree: https://formspree.io/f/SEU_ID
       Web3Forms: https://api.web3forms.com/submit + accessKey abaixo.
       Função serverless (Vercel): https://SEU-PROJETO.vercel.app/api/contato */
    form: {
        endpoint: '',
        accessKey: ''
    },

    /* TODO: promessa de resposta confirmada.
       Ex.: { pt: 'Respondemos em até 1 dia útil.', en: 'We reply within 1 business day.' }
       Vazio = a promessa não aparece. */
    responsePromise: {
        pt: '',
        en: ''
    },

    /* TODO: preencha somente valores reais.
       Vazio = exibe "Orçamento sob medida após o diagnóstico". */
    pricing: {
        from: { pt: '', en: '' },
        timeline: { pt: '', en: '' },
        fallback: {
            pt: 'Orçamento sob medida após o diagnóstico, sem compromisso.',
            en: 'Custom quote after the assessment, no commitment.'
        }
    },

    /* TODO: confirme o domínio publicado (canonical, Open Graph e sitemap). */
    siteUrl: 'https://polary.com.br',

    caseSite: 'https://paulo-ramos.vercel.app/',

    /* Print real do site, capturado de https://paulo-ramos.vercel.app em 2026-11-03.
       Se o site mudar, gere um novo WebP 1440x960 (proporção 3:2). */
    caseImage: {
        src: 'assets/images/case-paulo-ramos.webp',
        alt: {
            pt: 'Página inicial do site da Paulo Ramos Barbearia, com o título "A barbearia de confiança do bairro" e a foto do atendimento',
            en: 'Home page of the Paulo Ramos Barbearia website, with the headline "The neighborhood\'s trusted barbershop" and a photo of the service'
        },
        width: 1440,
        height: 960
    },

    /* TODO: resultados opcionais do case. Listas vazias = bloco oculto.
       Ex.: { pt: ['Agenda centralizada', 'Clientes organizados'], en: ['Centralized schedule', 'Organized clients'] } */
    caseResults: {
        pt: [],
        en: []
    },

    /* TODO: depoimento opcional. null = bloco oculto.
       Ex.: {
         quote: { pt: '...', en: '...' },
         name: 'Paulo Ramos',
         role: { pt: 'Proprietário, Paulo Ramos Barbearia', en: 'Owner, Paulo Ramos Barbearia' }
       } */
    testimonial: null,

    /* TODO: fotos quadradas (ex.: 176x176, 2x) e redes sociais dos sócios.
       photo vazio = iniciais como fallback. */
    team: {
        gabriel: {
            name: 'Gabriel Sales Camargo',
            photo: '',
            linkedin: '',
            github: '',
            instagram: ''
        },
        leonardo: {
            name: 'Leonardo de Camargo Faria',
            photo: '',
            linkedin: '',
            github: '',
            instagram: ''
        }
    },

    /* TODO: Instagram da Polary (não do sócio). Vazio = link oculto. */
    instagram: '',

    /* TODO: CNPJ, se quiser exibir no rodapé. Vazio = oculto. */
    cnpj: '',

    /* TODO: confirmar região e horário de atendimento. */
    region: {
        pt: "Santa Bárbara d'Oeste / Americana · Atendimento remoto e presencial na região",
        en: "Santa Bárbara d'Oeste / Americana · Remote and in-person service in the region"
    },
    hours: {
        pt: 'Seg–Sex, 7h45 às 19h',
        en: 'Mon–Fri, 7:45 am–7 pm'
    },

    /* TODO: analytics de privacidade.
       provider: 'plausible'; domain: 'polary.com.br'.
       Vazio = nenhum script carrega e nenhum banner aparece. */
    analytics: {
        provider: '',
        domain: ''
    }
};
