/**
 * SaaS Auto Catálogo - Modelo Canônico de Veículos (CanonicalVehicle)
 * 
 * Este arquivo define os tipos, enums e interfaces TypeScript que representam
 * o modelo de dados canônico unificado do estoque automotivo.
 * 
 * Todos os adaptadores de ingestão (XMLs de AutoCerto, Altimus, Sisvag, BomControle,
 * Webmotors e Feeds REST/JSON como Base44 e Spice Digital) devem normalizar seus
 * dados para esta estrutura antes do processamento pela Diff Engine e exportação
 * para o catálogo Meta Automotive Inventory Ads (DAA).
 */

/**
 * Provedores de Origem do Feed / DMS
 */
export enum FeedSourceType {
  AUTOCERTO = 'AUTOCERTO',
  ALTIMUS = 'ALTIMUS',
  SISVAG = 'SISVAG',
  BOMCONTROLE = 'BOMCONTROLE',
  WEBMOTORS = 'WEBMOTORS',
  BASE44 = 'BASE44',
  SPICE_DIGITAL = 'SPICE_DIGITAL',
  GENERIC_XML = 'GENERIC_XML',
  GENERIC_JSON = 'GENERIC_JSON',
  CUSTOM_API = 'CUSTOM_API'
}

/**
 * Tipos de Combustível Padronizados para o Mercado Brasileiro
 */
export enum FuelType {
  FLEX = 'FLEX',
  GASOLINA = 'GASOLINA',
  ETANOL = 'ETANOL',
  DIESEL = 'DIESEL',
  HIBRIDO = 'HIBRIDO',
  HIBRIDO_PLUG_IN = 'HIBRIDO_PLUG_IN',
  MHEV_HIBRIDO_LEVE = 'MHEV_HIBRIDO_LEVE',
  ELETRICO = 'ELETRICO',
  GNV = 'GNV',
  TETRAFUEL = 'TETRAFUEL',
  OUTRO = 'OUTRO'
}

/**
 * Tipos de Transmissão / Câmbio Padronizados
 */
export enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATICO = 'AUTOMATICO',
  AUTOMATIZADO = 'AUTOMATIZADO',
  CVT = 'CVT',
  DUPLA_EMBREAGEM = 'DUPLA_EMBREAGEM',
  SEMI_AUTOMATICO = 'SEMI_AUTOMATICO',
  OUTRO = 'OUTRO'
}

/**
 * Tipos de Carroceria (Body Style) compatíveis com o Meta DAA
 */
export enum BodyStyle {
  SUV = 'SUV',
  SEDAN = 'SEDAN',
  HATCHBACK = 'HATCHBACK',
  COUPE = 'COUPE',
  CONVERTIBLE = 'CONVERTIBLE',
  PICKUP = 'PICKUP',
  MINIVAN = 'MINIVAN',
  VAN = 'VAN',
  WAGON = 'WAGON',
  COMMERCIAL = 'COMMERCIAL',
  MOTORCYCLE = 'MOTORCYCLE',
  OTHER = 'OTHER'
}

/**
 * Condição do Veículo
 */
export enum VehicleCondition {
  NOVO = 'NOVO',
  SEMINOVO = 'SEMINOVO',
  USADO = 'USADO'
}

/**
 * Status de Disponibilidade do Veículo no Estoque
 */
export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD'
}

/**
 * Estrutura de Imagem do Veículo
 */
export interface VehicleImage {
  /** URL pública em HTTPS da imagem em alta resolução */
  url: string;
  /** URL em tamanho original ou alternativo fornecido pela CDN */
  fullUrl?: string;
  /** Ordem de exibição na galeria (1 = foto de capa / principal) */
  order: number;
  /** Indica se é a foto de capa do anúncio */
  isPrimary: boolean;
  /** Texto alternativo ou legenda da imagem */
  alt?: string;
}

/**
 * Detalhamento de Cores
 */
export interface VehicleColorInfo {
  /** Nome comercial da cor externa (ex: "Preto Obsidian Metálico", "Branco Polar") */
  exterior: string;
  /** Cor primária normalizada para filtros (ex: "Preto", "Branco", "Azul", "Prata", "Cinza", "Vermelho") */
  exteriorBase?: string;
  /** Descrição do acabamento interno / estofamento (ex: "Couro Preto / Cognac") */
  interior?: string;
}

/**
 * Detalhamento Comercial e Financeiro
 */
export interface VehiclePricing {
  /** Preço à vista anunciado em Reais (formato decimal: 489700.00) */
  price: number;
  /** Preço promocional ou de oferta com desconto em Reais (se houver) */
  promotionalPrice?: number;
  /** Código ISO da moeda (padrão 'BRL') */
  currency: 'BRL';
  /** Indica se o preço está sob consulta (veículos sem preço explícito não são exportados para o Meta DAA) */
  priceOnRequest: boolean;
}

/**
 * Metadados Técnicos de Ingestão e Rastreabilidade
 */
