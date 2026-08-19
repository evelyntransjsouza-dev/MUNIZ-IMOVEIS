export interface Development {
  id: string;
  name: string;
  neighborhood: 'Mooca' | 'Tatuapé' | 'Vila Ema';
  tagline: string;
  badge: string;
  priceFrom: string;
  typology: string;
  area: string;
  bedrooms: string;
  suites: string;
  parking: string;
  status: 'Lançamento Exclusivo' | 'Breve Lançamento' | 'Obras Aceleradas';
  completionDate: string;
  description: string;
  locationHighlights: string[];
  features: string[];
  formUrl: string;
  heroImage: string;
  gallery: { title: string; url: string }[];
  floorPlans: { name: string; size: string; specs: string; url: string }[];
  highlights: string[];
  metroDistance?: string;
  whatsappMessage: string;
}

export const DEVELOPMENTS: Development[] = [
  {
    id: 'mooca',
    name: 'Palazzo Mooca Residencial',
    neighborhood: 'Mooca',
    tagline: 'A perfeita união entre a tradição gastronômica e o requinte contemporâneo',
    badge: 'Tradição & Requinte',
    priceFrom: 'R$ 589.000',
    typology: '2 e 3 Dormitórios',
    area: '64m² a 98m²',
    bedrooms: '2 a 3 Dorms',
    suites: '1 a 2 Suítes',
    parking: '1 ou 2 Vagas Livres',
    status: 'Lançamento Exclusivo',
    completionDate: 'Dezembro / 2027',
    description: 'Localizado no coração da Mooca, o empreendimento traz arquitetura contemporânea inspirada no charme italiano. Apartamentos com varanda gourmet integrada à cozinha, piso nivelado e acabamentos nobres em um condomínio clube completo.',
    locationHighlights: [
      'A 3 min da tradicional Av. Paes de Barros',
      'Próximo ao Parque Mooca e Clube Juventus',
      'Fácil acesso ao Hospital São Cristóvão e Mooca Plaza Shopping',
      'Região com as melhores pizzarias e cantinas de SP'
    ],
    features: [
      'Piscina Climatizada com Deck Molhado',
      'Rooftop Lounge com Vista 360° da Cidade',
      'Espaço Gourmet com Churrasqueira e Forno de Pizza',
      'Fitness Center com Equipamentos High-End',
      'Coworking Privativo com Cabines de Reunião',
      'Pet Place equipado e Espaço Banho Pet',
      'Brinquedoteca e Playground Lúdico',
      'Portaria Blindada com Controle de Acesso Facial'
    ],
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfGcPNzI-BDVPrRhaSJUVdQVouhiAaJ38581zNzHK8lJyxFjA/viewform?usp=publish-editor',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        title: 'Fachada Noturna Iluminada',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Living Integrado com Varanda Gourmet',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Piscina com Deck Molhado',
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Suíte Master Aconchegante',
        url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80'
      }
    ],
    floorPlans: [
      {
        name: 'Planta Tipo 64m²',
        size: '64 m²',
        specs: '2 Dorms (1 Suíte) + Varanda Gourmet + 1 Vaga',
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Planta Família 98m²',
        size: '98 m²',
        specs: '3 Dorms (2 Suítes) + Varanda com Churrasqueira + 2 Vagas',
        url: 'https://images.unsplash.com/photo-1502005229762-ee1b2da97e06?auto=format&fit=crop&w=800&q=80'
      }
    ],
    highlights: ['Varanda com Churrasqueira a Carvão', 'Ponto para Carro Elétrico', 'Gerador de Energia para Áreas Comuns', 'Persianas de Enrolar 100% Blackout'],
    metroDistance: 'Estação Bresser-Mooca e Estação Juventus',
    whatsappMessage: 'Olá Muniz Imóveis! Gostaria de saber mais detalhes e agendar uma visita para o lançamento na MOOCA (Palazzo Mooca).'
  },
  {
    id: 'tatuape',
    name: 'Grand Tatuapé Privilège',
    neighborhood: 'Tatuapé',
    tagline: 'O ápice do luxo, sofisticação e imponência no bairro mais nobre da Zona Leste',
    badge: 'Alto Padrão & Exclusividade',
    priceFrom: 'R$ 1.150.000',
    typology: '3 e 4 Suítes',
    area: '115m² a 180m²',
    bedrooms: '3 a 4 Dorms',
    suites: '3 a 4 Suítes',
    parking: '2 a 3 Vagas + Depósito',
    status: 'Lançamento Exclusivo',
    completionDate: 'Outubro / 2027',
    description: 'Um marco arquitetônico no Tatuapé com torre única em terreno de 4.500m². Plantas generosas com hall social privativo, pé-direito duplo em ambientes sociais e uma área de lazer cinematográfica com assinatura de renomados designers.',
    locationHighlights: [
      'A 3 min do Shopping Anália Franco e Parque CERET',
      'Próximo aos melhores restaurantes do Tatuapé (Rua Itapura e Azevedo Soares)',
      'Acesso imediato à Radial Leste, Marginal Tietê e Av. Salim Farah Maluf',
      'Próximo a renomadas escolas: Santo Américo, Mary Ward e Agostiniano'
    ],
    features: [
      'Piscina Coberta Aquecida com Raia de 25 metros',
      'Complexo de Piscinas Exteriores com Bangalôs Privativos',
      'Quadra Oficial de Beach Tennis e Pickleball',
      'Espaço Gourmet com Adega Climatizada para Condôminos',
      'Academia de 250m² equipada com Linha Life Fitness',
      'Spa Completo com Sauna Seca, Úmida e Sala de Massagem',
      'Salão de Festas Nobre para até 120 convidados',
      'Vaga Box Fechada com Carregador Veicular Ultrarrápido'
    ],
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeQY0YL4q6HLMW5k8mFqVJGp3r2_UNI0cCWi9xbU0ALn7ooIg/viewform?usp=publish-editor',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        title: 'Fachada Imponente em Vidro e Alumínio',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Amplo Living Integrado com Pé-Direito Alto',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Spa & Sauna Relaxante',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Terraço Gourmet com Vista Noturna de SP',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80'
      }
    ],
    floorPlans: [
      {
        name: 'Planta Luxo 115m²',
        size: '115 m²',
        specs: '3 Suítes + Hall Social Privativo + 2 Vagas Determinadas',
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Planta Penthouse / Garden 180m²',
        size: '180 m²',
        specs: '4 Suítes + Terraço Gourmet Panorâmico + 3 Vagas + Depósito',
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    highlights: ['Fechadura Biométrica & Automação Residencial', 'Manta Acústica nas Lajes para Isolamento Sonoro', 'Gerador Full que atende 100% do Apartamento', 'Tomadas USB em todos os dormitórios'],
    metroDistance: 'A 5 min do Metrô Tatuapé & Shopping Metrô Boulevard',
    whatsappMessage: 'Olá Muniz Imóveis! Gostaria de receber a tabela de vendas e condições especiais do lançamento de alto padrão no TATUAPÉ (Grand Tatuapé).'
  },
  {
    id: 'vila-ema',
    name: 'Reserva Vila Ema Eco Living',
    neighborhood: 'Vila Ema',
    tagline: 'A harmonia ideal entre sustentabilidade, mobilidade urbana e conveniência',
    badge: 'Mobilidade & Sustentabilidade',
    priceFrom: 'R$ 349.000',
    typology: 'Studios, 2 e 3 Dormitórios',
    area: '42m² a 76m²',
    bedrooms: '1, 2 e 3 Dorms',
    suites: 'Opção com 1 Suíte',
    parking: 'Opções com e sem Vaga',
    status: 'Lançamento Exclusivo',
    completionDate: 'Março / 2027',
    description: 'Projeto moderno e inteligente focado no bem-estar e na economia inteligente. A apenas poucos passos do monotrilho, com área verde preservada, lazer no rooftop e fluxo de pagamento facilitado com entrada parcelada.',
    locationHighlights: [
      'A apenas 350 metros da Estação São Lucas (Linha 15-Prata)',
      'Fácil acesso à Av. Professor Luiz Ignácio Anhaia Mello e Av. Salim Farah Maluf',
      'Próximo a supermercados (Joanete, Assaí), farmácias e escolas conceituadas',
      'Região em forte valorização imobiliária com nova infraestrutura'
    ],
    features: [
      'Piscina Adulto e Infantil com Solarium Panorâmico',
      'Rooftop com Espaço Sunset & Cinema ao Ar Livre',
      'Salão de Jogos Integrado com Lounge Bar',
      'Espaço Grill com 2 Churrasqueiras e Forno de Pizza',
      'Mini Market Autônomo 24 Horas dentro do condomínio',
      'Bicicletário com Oficina e Ponto para Recarga de Bikes Elétricas',
      'Horta Comunitária Orgânica e Pomar de Frutíferas',
      'Lavanderia Coletiva OMO integrada ao aplicativo'
    ],
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdw4ljd9q9BfpSrLCaSrGuXKXfCBs9NORQzCwjUtjG3fmcakA/viewform?usp=publish-editor',
    heroImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        title: 'Conceito Eco-Moderno e Biofilia',
        url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Apartamento Decorado 2 Dormitórios',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Rooftop com Área de Convivência',
        url: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=900&q=80'
      },
      {
        title: 'Espaço Gourmet & Churrasqueira',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80'
      }
    ],
    floorPlans: [
      {
        name: 'Planta Studio / 1 Dorm 42m²',
        size: '42 m²',
        specs: 'Living Integrado + Varanda Grill + Opção de Vaga',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Planta Família 76m²',
        size: '76 m²',
        specs: '3 Dorms (1 Suíte) + Varanda com Ponto Grill + 1 Vaga',
        url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
      }
    ],
    highlights: ['Entrada Parcelada em até 36x', 'Uso do FGTS na Entrada e Financiamento', 'Painéis Solares para Redução do Condomínio', 'Reúso de Águas Pluviais para Jardins'],
    metroDistance: 'Apenas 350 metros da Estação São Lucas (Monotrilho)',
    whatsappMessage: 'Olá Muniz Imóveis! Quero receber a simulação de financiamento e condições da planta na VILA EMA (Reserva Vila Ema).'
  }
];

export const COMPANY_INFO = {
  name: 'Muniz Imóveis',
  legalName: 'Muniz Consultoria e Negócios Imobiliários Ltda.',
  creci: 'CRECI SP: 042.891-J',
  phone: '(11) 98765-4321',
  phoneFormatted: '+55 11 98765-4321',
  whatsappUrl: 'https://wa.me/5511987654321',
  email: 'contato@munizimoveis.com.br',
  address: 'Rua Cantagalo, 1.200 - Conjunto 84 - Tatuapé, São Paulo - SP',
  workingHours: 'Segunda a Sábado, das 08h às 20h | Domingo com horário agendado',
  tagline: 'Especialistas em lançamentos imobiliários de alta valorização na Zona Leste e Centro-Leste de São Paulo.'
};
