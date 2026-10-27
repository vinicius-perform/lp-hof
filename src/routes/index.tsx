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
  Calendar,
  ExternalLink,
  AlertCircle
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
    videoUrl: "https://fazendoacontecer.site/wp-content/uploads/2026/01/dep-dramarcela-1.webm",
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
    videoUrl: "https://fazendoacontecer.site/wp-content/uploads/2026/07/uri_ifs___V_MO7-PeBSuqG1Oeps5YgIKtnJW3-9mhF2JQC4TC9nHHU.webm",
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
    videoUrl: "https://fazendoacontecer.site/wp-content/uploads/2026/07/uri_ifs___V_015JtsY5elTU0ZxaDbcJI6sQBqUYryenRf0yFICm7Gw.webm",
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
  try {
    if (typeof window !== "undefined") {
      const win = window as any;
      if (typeof win.fbq === "function") {
        win.fbq("trackCustom", eventName, params);
      }
      if (win.dataLayer && Array.isArray(win.dataLayer)) {
        win.dataLayer.push({ event: eventName, ...params });
      }
    }
  } catch (err) {
    console.warn("Tracking warning:", err);
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
      <div className="bg-[#E10614] border-b border-red-800 py-3 px-4 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-black text-[#FFFFFF] uppercase tracking-widest shrink-0 text-center shadow-md">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFFFFF] animate-pulse" />
        <span>DIAGNÓSTICO GRATUITO PARA CLÍNICAS COM FATURAMENTO A PARTIR DE R$ 35 MIL/MÊS</span>
      </div>

      {/* 1. HERO COM FORMULÁRIO */}
      <Hero setLeadName={setLeadName} utms={utms} />

      {/* CASE DE SUCESSO: DRA. SAMARA */}
      <CaseDraSamaraSection />

      {/* 2. PASSO A PASSO */}
      <PassoAPassoSection />

      {/* 3. PROVA, NÃO APENAS PROMESSA (TODOS OS DEPOIMENTOS EM CARROSSEL) */}
      <CasePrincipalSection onOpenVideo={handleOpenVideo} />

      {/* 4. ESTE DIAGNÓSTICO FAZ SENTIDO PARA SUA CLÍNICA SE: */}
      <ParaQuemSection />

      {/* 6. PERGUNTAS FREQUENTES */}
      <FaqCurtoSection />

      {/* FORMULÁRIO FINAL E FOOTER */}
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
                DIAGNÓSTICO ESTRATÉGICO FA
              </span>
            </div>

            <h1 className="mt-4 text-[38px] sm:text-[46px] lg:text-[56px] font-black leading-[1.08] tracking-tight text-[#FFFFFF]">
              <span className="text-[#8CFF00]">Assumimos esse risco:</span> Seu tráfego pago será pago pelo <span className="underline decoration-[#8CFF00] decoration-2 underline-offset-4">faturamento de consultas</span> e você terá mais margem nos procedimentos.
            </h1>

            <p className="mt-4 text-[17px] sm:text-[19px] lg:text-[20px] leading-relaxed text-[#F4F6F1]/90 font-medium max-w-2xl">
              Preencha o formulário e nossa equipe entrará em contato com você nos próximos 3 minutos.
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
  const [isScheduled, setIsScheduled] = useState(false);
  const [submissionExternalId, setSubmissionExternalId] = useState("");
  const [stepError, setStepError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Controle de estado e envio garantido com temporizador estrito de 90s
  const timeoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const leadSentRef = useRef<boolean>(false);
  const isScheduledRef = useRef<boolean>(false);
  const leadPayloadRef = useRef<any>(null);

  const formatPhoneNumber = (val: string) => {
    let input = val.replace(/\D/g, "");
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
    return formatted || input;
  };

  // Envia as informações do lead para a planilha marcando Coluna Z como "NÃO AGENDADA"
  // (Coluna R é estritamente ignorada conforme regra)
  const sendLeadNotScheduled = () => {
    if (isScheduledRef.current || leadSentRef.current || !leadPayloadRef.current) {
      return;
    }
    leadSentRef.current = true;
    const finalPayload = {
      ...leadPayloadRef.current,
      agendamento_calendly: "NÃO AGENDADA",
      detalhes_agendamento: "NÃO AGENDADA",
      agendamento: "", // Coluna R NUNCA modificada
    };

    const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbygkGV6P-Hp90BGHqsLfxF8MMO97EWkUKGEdK0UN1QChG8MU0QP-T68MHq0qz06g2wRtQ/exec";

    fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(finalPayload),
    }).catch(err => console.error("Erro ao registrar lead não agendado após 90s:", err));
  };

  // Sincroniza periodicamente com o preenchimento automático nativo de celulares e navegadores
  useEffect(() => {
    const syncAutofill = () => {
      if (nameRef.current?.value && nameRef.current.value !== name) {
        setName(nameRef.current.value);
      }
      if (emailRef.current?.value && emailRef.current.value !== email) {
        setEmail(emailRef.current.value);
      }
      if (phoneRef.current?.value && phoneRef.current.value !== phone) {
        setPhone(formatPhoneNumber(phoneRef.current.value));
      }
    };

    const interval = setInterval(syncAutofill, 300);
    return () => clearInterval(interval);
  }, [name, email, phone]);

  // Captura fechamento acidental da aba/navegador para nunca perder o lead
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isScheduledRef.current && !leadSentRef.current && leadPayloadRef.current) {
        leadSentRef.current = true;
        const finalPayload = {
          ...leadPayloadRef.current,
          agendamento_calendly: "NÃO AGENDADA",
          detalhes_agendamento: "NÃO AGENDADA",
          agendamento: "", // Coluna R NUNCA modificada
        };
        const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbygkGV6P-Hp90BGHqsLfxF8MMO97EWkUKGEdK0UN1QChG8MU0QP-T68MHq0qz06g2wRtQ/exec";
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(finalPayload)], { type: "text/plain;charset=utf-8" });
          navigator.sendBeacon(WEBHOOK_URL, blob);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      let data = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {}
      }

      if (!data || typeof data !== "object") return;
      const eventName = data.event || "";

      // 1. Quando o lead seleciona a data e horário no calendário do Calendly:
      if (eventName === "calendly.date_and_time_selected") {
        // Cancela o timeout estrito de 90s para que o lead tenha o tempo necessário para preencher e confirmar
        if (timeoutTimerRef.current) {
          clearTimeout(timeoutTimerRef.current);
          timeoutTimerRef.current = null;
        }
      }

      // 2. Quando o agendamento é concluído com sucesso:
      if (eventName === "calendly.event_scheduled") {
        if (timeoutTimerRef.current) {
          clearTimeout(timeoutTimerRef.current);
          timeoutTimerRef.current = null;
        }

        isScheduledRef.current = true;
        setIsScheduled(true);

        const currentName = name || leadPayloadRef.current?.name || "";
        const currentEmail = email || leadPayloadRef.current?.email || "";
        const currentPhone = phone || leadPayloadRef.current?.phone || "";
        const extId = submissionExternalId || leadPayloadRef.current?.external_id || "";
        const eventUri = data?.payload?.event?.uri || "";

        // Dispara o evento para o Meta Pixel chamado "RA Calendly"
        trackCustomEvent("RA Calendly", {
          lead_name: currentName,
          lead_email: currentEmail,
          lead_phone: currentPhone,
          form_id: formId,
        });

        if (typeof window !== "undefined") {
          const win = window as any;
          const eventIdObj = extId ? { eventID: `${extId}_ra_calendly` } : undefined;
          if (typeof win.fbq === "function") {
            win.fbq(
              "trackCustom",
              "RA Calendly",
              {
                content_name: "Diagnostico Estrategico FA Agendado",
                lead_name: currentName,
                lead_email: currentEmail,
                lead_phone: currentPhone,
                form_id: formId,
              },
              eventIdObj
            );
            win.fbq(
              "track",
              "Schedule",
              {
                content_name: "Diagnostico Estrategico FA Agendado",
              },
              eventIdObj
            );
          }
          if (win.dataLayer && Array.isArray(win.dataLayer)) {
            win.dataLayer.push({
              event: "RA Calendly",
              lead_name: currentName,
              lead_email: currentEmail,
              lead_phone: currentPhone,
              form_id: formId,
            });
          }
        }

        // Registra o agendamento do lead na planilha Google (Coluna Z)
        try {
          const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbygkGV6P-Hp90BGHqsLfxF8MMO97EWkUKGEdK0UN1QChG8MU0QP-T68MHq0qz06g2wRtQ/exec";
          const scheduledTimestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
          const agendamentoInfo = `Agendado no Calendly em ${scheduledTimestamp}`;

          if (leadSentRef.current) {
            // Se o lead já tiver sido enviado (ex: pelo temporizador de 90s como "NÃO AGENDADA"),
            // atualiza a Coluna Z da linha existente sem duplicar linha e sem tocar na Coluna R
            fetch(WEBHOOK_URL, {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "text/plain;charset=utf-8",
              },
              body: JSON.stringify({
                action: "calendly_scheduled",
                name: currentName,
                email: currentEmail,
                phone: currentPhone,
                external_id: extId,
                agendamento: "", // Coluna R NUNCA modificada
                agendamento_calendly: agendamentoInfo,
                calendly_event_uri: eventUri,
              }),
            }).catch(err => console.error("Erro ao atualizar agendamento na planilha:", err));
          } else {
            // Agendamento realizado dentro do prazo de 90s
            leadSentRef.current = true;
            const fullPayload = {
              ...(leadPayloadRef.current || {}),
              name: currentName,
              email: currentEmail,
              phone: currentPhone,
              agendamento_calendly: agendamentoInfo,
              detalhes_agendamento: agendamentoInfo,
              calendly_event_uri: eventUri,
              agendamento: "", // Coluna R NUNCA modificada
            };

            fetch(WEBHOOK_URL, {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "text/plain;charset=utf-8",
              },
              body: JSON.stringify(fullPayload),
            }).catch(err => console.error("Erro ao registrar agendamento na planilha:", err));
          }
        } catch (err) {
          console.error("Erro ao registrar agendamento na planilha:", err);
        }
      }
    };

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [name, email, phone, formId, submissionExternalId]);

  const getCalendlyUrl = () => {
    const baseUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/fazendoacontecer-clientes/diagnostico-estrategico-fa";
    try {
      const url = new URL(baseUrl);
      if (name) url.searchParams.set("name", name);
      if (email) url.searchParams.set("email", email);
      if (phone) url.searchParams.set("a1", phone);

      // Estilo integrado com tema escuro e verde da página
      url.searchParams.set("background_color", "0a0d0a");
      url.searchParams.set("text_color", "ffffff");
      url.searchParams.set("primary_color", "8cff00");
      url.searchParams.set("hide_landing_page_details", "1");
      url.searchParams.set("hide_gdpr_banner", "1");

      if (utms?.utm_source) url.searchParams.set("utm_source", utms.utm_source);
      if (utms?.utm_medium) url.searchParams.set("utm_medium", utms.utm_medium);
      if (utms?.utm_campaign) url.searchParams.set("utm_campaign", utms.utm_campaign);
      if (utms?.utm_content) url.searchParams.set("utm_content", utms.utm_content);
      if (utms?.utm_term) url.searchParams.set("utm_term", utms.utm_term);

      return url.toString();
    } catch {
      return baseUrl;
    }
  };

  const handleCloseModal = () => {
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current);
      timeoutTimerRef.current = null;
    }

    // Se o usuário fechar o modal antes de agendar e o lead ainda não tiver sido enviado
    if (!isScheduledRef.current && !leadSentRef.current && leadPayloadRef.current) {
      sendLeadNotScheduled();
    }

    setIsSubmitted(false);
    setIsScheduled(false);
    isScheduledRef.current = false;
    leadSentRef.current = false;
    leadPayloadRef.current = null;
    setSubmissionExternalId("");
    setStepError(null);
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setCrmNumber("");
    setCrmUf("");
    setInstagram("");
    setFaturamento("");
    setInvestimento("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
    if (stepError) setStepError(null);
  };

  const handleNextStep = () => {
    setStepError(null);
    const validName = (name || nameRef.current?.value || "").trim();
    const validEmail = (email || emailRef.current?.value || "").trim();
    const validPhone = (phone || phoneRef.current?.value || "").trim();

    if (!validName || validName.length < 3) {
      setStepError("Por favor, informe seu nome completo (mínimo 3 caracteres).");
      nameRef.current?.focus();
      return;
    }
    if (!validEmail || !validEmail.includes("@") || !validEmail.includes(".")) {
      setStepError("Por favor, informe um e-mail válido.");
      emailRef.current?.focus();
      return;
    }
    const cleanDigits = validPhone.replace(/\D/g, "");
    if (!validPhone || cleanDigits.length < 10) {
      setStepError("Por favor, informe um WhatsApp válido com DDD (mínimo 10 dígitos).");
      phoneRef.current?.focus();
      return;
    }

    if (validName !== name) setName(validName);
    if (validEmail !== email) setEmail(validEmail);
    if (validPhone !== phone) setPhone(formatPhoneNumber(validPhone));

    try {
      trackCustomEvent("FormStepComplete", { step: 1, form_id: formId });
    } catch (err) {
      console.warn("Tracking error:", err);
    }
    setStep(2);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNextStep();
      return;
    }

    setStepError(null);
    if (!instagram || instagram.trim().length < 2) {
      setStepError("Por favor, informe o Instagram da clínica.");
      return;
    }
    const cleanCrm = crmNumber.replace(/\D/g, "");
    if (!cleanCrm || cleanCrm.length < 4) {
      setStepError("Por favor, informe um número de CRM válido com no mínimo 4 dígitos.");
      return;
    }
    if (!crmUf) {
      setStepError("Por favor, selecione o estado (UF) do seu CRM.");
      return;
    }
    if (!faturamento) {
      setStepError("Por favor, selecione a faixa de faturamento mensal.");
      return;
    }
    if (!investimento) {
      setStepError("Por favor, selecione o investimento atual em marketing.");
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
    setSubmissionExternalId(externalId);
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
      objective: "",
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
      prazo_inicio: "",
      prazo: "",
      tipo_lead: leadClass,
      lead_type: leadClass,

      form_used: formId,
      agendamento: "", // Coluna R (18) NUNCA é preenchida pelo script - estritamente manual para SDR
      agendamento_calendly: "NÃO AGENDADA",
      detalhes_agendamento: "NÃO AGENDADA",

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
      // Salva dados do lead na ref para envio após agendamento Calendly ou após 90 segundos
      leadPayloadRef.current = payload;
      leadSentRef.current = false;
      isScheduledRef.current = false;

      // Inicia temporizador estrito de 90 segundos
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
      }
      timeoutTimerRef.current = setTimeout(() => {
        sendLeadNotScheduled();
      }, 90000); // 90 segundos

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
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Erro ao processar formulário:", error);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative my-auto w-full max-w-4xl rounded-2xl border border-[#252A25] bg-[#0A0D0A] p-4 sm:p-6 text-center text-[#FFFFFF] shadow-[0_0_60px_rgba(0,0,0,0.95)] max-h-[95vh] flex flex-col">
            
            {/* Botão de Fechar discreto */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#667066] hover:text-[#FFFFFF] transition-colors p-1.5 rounded-lg hover:bg-[#1A1F1A] z-10 cursor-pointer"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Cabeçalho do Agendamento */}
            <div className="mb-3 sm:mb-4 text-center pr-8 sm:pr-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#8CFF00]/10 border border-[#8CFF00]/30 px-3.5 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#8CFF00] shadow-sm mb-2">
                {isScheduled ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#8CFF00]" />
                    REUNIÃO AGENDADA COM SUCESSO
                  </>
                ) : (
                  <>
                    <Calendar className="h-3.5 w-3.5 text-[#8CFF00]" />
                    ETAPA FINAL • AGENDAMENTO DA REUNIÃO
                  </>
                )}
              </div>
              <h3 className="text-lg sm:text-2xl font-black tracking-tight text-[#FFFFFF] leading-snug">
                {isScheduled
                  ? "Sua reunião foi confirmada com sucesso!"
                  : "Escolha o melhor dia e horário para a sua reunião"}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#F4F6F1]/80 max-w-lg mx-auto">
                {isScheduled
                  ? "Enviamos a confirmação e os detalhes do acesso para o seu e-mail e WhatsApp cadastrados."
                  : "Seus dados foram recebidos. Agora, selecione um horário na agenda abaixo para realizarmos seu Diagnóstico Estratégico ao vivo."}
              </p>
            </div>

            {/* Calendly Container de Alta Performance e Sem Cortes */}
            <div className="w-full flex-1 min-h-[580px] sm:min-h-[660px] max-h-[82vh] rounded-xl border border-[#252A25] overflow-y-auto bg-[#0a0d0a] relative">
              <iframe
                src={getCalendlyUrl()}
                className="w-full h-full min-h-[580px] sm:min-h-[660px] border-0 rounded-xl bg-[#0a0d0a]"
                title="Agendamento de Reunião Calendly"
                loading="eager"
              />
            </div>

            {/* Rodapé com link de contingência */}
            <div className="mt-3 flex items-center justify-between text-left text-xs text-[#667066]">
              <span className="hidden sm:inline">Reunião online via Google Meet.</span>
              <a
                href={getCalendlyUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#8CFF00] hover:underline font-bold text-[11px] sm:text-xs ml-auto cursor-pointer"
              >
                <span>Abrir agendamento em nova aba</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
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

      <form onSubmit={onSubmit} autoComplete="on" className="space-y-3.5">
        {step === 1 && (
          <div className="space-y-3.5 animate-fade-in">
            <div>
              <label htmlFor="lead_name" className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                Nome Completo *
              </label>
              <input 
                id="lead_name"
                name="name"
                autoComplete="name"
                inputMode="text"
                ref={nameRef}
                required 
                type="text" 
                placeholder="Ex: Dra. Juliana Souza" 
                value={name}
                onFocus={() => trackCustomEvent("FormStart", { form_id: formId })}
                onChange={e => {
                  setName(e.target.value);
                  if (stepError) setStepError(null);
                }}
                onBlur={e => {
                  if (!name && e.target.value) setName(e.target.value);
                }}
                className={inputCls} 
              />
            </div>

            <div>
              <label htmlFor="lead_email" className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                E-mail Principal *
              </label>
              <input 
                id="lead_email"
                name="email"
                autoComplete="email"
                inputMode="email"
                ref={emailRef}
                required 
                type="email" 
                placeholder="Ex: juliana@clinica.com.br" 
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (stepError) setStepError(null);
                }}
                onBlur={e => {
                  if (!email && e.target.value) setEmail(e.target.value);
                }}
                className={inputCls} 
              />
            </div>

            <div>
              <label htmlFor="lead_tel" className="block text-[11px] font-extrabold uppercase tracking-wider text-[#050705] mb-1">
                WhatsApp com DDD *
              </label>
              <input 
                id="lead_tel"
                name="tel"
                autoComplete="tel"
                inputMode="tel"
                ref={phoneRef}
                required 
                type="tel" 
                placeholder="Ex: (11) 99999-9999" 
                value={phone}
                onChange={handlePhoneChange}
                onInput={e => {
                  const val = (e.target as HTMLInputElement).value;
                  if (val) setPhone(formatPhoneNumber(val));
                  if (stepError) setStepError(null);
                }}
                onBlur={e => {
                  const val = e.target.value;
                  if (val) setPhone(formatPhoneNumber(val));
                }}
                className={inputCls} 
              />
            </div>

            {stepError && step === 1 && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-600 font-bold flex items-center gap-2 animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{stepError}</span>
              </div>
            )}

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleNextStep();
              }}
              className="mt-2 w-full inline-flex h-[54px] items-center justify-center gap-2 rounded-lg bg-[#8CFF00] px-6 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all hover:bg-[#68BF00] cursor-pointer shadow-md active:scale-[0.99]"
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

            {stepError && step === 2 && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-600 font-bold flex items-center gap-2 animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{stepError}</span>
              </div>
            )}

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

