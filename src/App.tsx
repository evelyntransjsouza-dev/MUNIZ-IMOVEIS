import React, { useState, useId } from 'react';
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Car, 
  Maximize, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Calculator, 
  ChevronRight, 
  FileText, 
  Clock, 
  Train, 
  X, 
  Layers, 
  ChevronDown, 
  Send, 
  Award, 
  Users, 
  Key, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { DEVELOPMENTS, COMPANY_INFO, Development } from './data/developments';

export default function App() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('todos');
  const [activeFormModal, setActiveFormModal] = useState<Development | null>(null);
  const [activeDetailModal, setActiveDetailModal] = useState<Development | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Financing Simulator State
  const [simProperty, setSimProperty] = useState<string>('tatuape');
  const [simPropertyValue, setSimPropertyValue] = useState<number>(850000);
  const [simDownPaymentPercent, setSimDownPaymentPercent] = useState<number>(20);
  const [simTermMonths, setSimTermMonths] = useState<number>(360);
  const [simConstructionMonths, setSimConstructionMonths] = useState<number>(36);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Direct Contact Form State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadInterest, setLeadInterest] = useState('tatuape');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Calculate financing values
  const downPaymentAmount = (simPropertyValue * simDownPaymentPercent) / 100;
  const financedAmount = simPropertyValue - downPaymentAmount;
  
  // During construction (say 25% of downpayment is split in monthly installments)
  const monthlyConstructionInstallment = Math.round((downPaymentAmount * 0.5) / simConstructionMonths);
  
  // Estimated monthly bank installment (standard SAC approximation ~ 9.5% a.a.)
  const monthlyInterestRate = 0.095 / 12;
  const estimatedFinancingInstallment = Math.round(
    (financedAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, simTermMonths))) /
    (Math.pow(1 + monthlyInterestRate, simTermMonths) - 1)
  );

  const filteredDevelopments = selectedNeighborhood === 'todos'
    ? DEVELOPMENTS
    : DEVELOPMENTS.filter(d => d.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase());

  const handleSimPropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSimProperty(selected);
    if (selected === 'mooca') setSimPropertyValue(589000);
    else if (selected === 'tatuape') setSimPropertyValue(1150000);
    else if (selected === 'vila-ema') setSimPropertyValue(349000);
  };

  const handleDirectLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    // Find the relevant form URL or WhatsApp
    const selectedDev = DEVELOPMENTS.find(d => d.id === leadInterest) || DEVELOPMENTS[0];
    const message = encodeURIComponent(
      `Olá Muniz Imóveis! Meu nome é ${leadName} (Tel: ${leadPhone}, Email: ${leadEmail || 'Não informado'}). Tenho interesse no lançamento em ${selectedDev.neighborhood} (${selectedDev.name}). Gostaria de receber mais informações e a tabela de valores.`
    );
    
    // Open WhatsApp
    window.open(`https://wa.me/5511987654321?text=${message}`, '_blank');
    setLeadSubmitted(true);
  };

  const faqs = [
    {
      q: 'Como funciona o processo de compra de um imóvel na planta com a Muniz Imóveis?',
      a: 'Comprar na planta oferece as melhores condições de pagamento. Você paga a entrada parcelada durante o período de obras (cerca de 20% a 30% do valor total) e o saldo restante é financiado pelo banco (Caixa, Itaú, Bradesco, Santander) apenas na entrega das chaves.'
    },
    {
      q: 'Posso utilizar o meu saldo do FGTS na compra?',
      a: 'Sim! O saldo do FGTS pode ser utilizado para compor a entrada, abater parcelas ou amortizar o saldo devedor do financiamento imobiliário no momento da entrega das chaves.'
    },
    {
      q: 'A Muniz Imóveis cobra taxa para realizar a aprovação do meu crédito?',
      a: 'Não. Toda a nossa assessoria de crédito imobiliário e análise documental é 100% gratuita para os nossos clientes. Nós buscamos as melhores taxas de juros do mercado para o seu perfil.'
    },
    {
      q: 'Quais documentos são necessários para preencher o formulário e reservar uma unidade?',
      a: 'Para manifestar interesse e iniciar a análise basta preencher o formulário online com Nome, WhatsApp e E-mail. Para a proposta oficial, são necessários: RG/CNH, CPF, Comprovante de Residência, Comprovante de Estado Civil e os 3 últimos holerites ou extratos bancários.'
    },
    {
      q: 'Qual a vantagem de preencher o formulário com antecedência?',
      a: 'Ao preencher o formulário oficial do empreendimento desejado (Mooca, Tatuapé ou Vila Ema), você garante prioridade na escolha dos melhores andares, vista privilegiada e tabela de preços promocional exclusiva de lançamento.'
    }
  ];

  return (
    <div id="landing-page-root" className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-amber-600 selection:text-white">
      
      {/* Top Banner / CRECI Badge */}
      <div id="top-announcement-bar" className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              LANÇAMENTOS EXCLUSIVOS
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span>Tatuapé, Mooca & Vila Ema — Condições Direto na Planta</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="font-medium text-slate-300">{COMPANY_INFO.creci}</span>
            <span className="hidden md:inline">|</span>
            <a 
              href="https://wa.me/5511987654321" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium text-slate-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>(11) 98765-4321</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <nav id="main-navigation-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#inicio" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-slate-900 border border-amber-600/40 rounded-lg flex items-center justify-center shadow-md group-hover:border-amber-500 transition-colors">
              <span className="text-amber-500 font-brand text-2xl font-bold tracking-tighter">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-950 uppercase font-serif-luxury leading-tight">
                Muniz Imóveis
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-slate-500">
                Consultoria Imobiliária
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8 text-xs uppercase font-semibold tracking-wider text-slate-600">
            <a href="#inicio" className="hover:text-slate-950 transition-colors py-1 hover:border-b-2 hover:border-amber-600">
              Início
            </a>
            <a href="#empreendimentos" className="hover:text-slate-950 transition-colors py-1 hover:border-b-2 hover:border-amber-600">
              Empreendimentos
            </a>
            <a href="#simulador" className="hover:text-slate-950 transition-colors py-1 hover:border-b-2 hover:border-amber-600">
              Simulador
            </a>
            <a href="#comparativo" className="hover:text-slate-950 transition-colors py-1 hover:border-b-2 hover:border-amber-600">
              Bairros
            </a>
            <a href="#diferenciais" className="hover:text-slate-950 transition-colors py-1 hover:border-b-2 hover:border-amber-600">
              Diferenciais
            </a>
            <a href="#contato" className="hover:text-slate-950 transition-colors py-1 hover:border-b-2 hover:border-amber-600">
              Contato
            </a>
          </div>

          {/* CTA Header Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://wa.me/5511987654321?text=Ol%C3%A1%20Muniz%20Im%C3%B3veis!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20lan%C3%A7amentos."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 hover:text-slate-950 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
            <a
              href="#empreendimentos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-all shadow-md hover:shadow-lg"
            >
              <span>Ver Lançamentos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu de navegação"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-drawer" className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-xl space-y-4">
            <div className="flex flex-col space-y-3 text-sm font-semibold uppercase tracking-wider text-slate-700">
              <a 
                href="#inicio" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 hover:text-amber-600"
              >
                Início
              </a>
              <a 
                href="#empreendimentos" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 hover:text-amber-600"
              >
                Empreendimentos (Mooca, Tatuapé, Vila Ema)
              </a>
              <a 
                href="#simulador" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 hover:text-amber-600"
              >
                Simulador de Financiamento
              </a>
              <a 
                href="#comparativo" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 hover:text-amber-600"
              >
                Comparativo de Bairros
              </a>
              <a 
                href="#diferenciais" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 hover:text-amber-600"
              >
                Diferenciais Muniz
              </a>
              <a 
                href="#contato" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-amber-600"
              >
                Fale Conosco
              </a>
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <a
                href="https://wa.me/5511987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 text-white text-center text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section (Professional Polish Design) */}
      <header 
        id="inicio" 
        className="relative bg-slate-950 text-white overflow-hidden py-20 lg:py-28"
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e293b 100%)'
        }}
      >
        {/* Geometric Blueprint Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-[0.25em] uppercase mb-6 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Exclusividade em São Paulo</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold tracking-tight text-white mb-6 leading-tight sm:leading-none">
              Transformando o seu conceito de <span className="text-amber-400 italic">viver e investir bem</span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              A <strong className="font-semibold text-white">Muniz Imóveis</strong> apresenta oportunidades exclusivas nos bairros mais valorizados da capital paulista: <strong>Mooca</strong>, <strong>Tatuapé</strong> e <strong>Vila Ema</strong>. Plantas inteligentes, lazer resort e condições especiais de lançamento.
            </p>

            {/* Quick Neighborhood Jump Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
              
              {/* Mooca Quick Card */}
              <a 
                href="#empreendimento-mooca"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-amber-500/80 hover:bg-slate-800/90 transition-all group backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Mooca</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm font-semibold text-white">Palazzo Mooca</p>
                <p className="text-xs text-slate-400">2 e 3 Dorms • 64 a 98m²</p>
              </a>

              {/* Tatuapé Quick Card */}
              <a 
                href="#empreendimento-tatuape"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-amber-500/80 hover:bg-slate-800/90 transition-all group backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Tatuapé</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm font-semibold text-white">Grand Tatuapé Privilège</p>
                <p className="text-xs text-slate-400">3 e 4 Suítes • Alto Padrão</p>
              </a>

              {/* Vila Ema Quick Card */}
              <a 
                href="#empreendimento-vila-ema"
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-amber-500/80 hover:bg-slate-800/90 transition-all group backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Vila Ema</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm font-semibold text-white">Reserva Vila Ema</p>
                <p className="text-xs text-slate-400">Studios, 2 e 3 Dorms • A 350m Metrô</p>
              </a>

            </div>

            {/* Main Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#empreendimentos"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 text-slate-950 text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>Conhecer Todos os Projetos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#simulador"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm font-semibold uppercase tracking-wider hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Simular Financiamento</span>
              </a>
            </div>

            {/* Quick Guarantees Pill Bar */}
            <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300 text-xs font-medium">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Entrada Facilitada no Período de Obras</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Assessoria de Financiamento 100% Gratuita</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Incorporadoras e Construtoras Homologadas</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Key className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Garantia de Preço Promocional de Lançamento</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Section: 3 Featured Developments with Form Links */}
      <section id="empreendimentos" className="py-20 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              Portfólio Selecionado
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-slate-900 mb-4">
              Nossos Lançamentos em Destaque
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Clique no empreendimento do seu interesse para preencher o <strong>formulário oficial de cadastro</strong>, receber plantas completas e garantir atendimento prioritário da equipe Muniz Imóveis.
            </p>

            {/* Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedNeighborhood('todos')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedNeighborhood === 'todos'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Todos os Bairros (3)
              </button>
              <button
                onClick={() => setSelectedNeighborhood('mooca')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedNeighborhood === 'mooca'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Mooca
              </button>
              <button
                onClick={() => setSelectedNeighborhood('tatuape')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedNeighborhood === 'tatuape'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Tatuapé
              </button>
              <button
                onClick={() => setSelectedNeighborhood('vila ema')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedNeighborhood === 'vila ema'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Vila Ema
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredDevelopments.map((dev) => (
              <div
                key={dev.id}
                id={`empreendimento-${dev.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image Header with Badges */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={dev.heroImage}
                    alt={dev.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 text-amber-400 border border-amber-500/40 backdrop-blur-md">
                      {dev.neighborhood}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-slate-900 backdrop-blur-md">
                      {dev.status}
                    </span>
                  </div>

                  {/* Title & Tagline Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                      {dev.badge}
                    </span>
                    <h3 className="text-xl font-bold font-serif-luxury leading-tight text-white">
                      {dev.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  
                  {/* Price & Typology Highlights */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                        Valores a partir de
                      </span>
                      <span className="text-xl font-bold text-slate-950">
                        {dev.priceFrom}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                        Previsão de Entrega
                      </span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center justify-end gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {dev.completionDate}
                      </span>
                    </div>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <div className="p-1">
                      <div className="flex items-center justify-center text-slate-500 mb-1">
                        <Maximize className="w-4 h-4 text-slate-700" />
                      </div>
                      <span className="text-[11px] text-slate-500 block">Metragem</span>
                      <span className="text-xs font-bold text-slate-800">{dev.area}</span>
                    </div>
                    <div className="p-1 border-x border-slate-200">
                      <div className="flex items-center justify-center text-slate-500 mb-1">
                        <BedDouble className="w-4 h-4 text-slate-700" />
                      </div>
                      <span className="text-[11px] text-slate-500 block">Dormitórios</span>
                      <span className="text-xs font-bold text-slate-800">{dev.bedrooms}</span>
                    </div>
                    <div className="p-1">
                      <div className="flex items-center justify-center text-slate-500 mb-1">
                        <Car className="w-4 h-4 text-slate-700" />
                      </div>
                      <span className="text-[11px] text-slate-500 block">Vagas</span>
                      <span className="text-xs font-bold text-slate-800">{dev.parking}</span>
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {dev.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Destaques do Condomínio:
                    </span>
                    {dev.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Location Metro Distance Indicator */}
                  {dev.metroDistance && (
                    <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 flex items-center gap-2 text-xs text-amber-900 font-medium">
                      <Train className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{dev.metroDistance}</span>
                    </div>
                  )}

                  {/* Action Buttons Section */}
                  <div className="pt-2 space-y-2.5">
                    
                    {/* PRIMARY ACTION: DIRECT LINK TO THE REQUESTED GOOGLE FORM */}
                    <a
                      href={dev.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 bg-slate-900 hover:bg-amber-600 text-white text-center text-xs font-bold uppercase tracking-widest transition-all rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                    >
                      <FileText className="w-4 h-4 text-amber-400 group-hover/btn:text-white transition-colors" />
                      <span>Preencher Formulário {dev.neighborhood}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    {/* Secondary Actions in Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setActiveDetailModal(dev);
                          setActiveGalleryIndex(0);
                        }}
                        className="py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-center text-xs font-semibold transition-all rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                        <span>Ver Plantas & Fotos</span>
                      </button>

                      <a
                        href={`https://wa.me/5511987654321?text=${encodeURIComponent(dev.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-center text-xs font-semibold transition-all rounded-lg flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    {/* Embed Modal Trigger Option */}
                    <button
                      onClick={() => setActiveFormModal(dev)}
                      className="w-full text-center text-[11px] text-slate-500 hover:text-amber-700 font-medium py-1 transition-colors underline cursor-pointer"
                    >
                      Abrir formulário nesta página
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Financing Simulator Section */}
      <section id="simulador" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Simulator Controls */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase block mb-2">
                  Planejamento Financeiro
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-slate-900 mb-4">
                  Simulador de Financiamento na Planta
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Descubra como fica o fluxo de pagamento para conquistar o seu imóvel no <strong>Tatuapé</strong>, <strong>Mooca</strong> ou <strong>Vila Ema</strong>. A entrada é facilitada durante o período de obras.
                </p>
              </div>

              {/* Simulator Card */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                
                {/* Select Property */}
                <div>
                  <label htmlFor="sim-property-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    1. Escolha o Empreendimento
                  </label>
                  <select
                    id="sim-property-select"
                    value={simProperty}
                    onChange={handleSimPropertyChange}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="mooca">Mooca — Palazzo Mooca (A partir de R$ 589.000)</option>
                    <option value="tatuape">Tatuapé — Grand Tatuapé Privilège (A partir de R$ 1.150.000)</option>
                    <option value="vila-ema">Vila Ema — Reserva Vila Ema (A partir de R$ 349.000)</option>
                  </select>
                </div>

                {/* Property Value Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="sim-property-val-range" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      2. Valor do Imóvel Estimado
                    </label>
                    <span className="text-base font-bold text-slate-950 font-mono">
                      {simPropertyValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <input
                    id="sim-property-val-range"
                    type="range"
                    min="300000"
                    max="3000000"
                    step="10000"
                    value={simPropertyValue}
                    onChange={(e) => setSimPropertyValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>R$ 300 mil</span>
                    <span>R$ 3 milhões</span>
                  </div>
                </div>

                {/* Down Payment % Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="sim-down-payment-range" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      3. Entrada Total ({simDownPaymentPercent}%)
                    </label>
                    <span className="text-sm font-bold text-amber-700 font-mono">
                      {downPaymentAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <input
                    id="sim-down-payment-range"
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={simDownPaymentPercent}
                    onChange={(e) => setSimDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>10% (Mínimo)</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Period Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sim-const-months-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Meses de Obra
                    </label>
                    <select
                      id="sim-const-months-select"
                      value={simConstructionMonths}
                      onChange={(e) => setSimConstructionMonths(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
                    >
                      <option value="24">24 meses (2 anos)</option>
                      <option value="36">36 meses (3 anos)</option>
                      <option value="42">42 meses (3,5 anos)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sim-term-months-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Prazo do Financiamento
                    </label>
                    <select
                      id="sim-term-months-select"
                      value={simTermMonths}
                      onChange={(e) => setSimTermMonths(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
                    >
                      <option value="240">20 anos (240 meses)</option>
                      <option value="360">30 anos (360 meses)</option>
                      <option value="420">35 anos (420 meses)</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Calculated Results Breakdown */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
                
                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  
                  <div className="border-b border-slate-800 pb-4">
                    <span className="text-amber-400 text-[11px] font-bold uppercase tracking-widest block">
                      Estimativa de Pagamento
                    </span>
                    <h3 className="text-xl font-bold font-serif-luxury text-white">
                      Condições Especiais na Planta
                    </h3>
                  </div>

                  {/* Installment 1: During Construction */}
                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 text-xs font-medium block mb-1">
                      Parcela Estimada Durante as Obras ({simConstructionMonths}x)
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">
                      {monthlyConstructionInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      <span className="text-xs font-normal text-slate-400">/mês</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      *Parte da entrada parcelada direto com a construtora
                    </span>
                  </div>

                  {/* Installment 2: After Delivery Financing */}
                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 text-xs font-medium block mb-1">
                      Financiamento Bancário nas Chaves ({simTermMonths} meses)
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                      {estimatedFinancingInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      <span className="text-xs font-normal text-slate-400">/mês</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Saldo financiado: {financedAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>

                  {/* Summary bullets */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Possibilidade de compor renda com até 3 pessoas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Aceita FGTS para amortizar entrada ou financiamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Assessoria gratuita Muniz Imóveis para aprovação</span>
                    </div>
                  </div>

                  {/* Send to WhatsApp CTA */}
                  <a
                    href={`https://wa.me/5511987654321?text=${encodeURIComponent(
                      `Olá Muniz Imóveis! Fiz uma simulação para o imóvel de ${simPropertyValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} com entrada de ${downPaymentAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}. Gostaria de validar as taxas com um consultor.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar Simulação para Corretor</span>
                  </a>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Neighborhood Comparison Section */}
      <section id="comparativo" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase block mb-2">
              Guia de Regiões
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-slate-900 mb-4">
              Mooca, Tatuapé ou Vila Ema: Qual combina com você?
            </h2>
            <p className="text-slate-600 text-sm">
              Cada bairro possui particularidades únicas de mobilidade, comércio, gastronomia e estilo de vida. Confira a tabela comparativa:
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Mooca Column */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-800">
                    Mooca
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Tradição & Gastronomia</span>
                </div>
                <h3 className="text-xl font-bold font-serif-luxury text-slate-900 mb-2">
                  Palazzo Mooca
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  O charme do bairro mais acolhedor de São Paulo com pizzarias históricas, ruas arborizadas e fácil acesso ao centro e à Av. Paulista.
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Perfil:</span>
                    <span className="font-semibold text-slate-800">Famílias & Casais</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Metragem:</span>
                    <span className="font-semibold text-slate-800">64m² a 98m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Dormitórios:</span>
                    <span className="font-semibold text-slate-800">2 a 3 Dorms (Suíte)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Mobilidade:</span>
                    <span className="font-semibold text-slate-800">Av. Paes de Barros / Metrô</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfGcPNzI-BDVPrRhaSJUVdQVouhiAaJ38581zNzHK8lJyxFjA/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Formulário Mooca</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Tatuapé Column */}
            <div className="bg-white rounded-2xl border-2 border-amber-500 p-6 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Alto Padrão
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-900 text-amber-400">
                    Tatuapé
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Luxo & Conveniência</span>
                </div>
                <h3 className="text-xl font-bold font-serif-luxury text-slate-900 mb-2">
                  Grand Tatuapé Privilège
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  O metro quadrado mais nobre e desejado da Zona Leste. Alta gastronomia na Rua Itapura, Shopping Anália Franco e Parque CERET.
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Perfil:</span>
                    <span className="font-semibold text-slate-800">Alto Padrão & Investidores</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Metragem:</span>
                    <span className="font-semibold text-slate-800">115m² a 180m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Dormitórios:</span>
                    <span className="font-semibold text-slate-800">3 e 4 Suítes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Mobilidade:</span>
                    <span className="font-semibold text-slate-800">Radial Leste / Metrô Tatuapé</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeQY0YL4q6HLMW5k8mFqVJGp3r2_UNI0cCWi9xbU0ALn7ooIg/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Formulário Tatuapé</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Vila Ema Column */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800">
                    Vila Ema
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Mobilidade & Custo-Benefício</span>
                </div>
                <h3 className="text-xl font-bold font-serif-luxury text-slate-900 mb-2">
                  Reserva Vila Ema
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Excelente valor por metro quadrado com conexão expressa via monotrilho São Lucas. Perfeito para primeiro imóvel e jovens famílias.
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Perfil:</span>
                    <span className="font-semibold text-slate-800">Primeiro Imóvel & Investidor</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Metragem:</span>
                    <span className="font-semibold text-slate-800">42m² a 76m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Dormitórios:</span>
                    <span className="font-semibold text-slate-800">Studios, 2 e 3 Dorms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Mobilidade:</span>
                    <span className="font-semibold text-slate-800">350m Estação São Lucas</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdw4ljd9q9BfpSrLCaSrGuXKXfCBs9NORQzCwjUtjG3fmcakA/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Formulário Vila Ema</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Muniz Imóveis (Diferenciais) */}
      <section id="diferenciais" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase block mb-2">
              Confiança & Tradição
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-slate-900 mb-4">
              Por que comprar seu imóvel com a Muniz Imóveis?
            </h2>
            <p className="text-slate-600 text-sm">
              Mais de uma década conectando famílias e investidores aos melhores lançamentos imobiliários de São Paulo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-amber-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Segurança Jurídica & CRECI
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consultoria credenciada com análise criteriosa de matrículas, certidões e contratos para garantir uma compra 100% segura.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-amber-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Aprovação Bancária Expressa
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Parceria direta com Caixa Econômica, Itaú, Santander e Bradesco para conseguir a menor taxa de juros e aprovação ágil.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-amber-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Tabela Zero & Lançamento
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Acesso antecipado às tabelas promocionais de primeira fase, garantindo maior margem de valorização até a entrega.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-amber-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Atendimento Humanizado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Corretores especialistas em cada bairro, disponíveis para visitas guiadas nos decorados e atendimento sob medida.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Direct Contact & Lead Form Section */}
      <section id="contato" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Contact info column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase block">
                Fale com Nossos Especialistas
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white leading-tight">
                Garanta sua unidade antes da abertura oficial de vendas
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Preencha o formulário para receber a apresentação completa em PDF, tabela de preços e agendamento exclusivo para conhecer os apartamentos decorados.
              </p>

              <div className="space-y-4 pt-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Endereço da Sede:</strong>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Central de Atendimento:</strong>
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Horário de Funcionamento:</strong>
                    <span>{COMPANY_INFO.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct Form Buttons for each development */}
              <div className="pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Ou acesse diretamente os formulários específicos:
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfGcPNzI-BDVPrRhaSJUVdQVouhiAaJ38581zNzHK8lJyxFjA/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <span>Formulário Mooca</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeQY0YL4q6HLMW5k8mFqVJGp3r2_UNI0cCWi9xbU0ALn7ooIg/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <span>Formulário Tatuapé</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdw4ljd9q9BfpSrLCaSrGuXKXfCBs9NORQzCwjUtjG3fmcakA/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <span>Formulário Vila Ema</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                </div>
              </div>

            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-6">
              <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md">
                
                <h3 className="text-xl font-bold font-serif-luxury text-white mb-2">
                  Solicitar Contato Imediato
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Preencha para receber atendimento via WhatsApp ou ligação em até 10 minutos.
                </p>

                {leadSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-600/50 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Solicitação Encaminhada!</h4>
                    <p className="text-xs text-emerald-200">
                      Nossa equipe de consultores já recebeu seus dados e entrará em contato via WhatsApp com os detalhes do empreendimento.
                    </p>
                    <button
                      onClick={() => setLeadSubmitted(false)}
                      className="text-xs text-amber-400 hover:underline pt-2 cursor-pointer"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDirectLeadSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="lead-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Seu Nome Completo *
                      </label>
                      <input
                        id="lead-name-input"
                        type="text"
                        required
                        placeholder="Ex: Carlos Eduardo Muniz"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="lead-phone-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          WhatsApp / Celular *
                        </label>
                        <input
                          id="lead-phone-input"
                          type="tel"
                          required
                          placeholder="(11) 99999-9999"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="lead-email-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          E-mail (Opcional)
                        </label>
                        <input
                          id="lead-email-input"
                          type="email"
                          placeholder="seuemail@exemplo.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lead-interest-select" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Empreendimento de Interesse *
                      </label>
                      <select
                        id="lead-interest-select"
                        value={leadInterest}
                        onChange={(e) => setLeadInterest(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="tatuape">Tatuapé — Grand Tatuapé Privilège</option>
                        <option value="mooca">Mooca — Palazzo Mooca</option>
                        <option value="vila-ema">Vila Ema — Reserva Vila Ema</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      <Send className="w-4 h-4" />
                      <span>Falar com Corretor Agora</span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center">
                      🔒 Seus dados estão seguros e não enviamos spam.
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase block mb-2">
              Dúvidas Frequentes
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-slate-900">
              Perguntas sobre Compra na Planta
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-slate-900 border border-amber-500/40 rounded flex items-center justify-center">
                  <span className="text-amber-500 font-brand text-xl font-bold">M</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-white uppercase font-serif-luxury">
                  Muniz Imóveis
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {COMPANY_INFO.tagline}
              </p>
              <p className="text-xs text-amber-400 font-semibold">
                {COMPANY_INFO.creci}
              </p>
            </div>

            {/* Column 2: Direct Forms Links */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                Formulários de Interesse
              </span>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfGcPNzI-BDVPrRhaSJUVdQVouhiAaJ38581zNzHK8lJyxFjA/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Lançamento Mooca</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeQY0YL4q6HLMW5k8mFqVJGp3r2_UNI0cCWi9xbU0ALn7ooIg/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Lançamento Tatuapé</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdw4ljd9q9BfpSrLCaSrGuXKXfCBs9NORQzCwjUtjG3fmcakA/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Lançamento Vila Ema</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Navigation */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                Navegação
              </span>
              <ul className="space-y-2">
                <li><a href="#inicio" className="hover:text-amber-400 transition-colors">Início</a></li>
                <li><a href="#empreendimentos" className="hover:text-amber-400 transition-colors">Empreendimentos</a></li>
                <li><a href="#simulador" className="hover:text-amber-400 transition-colors">Simulador de Parcelas</a></li>
                <li><a href="#comparativo" className="hover:text-amber-400 transition-colors">Comparativo de Bairros</a></li>
                <li><a href="#diferenciais" className="hover:text-amber-400 transition-colors">Diferenciais Muniz</a></li>
                <li><a href="#contato" className="hover:text-amber-400 transition-colors">Atendimento VIP</a></li>
              </ul>
            </div>

            {/* Column 4: Contact info */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                Contato & Plantão
              </span>
              <p className="text-xs text-slate-400">{COMPANY_INFO.address}</p>
              <p className="text-xs text-slate-400 font-mono">{COMPANY_INFO.phone}</p>
              <p className="text-xs text-slate-400">{COMPANY_INFO.email}</p>
              <div className="pt-2">
                <a
                  href="https://wa.me/5511987654321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp de Plantão</span>
                </a>
              </div>
            </div>

          </div>

          {/* Legal Notice */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>
              &copy; {new Date().getFullYear()} Muniz Imóveis. Todos os direitos reservados. {COMPANY_INFO.creci}
            </p>
            <p className="text-center sm:text-right">
              Imagens meramente ilustrativas. Perspectivas artísticas sujeitas a alteração sem aviso prévio.
            </p>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/5511987654321?text=Ol%C3%A1%20Muniz%20Im%C3%B3veis!%20Estou%20na%20landing%20page%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20im%C3%B3veis."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Atendimento pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Plantão WhatsApp (11) 98765-4321
        </span>
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* IN-APP GOOGLE FORM MODAL VIEWER */}
      {activeFormModal && (
        <div 
          id="google-form-embed-modal"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveFormModal(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-3xl h-[85vh] max-h-[850px] shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-500 text-slate-950">
                  {activeFormModal.neighborhood}
                </span>
                <span className="text-sm font-bold truncate">
                  Formulário Oficial — {activeFormModal.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={activeFormModal.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <span>Abrir em Nova Aba</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => setActiveFormModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Iframe */}
            <div className="flex-1 bg-slate-50 relative">
              <iframe
                src={activeFormModal.formUrl}
                title={`Formulário de Interesse - ${activeFormModal.name}`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            {/* Modal Footer Fallback */}
            <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Se o formulário não carregar acima, abra diretamente pelo Google Forms:</span>
              <a
                href={activeFormModal.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>Acessar Link Externo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL & GALLERY MODAL */}
      {activeDetailModal && (
        <div 
          id="property-detail-modal"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveDetailModal(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                  {activeDetailModal.neighborhood} • {activeDetailModal.badge}
                </span>
                <h3 className="text-xl font-bold font-serif-luxury">
                  {activeDetailModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Photo Showcase Carousel */}
              <div>
                <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-slate-900 mb-3">
                  <img
                    src={activeDetailModal.gallery[activeGalleryIndex]?.url || activeDetailModal.heroImage}
                    alt={activeDetailModal.gallery[activeGalleryIndex]?.title || activeDetailModal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white font-medium">
                    {activeDetailModal.gallery[activeGalleryIndex]?.title}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {activeDetailModal.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeGalleryIndex === idx ? 'border-amber-600 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Specs Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Área Privativa</span>
                  <span className="text-sm font-bold text-slate-900">{activeDetailModal.area}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Dormitórios</span>
                  <span className="text-sm font-bold text-slate-900">{activeDetailModal.bedrooms}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Suítes</span>
                  <span className="text-sm font-bold text-slate-900">{activeDetailModal.suites}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Vagas de Garagem</span>
                  <span className="text-sm font-bold text-slate-900">{activeDetailModal.parking}</span>
                </div>
              </div>

              {/* Full Description & Amenities */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Sobre o Empreendimento
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeDetailModal.description}
                </p>
              </div>

              {/* Floor Plans Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Opções de Plantas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeDetailModal.floorPlans.map((plan, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{plan.name}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">{plan.size}</span>
                      </div>
                      <p className="text-xs text-slate-600">{plan.specs}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Amenities */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Áreas de Lazer e Conveniência
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDetailModal.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Bottom CTAs */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div>
                <span className="text-xs text-slate-500 block">Valores a partir de</span>
                <span className="text-xl font-bold text-slate-950">{activeDetailModal.priceFrom}</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={activeDetailModal.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial py-3 px-6 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Preencher Formulário de Interesse</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
