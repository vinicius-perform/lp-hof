import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { 
  ArrowRight, 
  ArrowLeft,
  Play, 
  Check, 
  Instagram, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  X, 
  Lock, 
  Clock,
  CheckCircle2,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Sparkles
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

interface CaseStudy {
  id: string;
  name: string;
  city: string;
  specialty: string;
  videoUrl: string;
  thumbnail: string;
  headline: ReactNode;
  previousScenario: string;
  strategy: string;
  stats: {
    investment: string;
    revenue: string;
    roas: string;
  };
  actions: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "marcela",
    name: "Drª Marcela",
    city: "SÃO PAULO/SP",
    specialty: "Dermatologia Estética",
    videoUrl: "/videos/dep-dramarcela.webm",
    thumbnail: "/thumb marcela.webp",
    headline: (
      <>
        Fatura mais de <span className="font-extrabold text-[#8CFF00]">R$ 220 mil/mês</span> em seu consultório particular.
      </>
    ),
    previousScenario: "Transição planejada da rotina de plantões para atendimento de estética facial premium.",
    strategy: "Posicionamento de autoridade e qualificação comercial da recepção.",
    stats: {
      investment: "R$ 10 mil",
      revenue: "R$ 220 mil+/mês",
      roas: "22x Mídia",
    },
    actions: [
      "Posicionamento de autoridade no digital",
      "Qualificação comercial imediata dos contatos"
    ],
  },
  {
    id: "pedro",
    name: "Dr. Pedro Lima",
    city: "VILA VELHA/ES",
    specialty: "Harmonização Facial & Corporal",
    videoUrl: "/videos/dep-drpedro.webm",
    thumbnail: "/thumb dr pedro.webp",
    headline: (
      <>
        Faturou <span className="font-extrabold text-[#8CFF00]">R$ 318 mil</span> em mês de baixa sazonalidade.
      </>
    ),
    previousScenario: "Quebra de oscilações de faturamento em períodos considerados frios.",
    strategy: "Campanhas ativas de atração e automação de acompanhamento no CRM.",
    stats: {
      investment: "R$ 21 mil",
      revenue: "R$ 318 mil",
      roas: "15x Mídia",
    },
    actions: [
      "Atração ativa sem depender de indicação",
      "Organização comercial no CRM"
    ],
  },
  {
    id: "cristiano",
    name: "Dr. Cristiano",
    city: "BRASÍLIA/DF",
    specialty: "Cirurgia Plástica & Estética Avançada",
    videoUrl: "/videos/dep-drcris.webm",
    thumbnail: "/thumb cris.webp",
    headline: (
      <>
        Faturou mais de <span className="font-extrabold text-[#8CFF00]">R$ 550 mil</span> nos primeiros 90 dias.
      </>
    ),
    previousScenario: "Internalização da estrutura comercial para otimizar tempo médico.",
    strategy: "Triagem automatizada de leads e rotinas comerciais dedicadas.",
    stats: {
      investment: "R$ 20 mil",
      revenue: "R$ 550 mil+",
      roas: "27x Mídia",
    },
    actions: [
      "Triagem automatizada no comercial",
      "Foco médico exclusivo em procedimentos"
    ],
  },
];

// Tracking Helper
const trackCustomEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    const win = window as any;
    if (typeof win.fbq === "function") {
      win.fbq("trackCustom", eventName, params);
    }
    if (win.dataLayer && Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: eventName, ...params });
    }
  }
};