export interface IngestionMetadata {
  /** Provedor/DMS de onde o veículo foi extraído */
  source: FeedSourceType;
  /** Identificador ou URL do feed que gerou o registro */
  feedId?: string;
  /** Hash SHA-256 do payload bruto para detecção inteligente de alterações (Diff Engine) */
  rawPayloadHash: string;
  /** Data e hora ISO 8601 da primeira ingestão */
  ingestedAt: string;
  /** Data e hora ISO 8601 da última sincronização com alterações */
  updatedAt: string;
  /** Avisos de validação não-fatais gerados durante a normalização */
  validationWarnings?: string[];
}

/**
 * Modelo Canônico de Veículo (CanonicalVehicle)
 */
export interface CanonicalVehicle {
  // === 1. IDENTIFICAÇÃO E RASTREABILIDADE ===
  /** Identificador único canônico no banco de dados do SaaS (UUID v4) */
  id: string;
  /** ID do tenant / revenda proprietária do estoque (UUID v4) */
  workspaceId: string;
  /** Identificador único do veículo fornecido pelo DMS/Feed original (ex: "vid-12345", 104380, "AC-9871") */
  externalId: string;
  /** Número de Chassi (VIN) se disponível */
  vin?: string;
  /** Placa do veículo (normalizada no padrão Mercosul/Cinza, com ofuscação opcional) */
  licensePlate?: string;
  /** Código de estoque interno da revenda / SKU */
  stockNumber?: string;

  // === 2. CLASSIFICAÇÃO E MODELAGEM DO VEÍCULO ===
  /** Marca / Fabricante normalizado em caixa alta (ex: "MERCEDES-BENZ", "PORSCHE", "AUDI", "BYD", "VOLKSWAGEN") */
  make: string;
  /** Modelo principal do veículo (ex: "GLC 300", "911", "Q5", "Song Plus", "Corvette", "Gol") */
  model: string;
  /** Versão detalhada de acabamento e motorização (ex: "2.0 MHEV AMG LINE COUPÉ 4MATIC 9G-TRONIC") */
  version: string;
  /** Título formatado completo do anúncio (ex: "Mercedes-Benz GLC 300 AMG Line Coupé 2025/2026") */
  title: string;
  /** Tipo de carroceria normalizado */
  bodyStyle: BodyStyle;
  /** Ano de fabricação (ex: 2024, 2025) */
  manufactureYear: number;
  /** Ano do modelo (ex: 2025, 2026) */
  modelYear: number;
  /** Quantidade de portas (geralmente 2 ou 4) */
  doors: number;
  /** Informações de cores externa e interna */
  colors: VehicleColorInfo;
  /** Quilometragem rodada em km (inteiro >= 0; 0 para veículos novos) */
  mileage: number;

  // === 3. TREM DE FORÇA E ESPECIFICAÇÕES MECÂNICAS ===
  /** Tipo de combustível normalizado */
  fuelType: FuelType;
  /** Tipo de transmissão normalizado */
  transmission: TransmissionType;
  /** Cilindrada do motor em cm³ ou litros (ex: "2.0", "3.0 V6", "6.2 V8", ou 1999) */
  engineSize?: string;
  /** Potência informada em cv / hp (ex: 258, 550, 830) */
  horsepower?: number;
  /** Tipo de tração (ex: "4x2", "4x4", "AWD", "4MATIC", "RWD", "FWD") */
  drivetrain?: string;
  /** Indica se o veículo é blindado */
  armored: boolean;

  // === 4. INFORMAÇÕES COMERCIAIS E DISPONIBILIDADE ===
  /** Estrutura de precificação do veículo */
  pricing: VehiclePricing;
  /** Condição do veículo (Novo, Seminovo ou Usado) */
  condition: VehicleCondition;
  /** Status do anúncio no estoque */
  status: VehicleStatus;
  /** Indica se possui garantia de fábrica ou garantia da loja */
  hasWarranty?: boolean;
  /** Texto ou prazo da garantia (ex: "Garantia de Fábrica até 2028") */
  warrantyDetails?: string;
  /** URL canônica da página do anúncio no site da revenda */
  canonicalUrl?: string;

  // === 5. CONTEÚDO MULTIMÍDIA E FOTOS ===
  /** Array de imagens ordenadas (mínimo 1 imagem válida em HTTPS para exportação ao Meta Ads DAA) */
  images: VehicleImage[];
  /** URL da imagem principal de capa em alta resolução */
  heroImageUrl: string;

  // === 6. OPCIONAIS, ACESSÓRIOS E EQUIPAMENTOS ===
  /** Lista normalizada de códigos de opcionais (ex: ["AR_CONDICIONADO", "BANCOS_COURO", "TETO_SOLAR", "CAMERA_360"]) */
  features: string[];
  /** Lista textual bruta de opcionais exibida ao cliente */
  rawOptions?: string[];

  // === 7. TEXTOS DESCRITIVOS E OBSERVAÇÕES ===
  /** Descrição sanitizada e formatada para o catálogo Meta Ads DAA (máx. 5000 caracteres) */
  description: string;
  /** Ficha técnica detalhada ou notas internas da revenda */
  notes?: string;

  // === 8. METADADOS DE INGESTÃO E AUDITORIA ===
  /** Metadados de controle de sincronização */
  metadata: IngestionMetadata;
}
