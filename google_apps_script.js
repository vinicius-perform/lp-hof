/**
 * Google Apps Script - Integração Diagnóstico FA (Com suporte UTF-8, Meta Ads CAPI, Triggers, Distribuição SDR, Supabase e Identificação de LP)
 * 
 * Mapeamento das colunas A até Z (26 colunas):
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
 * Z: AGENDAMENTO CALENDLY (Data/Horário do Agendamento pelo Lead)
 */

var META_PIXEL_ID = "1049112404466926";
var META_ACCESS_TOKEN = "EAA8ZCmFdkBigBSOLMe5XkD3TdDb6BYAGzAtFZAd05gvDPZCrSI9S08YmMZCrUuWLUoordOaNGfHR8ZAdoAMrb8uZBkd26IABzDeULg0vwyhIH0MocX8RL0Tx33YHEC9QVqmcoJrdgSfKey1Vx1KdsGsP4cmq203hZCJQRLM26FixkJNFaJxevIjpIQ3ro536DXdaQZDZD";

// Token de Acesso Pessoal da API do Calendly (Permite obter a data + hora exatas da reunião escolhida pelo lead)
var CALENDLY_ACCESS_TOKEN = "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzkzMTI4NzMwLCJqdGkiOiJkYmRjNDQxYi04MmJiLTQyMDItODZlZC1lNDAxYjdjOTc4YTEiLCJ1c2VyX3V1aWQiOiIwMDE5ZWMyOS1mMDk4LTQ1YTctOGFiNy1mZjU1MjEyOGVmYzgiLCJzY29wZSI6ImF2YWlsYWJpbGl0eTpyZWFkIGF2YWlsYWJpbGl0eTp3cml0ZSBldmVudF90eXBlczpyZWFkIGV2ZW50X3R5cGVzOndyaXRlIGxvY2F0aW9uczpyZWFkIHJvdXRpbmdfZm9ybXM6cmVhZCBzaGFyZXM6d3JpdGUgc2NoZWR1bGVkX2V2ZW50czpyZWFkIHNjaGVkdWxlZF9ldmVudHM6d3JpdGUgc2NoZWR1bGluZ19saW5rczp3cml0ZSBncm91cHM6cmVhZCBvcmdhbml6YXRpb25zOnJlYWQgb3JnYW5pemF0aW9uczp3cml0ZSB1c2VyczpyZWFkIGNvbnRhY3RzOnJlYWQgY29udGFjdHM6d3JpdGUgbWVldGluZ19yZWNhcHM6cmVhZCBtZWV0aW5nX3JlY2Fwczp3cml0ZSJ9.aB4vT02tiveJcfM7YewDikDFKAShzMe5iBiawqJdg2EEoVIc9KfT_jLva0moLyJ9oioIHA9HU2Vb7QvK4jd2Sw";

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

    // Garante que a Coluna Z (26) tenha o cabeçalho correto se a planilha já possuir cabeçalhos
    if (sheet.getLastRow() >= 1) {
      var headerZ = sheet.getRange(1, 26).getValue();
      if (!headerZ) {
        sheet.getRange(1, 26).setValue("AGENDAMENTO CALENDLY");
      }
    }

    // 1. ATUALIZAÇÃO VIA FRONTEND (Quando o lead conclui o agendamento no Calendly)
    if (data.action === "calendly_scheduled" || data.action === "update_agendamento") {
      var searchExternalId = String(data.external_id || data.EXTERNAL_ID || "").trim();
      var searchEmail = String(data.email || data.e_mail || "").trim().toLowerCase();
      var searchPhone = String(data.phone || data.whatsapp || "").replace(/\D/g, "");
      var eventUri = String(data.calendly_event_uri || data.event_uri || "").trim();
      
      var dataHoraReuniao = "";

      // Se temos o token e a URI do evento, consulta a API do Calendly para extrair data + hora da reunião
      if (eventUri && CALENDLY_ACCESS_TOKEN) {
        try {
          var calRes = UrlFetchApp.fetch(eventUri, {
            headers: {
              "Authorization": "Bearer " + CALENDLY_ACCESS_TOKEN,
              "Content-Type": "application/json"
            },
            muteHttpExceptions: true
          });
          var calJson = JSON.parse(calRes.getContentText());
          if (calJson && calJson.resource && calJson.resource.start_time) {
            var sDate = new Date(calJson.resource.start_time);
            dataHoraReuniao = Utilities.formatDate(sDate, "America/Sao_Paulo", "dd/MM/yyyy 'às' HH:mm");
          }
        } catch (calErr) {
          Logger.log("Erro ao buscar detalhes no Calendly API: " + calErr.toString());
        }
      }

      var agendamentoInfo = dataHoraReuniao 
        ? dataHoraReuniao 
        : ((data.agendamento_calendly && data.agendamento_calendly !== "NÃO AGENDADA" && data.agendamento_calendly !== "NAO AGENDADA") 
            ? data.agendamento_calendly 
            : "Agendado no Calendly");
      
      var lastRow = sheet.getLastRow();
      var targetRow = -1;
      
      if (lastRow > 1) {
        var values = sheet.getRange(2, 1, lastRow - 1, 26).getValues();
        
        // Busca 1: por external_id (Coluna W / índice 22)
        if (searchExternalId) {
          for (var i = values.length - 1; i >= 0; i--) {
            if (String(values[i][22] || "").trim() === searchExternalId) {
              targetRow = i + 2;
              break;
            }
          }
        }
        
        // Busca 2: por e-mail (Coluna E / índice 4)
        if (targetRow === -1 && searchEmail) {
          for (var j = values.length - 1; j >= 0; j--) {
            if (String(values[j][4] || "").trim().toLowerCase() === searchEmail) {
              targetRow = j + 2;
              break;
            }
          }
        }
        
        // Busca 3: por telefone (Coluna D / índice 3)
        if (targetRow === -1 && searchPhone) {
          for (var k = values.length - 1; k >= 0; k--) {
            var rowPhone = String(values[k][3] || "").replace(/\D/g, "");
            if (rowPhone && (rowPhone === searchPhone || rowPhone.indexOf(searchPhone) !== -1 || searchPhone.indexOf(rowPhone) !== -1)) {
              targetRow = k + 2;
              break;
            }
          }
        }

        // Busca 4: Fallback na última linha caso esteja em branco ou como "NÃO AGENDADA"
        if (targetRow === -1 && values.length > 0) {
          var lastIdx = values.length - 1;
          var lastZ = String(values[lastIdx][25] || "").trim();
          if (lastZ === "NÃO AGENDADA" || lastZ === "") {
            targetRow = lastIdx + 2;
          }
        }
      }
      
      if (targetRow !== -1) {
        // NUNCA MEXER NA COLUNA R (18) - Reservada estritamente para preenchimento manual da equipe/SDR
        sheet.getRange(targetRow, 26).setValue(agendamentoInfo); // Coluna Z (AGENDAMENTO CALENDLY)
        
        // Envio automático para Meta CAPI (Schedule) se ainda não foi enviado
        var currentCapiStatus = String(sheet.getRange(targetRow, 24).getValue() || "");
        if (!currentCapiStatus || currentCapiStatus.indexOf("(Enviado)") === -1) {
          var leadVals = sheet.getRange(targetRow, 1, 1, 26).getValues()[0];
          var leadToCapi = {
            name: leadVals[2],
            phone: leadVals[3],
            email: leadVals[4],
            fbc: leadVals[20],
            fbp: leadVals[21],
            externalId: leadVals[22]
          };
          var resSched = sendMetaCapiEvent("Schedule", leadToCapi, null);
          if (resSched && !resSched.error && (!resSched.events_received || resSched.events_received > 0)) {
            var nowCapi = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
            sheet.getRange(targetRow, 24).setValue(nowCapi + " (Enviado)");
          }
        }
        
        // Atualiza Supabase
        enviarParaSupabase({
          email: searchEmail,
          telefone: searchPhone,
          agendamento_calendly: agendamentoInfo
        });

        return ContentService
          .createTextOutput(JSON.stringify({ result: "success", updated_row: targetRow, agendamento_calendly: agendamentoInfo }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({ result: "not_found", message: "Lead não localizado para atualizar" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. ATUALIZAÇÃO VIA WEBHOOK NATIVO DO CALENDLY ("invitee.created")
    if (data.event === "invitee.created" && data.payload) {
      var calPayload = data.payload;
      var calEmail = String(calPayload.email || "").trim().toLowerCase();
      var calStartTime = calPayload.scheduled_event ? calPayload.scheduled_event.start_time : "";
      var dataHoraAgendada = "";
      if (calStartTime) {
        try {
          var dObj = new Date(calStartTime);
          dataHoraAgendada = Utilities.formatDate(dObj, "America/Sao_Paulo", "dd/MM/yyyy 'às' HH:mm");
        } catch(e) {
          dataHoraAgendada = calStartTime;
        }
      }

      // Se não veio no payload mas temos o URI do evento e o token, busca na API
      if (!dataHoraAgendada && calPayload.event && CALENDLY_ACCESS_TOKEN) {
        try {
          var calHookRes = UrlFetchApp.fetch(calPayload.event, {
            headers: {
              "Authorization": "Bearer " + CALENDLY_ACCESS_TOKEN,
              "Content-Type": "application/json"
            },
            muteHttpExceptions: true
          });
          var calHookJson = JSON.parse(calHookRes.getContentText());
          if (calHookJson && calHookJson.resource && calHookJson.resource.start_time) {
            var dObjHook = new Date(calHookJson.resource.start_time);
            dataHoraAgendada = Utilities.formatDate(dObjHook, "America/Sao_Paulo", "dd/MM/yyyy 'às' HH:mm");
          }
        } catch (calHookErr) {
          Logger.log("Erro ao buscar evento no webhook do Calendly: " + calHookErr.toString());
        }
      }

      var calDetalhes = dataHoraAgendada || "Agendado no Calendly";
      
      var lastR = sheet.getLastRow();
      if (lastR > 1) {
        var vals = sheet.getRange(2, 1, lastR - 1, 26).getValues();
        var rowToUp = -1;
        if (calEmail) {
          for (var m = vals.length - 1; m >= 0; m--) {
            if (String(vals[m][4] || "").trim().toLowerCase() === calEmail) {
              rowToUp = m + 2;
              break;
            }
          }
        }
        // Fallback: se não localizou por e-mail exato, atualiza a última linha se estiver em branco ou como "NÃO AGENDADA"
        if (rowToUp === -1 && vals.length > 0) {
          var lastIdx = vals.length - 1;
          var lastZVal = String(vals[lastIdx][25] || "").trim();
          if (lastZVal === "NÃO AGENDADA" || lastZVal === "") {
            rowToUp = lastIdx + 2;
          }
        }
        if (rowToUp !== -1) {
          // NUNCA MEXER NA COLUNA R (18)
          sheet.getRange(rowToUp, 26).setValue(calDetalhes);
        }
      }
      return ContentService
        .createTextOutput(JSON.stringify({ result: "success", calendly_webhook: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

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
    // Coluna R (18) NUNCA é preenchida pelo script - estritamente manual para SDR
    var agendamento = "";
    var venda = data.venda || "";
    var valorConversao = data.valor_conversao || "";

    // Parâmetros Meta CAPI (Colunas U, V, W)
    var fbc = data.fbc || data.FBC_FBCLID || data.fbclid || "";
    var fbp = data.fbp || data.FBP || "";
    var externalId = data.external_id || data.EXTERNAL_ID || "";

    // Status CAPI Iniciais (Colunas X, Y)
    var capiAgendamentoEnviado = "";
    var capiVendaEnviado = "";

    // Informações de Agendamento Calendly (Coluna Z)
    // Se o lead não marcou reunião, permanece estritamente em branco ("") conforme solicitado
    var rawAgendamento = data.agendamento_calendly || data.detalhes_agendamento || "";
    var agendamentoCalendly = (rawAgendamento === "NÃO AGENDADA" || rawAgendamento === "NAO AGENDADA") ? "" : rawAgendamento;

    // Linha a ser adicionada na planilha (Colunas A -> Z, totalizando 26 colunas)
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
      capiVendaEnviado,       // Coluna Y
      agendamentoCalendly     // Coluna Z (AGENDAMENTO CALENDLY)
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
      valor_conversao: valorConversao,
      agendamento_calendly: agendamentoCalendly
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
  
  var rowValues = sheet.getRange(row, 1, 1, 26).getValues()[0];
  
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
  
  var dataRange = sheet.getRange(2, 1, lastRow - 1, 26).getValues();
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
  var supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjenNvdXlwcWdqbHJxZG1ydHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1Njg0MzUsImV4cCI6MjA3MTE0NDQzNX0.EAAUCHCxqlm4BSXktFRiKzq7w1aa9ZC8iZApYGfhQNAdvWAdI48pJ7NWdN9xHHb9C38XuKd6qZBEN74fjlZBqRJE3vd7VPGtUXSMAAoLfVaT3R6DiehWmRuZCRcjefmDslZBfWOZB9uuMrHxWHqe99dMWsIn1zRVOLlAx8mJ6B2YUfoSsCfNL85EpZBZBMLWZBqrwZDZD";
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
  
  var dataRange = sheet.getRange(2, 1, lastRow - 1, 26).getValues();
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
      valor_conversao: parseCurrencyValue(rowValues[19]),
      agendamento_calendly: rowValues[25] || ""
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