function Index() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [leadName, setLeadName] = useState("");
  const [utms, setUtms] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    fbclid: "",
    gclid: "",
    meta_campanha: "",
    meta_conjunto: "",
    meta_anuncio: "",
    meta_posicionamento: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      if (typeof win.fbq === "function") {
        win.fbq("track", "PageView");
        win.fbq("track", "ViewContent", { content_name: "Diagnostico Estrategico FA" });
      }
    }

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

    setUtms({
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: getParam("utm_term", "keyword"),
      fbclid: getParam("fbclid"),
      gclid: getParam("gclid"),
      meta_campanha: utmCampaign,
      meta_conjunto: utmMedium,
      meta_anuncio: utmContent,
      meta_posicionamento: utmSource
    });

    let scroll50Fired = false;
    let scroll75Fired = false;

    const handleScrollTracking = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50 && !scroll50Fired) {
        scroll50Fired = true;
        trackCustomEvent("Scroll50");
      }
      if (scrollPercent >= 75 && !scroll75Fired) {
        scroll75Fired = true;
        trackCustomEvent("Scroll75");
      }
    };

    window.addEventListener("scroll", handleScrollTracking);
    return () => window.removeEventListener("scroll", handleScrollTracking);
  }, []);

  const handleOpenVideo = (videoUrl: string) => {
    trackCustomEvent("CaseVideoPlay", { video_url: videoUrl });
    setActiveVideoUrl(videoUrl);
  };

  const handleCloseVideo = () => {
    setActiveVideoUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#050705] text-[#F4F6F1] font-sans selection:bg-[#8CFF00] selection:text-[#050705]">
      
      {/* Barra de Qualificação Superior Vermelha Destacada */}
      <div className="bg-[#E10614] border-b border-red-800 py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-[#FFFFFF] uppercase tracking-widest shrink-0 text-center shadow-md">
        <span className="h-2 w-2 rounded-full bg-[#FFFFFF] animate-pulse" />
        <span>DIAGNÓSTICO GRATUITO PARA MÉDICAS DE HARMONIZAÇÃO FACIAL QUE FATURAM A PARTIR DE R$ 35 MIL/MÊS</span>
      </div>

      {/* 1. HERO COM FORMULÁRIO */}
      <Hero setLeadName={setLeadName} utms={utms} />

      {/* SEÇÃO 2 — PROVA PRINCIPAL (VÍDEO) */}
      <CaseDraSamaraSection />

      {/* SEÇÃO 3 — O MECANISMO (seção nova, entra antes do passo a passo) */}
      <MecanismoSection />

      {/* SEÇÃO 4 — PASSO A PASSO */}
      <PassoAPassoSection />

      {/* SEÇÃO 6 — PARA QUEM É */}
      <ParaQuemSection />

      {/* SEÇÃO 7 — PERGUNTAS FREQUENTES */}
      <FaqCurtoSection />

      {/* SEÇÃO 8 — FORMULÁRIO FINAL E FOOTER */}
      <CtaFinalFormSection />
      <Footer />

      {/* CTA FIXO NO MOBILE */}
      <CtaFixoMobile />

      {/* Modal de Vídeo */}
      {activeVideoUrl && (
        <VideoModal videoUrl={activeVideoUrl} onClose={handleCloseVideo} />
      )}

    </div>
  );
}

// ==================== COMPONENTES DAS 6 SEÇÕES ====================

// SEÇÃO 1: HERO
interface HeroProps {
  setLeadName: (val: string) => void;
  utms: any;
}