// SEÇÃO DE DESTAQUE: CASE DRA. SAMARA (ABAIXO DO HERO)
function CaseDraSamaraSection() {
  const scrollToForm = () => {
    trackCustomEvent("SamaraCaseCTAClick");
    const element = document.getElementById("hero-form-wrapper");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#080B08] border-b border-[#252A25] py-14 lg:py-20 text-[#F4F6F1] relative overflow-hidden">
      {/* Luz ambiente sutil de fundo */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#8CFF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lado Esquerdo: Textos e Chamada para Ação */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0B0E0B] border border-[#252A25] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#8CFF00] shadow-sm">
              PROVA, NÃO APENAS PROMESSA
            </span>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-black tracking-tight text-[#FFFFFF] leading-[1.18]">
              Como a Dra. Samara ultrapassou <span className="text-[#8CFF00]">R$ 200 mil</span> de faturamento no primeiro mês de parceria com a FA
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#F4F6F1]/80 leading-relaxed font-medium">
              Veja como o alinhamento entre tráfego e vendas fez o investimento se pagar apenas com o volume de novas consultas.
            </p>

            <div className="pt-2 w-full sm:w-auto">
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex h-[54px] items-center justify-center gap-2.5 rounded-lg bg-[#8CFF00] px-8 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] transition-all hover:bg-[#68BF00] cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(140,255,0,0.4)]"
              >
                QUERO IDENTIFICAR O POTENCIAL DA MINHA CLÍNICA
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Lado Direito: Vídeo do Depoimento */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[9/16] rounded-2xl border-2 border-[#252A25] bg-[#050705] overflow-hidden shadow-[0_0_35px_rgba(140,255,0,0.15)] group hover:border-[#8CFF00]/60 transition-all duration-300">
              <video
                src="https://fazendoacontecer.site/wp-content/uploads/2026/09/dep-samara.webm"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <span className="mt-3 text-xs font-bold text-[#667066] uppercase tracking-wider flex items-center gap-1.5">
              <Play className="h-3.5 w-3.5 fill-[#8CFF00] text-[#8CFF00]" /> Assista ao relato completo
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

// SEÇÃO 2: PASSO A PASSO
function PassoAPassoSection() {
  const etapas = [
    {
      num: "01",
      title: "1. Você preenche",
      desc: "Compartilha rapidamente informações sobre o momento da clínica."
    },
    {
      num: "02",
      title: "2. A FA analisa",
      desc: "Nossa equipe avalia os dados e identifica os principais pontos de atenção."
    },
    {
      num: "03",
      title: "3. Você recebe a análise",
      desc: "Em uma conversa estratégica, mostramos os gargalos e o próximo passo recomendado."
    }
  ];

  return (
    <section className="bg-[#F4F6F1] border-b border-[#DDE2D9] py-14 lg:py-18 text-[#050705]">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 text-center">
        
        <span className="inline-flex items-center rounded-md bg-[#FFFFFF] border border-[#DDE2D9] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#050705]">
          PASSO A PASSO
        </span>
        <h2 className="mt-3.5 text-2xl sm:text-3xl font-black tracking-tight text-[#050705]">
          Como funciona a solicitação do diagnóstico
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

// SEÇÃO 3: PROVA, NÃO APENAS PROMESSA (TODOS OS DEPOIMENTOS EM CARROSSEL)
interface CasePrincipalSectionProps {
  onOpenVideo: (url: string) => void;
}

function CasePrincipalSection({ onOpenVideo }: CasePrincipalSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToForm = () => {
    trackCustomEvent("MainCaseCTAClick");
    const element = document.getElementById("hero-form-wrapper");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#050705] border-b border-[#252A25] py-12 lg:py-16 text-[#F4F6F1]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-md bg-[#0B0E0B] border border-[#252A25] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#8CFF00]">
            PROVA, NÃO APENAS PROMESSA
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#FFFFFF]">
            Veja os resultados de quem já aplicou a estratégia
          </h2>
        </div>

        {/* Carrossel de Vídeos */}
        <div className="relative max-w-4xl mx-auto px-2 sm:px-10">
          
          <button
            onClick={() => scroll("left")}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#252A25] bg-[#0B0E0B]/90 text-[#FFFFFF] shadow-xl hover:border-[#8CFF00] hover:text-[#8CFF00] transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div 
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-4 px-2 snap-x snap-mandatory justify-start md:justify-center items-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CASE_STUDIES.map((c) => (
              <div 
                key={c.id}
                onClick={() => onOpenVideo(c.videoUrl)}
                className="group relative shrink-0 aspect-[9/16] w-[200px] sm:w-[230px] md:w-[240px] rounded-2xl border border-[#252A25] bg-[#0B0E0B] overflow-hidden cursor-pointer shadow-xl hover:border-[#8CFF00] transition-all duration-300 snap-center"
              >
                <img 
                  src={c.thumbnail} 
                  alt="Depoimento em vídeo" 
                  loading="lazy"
                  decoding="async"
                  width="240"
                  height="426"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#252A25] bg-[#0B0E0B]/90 text-[#FFFFFF] shadow-xl hover:border-[#8CFF00] hover:text-[#8CFF00] transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>

        <div className="mt-8 text-center">
          <button
            onClick={scrollToForm}
            className="inline-flex h-[52px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#8CFF00] px-7 text-xs font-black uppercase tracking-wider text-[#050705] hover:bg-[#68BF00] transition-all cursor-pointer shadow-md"
          >
            QUERO IDENTIFICAR O POTENCIAL DA MINHA CLÍNICA
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

// SEÇÃO 4: ESTE DIAGNÓSTICO FAZ SENTIDO PARA SUA CLÍNICA SE:
function ParaQuemSection() {
  const items = [
    "fatura a partir de R$ 35 mil por mês;",
    "possui procedimentos ou serviços validados;",
    "quer aumentar agendamentos ou conversão;",
    "possui capacidade para atender novos pacientes;",
    "deseja crescer sem depender apenas de indicação."
  ];

  return (
    <section className="bg-[#F4F6F1] border-b border-[#DDE2D9] py-14 lg:py-16 text-[#050705]">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 text-left">
        
        <div className="rounded-2xl border border-[#DDE2D9] bg-[#FFFFFF] p-7 sm:p-9 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-[#050705] tracking-tight">
            Este diagnóstico faz sentido para sua clínica se:
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
              * Não é indicado para operações que ainda não possuem um serviço validado ou capacidade mínima de investimento.
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
      a: "Sim. A análise inicial não possui custo nem obrigação de contratação."
    },
    {
      q: "Preciso contratar a FA depois?",
      a: "Não. O diagnóstico ajuda a entender os gargalos e o próximo passo recomendado, mas a decisão de contratar é sua."
    },
    {
      q: "A FA atende clínicas que faturam R$ 35 mil?",
      a: "Sim. Existem diferentes modelos de entrega de acordo com o estágio da operação."
    },
    {
      q: "Preciso já investir em tráfego?",
      a: "Não obrigatoriamente. A análise considera o momento atual e a capacidade de investimento da clínica."
    },
    {
      q: "O que acontece depois do preenchimento?",
      a: "Nossa equipe analisa as informações e entra em contato para aprofundar o diagnóstico."
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
          Antes de investir mais, descubra o que precisa ser corrigido.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#667066] font-medium leading-relaxed max-w-xl mx-auto">
          Solicite uma análise estratégica gratuita do momento atual da sua clínica.
        </p>

        <div className="mt-8">
          <button
            onClick={scrollToForm}
            className="inline-flex h-[56px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[#8CFF00] px-9 text-xs sm:text-sm font-black uppercase tracking-wider text-[#050705] hover:bg-[#68BF00] transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
          >
            PREENCHER FORMULÁRIO DE ANÁLISE
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-5 text-xs font-semibold text-[#667066]">
          Gratuito, sem compromisso e destinado a clínicas com faturamento a partir de R$ 35 mil mensais.
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
          Os resultados apresentados referem-se a casos específicos e não representam garantia de desempenho. Os resultados podem variar conforme mercado, investimento, oferta, equipe, atendimento e execução.
        </p>
        <p>
          Copyright © 2026 Fazendo Acontecer — Todos os direitos reservados.
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
