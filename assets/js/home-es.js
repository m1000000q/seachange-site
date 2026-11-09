/* Spanish language pack for home.js (loaded before it on /es). */
window.SC_HOME = {
  lang: "Spanish",
  ui: {
    more: "Qué incluye →",
    where: "Dónde encaja en cómo trabajamos",
    startWith: "Empezar con esto →",
    sending: "Enviando…",
    send: "Enviar →",
    thanksUrl: "/es/gracias",
    close: "Cerrar",
    ask: "Pregúntale a SeaChange",
    sources: "Fuentes:"
  },
  QA: [
    { q: "¿Dónde se traba mi pipeline?", a: "La mayor parte está en Propuesta. 14 negocios por US$212k no se movieron en más de 30 días. Próximo paso: revisar los 9 negocios estancados con Sam y Priya.", s: ["Zoho CRM", "Informe de pipeline"] },
    { q: "¿Qué está impulsando el crecimiento este trimestre?", a: "Los clientes recurrentes. Los ingresos de cuentas existentes subieron respecto al trimestre pasado, mientras que los de clientes nuevos se mantienen. Próximo paso: ver qué cuentas crecieron y por qué.", s: ["Sistema financiero", "Zoho CRM"] },
    { q: "¿Qué clientes son los más valiosos?", a: "Tus 20 cuentas principales generan más de la mitad de los ingresos, y la mayoría llegó por recomendación. Próximo paso: incluir un pedido de referidos en tus revisiones de cuentas.", s: ["Sistema financiero", "Zoho CRM"] }
  ],
  S: [
    { num: "01", name: "Fundamentos", icon: "layout-grid", kicker: "Fundamentos", title: "Que cada número tenga un significado.", body: "Empezamos por entender cómo funciona de verdad tu negocio, para que cada dashboard responda las preguntas que importan.",
      groups: [{ h: "Qué mapeamos", items: [
        { t: "ICP", d: "Los clientes que vale la pena ganar, definidos con tus propios datos" },
        { t: "Compradores", d: "Quién firma, quién influye y qué necesita cada uno" },
        { t: "Recorrido del cliente", d: "Cada paso desde el primer contacto hasta la renovación, conectado a tus sistemas" },
        { t: "Análisis de mercado", d: "Dónde está la demanda, contra quién compites y dónde enfocarte" }] }] },
    { num: "02", name: "Auditoría y mantenimiento de CRM", icon: "database", kicker: "CRM", title: "Un CRM en el que tu equipo pueda confiar.", body: "Encontramos qué está roto, acordamos qué significan tus registros y armamos rutinas para mantenerlos limpios.",
      groups: [
        { h: "Diagnóstico", items: [
          { t: "Auditoría", d: "Campos, etapas, duplicados e integraciones" },
          { t: "Licencias", d: "Qué licencias y módulos usas realmente" },
          { t: "Definiciones", d: "Acordar qué significan un lead y un negocio en tu empresa" }] },
        { h: "Rutinas de higiene", items: [
          { t: "Limpieza", d: "Limpiar y deduplicar los registros existentes" },
          { t: "Validación", d: "Reglas para que no entren datos erróneos" },
          { t: "Controles periódicos", d: "Rutinas que tu equipo pueda sostener" }] }] },
    { num: "03", name: "Dashboard de ingresos", icon: "gauge", kicker: "Dashboard de ingresos", title: "Un dashboard desde el lead hasta los ingresos recurrentes.", body: "Integramos tu CRM, tus finanzas y tus sistemas de marketing para tener todo el embudo en un solo lugar.",
      groups: [{ h: "Todo el embudo", items: [
        { t: "Leads", d: "Volumen y origen, comparados con el trimestre pasado" },
        { t: "Oportunidades", d: "Qué hay en el pipeline y hacia dónde se mueve" },
        { t: "Clientes nuevos", d: "Quién convirtió y qué lo trajo" },
        { t: "Ingresos recurrentes", d: "Los ingresos que se repiten, seguidos en el tiempo" }] }] },
    { num: "04", name: "Habla con tus datos", icon: "sparkles", kicker: "Habla con tus datos", title: "Dashboards con los que puedes conversar.", body: "Le hablas a tus datos en lenguaje simple. Y te responden, con resúmenes de lo que cambió.",
      groups: [
        { h: "Tú preguntas", items: [
          { t: "Lenguaje simple", d: "Pregunta como le preguntarías a un colega" },
          { t: "Fuentes citadas", d: "Cada respuesta muestra de dónde salen sus números" }] },
        { h: "Tus datos te cuentan", items: [
          { t: "La respuesta", d: "El hallazgo, el número que lo respalda y el próximo paso" },
          { t: "Resúmenes semanales", d: "Qué cambió esta semana, sin tener que preguntar" }] }] },
    { num: "05", name: "Automatización y herramientas a medida", icon: "zap", kicker: "Automatización", title: "Herramientas pensadas para cómo trabajas.", body: "Automatizamos el trabajo repetitivo y creamos herramientas a medida donde el software genérico se queda corto.",
      groups: [{ h: "Ejemplos", items: [
        { t: "Clasificación de consultas", d: "Cada consulta se lee, se clasifica y se deriva a la persona correcta, sin nada olvidado en una bandeja compartida" },
        { t: "Borrador y revisión de RFP", d: "Armado sobre tu propia biblioteca de respuestas y tus pasos de aprobación, para borradores más rápidos y precisos que con software genérico" },
        { t: "Plantillas de marca", d: "One-pagers y presentaciones sobre tu plantilla de marca en minutos, sin diseñar desde cero ni mandarlo a una agencia" }] }] },
    { num: "06", name: "Motor de marketing", icon: "settings", kicker: "Marketing", title: "Motor de marketing y stack de martech.", body: "Pensado para equipos de marketing chicos: planifica, crea y mide cada campaña en un solo lugar, sobre un stack a tu medida.",
      groups: [
        { h: "Motor de marketing", items: [
          { t: "Calendario de campañas", d: "Todas las campañas planificadas en un solo lugar" },
          { t: "Feedback de campañas", d: "Los aportes de ventas, integrados" },
          { t: "Recursos compartidos", d: "Un único lugar para el contenido que usa tu equipo" },
          { t: "Resultados por campaña", d: "Mira qué logró cada campaña" }] },
        { h: "Consultoría de martech", items: [
          { t: "Revisión", d: "Las herramientas que pagas, qué hace cada una y dónde se superponen" },
          { t: "Plan", d: "Qué conservar, conectar, redimensionar o dar de baja" }] }] },
    { num: "07", name: "Proyectos a medida", icon: "git-merge", kicker: "Proyectos a medida", title: "Más allá de ventas y marketing.", body: "El mismo descubrimiento funciona en cualquier área con datos y preguntas. Si hay datos y una pregunta detrás, podemos ayudarte a unirlos.",
      groups: [{ h: "Dónde se aplica", items: [
        { t: "Ventas y marketing", d: "Donde empiezan la mayoría de los clientes" },
        { t: "Finanzas", d: "Ingresos, gastos y proyecciones, unidos" },
        { t: "Operaciones", d: "Datos de entregas, capacidad y procesos" },
        { t: "Personas y atención al cliente", d: "Equipos, niveles de servicio y salud de los clientes" }] }] },
    { num: "08", name: "Marketing fraccional", icon: "users", kicker: "Marketing fraccional", title: "Apoyo de marketing, cuando lo necesitas.", body: "Profesionales de marketing y ventas con experiencia que trabajan junto a tu equipo. Flexible: más apoyo para un lanzamiento y menos cuando todo está estable. Siempre basado en lo que muestran tus dashboards.",
      groups: [
        { h: "Planificar y ejecutar", items: [
          { t: "Campañas de marketing", d: "Planificar, ejecutar y medir campañas que lleguen a las personas correctas" },
          { t: "Estrategia de salida al mercado", d: "A quién apuntar, qué decir y dónde estar" },
          { t: "LinkedIn y contenido", d: "Contenido que funciona para tus compradores, y mejor uso de Sales Navigator" }] },
        { h: "Alineación con ventas", items: [
          { t: "Sales enablement", d: "El contenido, las herramientas y los procesos que necesita tu equipo de ventas" },
          { t: "Equipos alineados", d: "Ventas y marketing con objetivos compartidos y feedback en ambos sentidos" },
          { t: "Prospección y descubrimiento", d: "Elegir herramientas de prospección y mejorar las llamadas de descubrimiento" }] }] }
  ],
  POP: {
    "Fundamentos": { sub: "Estrategia · Donde empieza todo proyecto", chips: ["Ventas", "Marketing", "Dirección"], steps: [1, 0, 0, 0], rows: [["Ideal para", "Equipos que quieren que cada número signifique algo"], ["Recibes", "ICP, compradores, recorrido del cliente y análisis de mercado"], ["Basado en", "Los datos de tu propio CRM y tus finanzas"]] },
    "Auditoría y mantenimiento de CRM": { sub: "CRM · Diagnóstico e higiene", chips: ["Auditoría", "Limpieza", "Validación"], steps: [1, 1, 0, 0], rows: [["Ideal para", "CRMs en los que nadie confía del todo"], ["Recibes", "Registros limpios, definiciones acordadas y rutinas que tu equipo sostiene"], ["Resultado", "Más liviano: requisitos y costos del CRM redimensionados"]] },
    "Dashboard de ingresos": { sub: "Dashboards · Del lead a los ingresos recurrentes", chips: ["CRM", "Finanzas", "Marketing"], steps: [0, 1, 1, 0], rows: [["Ideal para", "Líderes que quieren todo el embudo en un solo lugar"], ["Mide", "Leads, oportunidades, clientes nuevos e ingresos recurrentes"], ["Une", "CRM, finanzas y sistemas de marketing"]] },
    "Habla con tus datos": { sub: "IA · Dashboards con los que puedes conversar", chips: ["Lenguaje simple", "Fuentes citadas", "Resúmenes semanales"], steps: [0, 0, 1, 1], rows: [["Ideal para", "Equipos que necesitan respuestas, no más informes"], ["Preguntas", "¿Dónde se traba mi pipeline?"], ["Recibes", "La respuesta, el número y el próximo paso"], ["Seguridad", "El asistente solo ve datos si se activa"]] },
    "Automatización y herramientas a medida": { sub: "Automatización · Pensada para cómo trabajas", chips: ["Clasificación de consultas", "Borradores de RFP", "Plantillas"], steps: [0, 1, 0, 1], rows: [["Ideal para", "Trabajo repetitivo que se come la semana de tu equipo"], ["Ejemplos", "Derivación de consultas, borradores de RFP, one-pagers de marca"], ["Resultado", "Más preciso: software de RFP reemplazado por una herramienta a medida"]] },
    "Motor de marketing": { sub: "Marketing · Motor y stack de martech", chips: ["Campañas", "Recursos compartidos", "Revisión de martech"], steps: [1, 1, 0, 1], rows: [["Ideal para", "Equipos de marketing chicos"], ["Recibes", "Planificar, crear y medir cada campaña en un solo lugar"], ["Resultado", "Más rápido: menos tiempo creando campañas"]] },
    "Proyectos a medida": { sub: "Más allá de ventas y marketing", chips: ["Finanzas", "Operaciones", "Personas", "Atención al cliente"], steps: [1, 1, 1, 1], rows: [["Ideal para", "Cualquier equipo con datos y una pregunta detrás"], ["Empieza con", "El mismo descubrimiento: cómo funciona de verdad tu negocio"]] },
    "Marketing fraccional": { sub: "Personas · Apoyo de marketing cuando lo necesitas", chips: ["Flexible", "Basado en tus datos"], steps: [1, 0, 0, 1], rows: [["Ideal para", "Lanzamientos, épocas de mucho trabajo y equipos entre contrataciones"], ["Recibes", "Campañas, salida al mercado, sales enablement y contenido"], ["Cómo", "Más apoyo para un lanzamiento, menos cuando todo está estable"]] }
  },
  STEP_NAMES: ["Entender", "Conectar", "Preguntar", "Decidir"],
  // Spanish service name -> the (English) value of its interest chip, so HubSpot gets the same labels from both sites.
  INTMAP: { "Fundamentos": "Foundations", "Auditoría y mantenimiento de CRM": "CRM audit", "Dashboard de ingresos": "Revenue dashboard", "Habla con tus datos": "Talk to your data", "Automatización y herramientas a medida": "Automation", "Motor de marketing": "Marketing engine", "Proyectos a medida": "Not sure yet", "Marketing fraccional": "Fractional marketing" },
  reply: function (text) {
    var t = (text || "").toLowerCase();
    if (/precio|costo|cuesta|cuánto|cuanto|tarifa|honorario/.test(t)) return { text: "Depende del tamaño del piloto. Cuéntanos tu pregunta en el formulario al final de la página y te enviamos una propuesta.", sources: ["Cómo empezar un piloto"] };
    if (/piloto|empez|comenz|arranc|inicio/.test(t)) return { text: "Un piloto tiene tres pasos: eliges la pregunta que hoy tu equipo no puede responder rápido, conectamos los datos que hay detrás y después revisamos la respuesta juntos para decidir qué construir.", sources: ["Cómo empezar un piloto"] };
    if (/segur|privacidad|protecci|claude|gdpr|rgpd/.test(t)) return { text: "Los dashboards, las sincronizaciones y los permisos funcionan en nuestro servidor y en el navegador. Las claves y los tokens quedan de nuestro lado, cifrados. El asistente de IA solo ve datos si se activa, y se puede limitar a datos agregados o a personas concretas.", sources: ["Seguridad"] };
    if (/servicio|ofrec|crm|dashboard|tablero|automatiz|marketing|rfp/.test(t)) return { text: "Ofrecemos Fundamentos, auditoría y mantenimiento de CRM, un dashboard de ingresos, Habla con tus datos, automatización y herramientas a medida, y un motor de marketing. Además, proyectos a medida y marketing fraccional.", sources: ["Servicios"] };
    return { text: "Buena pregunta. Lo mejor es conversarlo: deja tus datos en el formulario al final de la página y te respondemos.", sources: [] };
  }
};