function Hero({ setLeadName, utms }: HeroProps) {
  return (
    <section id="topo" className="relative overflow-hidden bg-[#050705] pt-6 pb-12 lg:pt-10 lg:pb-16 min-h-[90vh] flex flex-col justify-center border-b border-[#252A25]">
      <div className="relative z-20 w-full mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Esquerda: Copy Principal (54%) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div>
              <span className="inline-flex items-center rounded-md bg-[#0B0E0B] border border-[#252A25] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#8CFF00]">
                EXCLUSIVO PARA ESPECIALISTAS EM HOF
              </span>
            </div>

            <h1 className="mt-4 text-[38px] sm:text-[46px] lg:text-[56px] font-black leading-[1.08] tracking-tight text-[#FFFFFF]">
              <span className="text-[#8CFF00]">Nós assumimos esse risco por você:</span> seu tráfego pago será pago pelo faturamento das <span className="underline decoration-[#FFFFFF] decoration-2 underline-offset-4">consultas</span> e você fica com a margem dos procedimentos.
            </h1>

            <p className="mt-4 text-[17px] sm:text-[19px] lg:text-[20px] leading-relaxed text-[#F4F6F1]/90 font-medium max-w-2xl">
              Nós produzimos seu conteúdo, rodamos seu tráfego pago e colocamos nossa vendedora para levar a paciente até a sua agenda. Preencha o formulário e nosso time fala com você nos próximos 3 minutos.
            </p>
          </div>

          {/* Direita: Card Formulário Off-White */}
          <div id="hero-form-wrapper" className="lg:col-span-5 w-full max-w-[460px] mx-auto lg:mx-0 scroll-mt-16">
            <MultistepFormCard setLeadName={setLeadName} utms={utms} formId="hero_form" />
          </div>

        </div>
      </div>
    </section>
  );
}

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

    const LEAD_CLASS_BY_FATURAMENTO: Record<string, "A" | "B" | "C" | "D"> = {
      "Faturo menos de R$ 20 mil": "D",
      "Faturo de R$ 20 mil a R$ 50 mil": "C",
      "Faturo de R$ 50 mil a R$ 100 mil": "B",
      "Faturo acima de R$ 100 mil": "A",
    };
    const leadClass: "A" | "B" | "C" | "D" = LEAD_CLASS_BY_FATURAMENTO[faturamento] ?? "D";

    // Valor relativo de cada tipo de lead para a Meta (não é custo nem lance)
    const LEAD_VALUE: Record<"A" | "B" | "C" | "D", number> = { A: 600, B: 300, C: 100, D: 1 };
    const leadValue = LEAD_VALUE[leadClass];
    const eventTime = Math.floor(Date.now() / 1000);

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

      lead_value: leadValue,
      event_time: eventTime,
      event_source_url: typeof window !== "undefined" ? window.location.href : "",
      client_user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",

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
          // Evento padrão Lead (com valor)
          win.fbq("track", "Lead", {
            content_name: "Diagnostico Estrategico FA",
            currency: "BRL",
            value: leadValue,
            lead_class: leadClass
          }, { eventID: externalId });

          // Evento por faixa: "Lead A" | "Lead B" | "Lead C" | "Lead D"
          win.fbq("trackCustom", `Lead ${leadClass}`, {
            content_name: "Diagnostico Estrategico FA",
            currency: "BRL",
            value: leadValue,
            lead_class: leadClass,
            faturamento: faturamento,
            form_used: formId
          }, { eventID: `${externalId}_${leadClass}` });

          // Lead Qualificado agora inclui A, B e C
          if (leadClass === "A" || leadClass === "B" || leadClass === "C") {
            win.fbq("trackCustom", "Lead Qualificado", {
              content_name: "Diagnostico Estrategico FA",
              currency: "BRL",
              value: leadValue,
              lead_class: leadClass,
              faturamento: faturamento,
              form_used: formId
            }, { eventID: `${externalId}_lead_qualificado` });
          }

          // Super Lead continua só para A
          if (leadClass === "A") {
            win.fbq("trackCustom", "Super Lead", {
              content_name: "Diagnostico Estrategico FA",
              currency: "BRL",
              value: leadValue,
              lead_class: "A",
              faturamento: faturamento,
              form_used: formId
            }, { eventID: `${externalId}_super_lead` });
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
            form_used: formId,
            value: leadValue
          });
          if (leadClass === "A") {
            win.dataLayer.push({
              event: "super_lead",
              lead_class: "A",
              form_used: formId
            });
          }
          if (leadClass === "A" || leadClass === "B" || leadClass === "C") {
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
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#050705] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#8CFF00]">
            <Zap className="h-3 w-3 fill-[#8CFF00] text-[#8CFF00]" />
            03 VAGAS RESTANTES HOJE
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#667066]">
            ETAPA {step} DE 2
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
                placeholder="Ex: Dra. Mariana Ramos" 
                value={name}
                onFocus={() => trackCustomEvent("FormStart", { form_id: formId })}
                onChange={e => setName(e.target.value)}
                className={inputCls} 
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                E-mail Comercial *
              </label>
              <input 
                required 
                type="email" 
                placeholder="Ex: seu.melhor@email.com" 
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
                placeholder="Ex: (11) 98765-4321" 
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
                <option value="Faturo menos de R$ 20 mil">Faturo menos de R$ 20 mil</option>
                <option value="Faturo de R$ 20 mil a R$ 50 mil">Faturo de R$ 20 mil a R$ 50 mil</option>
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
          <p className="text-[11px] font-medium text-[#667066]">
            Seus dados serão utilizados apenas para o contato da equipe da FA.
          </p>
        </div>

      </form>
    </div>
  );
}

