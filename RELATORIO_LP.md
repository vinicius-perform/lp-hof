# RELATÓRIO TÉCNICO DA LANDING PAGE & GUIA DE RASTREAMENTO

> **Documento gerado para análise técnica, auditoria e otimização de rastreamento (Meta Pixel, Conversions API, Webhooks e CRM).**  
> **Data do relatório:** 19/11/2026  
> **Projeto:** Diagnóstico Estratégico FA (Fazendo Acontecer)  
> **URL Oficial de Produção:** [https://diagnostico-fa.vercel.app](https://diagnostico-fa.vercel.app)

---

## 1. VISÃO GERAL

### 1.1 Stack e Frameworks
* **Framework Principal:** [React 19](https://react.dev) com [TypeScript](https://www.typescriptlang.org/)
* **Roteamento & SSR:** [TanStack Start](https://tanstack.com/start) com [TanStack Router](https://tanstack.com/router)
* **Gerenciamento de Estado de Dados:** [TanStack Query](https://tanstack.com/query) (v5)
* **Engine de Servidor / Build:** [Nitro](https://nitro.unjs.io/) (preset `vercel` com runtime `nodejs24.x`)
* **Bundler & Build Tool:** [Vite](https://vitejs.dev/) v8 com `@tailwindcss/vite`
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) v4
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Componentes Base:** Radix UI primitives (`@radix-ui/*`)

### 1.2 Hospedagem e Deploy
* **Hospedagem:** [Vercel](https://vercel.com/)
* **Projeto Vercel:** `vinicius-projects-9bf42514/diagnostico-fa` (Project ID: `prj_HCnYVAoly4UDrAAiTXDnVbHejB7T`)
* **Repositório Git Conectado:** `https://github.com/vinicius-perform/diagnostico-fa.git` (Branch principal: `main`)
* **Deploy Automático / Manual:** CLI `vercel --prod` gerando build em Washington, D.C. (iad1).
* **Conexão Lovable:** Projeto configurado com o Lovable (`.lovable`, regras de não reescrita de histórico no Git).

### 1.3 Árvore de Pastas e Arquivos

```text
diagnostico-fa/
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── AGENTS.md
├── bun.lock
├── bunfig.toml
├── components.json
├── eslint.config.js
├── google_apps_script.js
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── vercel.json
├── vite.config.ts
├── public/
│   ├── favicon.svg
│   ├── thumb cris.webp
│   ├── thumb dr pedro.webp
│   ├── thumb lannay.webp
│   ├── thumb marcela.webp
│   └── videos/
│       ├── dep-drcris.webm
│       ├── dep-dramarcela.webm
│       ├── dep-drpedro.webm
│       └── dep-samara.webm
└── src/
    ├── router.tsx
    ├── routeTree.gen.ts
    ├── server.ts
    ├── start.ts
    ├── styles.css
    ├── components/
    │   └── ui/
    │       ├── accordion.tsx
    │       ├── alert.tsx
    │       ├── alert-dialog.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── carousel.tsx
    │       ├── chart.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── dialog.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── form.tsx
    │       ├── hover-card.tsx
    │       ├── input.tsx
    │       ├── input-otp.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── pagination.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── resizable.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── sidebar.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── sonner.tsx
    │       ├── switch.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toggle.tsx
    │       ├── toggle-group.tsx
    │       └── tooltip.tsx
    ├── hooks/
    │   └── use-mobile.tsx
    ├── lib/
    │   ├── error-capture.ts
    │   ├── error-page.ts
    │   ├── lovable-error-reporting.ts
    │   └── utils.ts
    └── routes/
        ├── __root.tsx
        ├── index.tsx
        └── README.md
```

---

## 2. FORMULÁRIO DE CAPTURA

O formulário é o elemento central de conversão da landing page. Ele é implementado como um componente multietapas (`MultistepFormCard`) dentro do arquivo `src/routes/index.tsx`.

### 2.1 Código Completo do Componente do Formulário

Abaixo está o código real e completo do componente `MultistepFormCard` extraído de `src/routes/index.tsx` (linhas 301 a 1005):

```tsx
const UF_LIST = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

// FORMULÁRIO DE CADASTRO MULTIETAPAS
interface MultistepFormCardProps {
  setLeadName: (val: string) => void;
  utms: any;
  formId: string;
}

function MultistepFormCard({ setLeadName, utms, formId }: MultistepFormCardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [crmNumber, setCrmNumber] = useState("");
  const [crmUf, setCrmUf] = useState("");
  const [instagram, setInstagram] = useState("");
  const [faturamento, setFaturamento] = useState("");
  const [investimento, setInvestimento] = useState("");
  const [prazo, setPrazo] = useState("");
  const [fakeProgress, setFakeProgress] = useState(25);

  useEffect(() => {
    if (!isSubmitted) {
      setFakeProgress(25);
      return;
    }
    const t1 = setTimeout(() => setFakeProgress(52), 700);
    const t2 = setTimeout(() => setFakeProgress(78), 1800);
    const t3 = setTimeout(() => setFakeProgress(94), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isSubmitted]);

  const handleGoToVipCheckout = () => {
    trackCustomEvent("VIPFastTrackCheckoutClick", {
      value: 19.90,
      form_id: formId,
      lead_name: name,
      lead_phone: phone,
      lead_email: email
    });
    if (typeof window !== "undefined") {
      const win = window as any;
      if (typeof win.fbq === "function") {
        win.fbq("track", "InitiateCheckout", {
          content_name: "Diagnostico Estrategico VIP - Furar Fila",
          currency: "BRL",
          value: 19.90
        });
      }
    }
    const kiwiBase = "https://pay.kiwify.com.br/LjM9uMe";
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (email) params.append("email", email);
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, "");
      params.append("phone", cleanPhone);
    }
    if (utms?.utm_source) params.append("utm_source", utms.utm_source);
    if (utms?.utm_medium) params.append("utm_medium", utms.utm_medium);
    if (utms?.utm_campaign) params.append("utm_campaign", utms.utm_campaign);
    if (utms?.utm_content) params.append("utm_content", utms.utm_content);
    if (utms?.utm_term) params.append("utm_term", utms.utm_term);
    if (utms?.fbclid) params.append("fbclid", utms.fbclid);
    const fullUrl = `${kiwiBase}?${params.toString()}`;
    const popupWidth = 520;
    const popupHeight = 800;
    const left = typeof window !== "undefined" ? Math.max(0, (window.screen.width - popupWidth) / 2) : 0;
    const top = typeof window !== "undefined" ? Math.max(0, (window.screen.height - popupHeight) / 2) : 0;
    
    // Abre como uma janela pop-up dedicada sobre a página atual
    const checkoutWindow = window.open(
      fullUrl,
      "kiwify_checkout",
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`
    );
    
    // Fallback: se o navegador bloquear janela popup, abre em nova aba para não perder a página original
    if (!checkoutWindow || checkoutWindow.closed || typeof checkoutWindow.closed === "undefined") {
      window.open(fullUrl, "_blank");
    }
  };

  const handleCloseModal = () => {
    setIsSubmitted(false);
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setCrmNumber("");
    setCrmUf("");
    setInstagram("");
    setFaturamento("");
    setInvestimento("");
    setPrazo("");
    setFakeProgress(25);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 11) input = input.substring(0, 11);
    
    let formatted = "";
    if (input.length > 0) {
      formatted = `(${input.substring(0, 2)}`;
    }
    if (input.length > 2) {
      formatted += `) ${input.substring(2, 7)}`;
    }
    if (input.length > 7) {
      formatted += `-${input.substring(7, 11)}`;
    }
    setPhone(formatted || input);
  };

  const handleNextStep = () => {
    if (!name || name.trim().length < 3) {
      alert("Por favor, informe seu nome completo.");
      return;
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      alert("Por favor, informe um e-mail válido.");
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      alert("Por favor, informe um WhatsApp válido com DDD.");
      return;
    }
    
    trackCustomEvent("FormStepComplete", { step: 1, form_id: formId });
    setStep(2);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!instagram || instagram.trim().length < 2) {
      alert("Por favor, informe o Instagram da clínica.");
      return;
    }
    const cleanCrm = crmNumber.replace(/\D/g, "");
    if (!cleanCrm || cleanCrm.length < 4) {
      alert("Por favor, informe um número de CRM válido com no mínimo 4 dígitos.");
      return;
    }
    if (!crmUf) {
      alert("Por favor, selecione o estado (UF) do seu CRM.");
      return;
    }
    if (!faturamento) {
      alert("Por favor, selecione a faixa de faturamento mensal.");
      return;
    }
    if (!investimento) {
      alert("Por favor, selecione o investimento atual em marketing.");
      return;
    }
    if (!prazo) {
      alert("Por favor, selecione o prazo estimado para iniciar.");
      return;
    }

    setIsSubmitting(true);
    setLeadName(name);

    // Classificação estrita pelo faturamento (Coluna L e Meta Pixel):
    // Menos de 35: D
    // 35 a 50: C
    // 50 a 100: B
    // Acima de 100: A
    let leadClass: "A" | "B" | "C" | "D" = "D";
    const fatLower = faturamento.toLowerCase();
    if (fatLower.includes("menos de") || fatLower.includes("< 35") || fatLower.includes("não atinjo") || fatLower.includes("nao atinjo")) {
      leadClass = "D";
    } else if (fatLower.includes("acima de 100") || fatLower.includes("> 100") || fatLower.includes("mais de 100")) {
      leadClass = "A";
    } else if (fatLower.includes("50") && fatLower.includes("100")) {
      leadClass = "B";
    } else if (fatLower.includes("35") && fatLower.includes("50")) {
      leadClass = "C";
    } else {
      leadClass = "D";
    }

    // Cálculo de pontuação (Coluna K)
    let score = 0;
    if (leadClass === "A") score += 80;
    else if (leadClass === "B") score += 60;
    else if (leadClass === "C") score += 40;
    else score += 10;

    if (investimento === "Acima de R$ 15 mil") score += 20;
    else if (investimento === "Entre R$ 7 mil e R$ 15 mil") score += 15;
    else if (investimento === "Entre R$ 3 mil e R$ 7 mil") score += 10;
    else if (investimento === "Até R$ 3 mil") score += 5;

    const getCookie = (cName: string) => {
      if (typeof document === "undefined") return "";
      const match = document.cookie.match(new RegExp("(?:^|; )" + cName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
      return match ? decodeURIComponent(match[1]) : "";
    };

    let fbcCookie = getCookie("_fbc");
    if (!fbcCookie && utms.fbclid) {
      fbcCookie = `fb.1.${Date.now()}.${utms.fbclid}`;
    }
    const fbpCookie = getCookie("_fbp");
    const externalId = `fa_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const fullCrm = `${crmNumber.trim()}/${crmUf.toUpperCase()}`;

    const payload = {
      timestamp: new Date().toLocaleString("pt-BR"),
      lp: "LP1",
      identificacao_lp: "LP1",
      origem_lp: "LP1",
      name: name,
      email: email,
      phone: phone,
      crm: fullCrm,
      crm_numero: crmNumber.trim(),
      crm_uf: crmUf.toUpperCase(),
      clinicInstagram: instagram,
      clinicName: instagram,
      objective: prazo,
      revenue: faturamento,
      traffic: investimento,
      score: score,
      leadType: leadClass,

      nome: name,
      e_mail: email,
      whatsapp: phone,
      CRM: fullCrm,
      instagram_clinica: instagram,
      especialidade: fullCrm,
      faturamento_mensal: faturamento,
      investimento_marketing: investimento,
      objetivo_principal: "",
      prazo_inicio: prazo,
      prazo: prazo,
      tipo_lead: leadClass,
      lead_type: leadClass,

      form_used: formId,

      // Parâmetros Meta Conversions API (CAPI)
      fbc: fbcCookie,
      fbp: fbpCookie,
      external_id: externalId,
      FBC_FBCLID: fbcCookie,
      FBP: fbpCookie,
      EXTERNAL_ID: externalId,
      
      // Meta Ads & UTMs principais
      meta_campanha: utms.meta_campanha || utms.utm_campaign,
      meta_conjunto: utms.meta_conjunto || utms.utm_medium,
      meta_anuncio: utms.meta_anuncio || utms.utm_content,
      meta_posicionamento: utms.meta_posicionamento || utms.utm_source,

      // Aliases em português para colunas diretas da planilha
      campanha: utms.meta_campanha || utms.utm_campaign,
      conjunto_anuncios: utms.meta_conjunto || utms.utm_medium,
      conjunto: utms.meta_conjunto || utms.utm_medium,
      anuncio: utms.meta_anuncio || utms.utm_content,
      posicionamento: utms.meta_posicionamento || utms.utm_source,

      // Mapeamentos exatos de cabeçalhos de planilha
      "Campanha": utms.meta_campanha || utms.utm_campaign,
      "Conjunto": utms.meta_conjunto || utms.utm_medium,
      "Anúncio": utms.meta_anuncio || utms.utm_content,
      "Anuncio": utms.meta_anuncio || utms.utm_content,
      "anúncio": utms.meta_anuncio || utms.utm_content,

      // Mapeamento padrão UTM
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      utm_content: utms.utm_content,
      utm_term: utms.utm_term,
      fbclid: utms.fbclid,
      gclid: utms.gclid,
      pagina_origem: typeof window !== "undefined" ? window.location.href : "",
      data_horario: new Date().toLocaleString("pt-BR")
    };

    try {
      const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbygkGV6P-Hp90BGHqsLfxF8MMO97EWkUKGEdK0UN1QChG8MU0QP-T68MHq0qz06g2wRtQ/exec";
      
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (typeof window !== "undefined") {
        const win = window as any;
        if (typeof win.fbq === "function") {
          // Evento padrão Lead
          win.fbq("track", "Lead", {
            content_name: "Diagnostico Estrategico FA",
            currency: "BRL",
            lead_class: leadClass
          }, { eventID: externalId });

          // Evento específico por faixa: "Lead A", "Lead B", "Lead C" ou "Lead D"
          const leadCustomEvent = `Lead ${leadClass}`;
          win.fbq("trackCustom", leadCustomEvent, {
            content_name: "Diagnostico Estrategico FA",
            lead_class: leadClass,
            faturamento: faturamento,
            form_used: formId
          }, { eventID: `${externalId}_${leadClass}` });

          // Evento de qualificação Meta: "Super Lead" (Lead A) e "Lead Qualificado" (Lead B e C)
          if (leadClass === "A") {
            win.fbq("trackCustom", "Super Lead", {
              content_name: "Diagnostico Estrategico FA",
              lead_class: "A",
              faturamento: faturamento,
              form_used: formId
            }, { eventID: `${externalId}_super_lead` });
          } else if (leadClass === "B" || leadClass === "C") {
            win.fbq("trackCustom", "Lead Qualificado", {
              content_name: "Diagnostico Estrategico FA",
              lead_class: leadClass,
              faturamento: faturamento,
              form_used: formId
            }, { eventID: `${externalId}_lead_qualificado` });
          }

          win.fbq("trackCustom", "LeadForm", {
            content_name: "Diagnostico Estrategico FA",
            form_used: formId,
            lead_class: leadClass
          }, { eventID: externalId });
        }
        if (win.dataLayer && Array.isArray(win.dataLayer)) {
          const qualName = leadClass === "A" ? "Super Lead" : (leadClass === "B" || leadClass === "C") ? "Lead Qualificado" : "Lead Desqualificado";
          win.dataLayer.push({
            event: "lead_form_submitted",
            lead_class: leadClass,
            custom_event: `Lead ${leadClass}`,
            qualification_status: qualName,
            form_used: formId
          });
          if (leadClass === "A") {
            win.dataLayer.push({
              event: "super_lead",
              lead_class: "A",
              form_used: formId
            });
          } else if (leadClass === "B" || leadClass === "C") {
            win.dataLayer.push({
              event: "lead_qualificado",
              lead_class: leadClass,
              form_used: formId
            });
          }
        }

        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full h-[52px] rounded-lg border border-[#DDE2D9] bg-[#FFFFFF] px-4 text-sm text-[#050705] placeholder:text-[#667066]/70 outline-none transition-all focus:border-[#8CFF00] focus:ring-2 focus:ring-[#8CFF00]/40 font-medium";

  return (
    <div className="rounded-2xl border border-[#DDE2D9] bg-[#F4F6F1] p-6 sm:p-7 shadow-xl relative text-left text-[#050705]">
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative my-auto w-full max-w-xl rounded-2xl border border-[#252A25] bg-[#0A0D0A] p-5 sm:p-7 text-center text-[#FFFFFF] shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto">
            
            {/* Botão de Fechar discreto */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#667066] hover:text-[#FFFFFF] transition-colors p-1.5 rounded-lg hover:bg-[#1A1F1A]"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* CARREGAMENTO FAKE SIMPLIFICADO */}
            <div className="rounded-xl border border-[#252A25] bg-[#050705] p-4 sm:p-5 mb-5 text-left relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CFF00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8CFF00]"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#FFFFFF]">
                    Processando seu cadastro e alocando na fila de espera...
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[#8CFF00] font-mono shrink-0">
                  {fakeProgress}%
                </span>
              </div>

              {/* Barra de Progresso Animada */}
              <div className="h-2.5 w-full bg-[#181D18] rounded-full overflow-hidden p-0.5 border border-[#252A25]">
                <div
                  className="h-full bg-gradient-to-r from-[#5FAE00] via-[#8CFF00] to-[#B6FF4D] rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(140,255,0,0.6)]"
                  style={{ width: `${fakeProgress}%` }}
                />
              </div>
            </div>

            {/* BLOCO 2: CTA AGRESSIVA PARA FURAR A FILA */}
            <div className="space-y-4">
              
              {/* Badge de Urgência / Oportunidade VIP */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/30 px-3.5 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-red-400 shadow-sm animate-pulse">
                <Zap className="h-3.5 w-3.5 fill-red-400 text-red-400" />
                ACESSO PRIORITÁRIO VIP • FURE A FILA
              </div>

              {/* Headline Agressiva */}
              <h3 className="text-xl sm:text-2xl lg:text-[25px] font-black tracking-tight text-[#FFFFFF] leading-snug">
                Não quer esperar 72 horas na fila? <br className="hidden sm:inline" />
                <span className="text-[#8CFF00]">Fure a fila</span> e receba seu Diagnóstico Exclusivo <span className="underline decoration-[#8CFF00] decoration-2">hoje</span>.
              </h3>

              {/* Subhead Explicativo */}
              <p className="text-xs sm:text-sm text-[#F4F6F1]/80 leading-relaxed max-w-lg mx-auto">
                Devido à alta procura de médicos e clínicas, a fila comum gratuita possui tempo de espera de 2 a 3 dias úteis. Ao ativar o <strong>Acesso VIP Prioritário</strong> por uma taxa simbólica, sua clínica salta direto para a <strong>mesa do nosso Diretor de Estratégia</strong>.
              </p>

              {/* Bloco de Preço & Oferta Irresistível */}
              <div className="pt-1">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#667066] uppercase tracking-wider mb-1">
                  <span>De <span className="line-through text-red-400/80">R$ 197,00</span></span>
                  <span>•</span>
                  <span className="text-[#8CFF00] font-black">Taxa simbólica de prioridade:</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#8CFF00] tracking-tight">
                  R$ 19,90 <span className="text-xs sm:text-sm font-semibold text-[#F4F6F1]/70 tracking-normal">(pagamento único)</span>
                </div>
              </div>

              {/* BOTÃO PRINCIPAL (CTA MEGA AGRESSIVA) */}
              <button
                type="button"
                onClick={handleGoToVipCheckout}
                className="group relative w-full inline-flex flex-col sm:flex-row h-auto sm:h-[58px] items-center justify-center gap-2 rounded-xl bg-[#8CFF00] px-6 py-3.5 sm:py-0 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all hover:bg-[#7AE000] cursor-pointer shadow-[0_0_30px_rgba(140,255,0,0.4)] hover:shadow-[0_0_40px_rgba(140,255,0,0.6)] hover:scale-[1.01]"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 fill-[#050705] shrink-0" />
                  <span>QUERO FURAR A FILA E ATIVAR MEU ACESSO VIP</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-[#667066] font-semibold uppercase tracking-wider">
                <span>🔒 Checkout Seguro Kiwify</span>
                <span>•</span>
                <span>⚡ Acesso Imediato</span>
                <span>•</span>
                <span>💳 Pix ou Cartão</span>
              </div>

              {/* Opção Secundária Discreta (Esperar na fila comum) */}
              <div className="pt-1 pb-1">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-[11px] sm:text-xs text-[#667066] hover:text-[#F4F6F1] underline transition-colors cursor-pointer"
                >
                  Não quero atendimento prioritário, prefiro aguardar até 72h na fila comum.
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded bg-[#050705] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#8CFF00]">
            <Clock className="h-3 w-3" />
            Leva cerca de 1 minuto
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#667066]">
            Etapa {step} de 2
          </span>
        </div>
      </div>

      <div className="mb-5">
        <div className="h-2 w-full bg-[#DDE2D9] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#8CFF00] transition-all duration-300 rounded-full"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-3.5">
        {step === 1 && (
          <div className="space-y-3.5 animate-fade-in">
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                Nome Completo *
              </label>
              <input 
                required 
                type="text" 
                placeholder="Ex: Dra. Juliana Souza" 
                value={name}
                onFocus={() => trackCustomEvent("FormStart", { form_id: formId })}
                onChange={e => setName(e.target.value)}
                className={inputCls} 
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                E-mail Principal *
              </label>
              <input 
                required 
                type="email" 
                placeholder="Ex: juliana@clinica.com.br" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputCls} 
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                WhatsApp com DDD *
              </label>
              <input 
                required 
                type="tel" 
                placeholder="Ex: (11) 99999-9999" 
                value={phone}
                onChange={handlePhoneChange}
                className={inputCls} 
              />
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="mt-2 w-full inline-flex h-[54px] items-center justify-center gap-2 rounded-lg bg-[#8CFF00] px-6 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all hover:bg-[#68BF00] cursor-pointer shadow-md"
            >
              CONTINUAR PARA MINHA ANÁLISE
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 animate-fade-in">
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                Instagram da Clínica *
              </label>
              <input 
                required 
                type="text" 
                placeholder="Ex: @clinicasouzaestetica" 
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                className={inputCls} 
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                CRM Médico (Número e Estado) *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <input 
                    required 
                    type="text" 
                    inputMode="numeric"
                    placeholder="Ex: 123456" 
                    value={crmNumber}
                    onChange={e => setCrmNumber(e.target.value.replace(/\D/g, "").slice(0, 8))}
                    className={inputCls} 
                  />
                </div>
                <div>
                  <select 
                    required 
                    value={crmUf} 
                    onChange={e => setCrmUf(e.target.value)} 
                    className={inputCls}
                  >
                    <option value="" disabled>UF</option>
                    {UF_LIST.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-1 text-[10px] text-[#667066] font-medium">
                Diagnóstico exclusivo para médicos com CRM ativo.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                Faturamento Médio Mensal *
              </label>
              <select required value={faturamento} onChange={e => setFaturamento(e.target.value)} className={inputCls}>
                <option value="" disabled>Selecione a faixa de faturamento</option>
                <option value="Faturo menos de R$ 35 mil">Faturo menos de R$ 35 mil</option>
                <option value="Faturo de R$ 35 mil a R$ 50 mil">Faturo de R$ 35 mil a R$ 50 mil</option>
                <option value="Faturo de R$ 50 mil a R$ 100 mil">Faturo de R$ 50 mil a R$ 100 mil</option>
                <option value="Faturo acima de R$ 100 mil">Faturo acima de R$ 100 mil</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                Investimento Atual em Marketing *
              </label>
              <select required value={investimento} onChange={e => setInvestimento(e.target.value)} className={inputCls}>
                <option value="" disabled>Selecione a verba de anúncios</option>
                <option>Ainda não invisto</option>
                <option>Até R$ 3 mil</option>
                <option>Entre R$ 3 mil e R$ 7 mil</option>
                <option>Entre R$ 7 mil e R$ 15 mil</option>
                <option>Acima de R$ 15 mil</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                Prazo Estimado para Iniciar *
              </label>
              <select required value={prazo} onChange={e => setPrazo(e.target.value)} className={inputCls}>
                <option value="" disabled>Selecione um prazo estimado</option>
                <option value="Quero iniciar agora">Quero iniciar agora</option>
                <option value="Nos próximos 30 dias">Nos próximos 30 dias</option>
                <option value="Nos próximos 60 a 90 dias">Nos próximos 60 a 90 dias</option>
                <option value="Estou pesquisando possibilidades">Estou pesquisando possibilidades</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex h-[54px] w-14 shrink-0 items-center justify-center rounded-lg border border-[#DDE2D9] bg-[#FFFFFF] text-[#050705] hover:bg-[#DDE2D9] transition-all cursor-pointer"
                title="Voltar para etapa anterior"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-[54px] flex-grow items-center justify-center gap-2 rounded-lg bg-[#8CFF00] px-4 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all hover:bg-[#68BF00] cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    QUERO IDENTIFICAR MEUS GARGALOS
                    <ArrowRight className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-[#DDE2D9] text-center space-y-1">
          <p className="text-xs font-bold text-[#050705]">
            Gratuito e sem compromisso. Você não precisa contratar nenhum serviço depois da análise.
          </p>
          <p className="text-[10px] text-[#667066]">
            Seus dados estão protegidos e não serão compartilhados.
          </p>
        </div>
      </form>
    </div>
  );
}
```

---

### 2.2 Perguntas e Opções Exatas Exibidas ao Usuário

#### Etapa 1 de 2: Dados de Contato
1. **Nome Completo \***
   * Tipo: Campo de texto (`type="text"`)
   * Placeholder: `Ex: Dra. Juliana Souza`
   * Validação: Obrigatório, mínimo de 3 caracteres. Dispara `FormStart` no primeiro `onFocus`.
2. **E-mail Principal \***
   * Tipo: Campo de e-mail (`type="email"`)
   * Placeholder: `Ex: juliana@clinica.com.br`
   * Validação: Obrigatório, deve conter `@` e `.`.
3. **WhatsApp com DDD \***
   * Tipo: Campo telefônico (`type="tel"`)
   * Placeholder: `Ex: (11) 99999-9999`
   * Máscara dinâmica: Formatação automática em `(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX` (máximo de 11 dígitos numéricos).
   * Validação: Mínimo de 10 dígitos numéricos.
* **Ação:** Botão `CONTINUAR PARA MINHA ANÁLISE` valida os campos, dispara o evento customizado `FormStepComplete` (etapa 1) e avança para a Etapa 2.

#### Etapa 2 de 2: Qualificação da Clínica
1. **Instagram da Clínica \***
   * Tipo: Campo de texto (`type="text"`)
   * Placeholder: `Ex: @clinicasouzaestetica`
   * Validação: Mínimo de 2 caracteres.
2. **CRM Médico (Número e Estado) \***
   * **Número:** Campo numérico limitado a 8 dígitos (`inputMode="numeric"`, regex `replace(/\D/g, "").slice(0, 8)`). Placeholder: `Ex: 123456`. Validação: Mínimo de 4 dígitos.
   * **UF:** Select com os 27 estados da federação (`AC`, `AL`, `AP`, `AM`, `BA`, `CE`, `DF`, `ES`, `GO`, `MA`, `MT`, `MS`, `MG`, `PA`, `PB`, `PR`, `PE`, `PI`, `RJ`, `RN`, `RS`, `RO`, `RR`, `SC`, `SP`, `SE`, `TO`).
   * Legenda de apoio: *"Diagnóstico exclusivo para médicos com CRM ativo."*
3. **Faturamento Médio Mensal \***
   * Select com opções:
     * `Selecione a faixa de faturamento` (placeholder desabilitado)
     * `Faturo menos de R$ 35 mil`
     * `Faturo de R$ 35 mil a R$ 50 mil`
     * `Faturo de R$ 50 mil a R$ 100 mil`
     * `Faturo acima de R$ 100 mil`
4. **Investimento Atual em Marketing \***
   * Select com opções:
     * `Selecione a verba de anúncios` (placeholder desabilitado)
     * `Ainda não invisto`
     * `Até R$ 3 mil`
     * `Entre R$ 3 mil e R$ 7 mil`
     * `Entre R$ 7 mil e R$ 15 mil`
     * `Acima de R$ 15 mil`
5. **Prazo Estimado para Iniciar \***
   * Select com opções:
     * `Selecione um prazo estimado` (placeholder desabilitado)
     * `Quero iniciar agora`
     * `Nos próximos 30 dias`
     * `Nos próximos 60 a 90 dias`
     * `Estou pesquisando possibilidades`
* **Ações:**
  * Botão de voltar (ícone de seta à esquerda) retorna para a Etapa 1 mantendo os dados preenchidos.
  * Botão `QUERO IDENTIFICAR MEUS GARGALOS` envia o formulário (`onSubmit`).

---

### 2.3 Lógica de Score e Classificação do Lead (A, B, C, D)

A classificação é calculada no cliente no arquivo `src/routes/index.tsx` (linhas 483 a 508) e replicada como fallback de segurança no Google Apps Script (`google_apps_script.js`, linhas 96 a 129).

#### 1. Classificação do Lead (`leadClass`: A, B, C, D)
Baseia-se estritamente na faixa de faturamento mensal selecionada:

| Faixa de Faturamento Selecionada | Classificação (`leadClass`) | Categoria de Qualificação |
| :--- | :---: | :--- |
| `Faturo acima de R$ 100 mil` | **A** | **Super Lead** |
| `Faturo de R$ 50 mil a R$ 100 mil` | **B** | **Lead Qualificado** |
| `Faturo de R$ 35 mil a R$ 50 mil` | **C** | **Lead Qualificado** |
| `Faturo menos de R$ 35 mil` (ou qualquer valor inferior) | **D** | **Lead Desqualificado** |

#### 2. Cálculo da Pontuação Numérica (`score`: 0 a 100)
A pontuação é somada a partir de dois critérios:
1. **Pontos de Faturamento:**
   * Lead A: **80 pontos**
   * Lead B: **60 pontos**
   * Lead C: **40 pontos**
   * Lead D: **10 pontos**
2. **Pontos de Investimento em Tráfego:**
   * `Acima de R$ 15 mil`: **+20 pontos**
   * `Entre R$ 7 mil e R$ 15 mil`: **+15 pontos**
   * `Entre R$ 3 mil e R$ 7 mil`: **+10 pontos**
   * `Até R$ 3 mil`: **+5 pontos**
   * `Ainda não invisto`: **+0 pontos**

*Exemplo: Um lead com faturamento acima de R$ 100 mil (80 pts) e investimento acima de R$ 15 mil (20 pts) totaliza score 100.*

---

### 2.4 Fluxo de Envio e Página de Obrigado / Modal Fura-Fila

Ao clicar no botão de envio final:
1. **Prevenção de múltiplos envios:** `isSubmitting = true`, exibindo estado de loading no botão.
2. **Coleta de Parâmetros de Rastreamento:** Extração de cookies `_fbc`, `_fbp`, geração de `externalId` único (`fa_${Date.now()}_${random}`), e combinação do CRM (`numero/UF`).
3. **Disparo para o Webhook:**
   * Envio assíncrono via `fetch` HTTP POST para `VITE_SHEETS_WEBHOOK_URL` em modo `no-cors` com `Content-Type: text/plain;charset=utf-8`.
4. **Disparos do Meta Pixel no Navegador:**
   * Dispara `fbq('track', 'Lead', ...)` com `eventID: externalId`.
   * Dispara `fbq('trackCustom', 'Lead <CLASSE>', ...)` com `eventID: ${externalId}_${leadClass}`.
   * Dispara `fbq('trackCustom', 'Super Lead', ...)` (se Lead A) ou `'Lead Qualificado'` (se Lead B ou C).
   * Dispara `fbq('trackCustom', 'LeadForm', ...)`.
   * Dispara pushes no `window.dataLayer` (`lead_form_submitted`, etc.).
5. **Abertura do Modal de Obrigado / "Fura Fila":**
   * **Não há redirecionamento para outra URL externa como `/obrigado`.** O lead permanece na mesma página e é aberto um modal com fundo escuro e efeito de desfoque (`isSubmitted = true`).
   * **Barra de Progresso Fake:** Simula o processamento do cadastro com porcentagens graduais: `25%` (imediato) $\rightarrow$ `52%` (700ms) $\rightarrow$ `78%` (1800ms) $\rightarrow$ `94%` (3000ms).
   * **Oferta "Furar a Fila":** Explica que a fila gratuita pode levar até 72 horas e oferece a oportunidade de receber o diagnóstico imediatamente mediante uma taxa simbólica de prioridade de **R$ 19,90** (de R$ 197,00).
   * **Ação do Checkout VIP Kiwify:**
     * Ao clicar no botão *"QUERO FURAR A FILA E ATIVAR MEU ACESSO VIP"*, é disparado o evento `InitiateCheckout` (valor `19.90`, moeda `BRL`) e o evento customizado `VIPFastTrackCheckoutClick`.
     * Abre uma janela pop-up dedicada (`520x800px`) centralizada na tela com a URL:
       `https://pay.kiwify.com.br/LjM9uMe?name=...&email=...&phone=...&utm_source=...&utm_medium=...&utm_campaign=...&utm_content=...&utm_term=...&fbclid=...`
     * Caso o pop-up seja bloqueado pelo navegador, possui fallback automático para `window.open(fullUrl, "_blank")`.
   * **Opção Secundária:** Botão discreto *"Não quero atendimento prioritário, prefiro aguardar até 72h na fila comum."*, que fecha o modal e limpa o formulário.

---

## 3. ARQUITETURA DE RASTREAMENTO (META PIXEL & CAPI)

### 3.1 Instalação do Meta Pixel no Root
O Meta Pixel está instalado no arquivo [`src/routes/__root.tsx`](file:///c:/Users/vinic/.gemini/antigravity/scratch/diagnostico-fa/src/routes/__root.tsx) no `<head>` do documento HTML:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1049112404466926');
      fbq('track', 'PageView');
    `,
  }}
/>
<noscript>
  <img
    height="1"
    width="1"
    style={{ display: "none" }}
    src="https://www.facebook.com/tr?id=1049112404466926&ev=PageView&noscript=1"
  />
</noscript>
```

* **ID do Pixel Meta:** `1049112404466926`

---

### 3.2 Código Server-Side da Conversions API (CAPI)

O envio server-side é implementado no arquivo `google_apps_script.js` (Google Apps Script). Ele utiliza a Graph API v21.0 da Meta com hashing SHA-256 obrigatório para Advanced Matching:

```javascript
var META_PIXEL_ID = "1049112404466926";
var META_ACCESS_TOKEN = "[REMOVIDO]";

/**
 * Função Auxiliar de Criptografia SHA-256 (Exigida pelo Meta CAPI para Advanced Matching)
 */
function hashSHA256(input) {
  if (!input) return null;
  var clean = input.toString().trim().toLowerCase();
  if (clean === "") return null;
  var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, clean, Utilities.Charset.UTF_8);
  var txtHash = "";
  for (var i = 0; i < rawHash.length; i++) {
    var byteVal = rawHash[i];
    if (byteVal < 0) byteVal += 256;
    var byteHex = byteVal.toString(16);
    if (byteHex.length == 1) byteHex = "0" + byteHex;
    txtHash += byteHex;
  }
  return txtHash;
}

/**
 * Normaliza o telefone para o formato E.164 (ex: 5511999999999) antes de fazer o Hash
 */
function cleanPhoneNumber(phone) {
  if (!phone) return null;
  var digits = phone.toString().replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10 || digits.length === 11) {
    digits = "55" + digits;
  }
  return hashSHA256(digits);
}

/**
 * Envia um evento offline para a Meta Conversions API (Graph API v21.0)
 */
function sendMetaCapiEvent(eventName, leadData, customData) {
  try {
    var userData = {};
    
    if (leadData.email && String(leadData.email).trim() !== "") {
      var hashedEmail = hashSHA256(leadData.email);
      if (hashedEmail) userData.em = [hashedEmail];
    }
    
    if (leadData.phone && String(leadData.phone).trim() !== "") {
      var hashedPhone = cleanPhoneNumber(leadData.phone);
      if (hashedPhone) userData.ph = [hashedPhone];
    }
    
    if (leadData.name && String(leadData.name).trim() !== "") {
      var nameParts = String(leadData.name).trim().split(" ");
      if (nameParts[0]) {
        var fnHash = hashSHA256(nameParts[0]);
        if (fnHash) userData.fn = [fnHash];
      }
      if (nameParts.length > 1) {
        var lnHash = hashSHA256(nameParts.slice(1).join(" "));
        if (lnHash) userData.ln = [lnHash];
      }
    }
    
    if (leadData.fbc && String(leadData.fbc).trim() !== "") {
      userData.fbc = String(leadData.fbc).trim();
    }
    if (leadData.fbp && String(leadData.fbp).trim() !== "") {
      userData.fbp = String(leadData.fbp).trim();
    }
    if (leadData.externalId && String(leadData.externalId).trim() !== "") {
      var extIdStr = String(leadData.externalId).trim();
      var hashedExt = hashSHA256(extIdStr);
      if (hashedExt) userData.external_id = [hashedExt];
    }

    if (Object.keys(userData).length === 0) {
      return { error: { message: "Sem dados identificadores do lead (e-mail, telefone ou nome)" } };
    }
    
    var uniqueId = leadData.externalId || leadData.email || leadData.phone || leadData.name || String(Date.now());
    var eventId = "fa_" + hashSHA256(String(uniqueId).trim()) + "_" + eventName;

    var eventPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "system_generated",
      user_data: userData
    };
    
    if (customData) {
      eventPayload.custom_data = customData;
    }
    
    var url = "https://graph.facebook.com/v21.0/" + META_PIXEL_ID + "/events?access_token=" + encodeURIComponent(META_ACCESS_TOKEN);
    var options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ data: [eventPayload] }),
      muteHttpExceptions: true
    };
    
    var response = UrlFetchApp.fetch(url, options);
    var responseText = response.getContentText();
    Logger.log("CAPI Response [" + eventName + "]: " + responseText);
    return JSON.parse(responseText);
  } catch (err) {
    Logger.log("Erro no CAPI [" + eventName + "]: " + err.toString());
    return { error: { message: err.toString() } };
  }
}
```

---

### 3.3 Tabela Completa de Eventos Disparados

| Nome do Evento | Canal / Destino | Momento do Disparo | Parâmetros Enviados | `eventID` / Deduplicação |
| :--- | :---: | :--- | :--- | :--- |
| **`PageView`** | Pixel (Browser) | Carga inicial da página em `RootShell` e no hook `useEffect` da página | `{}` | Não informado |
| **`ViewContent`** | Pixel (Browser) | Carga do componente da página | `{ content_name: "Diagnostico Estrategico FA" }` | Não informado |
| **`Scroll50`** | Pixel (Browser) + dataLayer | Ao rolar $\ge 50\%$ da altura da página | `{}` | Não informado |
| **`Scroll75`** | Pixel (Browser) + dataLayer | Ao rolar $\ge 75\%$ da altura da página | `{}` | Não informado |
| **`FormStart`** | Pixel (Browser) + dataLayer | No foco (`onFocus`) do campo Nome Completo | `{ form_id: formId }` | Não informado |
| **`FormStepComplete`** | Pixel (Browser) + dataLayer | Ao avançar da Etapa 1 para a Etapa 2 | `{ step: 1, form_id: formId }` | Não informado |
| **`CaseVideoPlay`** | Pixel (Browser) + dataLayer | Ao clicar para assistir a qualquer depoimento em vídeo | `{ video_url: videoUrl }` | Não informado |
| **`MainCaseCTAClick`** | Pixel (Browser) + dataLayer | Ao clicar no botão de CTA abaixo dos vídeos | `{}` | Não informado |
| **`MobileStickyCTAClick`** | Pixel (Browser) + dataLayer | Ao clicar na barra fixa inferior no celular | `{}` | Não informado |
| **`Lead`** | Pixel (Browser) | No envio bem-sucedido do formulário | `{ content_name: "Diagnostico Estrategico FA", currency: "BRL", lead_class: leadClass }` | `eventID: externalId` |
| **`Lead A` / `Lead B` / `Lead C` / `Lead D`** | Pixel (Browser) + dataLayer | No envio do formulário, específico da faixa | `{ content_name: "Diagnostico Estrategico FA", lead_class: leadClass, faturamento: faturamento, form_used: formId }` | `eventID: ${externalId}_${leadClass}` |
| **`Super Lead`** | Pixel (Browser) + dataLayer | No envio do formulário, disparado apenas para **Lead A** | `{ content_name: "Diagnostico Estrategico FA", lead_class: "A", faturamento: faturamento, form_used: formId }` | `eventID: ${externalId}_super_lead` |
| **`Lead Qualificado`** | Pixel (Browser) + dataLayer | No envio do formulário, disparado para **Lead B e C** | `{ content_name: "Diagnostico Estrategico FA", lead_class: leadClass, faturamento: faturamento, form_used: formId }` | `eventID: ${externalId}_lead_qualificado` |
| **`LeadForm`** | Pixel (Browser) | No envio do formulário | `{ content_name: "Diagnostico Estrategico FA", form_used: formId, lead_class: leadClass }` | `eventID: externalId` |
| **`InitiateCheckout`** | Pixel (Browser) | Ao clicar no botão VIP "Furar a Fila" | `{ content_name: "Diagnostico Estrategico VIP - Furar Fila", currency: "BRL", value: 19.90 }` | Não informado |
| **`VIPFastTrackCheckoutClick`** | Pixel (Browser) + dataLayer | Ao clicar no botão VIP "Furar a Fila" | `{ value: 19.90, form_id: formId, lead_name: name, lead_phone: phone, lead_email: email }` | Não informado |
| **`Schedule`** | CAPI (Server-Side) | Quando um SDR marca a Coluna R ("AGENDAMENTO") como "Sim" na planilha | Dados do usuário (`em`, `ph`, `fn`, `ln`, `fbc`, `fbp`, `external_id`) | `"fa_" + hashSHA256(...) + "_Schedule"` |
| **`Purchase`** | CAPI (Server-Side) | Quando um SDR marca a Coluna S ("VENDA") como "Sim" na planilha | `{ currency: "BRL", value: valorConversao }` + Dados do usuário | `"fa_" + hashSHA256(...) + "_Purchase"` |

---

### 3.4 Captura e Repasse de Parâmetros (UTMs, Cookies, IDs)

#### 1. Captura de Parâmetros de URL
No componente `Index` (`src/routes/index.tsx`, linhas 160-186), a URL é lida na carga com fallbacks para padrões do Meta Ads e Google Ads:

```typescript
const params = new URLSearchParams(window.location.search);
const getParam = (...names: string[]) => {
  for (const name of names) {
    const val = params.get(name);
    if (val) return val;
  }
  return "";
};

const utmCampaign = getParam("campaign_id", "campaign.id", "campaignid", "utm_campaign_id", "hsa_cam", "utm_campaign", "campaign_name", "campaign");
const utmMedium = getParam("adset_id", "adset.id", "adsetid", "utm_adset_id", "hsa_grp", "utm_medium", "adset_name", "adset");
const utmContent = getParam("ad_id", "ad.id", "adid", "utm_ad_id", "hsa_ad", "utm_content", "ad_name", "ad");
const utmSource = getParam("placement", "meta_posicionamento", "utm_source", "source");
```

Os parâmetros capturados são:
* `utm_source` / `placement`
* `utm_medium` / `adset_id`
* `utm_campaign` / `campaign_id`
* `utm_content` / `ad_id`
* `utm_term` / `keyword`
* `fbclid`
* `gclid`

#### 2. Captura dos Cookies da Meta (`_fbc` e `_fbp`)
No momento da submissão do formulário:
* `_fbp`: Lido diretamente de `document.cookie`.
* `_fbc`: Lido de `document.cookie`. Se não existir e houver `fbclid` na URL, o código constrói automaticamente o formato oficial:
  `fbcCookie = "fb.1." + Date.now() + "." + utms.fbclid;`

#### 3. Geração do `external_id`
Gerado dinamicamente no front-end para cada envio:
```typescript
const externalId = `fa_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
```

#### 4. Repasse de Dados
1. **Para o Webhook do Google Apps Script:** Todos os dados (contato, qualificação, cookies `_fbc`/`_fbp`, `external_id`, IDs de campanha/conjunto/anúncio) são enviados no payload JSON via POST.
2. **Para o Checkout Kiwify:** Os parâmetros `name`, `email`, `phone`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid` são repassados como query string na URL do checkout.

---

### 3.5 Deduplicação entre Pixel e CAPI

* **Como funciona hoje no projeto:**
  1. No **Meta Pixel (Browser)**, os eventos `Lead`, `Lead A/B/C/D`, `Super Lead` e `Lead Qualificado` passam a chave `eventID: externalId` (ou variações prefixadas por faixa).
  2. No **CAPI (Server-Side via Apps Script)**, atualmente são enviados apenas os eventos pós-conversão offline: `Schedule` e `Purchase` (acionados via edição de planilha pelo time comercial).
  3. No envio da CAPI do Apps Script, o `event_id` é gerado como:
     ```javascript
     var uniqueId = leadData.externalId || leadData.email || leadData.phone || leadData.name || String(Date.now());
     var eventId = "fa_" + hashSHA256(String(uniqueId).trim()) + "_" + eventName;
     ```

> [!IMPORTANT]
> **Recomendação para Otimização de Rastreamento:**  
> Caso a equipe deseje enviar o evento `Lead` também via CAPI (para redundância e cobertura contra bloqueadores de anúncios):
> - O `event_name` deve ser exatamente `"Lead"`.
> - O `event_id` enviado pela CAPI no Google Apps Script deve ser **idêntico** ao `externalId` disparado pelo Pixel no navegador (sem aplicar hash extra no `event_id`, apenas repassar `leadData.externalId`). Dessa forma, a Meta associará os dois eventos com 100% de deduplicação no Gerenciador de Eventos.

---

## 4. INTEGRAÇÕES

### 4.1 Código do Google Apps Script (`google_apps_script.js`)

Abaixo está o código real e completo do script que recebe o webhook, distribui leads para os SDRs, atualiza a planilha, aciona a CAPI da Meta e sincroniza com o Supabase.

*(Nota de segurança: tokens e chaves privadas foram substituídos por `[REMOVIDO]` conforme solicitado).*

```javascript
/**
 * Google Apps Script - Integração Diagnóstico FA (Com suporte UTF-8, Meta Ads CAPI, Triggers, Distribuição SDR, Supabase e Identificação de LP)
 * 
 * Mapeamento das colunas A até Y (25 colunas):
 * A: Data/Hora
 * B: LP (Identificação da LP: ex "LP1", "LP FA2")
 * C: Nome
 * D: Telefone
 * E: E-mail
 * F: Nome da Clínica
 * G: CRM (ou Especialidade)
 * H: Objetivo Principal
 * I: Faturamento
 * J: Tráfego Pago
 * K: Prazo Estimado para Iniciar
 * L: Score Pontos
 * M: Tipo do Lead
 * N: Campanha (ID da Campanha)
 * O: Conjunto (ID do Conjunto de Anúncios)
 * P: Anúncio (ID do Anúncio)
 * Q: SDR
 * R: AGENDAMENTO (Sim / Não)
 * S: VENDA (Sim / Não)
 * T: VALOR DE CONVERSÃO (Número R$)
 * U: FBC_FBCLID (Cookie / ID de Clique Meta)
 * V: FBP (Cookie de Navegador Meta)
 * W: EXTERNAL_ID (ID Único do Lead)
 * X: CAPI_AGENDAMENTO_ENVIADO (Status/Timestamp do Envio)
 * Y: CAPI_VENDA_ENVIADO (Status/Timestamp do Envio)
 */

var META_PIXEL_ID = "1049112404466926";
var META_ACCESS_TOKEN = "[REMOVIDO]";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Garantir decodificação UTF-8 correta para acentuação
    var jsonString = "";
    if (e.postData && e.postData.bytes) {
      jsonString = Utilities.newBlob(e.postData.bytes).getDataAsString("UTF-8");
    } else if (e.postData && e.postData.contents) {
      jsonString = e.postData.contents;
    } else {
      jsonString = "{}";
    }
    
    var data = JSON.parse(jsonString);

    // Mapeamento dos campos recebidos
    var dataHora = data.timestamp || data.data_horario || new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    
    // Identificação da LP (Coluna B)
    // 1. Prioridade para valor explícito vindo do payload ("LP1", "LP FA2", etc.)
    var identificacaoLP = data.identificacao_lp || data.origem_lp || data.lp;
    
    // 2. Se não vier especificado, identifica pelo formato do formulário:
    if (!identificacaoLP) {
      // Esta LP (LP1) possui o formulário completo em etapas com CRM, prazo de início, investimento, etc.
      var temCamposLP1 = !!(
        data.crm ||
        data.CRM ||
        data.prazo_inicio ||
        data.prazo ||
        data.especialidade || 
        data.objetivo_principal || 
        data.objective || 
        data.investimento_marketing || 
        data.traffic ||
        (data.faturamento_mensal && String(data.faturamento_mensal).toLowerCase().indexOf("faturo") !== -1) ||
        (data.revenue && String(data.revenue).toLowerCase().indexOf("faturo") !== -1)
      );
      
      if (temCamposLP1) {
        identificacaoLP = "LP1";
      } else {
        // Formulário mais curto (outra LP): preserva identificação sem alterar sua estrutura
        identificacaoLP = (data.faturamento && String(data.faturamento).indexOf("R$35 a R$50") !== -1) ? "LP FA2" : (data.form_used || "LP FA2");
      }
    }
    
    var nome = data.nome || data.name || "";
    var telefone = data.whatsapp || data.phone || "";
    var email = data.e_mail || data.email || "";
    var nomeClinica = data.instagram_clinica || data.clinicInstagram || data.clinicName || "";
    var crm = data.crm || data.CRM || data.especialidade || "";
    var especialidade = crm;
    var objetivoPrincipal = data.objetivo_principal || data.objective || "";
    var faturamento = data.faturamento_mensal || data.revenue || "";
    var trafegoPago = data.investimento_marketing || data.traffic || "";
    var prazoInicio = data.prazo_inicio || data.prazo || "";
    var scorePontos = data.score !== undefined ? data.score : "";
    var tipoLead = data.leadType || data.tipo_lead || data.lead_type || "";
    
    // Classificação estrita pelo faturamento para a Coluna M (caso venha vazio):
    // Cobre tanto o formulário completo (LP1) quanto o formulário mais curto (outra LP)
    if (!tipoLead && faturamento) {
      var fatLower = String(faturamento).toLowerCase();
      if (
        fatLower.indexOf("menos de") !== -1 || 
        fatLower.indexOf("< 35") !== -1 || 
        fatLower.indexOf("não atinjo") !== -1 || 
        fatLower.indexOf("nao atinjo") !== -1
      ) {
        tipoLead = "D";
      } else if (
        fatLower.indexOf("acima de") !== -1 || 
        fatLower.indexOf("> 50") !== -1 || 
        fatLower.indexOf("mais de") !== -1 ||
        fatLower.indexOf("500 mil") !== -1 ||
        fatLower.indexOf("200 mil") !== -1 ||
        (fatLower.indexOf("100 mil") !== -1 && fatLower.indexOf("60 mil") === -1 && fatLower.indexOf("50 mil") === -1)
      ) {
        tipoLead = "A";
      } else if (
        (fatLower.indexOf("50") !== -1 && fatLower.indexOf("100") !== -1) ||
        (fatLower.indexOf("60") !== -1 && fatLower.indexOf("100") !== -1)
      ) {
        tipoLead = "B";
      } else if (
        (fatLower.indexOf("35") !== -1 && fatLower.indexOf("50") !== -1) ||
        (fatLower.indexOf("35") !== -1 && fatLower.indexOf("60") !== -1)
      ) {
        tipoLead = "C";
      } else {
        tipoLead = "D";
      }
    }
    
    // IDs de Campanha, Conjunto e Anúncio enviados pelo Meta Ads / Pixel
    var campanha = data.Campanha || data.campanha || data.meta_campanha || data.campaign_id || data.utm_campaign || "";
    var conjunto = data.Conjunto || data.conjunto || data.meta_conjunto || data.adset_id || data.utm_medium || "";
    var anuncio = data["Anúncio"] || data.Anuncio || data.anuncio || data.meta_anuncio || data.ad_id || data.utm_content || "";

    // Distribuição de SDRs (Rodízio 1 para 1: Jose Sousa -> Carlos Muller)
    var scriptProperties = PropertiesService.getScriptProperties();
    var lastSdr = scriptProperties.getProperty("LAST_SDR");
    
    var sdrAtribuido = data.sdr || "";
    if (!sdrAtribuido) {
      if (!lastSdr || lastSdr === "Carlos Muller") {
        sdrAtribuido = "Jose Sousa";
      } else {
        sdrAtribuido = "Carlos Muller";
      }
      scriptProperties.setProperty("LAST_SDR", sdrAtribuido);
    }

    // Campos de Operação Comercial
    var agendamento = data.agendamento || "";
    var venda = data.venda || "";
    var valorConversao = data.valor_conversao || "";

    // Parâmetros Meta CAPI (Colunas U, V, W)
    var fbc = data.fbc || data.FBC_FBCLID || data.fbclid || "";
    var fbp = data.fbp || data.FBP || "";
    var externalId = data.external_id || data.EXTERNAL_ID || "";

    // Status CAPI Iniciais (Colunas X, Y)
    var capiAgendamentoEnviado = "";
    var capiVendaEnviado = "";

    // Linha a ser adicionada na planilha (Colunas A -> Y, totalizando 25 colunas)
    var row = [
      dataHora,               // Coluna A
      identificacaoLP,        // Coluna B (LP)
      nome,                   // Coluna C
      telefone,               // Coluna D
      email,                  // Coluna E
      nomeClinica,            // Coluna F
      especialidade,          // Coluna G
      objetivoPrincipal,      // Coluna H
      faturamento,            // Coluna I
      trafegoPago,            // Coluna J
      prazoInicio,            // Coluna K
      scorePontos,            // Coluna L
      tipoLead,               // Coluna M
      campanha,               // Coluna N
      conjunto,               // Coluna O
      anuncio,                // Coluna P
      sdrAtribuido,           // Coluna Q
      agendamento,            // Coluna R
      venda,                  // Coluna S
      valorConversao,         // Coluna T
      fbc,                    // Coluna U
      fbp,                    // Coluna V
      externalId,             // Coluna W
      capiAgendamentoEnviado, // Coluna X
      capiVendaEnviado        // Coluna Y
    ];

    sheet.appendRow(row);

    // Envia o lead novo para o Supabase com a identificação da LP
    var leadSupabase = {
      lp: identificacaoLP,
      nome: nome,
      telefone: telefone,
      email: email,
      clinica: nomeClinica,
      crm: crm,
      especialidade: especialidade,
      objetivo_principal: objetivoPrincipal,
      faturamento: faturamento,
      trafego_pago: trafegoPago,
      prazo_estimado: prazoInicio,
      score_pontos: scorePontos,
      tipo_lead: tipoLead,
      campaign_id: campanha,
      adset_id: conjunto,
      ad_id: anuncio,
      sdr: sdrAtribuido,
      agendamento: agendamento,
      venda: venda,
      valor_conversao: valorConversao
    };
    enviarParaSupabase(leadSupabase);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", row: row }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Webhook de diagnóstico FA ativo com suporte a Meta CAPI, Distribuição de SDR e Múltiplas LPs!");
}

/**
 * Função Auxiliar de Criptografia SHA-256 (Exigida pelo Meta CAPI para Advanced Matching)
 */
function hashSHA256(input) {
  if (!input) return null;
  var clean = input.toString().trim().toLowerCase();
  if (clean === "") return null;
  var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, clean, Utilities.Charset.UTF_8);
  var txtHash = "";
  for (var i = 0; i < rawHash.length; i++) {
    var byteVal = rawHash[i];
    if (byteVal < 0) byteVal += 256;
    var byteHex = byteVal.toString(16);
    if (byteHex.length == 1) byteHex = "0" + byteHex;
    txtHash += byteHex;
  }
  return txtHash;
}

/**
 * Normaliza o telefone para o formato E.164 (ex: 5511999999999) antes de fazer o Hash
 */
function cleanPhoneNumber(phone) {
  if (!phone) return null;
  var digits = phone.toString().replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length === 10 || digits.length === 11) {
    digits = "55" + digits;
  }
  return hashSHA256(digits);
}

/**
 * Converte qualquer valor da planilha (seja número puro ou string formatada em R$) para um float válido
 */
function parseCurrencyValue(val) {
  if (val === null || val === undefined || val === "") return 0;
  
  if (typeof val === "number") {
    return isNaN(val) ? 0 : val;
  }
  
  var str = String(val).replace(/R\$/gi, "").trim();
  if (!str) return 0;
  
  if (str.indexOf(".") !== -1 && str.indexOf(",") !== -1) {
    if (str.lastIndexOf(",") > str.lastIndexOf(".")) {
      str = str.replace(/\./g, "").replace(",", ".");
    } else {
      str = str.replace(/,/g, "");
    }
  } else if (str.indexOf(",") !== -1) {
    str = str.replace(",", ".");
  }
  
  var num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

/**
 * Envia um evento offline para a Meta Conversions API (Graph API v21.0)
 */
function sendMetaCapiEvent(eventName, leadData, customData) {
  try {
    var userData = {};
    
    if (leadData.email && String(leadData.email).trim() !== "") {
      var hashedEmail = hashSHA256(leadData.email);
      if (hashedEmail) userData.em = [hashedEmail];
    }
    
    if (leadData.phone && String(leadData.phone).trim() !== "") {
      var hashedPhone = cleanPhoneNumber(leadData.phone);
      if (hashedPhone) userData.ph = [hashedPhone];
    }
    
    if (leadData.name && String(leadData.name).trim() !== "") {
      var nameParts = String(leadData.name).trim().split(" ");
      if (nameParts[0]) {
        var fnHash = hashSHA256(nameParts[0]);
        if (fnHash) userData.fn = [fnHash];
      }
      if (nameParts.length > 1) {
        var lnHash = hashSHA256(nameParts.slice(1).join(" "));
        if (lnHash) userData.ln = [lnHash];
      }
    }
    
    if (leadData.fbc && String(leadData.fbc).trim() !== "") {
      userData.fbc = String(leadData.fbc).trim();
    }
    if (leadData.fbp && String(leadData.fbp).trim() !== "") {
      userData.fbp = String(leadData.fbp).trim();
    }
    if (leadData.externalId && String(leadData.externalId).trim() !== "") {
      var extIdStr = String(leadData.externalId).trim();
      var hashedExt = hashSHA256(extIdStr);
      if (hashedExt) userData.external_id = [hashedExt];
    }

    if (Object.keys(userData).length === 0) {
      return { error: { message: "Sem dados identificadores do lead (e-mail, telefone ou nome)" } };
    }
    
    var uniqueId = leadData.externalId || leadData.email || leadData.phone || leadData.name || String(Date.now());
    var eventId = "fa_" + hashSHA256(String(uniqueId).trim()) + "_" + eventName;

    var eventPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "system_generated",
      user_data: userData
    };
    
    if (customData) {
      eventPayload.custom_data = customData;
    }
    
    var url = "https://graph.facebook.com/v21.0/" + META_PIXEL_ID + "/events?access_token=" + encodeURIComponent(META_ACCESS_TOKEN);
    var options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ data: [eventPayload] }),
      muteHttpExceptions: true
    };
    
    var response = UrlFetchApp.fetch(url, options);
    var responseText = response.getContentText();
    Logger.log("CAPI Response [" + eventName + "]: " + responseText);
    return JSON.parse(responseText);
  } catch (err) {
    Logger.log("Erro no CAPI [" + eventName + "]: " + err.toString());
    return { error: { message: err.toString() } };
  }
}

/**
 * Auxiliar para extrair mensagem de erro amigável
 */
function getMetaErrorMessage(res) {
  if (!res) return "Erro de envio (Sem resposta)";
  if (res.error) {
    if (typeof res.error === "string") return res.error;
    if (res.error.message) return res.error.message;
    return JSON.stringify(res.error);
  }
  return "Erro de Envio";
}

/**
 * Gatilho de edição do Google Sheets (Trigger Instalável "Ao Editar")
 * Coluna R (18) -> AGENDAMENTO
 * Coluna S (19) -> VENDA
 */
function onEditTrigger(e) {
  if (!e || !e.range) return;
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var col = e.range.getColumn();
  
  if (row <= 1) return; // Ignorar linha de cabeçalho
  
  // Agora Coluna R (18) é AGENDAMENTO e Coluna S (19) é VENDA
  if (col !== 18 && col !== 19) return;
  
  var rowValues = sheet.getRange(row, 1, 1, 25).getValues()[0];
  
  var lp = rowValues[1];                 // Coluna B (2)
  var nome = rowValues[2];               // Coluna C (3)
  var telefone = rowValues[3];           // Coluna D (4)
  var email = rowValues[4];              // Coluna E (5)
  var agendamento = rowValues[17];       // Coluna R (18)
  var venda = rowValues[18];             // Coluna S (19)
  var valorConversao = rowValues[19];   // Coluna T (20)
  var fbc = rowValues[20];               // Coluna U (21)
  var fbp = rowValues[21];               // Coluna V (22)
  var externalId = rowValues[22];        // Coluna W (23)
  var capiAgendamentoStatus = String(rowValues[23] || ""); // Coluna X (24)
  var capiVendaStatus = String(rowValues[24] || "");       // Coluna Y (25)
  
  var leadData = {
    name: nome,
    phone: telefone,
    email: email,
    fbc: fbc,
    fbp: fbp,
    externalId: externalId
  };
  
  var nowStr = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
  
  // Gatilho 1: AGENDAMENTO = Sim (Coluna R / 18)
  if (col === 18 && String(agendamento).trim().toLowerCase() === "sim" && (!capiAgendamentoStatus || capiAgendamentoStatus.indexOf("Erro") !== -1)) {
    var resSchedule = sendMetaCapiEvent("Schedule", leadData, null);
    if (resSchedule && !resSchedule.error && (!resSchedule.events_received || resSchedule.events_received > 0)) {
      sheet.getRange(row, 24).setValue(nowStr + " (Enviado)"); // Coluna X (24)
    } else {
      var errMsg = getMetaErrorMessage(resSchedule);
      sheet.getRange(row, 24).setValue("Erro: " + errMsg);
    }
  }
  
  // Gatilho 2: VENDA = Sim (Coluna S / 19)
  if (col === 19 && String(venda).trim().toLowerCase() === "sim" && (!capiVendaStatus || capiVendaStatus.indexOf("Erro") !== -1)) {
    var numValue = parseCurrencyValue(valorConversao);
    
    var customData = {
      currency: "BRL",
      value: numValue
    };
    var resPurchase = sendMetaCapiEvent("Purchase", leadData, customData);
    if (resPurchase && !resPurchase.error && (!resPurchase.events_received || resPurchase.events_received > 0)) {
      sheet.getRange(row, 25).setValue(nowStr + " (Enviado)"); // Coluna Y (25)
    } else {
      var errMsg2 = getMetaErrorMessage(resPurchase);
      sheet.getRange(row, 25).setValue("Erro: " + errMsg2);
    }
  }

  // Atualiza status de agendamento/venda no Supabase
  var updateSupabase = {
    lp: lp,
    nome: nome,
    telefone: telefone,
    email: email,
    agendamento: agendamento,
    venda: venda,
    valor_conversao: parseCurrencyValue(valorConversao)
  };
  enviarParaSupabase(updateSupabase);
}

/**
 * Adiciona um menu personalizado na planilha para envio manual em lote dos eventos pendentes
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("🚀 Meta CAPI")
    .addItem("Enviar Todos os Eventos Pendentes", "processAllPendingCapiEvents")
    .addToUi();
}

/**
 * Processamento em lote Meta CAPI
 */
function processAllPendingCapiEvents() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    Logger.log("Nenhum dado encontrado na planilha para processar.");
    try {
      SpreadsheetApp.getUi().alert("Nenhum dado encontrado na planilha para processar.");
    } catch(e) {}
    return;
  }
  
  var dataRange = sheet.getRange(2, 1, lastRow - 1, 25).getValues();
  var sentCount = 0;
  var errorCount = 0;
  var nowStr = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
  
  for (var i = 0; i < dataRange.length; i++) {
    var rowValues = dataRange[i];
    var rowIndex = i + 2;
    
    var nome = rowValues[2];             // Coluna C (3)
    var telefone = rowValues[3];         // Coluna D (4)
    var email = rowValues[4];            // Coluna E (5)
    var agendamento = rowValues[17];     // Coluna R (18)
    var venda = rowValues[18];           // Coluna S (19)
    var valorConversao = rowValues[19]; // Coluna T (20)
    var fbc = rowValues[20];             // Coluna U (21)
    var fbp = rowValues[21];             // Coluna V (22)
    var externalId = rowValues[22];      // Coluna W (23)
    var capiAgendamentoStatus = String(rowValues[23] || ""); // Coluna X (24)
    var capiVendaStatus = String(rowValues[24] || "");       // Coluna Y (25)
    
    var leadData = {
      name: nome,
      phone: telefone,
      email: email,
      fbc: fbc,
      fbp: fbp,
      externalId: externalId
    };
    
    // 1. Processa Agendamento (Coluna R == "Sim" e ainda não tem "(Enviado)")
    if (String(agendamento).trim().toLowerCase() === "sim" && (!capiAgendamentoStatus || capiAgendamentoStatus.indexOf("(Enviado)") === -1)) {
      var resSchedule = sendMetaCapiEvent("Schedule", leadData, null);
      if (resSchedule && !resSchedule.error && (!resSchedule.events_received || resSchedule.events_received > 0)) {
        sheet.getRange(rowIndex, 24).setValue(nowStr + " (Enviado)");
        sentCount++;
      } else {
        var errMsg = getMetaErrorMessage(resSchedule);
        sheet.getRange(rowIndex, 24).setValue("Erro: " + errMsg);
        errorCount++;
      }
      Utilities.sleep(200);
    }
    
    // 2. Processa Venda (Coluna S == "Sim" e ainda não tem "(Enviado)")
    if (String(venda).trim().toLowerCase() === "sim" && (!capiVendaStatus || capiVendaStatus.indexOf("(Enviado)") === -1)) {
      var numValue = parseCurrencyValue(valorConversao);
      
      var customData = {
        currency: "BRL",
        value: numValue
      };
      var resPurchase = sendMetaCapiEvent("Purchase", leadData, customData);
      if (resPurchase && !resPurchase.error && (!resPurchase.events_received || resPurchase.events_received > 0)) {
        sheet.getRange(rowIndex, 25).setValue(nowStr + " (Enviado)");
        sentCount++;
      } else {
        var errMsg2 = getMetaErrorMessage(resPurchase);
        sheet.getRange(rowIndex, 25).setValue("Erro: " + errMsg2);
        errorCount++;
      }
      Utilities.sleep(200);
    }
  }
  
  var msg = "Processamento em lote concluído! Eventos enviados com sucesso: " + sentCount + " | Erros: " + errorCount;
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert(msg);
  } catch(e) {}
}

/**
 * Função que se comunica com o Supabase
 */
function enviarParaSupabase(leadData) {
  var supabaseUrl = "https://aczsouypqgjlrqdmrtwq.supabase.co/functions/v1/sync-crm-sheet";
  var supabaseKey = "[REMOVIDO]";
  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer " + supabaseKey
    },
    payload: JSON.stringify(leadData),
    muteHttpExceptions: true
  };
  
  try {
    var response = UrlFetchApp.fetch(supabaseUrl, options);
    Logger.log("Sincronização CRM Supabase: " + response.getContentText());
  } catch (e) {
    Logger.log("Erro na sincronização: " + e.toString());
  }
}

/**
 * Carga Histórica Sequencial: Envia os leads um por um para evitar conflito de lote duplicado.
 */
function sincronizarHistoricoSupabase() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    Logger.log("Nenhum dado encontrado na planilha para processar.");
    return;
  }
  
  var dataRange = sheet.getRange(2, 1, lastRow - 1, 25).getValues();
  var successCount = 0;
  var errorCount = 0;
  
  for (var i = 0; i < dataRange.length; i++) {
    var rowValues = dataRange[i];
    
    var emailVal = rowValues[4];
    if (!emailVal || String(emailVal).trim() === "") {
      emailVal = "lead_hist_" + (i + 1) + "_" + Date.now() + "@sem-email.com";
    }

    var leadSupabase = {
      data_hora: rowValues[0],
      lp: rowValues[1] || "LP1",
      nome: rowValues[2] || "Lead Sem Nome",
      telefone: rowValues[3] || "",
      email: emailVal,
      clinica: rowValues[5] || "",
      especialidade: rowValues[6] || "",
      objetivo_principal: rowValues[7] || "",
      faturamento: rowValues[8] || "",
      trafego_pago: rowValues[9] || "",
      prazo_estimado: rowValues[10] || "",
      score_pontos: rowValues[11] || 0,
      tipo_lead: rowValues[12] || "D",
      campaign_id: rowValues[13] || "",
      adset_id: rowValues[14] || "",
      ad_id: rowValues[15] || "",
      sdr: rowValues[16] || "",
      agendamento: rowValues[17] || "Não",
      venda: rowValues[18] || "Não",
      valor_conversao: parseCurrencyValue(rowValues[19])
    };
    
    try {
      enviarParaSupabase(leadSupabase);
      successCount++;
      Utilities.sleep(100);
    } catch (err) {
      errorCount++;
      Logger.log("Erro na linha " + (i + 2) + ": " + err.toString());
    }
  }
  
  var msg = "Carga histórica concluída! Enviados com sucesso: " + successCount + " | Erros: " + errorCount;
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert(msg);
  } catch(e) {}
}
```

---

### 4.2 Mapeamento das Colunas da Planilha Google (A até Y - 25 Colunas)

| Coluna | Letra | Nome do Campo na Planilha | Origem no Formulário / Script | Descrição |
| :---: | :---: | :--- | :--- | :--- |
| 1 | **A** | `Data/Hora` | `timestamp` / `data_horario` | Data e hora do envio (formato `dd/mm/aaaa hh:mm:ss`) |
| 2 | **B** | `LP` | `identificacao_lp` / `"LP1"` | Identificador da landing page de origem |
| 3 | **C** | `Nome` | `name` / `nome` | Nome completo informado na Etapa 1 |
| 4 | **D** | `Telefone` | `phone` / `whatsapp` | WhatsApp com DDD informado na Etapa 1 |
| 5 | **E** | `E-mail` | `email` / `e_mail` | E-mail corporativo/principal do médico |
| 6 | **F** | `Nome da Clínica` | `instagram_clinica` | Instagram ou identificação da clínica |
| 7 | **G** | `CRM` | `crm` (`crmNumber/crmUf`) | CRM com Estado (ex: `123456/SP`) |
| 8 | **H** | `Objetivo Principal` | `objetivo_principal` | Reservado para objetivo (atualmente vazio na LP1) |
| 9 | **I** | `Faturamento` | `faturamento_mensal` | Faixa selecionada na Etapa 2 |
| 10 | **J** | `Tráfego Pago` | `investimento_marketing` | Verba selecionada na Etapa 2 |
| 11 | **K** | `Prazo Estimado para Iniciar`| `prazo_inicio` / `prazo` | Prazo selecionado na Etapa 2 |
| 12 | **L** | `Score Pontos` | `score` | Pontuação calculada de 0 a 100 |
| 13 | **M** | `Tipo do Lead` | `leadType` / `tipo_lead` | Classificação do lead (`A`, `B`, `C` ou `D`) |
| 14 | **N** | `Campanha` | `meta_campanha` / `utm_campaign` | ID da Campanha de anúncios Meta |
| 15 | **O** | `Conjunto` | `meta_conjunto` / `utm_medium` | ID do Conjunto de Anúncios |
| 16 | **P** | `Anúncio` | `meta_anuncio` / `utm_content` | ID do Anúncio criativo |
| 17 | **Q** | `SDR` | Rodízio `Jose Sousa` / `Carlos Muller` | SDR atribuído automaticamente por rodízio 1 a 1 |
| 18 | **R** | `AGENDAMENTO` | Editado manualmente pelo SDR | Preenchido com `"Sim"` quando o lead agenda |
| 19 | **S** | `VENDA` | Editado manualmente pelo Closer | Preenchido com `"Sim"` quando o lead compra |
| 20 | **T** | `VALOR DE CONVERSÃO` | Editado manualmente | Valor monetário fechado em R$ |
| 21 | **U** | `FBC_FBCLID` | `_fbc` ou `fb.1.<ts>.<fbclid>` | Cookie de clique do Facebook |
| 22 | **V** | `FBP` | `_fbp` | Cookie do navegador do Facebook |
| 23 | **W** | `EXTERNAL_ID` | `externalId` | Identificador único persistido do lead |
| 24 | **X** | `CAPI_AGENDAMENTO_ENVIADO` | Preenchido pelo trigger `onEditTrigger` | Data/hora do envio do evento `Schedule` ou mensagem de erro |
| 25 | **Y** | `CAPI_VENDA_ENVIADO` | Preenchido pelo trigger `onEditTrigger` | Data/hora do envio do evento `Purchase` ou mensagem de erro |

---

### 4.3 Outros Scripts de Terceiros e Tags

* **Google Tag Manager (GTM):**  
  * **Não encontrado** em `src/routes/__root.tsx`. Não há script injetando `gtm.js` no container.
  * **Nota:** O código em `src/routes/index.tsx` possui chamadas defensivas para `window.dataLayer.push({ event: ... })`. Se o GTM for adicionado futuramente ao `<head>`, ele receberá imediatamente todos os eventos de formulário e rolagem.
* **Google Analytics (GA4):** Não encontrado.
* **Microsoft Clarity:** Não encontrado.
* **Hotjar / CrazyEgg:** Não encontrado.
* **Chatbot / LiveChat Widget:** Não encontrado.
* **Kiwify Checkout:** Integrado diretamente via link de popup (`https://pay.kiwify.com.br/LjM9uMe`) no modal Fura-Fila.
* **Supabase CRM Integration:** Webhook server-side chamado pelo Google Apps Script em `https://aczsouypqgjlrqdmrtwq.supabase.co/functions/v1/sync-crm-sheet`.

---

## 5. CONFIGURAÇÃO & AMBIENTE

### 5.1 Variáveis de Ambiente (`.env`)

Arquivo localizado na raiz do projeto:

```bash
VITE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbygkGV6P-Hp90BGHqsLfxF8MMO97EWkUKGEdK0UN1QChG8MU0QP-T68MHq0qz06g2wRtQ/exec"
```

* **`VITE_SHEETS_WEBHOOK_URL`**: Endpoint público do Google Apps Script publicado como Web App (`Executar como: Eu`, `Quem tem acesso: Qualquer pessoa`).
* **`VITE_INSTAGRAM_URL`** *(opcional)*: URL do perfil do Instagram (se omitido, o código usa por padrão `"https://www.instagram.com/fazendoacontecer.ofc/"`).

---

### 5.2 Arquivo de Configuração do Vercel (`vercel.json`)

```json
{
  "build": {
    "env": {
      "DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS": "1"
    }
  }
}
```

---

### 5.3 Arquivo de Configuração do Vite (`vite.config.ts`)

```typescript
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
```

---

### 5.4 Arquivo `package.json`

```json
{
  "name": "tanstack_start_ts",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "dev": "vite dev --port 3000",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@tailwindcss/vite": "^4.2.1",
    "@tanstack/react-query": "^5.101.1",
    "@tanstack/react-router": "^1.170.41",
    "@tanstack/react-start": "^1.168.60",
    "@tanstack/router-plugin": "^1.168.42",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^1.16.0",
    "next-themes": "^0.4.6",
    "react": "^19.2.1",
    "react-day-picker": "^9.13.0",
    "react-dom": "^19.2.1",
    "react-hook-form": "^7.71.1",
    "react-resizable-panels": "^4.7.1",
    "recharts": "^3.7.0",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.5.0",
    "vaul": "^1.1.2",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@lovable.dev/vite-tanstack-config": "^0.0.8",
    "@types/node": "^24.1.0",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "postcss": "^8.5.6",
    "prettier": "^3.6.2",
    "tailwindcss": "^4.2.1",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^8.1.3"
  }
}
```

---

## 6. SÍNTESE E PONTOS DE ATENÇÃO PARA OTIMIZAÇÃO DE RASTREAMENTO

1. **Pixel vs. CAPI para o evento `Lead`:**
   * Atualmente, o evento `Lead` é disparado **apenas no navegador** via Meta Pixel com `{ eventID: externalId }`.
   * Para máxima resiliência (mitigação de iOS 14.5+, AdBlockers e Brave), recomenda-se que o `google_apps_script.js` dispare também o evento `"Lead"` via CAPI com o mesmo `event_id: data.external_id`.
2. **Deduplicação de Eventos Offline (`Schedule` e `Purchase`):**
   * Os eventos `Schedule` e `Purchase` são enviados exclusivamente pelo Google Apps Script quando a planilha é atualizada pelo time comercial. Eles não competem com eventos de navegador (portanto não há risco de duplicação, mas o `external_id` garante a correlação perfeita com o clique do anúncio inicial).
3. **Parâmetros FBC e FBP:**
   * O código já possui a melhor prática de capturar `_fbc` ou montar o fallback a partir do `fbclid` (`fb.1.<timestamp>.<fbclid>`).
4. **Google Tag Manager:**
   * Caso haja interesse em centralizar tags (GA4, Google Ads, TikTok, etc.), basta adicionar o snippet do GTM no `<head>` do `src/routes/__root.tsx`. Todos os `dataLayer.push` já estão implementados e operacionais no código.