// SEÇÃO DE DESTAQUE: CASE DRA. SAMARA (VÍDEOS DE DEPOIMENTO - SEÇÃO WHITE DUPLICADA)
function CaseDraSamaraSection() {
  const scrollToForm = () => {
    trackCustomEvent("SamaraCaseCTAClick");
    const element = document.getElementById("hero-form-wrapper");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#FFFFFF] border-b border-[#DDE2D9] py-16 lg:py-24 text-[#050705] relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 space-y-16 lg:space-y-24">
        
        {/* DEPOIMENTO 1 — DRA. SAMARA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lado Esquerdo: Textos e Chamada para Ação */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F4F6F1] border border-[#DDE2D9] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#050705] shadow-sm">
              PROVA, NÃO APENAS PROMESSA
            </span>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-black tracking-tight text-[#050705] leading-[1.18]">
              Como a Dra. Samara, médica de harmonização facial, fatura mais de <span className="text-[#2E8B00]">R$ 200 mil</span> todos os meses com a FA
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#4A554A] leading-relaxed font-medium">
              Ela usa o mesmo mecanismo de geração de demanda, vendas e dados que queremos implantar na sua clínica. As consultas pagam o tráfego, e a margem dos procedimentos fica com ela.
            </p>

            {/* Botão no Desktop (abaixo do texto) */}
            <div className="pt-2 hidden lg:block">
              <button
                onClick={scrollToForm}
                className="inline-flex h-[54px] items-center justify-center gap-2.5 rounded-lg bg-[#8CFF00] hover:bg-[#7AE000] px-8 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(140,255,0,0.3)]"
              >
                QUERO O MESMO MECANISMO NA MINHA CLÍNICA
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Lado Direito: Vídeo do Depoimento 1 */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[9/16] rounded-2xl border-2 border-[#DDE2D9] bg-[#050705] overflow-hidden shadow-2xl group hover:border-[#8CFF00] transition-all duration-300">
              <video
                src="/videos/dep-samara.webm"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <span className="mt-3 text-xs font-bold text-[#667066] uppercase tracking-wider flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 fill-[#2E8B00] text-[#2E8B00]" /> Assista ao relato completo
            </span>

            {/* Botão no Mobile (abaixo do vídeo) */}
            <div className="mt-6 w-full max-w-[340px] lg:hidden">
              <button
                onClick={scrollToForm}
                className="w-full inline-flex h-[54px] items-center justify-center gap-2.5 rounded-lg bg-[#8CFF00] hover:bg-[#7AE000] px-6 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(140,255,0,0.3)]"
              >
                QUERO O MESMO MECANISMO NA MINHA CLÍNICA
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

        </div>

        {/* DIVISOR SUTIL ENTRE OS DEPOIMENTOS */}
        <div className="border-t border-[#DDE2D9]" />

        {/* DEPOIMENTO 2 — DRA. LANNAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lado Esquerdo: Textos e Chamada para Ação */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#050705] border border-[#252A25] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#8CFF00] shadow-sm">
              MAIS QUE TRÁFEGO, GESTÃO E PREVISIBILIDADE
            </span>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-black tracking-tight text-[#050705] leading-[1.18]">
              Como a Dra. Lannay, cirurgiã-dentista, saiu da frustração com agências e hoje fatura <span className="text-[#2E8B00]">+400 mil reais por mês</span> com previsibilidade usando a FA
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#4A554A] leading-relaxed font-medium">
              Ela já estava desacreditada do tráfego pago até implantar nossa visão completa de geração de demanda, comercial e dados. Hoje, com acompanhamento diário, semanal e mensal, ela domina os números da clínica e decide o crescimento com segurança.
            </p>

            {/* Botão no Desktop (abaixo do texto) */}
            <div className="pt-2 hidden lg:block">
              <button
                onClick={scrollToForm}
                className="inline-flex h-[54px] items-center justify-center gap-2.5 rounded-lg bg-[#8CFF00] hover:bg-[#7AE000] px-8 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(140,255,0,0.3)]"
              >
                QUERO O MESMO MECANISMO NA MINHA CLÍNICA
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Lado Direito: Vídeo do Depoimento 2 */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[9/16] rounded-2xl border-2 border-[#DDE2D9] bg-[#050705] overflow-hidden shadow-2xl group hover:border-[#8CFF00] transition-all duration-300">
              <video
                src="https://fazendoacontecer.site/wp-content/uploads/2026/06/lannay.webm"
                poster="/thumb lannay.webp"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <span className="mt-3 text-xs font-bold text-[#667066] uppercase tracking-wider flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 fill-[#2E8B00] text-[#2E8B00]" /> Assista ao relato completo
            </span>

            {/* Botão no Mobile (abaixo do vídeo) */}
            <div className="mt-6 w-full max-w-[340px] lg:hidden">
              <button
                onClick={scrollToForm}
                className="w-full inline-flex h-[54px] items-center justify-center gap-2.5 rounded-lg bg-[#8CFF00] hover:bg-[#7AE000] px-6 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(140,255,0,0.3)]"
              >
                QUERO O MESMO MECANISMO NA MINHA CLÍNICA
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// SEÇÃO 3 — O MECANISMO (NOVA)
function MecanismoSection() {
  const pilares = [
    {
      num: "01",
      title: "Conteúdo",
      desc: "produzimos o conteúdo que gera desejo e autoridade para os seus procedimentos de HOF."
    },
    {
      num: "02",
      title: "Tráfego pago",
      desc: "rodamos seus anúncios para atrair pacientes qualificadas todos os dias."
    },
    {
      num: "03",
      title: "Vendedora",
      desc: "colocamos nossa vendedora, dentro da nossa estrutura, para atender, qualificar e agendar."
    },
    {
      num: "04",
      title: "Dados",
      desc: "acompanhamos cada real investido até virar consulta e procedimento."
    }
  ];

  return (
    <section className="bg-[#050705] border-b border-[#252A25] py-16 lg:py-20 text-[#F4F6F1] relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-md bg-[#0B0E0B] border border-[#252A25] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#8CFF00] shadow-sm">
            O QUE FAZEMOS POR VOCÊ
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#FFFFFF] leading-tight">
            Você atende. A gente cuida de todo o resto.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pilares.map((p, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl border border-[#252A25] bg-[#0A0D0A] p-6 shadow-lg hover:border-[#8CFF00]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-3xl font-black font-mono text-[#8CFF00] block mb-3 group-hover:scale-105 transition-transform">
                  {p.num}
                </span>
                <h3 className="text-lg font-black text-[#FFFFFF] mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[#F4F6F1]/80 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#8CFF00]/30 bg-[#0B1308] p-6 sm:p-7 text-center max-w-3xl mx-auto shadow-[0_0_30px_rgba(140,255,0,0.08)]">
          <p className="text-sm sm:text-base text-[#F4F6F1] font-semibold leading-relaxed">
            Se as consultas pagam o tráfego, dá para escalar o investimento para <span className="text-[#8CFF00] font-black">R$ 20 mil, R$ 30 mil por mês</span> e construir uma carteira grande de pacientes.
          </p>
        </div>
      </div>
    </section>
  );
}

// SEÇÃO 4: PASSO A PASSO
function PassoAPassoSection() {
  const etapas = [
    {
      num: "01",
      title: "1. Você preenche",
      desc: "conta rapidamente o momento atual da sua clínica de harmonização."
    },
    {
      num: "02",
      title: "2. A FA analisa",
      desc: "nosso time avalia seus números e identifica onde estão os gargalos de demanda e de vendas."
    },
    {
      num: "03",
      title: "3. Você recebe a análise",
      desc: "numa conversa estratégica, mostramos como o mecanismo funcionaria na sua clínica."
    }
  ];

  return (
    <section className="bg-[#F4F6F1] border-b border-[#DDE2D9] py-14 lg:py-18 text-[#050705]">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 text-center">
        
        <span className="inline-flex items-center rounded-md bg-[#FFFFFF] border border-[#DDE2D9] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#050705]">
          PASSO A PASSO
        </span>
        <h2 className="mt-3.5 text-2xl sm:text-3xl font-black tracking-tight text-[#050705]">
          Como funciona o diagnóstico
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
          {etapas.map((et, idx) => (
            <div key={idx} className="rounded-xl border border-[#DDE2D9] bg-[#FFFFFF] p-6 shadow-sm">
              <span className="block text-2xl font-black text-[#5FAE00] mb-2">{et.num}</span>
              <h3 className="text-base font-extrabold text-[#050705]">{et.title}</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#667066] leading-relaxed font-medium">{et.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#667066] font-bold">
          * Sem obrigação de contratação.
        </p>

      </div>
    </section>
  );
}

// SEÇÃO 6: PARA QUEM É
function ParaQuemSection() {
  const items = [
    "é médica e trabalha com harmonização facial;",
    "fatura a partir de R$ 35 mil por mês;",
    "já tem procedimentos validados (toxina, preenchedores, bioestimuladores etc.);",
    "tem agenda disponível para novas pacientes;",
    "quer parar de depender só de indicação e do próprio Instagram."
  ];

  return (
    <section className="bg-[#F4F6F1] border-b border-[#DDE2D9] py-14 lg:py-16 text-[#050705]">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 text-left">
        
        <div className="rounded-2xl border border-[#DDE2D9] bg-[#FFFFFF] p-7 sm:p-9 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-[#050705] tracking-tight">
            Este diagnóstico é para você se:
          </h2>

          <div className="mt-6 space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8CFF00] mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[#050705]" />
                </div>
                <span className="text-sm sm:text-base text-[#050705] font-semibold">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-[#DDE2D9]">
            <p className="text-xs text-[#667066] font-medium">
              * Não é indicado para quem ainda não tem procedimentos validados ou capacidade mínima de investimento.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}



// SEÇÃO 6: PERGUNTAS FREQUENTES
function FaqCurtoSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setActiveIndex(prev => prev === idx ? null : idx);
  };

  const faqs = [
    {
      q: "O diagnóstico é realmente gratuito?",
      a: "Sim. A análise não tem custo e não obriga você a contratar nada."
    },
    {
      q: "Como assim o tráfego é pago pelas consultas?",
      a: "Estruturamos a operação para que o faturamento das consultas cubra o investimento em anúncios. A margem dos procedimentos fica com você."
    },
    {
      q: "Vocês fazem o conteúdo e o atendimento também?",
      a: "Sim. Produzimos seu conteúdo, rodamos seu tráfego e colocamos nossa vendedora para atender e agendar suas pacientes."
    },
    {
      q: "Atendem médicas que faturam menos de R$ 35 mil?",
      a: "No momento, o diagnóstico é para clínicas que faturam a partir de R$ 35 mil por mês."
    },
    {
      q: "O que acontece depois que eu preencho?",
      a: "Nosso time fala com você pelo WhatsApp em poucos minutos para agendar a conversa estratégica."
    }
  ];

  return (
    <section className="bg-[#050705] border-b border-[#252A25] py-14 lg:py-18 text-[#F4F6F1]">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-md bg-[#0B0E0B] border border-[#252A25] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#8CFF00]">
            TIRA-DÚVIDAS
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#FFFFFF]">
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-2.5 text-left">
          {faqs.map((f, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className="rounded-xl border border-[#252A25] bg-[#0B0E0B] overflow-hidden">
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-[#F4F6F1] hover:bg-[#050705] transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#8CFF00] shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#8CFF00] shrink-0 ml-3" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 border-t border-[#252A25] bg-[#050705] text-xs sm:text-sm text-[#F4F6F1]/80 leading-relaxed font-medium animate-fade-in">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function CtaFinalFormSection() {
  const scrollToForm = () => {
    trackCustomEvent("FinalSectionCTAClick");
    const element = document.getElementById("hero-form-wrapper");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="final-form-wrapper" className="bg-[#050705] py-14 lg:py-20 text-[#F4F6F1] scroll-mt-16 border-t border-[#252A25]">
      <div className="mx-auto max-w-2xl px-5 sm:px-6 text-center">
        
        <span className="inline-flex items-center rounded-md bg-[#0B0E0B] border border-[#252A25] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#8CFF00]">
          PRÓXIMO PASSO
        </span>
        <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#FFFFFF]">
          Deixe que a gente assuma o risco. Você só precisa atender.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#667066] font-medium leading-relaxed max-w-xl mx-auto">
          Preencha o formulário e conheça o mecanismo que coloca pacientes de harmonização facial na sua agenda todos os meses.
        </p>

        <div className="mt-8">
          <button
            onClick={scrollToForm}
            className="inline-flex h-[56px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[#8CFF00] px-9 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] hover:bg-[#68BF00] transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
          >
            PREENCHER FORMULÁRIO
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-5 text-xs font-semibold text-[#667066]">
          Gratuito, sem compromisso e exclusivo para médicas de HOF que faturam a partir de R$ 35 mil/mês.
        </p>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#252A25] bg-[#050705] text-[#667066]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#252A25]/40 text-xs font-semibold">
        
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-[#F4F6F1]">FA</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#8CFF00]" />
          <span className="font-bold text-[#F4F6F1]">Fazendo Acontecer</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="hover:text-[#F4F6F1] transition-colors">Termos de uso</a>
          <a href="#" className="hover:text-[#F4F6F1] transition-colors">Política de privacidade</a>
          <a 
            href={import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/fazendoacontecer.ofc/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#8CFF00] transition-colors"
          >
            <Instagram className="h-3.5 w-3.5" />
            Instagram
          </a>
        </div>

      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-6 text-center text-[10px] text-[#667066] space-y-2 font-medium">
        <p className="max-w-4xl mx-auto leading-relaxed">
          Os resultados mostrados são de casos específicos e não garantem desempenho. Eles variam conforme o mercado, o investimento, a oferta, a equipe, o atendimento e a execução.
        </p>
        <p>
          Copyright © 2026 Fazendo Acontecer. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function CtaFixoMobile() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroForm = document.getElementById("hero-form-wrapper");
      const finalForm = document.getElementById("final-form-wrapper");

      let isHeroFormVisible = false;
      let isFinalFormVisible = false;

      if (heroForm) {
        const rect = heroForm.getBoundingClientRect();
        isHeroFormVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }

      if (finalForm) {
        const rect = finalForm.getBoundingClientRect();
        isFinalFormVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }

      const pastHero = window.scrollY > 250;
      setIsVisible(pastHero && !isHeroFormVisible && !isFinalFormVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    trackCustomEvent("MobileStickyCTAClick");
    const element = document.getElementById("hero-form-wrapper");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 w-full z-40 p-2.5 bg-[#050705]/95 border-t border-[#252A25] md:hidden backdrop-blur-md transition-all duration-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
      <button
        onClick={scrollToForm}
        className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-lg bg-[#8CFF00] text-xs font-black uppercase tracking-wider text-[#050705] shadow-lg cursor-pointer"
      >
        RECEBER DIAGNÓSTICO GRATUITO
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl border border-[#252A25] bg-[#050705] overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-[#F4F6F1] border border-[#252A25] hover:bg-[#8CFF00] hover:text-[#050705] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
        <video
          src={videoUrl}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
