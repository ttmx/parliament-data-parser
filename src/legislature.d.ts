export type Legislature = {
    DataFimleg:                  null;
    DataInicioleg:               Date;
    IniAnexos:                   IniAnexo[] | null;
    IniAutorDeputados:           IniAutorDeputado[] | null;
    IniAutorGruposParlamentares: IniAutorGruposParlamentare[] | null;
    IniAutorOutros:              IniAutorOutros;
    IniciativasEuropeias:        null;
    IniciativasOrigem:           null;
    IniciativasOriginadas:       null;
    IniDescTipo:                 DescTipo;
    IniEpigrafe:                 null;
    IniEventos:                  IniEvento[];
    IniId:                       string;
    IniLeg:                      IniLeg;
    IniLinkTexto:                string;
    IniNr:                       string;
    IniObs:                      null | string;
    IniSel:                      string;
    IniTextoSubst:               IniTextoSubst;
    IniTextoSubstCampo:          null | string;
    IniTipo:                     IniTipo;
    IniTitulo:                   string;
    Links:                       null;
    Peticoes:                    Peticoe[] | null;
    PropostasAlteracao:          null;
}

export type IniAnexo = {
    anexoFich: string;
    anexoNome: string;
}

export type IniAutorDeputado = {
    GP:         Gp;
    idCadastro: string;
    nome:       string;
}

export enum Gp {
    Be = "BE",
    CdsPp = "CDS-PP",
    Ch = "CH",
    IL = "IL",
    L = "L",
    MIGUELARRUDANinsc = "MIGUEL ARRUDA (Ninsc)",
    PS = "PS",
    Pan = "PAN",
    Pcp = "PCP",
    Psd = "PSD",
}

export type IniAutorGruposParlamentare = {
    GP: Gp;
}

export type IniAutorOutros = {
    iniAutorComissao: null | string;
    nome:             Nome;
    sigla:            Sigla;
}

export enum Nome {
    AssembleiaLegislativaDaRegiãoAutónomaDOSAçores = "Assembleia Legislativa da Região Autónoma dos Açores",
    AssembleiaLegislativaDaRegiãoAutónomaDaMadeira = "Assembleia Legislativa da Região Autónoma da Madeira",
    Cidadãos = "Cidadãos",
    Comissões = "Comissões",
    Deputados = "Deputados",
    Governo = "Governo",
    GruposParlamentares = "Grupos Parlamentares",
    Par = "PAR",
}

export enum Sigla {
    A = "A",
    C = "C",
    D = "D",
    G = "G",
    M = "M",
    R = "R",
    V = "V",
    Z = "Z",
}

export enum DescTipo {
    ApreciaçãoParlamentar = "Apreciação Parlamentar",
    InquéritoParlamentar = "Inquérito Parlamentar",
    ProjetoDeDeliberação = "Projeto de Deliberação",
    ProjetoDeLei = "Projeto de Lei",
    ProjetoDeResolução = "Projeto de Resolução",
    PropostaDeLei = "Proposta de Lei",
    PropostaDeResolução = "Proposta de Resolução",
}

export type IniEvento = {
    ActId:                null | string;
    ActividadesConjuntas: null;
    AnexosFase:           IniAnexo[] | null;
    CodigoFase:           string;
    Comissao:             Comissao[] | null;
    DataFase:             Date;
    EvtId:                string;
    Fase:                 Fase;
    IniciativasConjuntas: SConjunta[] | null;
    Intervencoesdebates:  Intervencoesdebate[] | null;
    Links:                null;
    ObsFase:              null | string;
    OevId:                string;
    OevTextId:            null | string;
    PcpublicasConjuntas:  null;
    PeticoesConjuntas:    SConjunta[] | null;
    PublicacaoFase:       Publicacao[] | null;
    RecursoDeputados:     null;
    RecursoGP:            Gp[] | null;
    TextosAprovados:      null | string;
    Votacao:              Votacao[] | null;
}

export type Comissao = {
    AccId:                        string;
    AguardaAgendamentoPlenario:   null;
    Audicoes:                     Audi[] | null;
    Audiencias:                   Audi[] | null;
    Competente:                   Competente;
    DataAgendamentoDiscussao:     null;
    DataAgendamentoPlenario:      Date;
    DataDistribuicao:             Date;
    DataDistruibuicaoSubcomissao: null;
    DataEntrada:                  null;
    DatafimApreciacaoPublica:     Date | null;
    DatainicioApreciacaoPublica:  Date | null;
    DataMotivoNaoParecer:         null;
    DataRelatorio:                null;
    DataRemessa:                  null;
    DataReqAgendamentoPlenario:   null;
    DistribuicaoSubcomissao:      null;
    Documentos:                   Documento[] | null;
    GpAgendamentoPlenario:        null;
    IdComissao:                   string;
    Legislatura:                  null;
    MotivoNaoParecer:             null;
    Nome:                         string;
    Numero:                       string;
    Observacao:                   null;
    PareceresRecebidos:           null;
    PedidosParecer:               null;
    Prorrogado:                   null;
    Publicacao:                   Publicacao[] | null;
    PublicacaoRelatorio:          Publicacao[] | null;
    Relatores:                    Relatore[] | null;
    RemessaRedaccaoFinal:         null;
    Remessas:                     Remessa[] | null;
    Sessao:                       null;
    Sigla:                        null;
    Votacao:                      Votacao[] | null;
}

export type Audi = {
    data: Date;
    id:   string;
    tipo: Tipo;
}

export enum Tipo {
    Aud = "AUD",
    Aup = "AUP",
}

export enum Competente {
    N = "N",
    S = "S",
}

export type Documento = {
    DataDocumento:   Date;
    TipoDocumento:   TipoDocumento;
    TituloDocumento: string;
    URL:             string;
}

export enum TipoDocumento {
    Informação = "Informação",
    Link = "Link",
    NotaTécnica = "Nota técnica",
    Outro = "Outro",
    Parecer = "Parecer",
    ParecerAP = "Parecer AP",
    PropostaDeAlteração = "Proposta de alteração",
    QuadroComparativo = "Quadro comparativo",
    RedaçãoFinal = "Redação final",
    Relatório = "Relatório",
    RequerimentosAP = "Requerimentos AP",
    TextoDeSubstituição = "Texto de Substituição",
    TextoFinal = "Texto final",
}

export type Publicacao = {
    debateDtReu:        null;
    idAct:              null;
    idDeb:              null;
    idInt:              null | string;
    idPag:              null | string;
    obs:                null | string;
    pag:                string[] | null;
    pagFinalDiarioSupl: Supl | null;
    pubdt:              Date;
    pubLeg:             IniLeg;
    pubNr:              string;
    pubSL:              string;
    pubTipo:            PubTipo;
    pubTp:              PubTp;
    supl:               Supl | null;
    URLDiario:          string;
}

export enum Supl {
    The1ºSupl = "1º Supl.",
    The2ºSupl = "2º Supl.",
}

export enum IniLeg {
    Xiv = "XIV",
    Xv = "XV",
    Xvi = "XVI",
}

export enum PubTipo {
    DARIISérieA = "DAR II série A",
    DARIISérieB = "DAR II série B",
    DARIISérieC = "DAR II série C",
    DARIISérieE = "DAR II série E",
    DARISérie = "DAR I série",
    DRIISérieB = "DR II série B",
    DarIiSOe = "DAR II S -OE",
    Separata = "Separata",
}

export enum PubTp {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    H = "H",
    L = "L",
    S = "S",
    V = "V",
}

export type Relatore = {
    dataCessacao:   null;
    dataNomeacao:   null;
    gp:             Gp;
    id:             string;
    motivoCessacao: null;
    nome:           string;
}

export type Remessa = {
    dataDocumento: Date | null;
    dataRemessa:   Date | null;
    numeroOficio:  null | string;
    observacoes:   null | string;
    tipoRemessa:   TipoRemessa;
}

export enum TipoRemessa {
    Informação = "Informação",
    RedaçãoFinal = "Redação Final",
    RelatórioParecer = "Relatório/Parecer",
    Súmula = "Súmula",
    TextoFinal = "Texto Final",
}

export type Votacao = {
    ausencias:   Gp[] | null;
    data:        Date;
    descricao:   null | string;
    detalhe:     null | string;
    id:          string;
    publicacao:  Publicacao[] | null;
    resultado:   Resultado;
    reuniao:     string;
    tipoReuniao: TipoReuniao | null;
    unanime:     Unanime | null;
}

export enum Resultado {
    Aprovado = "Aprovado",
    Rejeitado = "Rejeitado",
}

export enum TipoReuniao {
    Cp = "CP",
    Rp = "RP",
}

export enum Unanime {
    Unanime = "unanime",
}

export enum Fase {
    Admissão = "Admissão",
    AdmissãoPropostaDeAlteração = "Admissão Proposta de Alteração",
    AdmissãoPropostaDeAlteraçãoDecreto = "Admissão Proposta de Alteração decreto",
    Anúncio = "Anúncio",
    Apreciação = "Apreciação",
    ApreciaçãoDeDecretoLei = "Apreciação de Decreto-Lei",
    AudiçãoPromovidaPeloPARParaAALRAA = "Audição promovida pelo PAR para a ALRAA",
    AudiçãoPromovidaPeloPARParaAALRAM = "Audição promovida pelo PAR para a ALRAM",
    AudiçãoPromovidaPeloPARParaOGovernoDaRAA = "Audição promovida pelo PAR para o Governo da RAA",
    AudiçãoPromovidaPeloPARParaOGovernoDaRAM = "Audição promovida pelo PAR para o Governo da RAM",
    BaixaComissãoDistribuiçãoInicialGeneralidade = "Baixa comissão distribuição inicial generalidade",
    BaixaComissãoEspecialidade = "Baixa comissão especialidade",
    BaixaComissãoParaDiscussão = "Baixa comissão para discussão",
    Concluída = "Concluída",
    Decreto2ªVersãoPublicação = "Decreto (2ª versão) (Publicação)",
    DecretoPublicação = "Decreto (Publicação)",
    DeliberaçãoPublicaçãoDAR = "Deliberação (Publicação DAR)",
    DespachoAdmissibilidadePAR = "Despacho admissibilidade PAR",
    DiscussãoEspecialidade = "Discussão especialidade",
    DiscussãoGeneralidade = "Discussão generalidade",
    Entrada = "Entrada",
    EnvioINCM = "Envio INCM",
    EnvioINCMParaPreparaçãoDoAutógrafo = "Envio INCM para preparação do autógrafo",
    EnvioParaPromulgação = "Envio para promulgação",
    EnvioParaPromulgação2ªVersão = "Envio para promulgação (2ª versão)",
    EnvioParaRatificaçãoAssinatura = "Envio para Ratificação / Assinatura",
    EnvioÀComissãoParaFixaçãoDaRedaçãoFinal = "Envio à Comissão para fixação da Redação final",
    IniciativaCaducada = "Iniciativa Caducada",
    LeiPublicaçãoDR = "Lei (Publicação DR)",
    NovaApreciaçãoComissãoGeneralidade = "Nova apreciação comissão generalidade",
    NovaBaixaComissãoParaDiscussão = "Nova Baixa Comissão para Discussão",
    NãoAdmissão = "Não admissão",
    ParecerDaALRAA = "Parecer da ALRAA",
    ParecerDaALRAM = "Parecer da ALRAM",
    ParecerDoGovernoDaRAA = "Parecer do Governo da RAA",
    ParecerDoGovernoDaRAM = "Parecer do Governo da RAM",
    Promulgação = "Promulgação",
    Promulgação2ªVersão = "Promulgação (2ª versão)",
    Publicação = "Publicação",
    PublicaçãoEmSeparata = "Publicação em Separata",
    ReapreciaçãoDoDecreto = "Reapreciação do decreto",
    Referenda = "Referenda",
    Referenda2ªVersão = "Referenda (2ª versão)",
    Requerimento = "Requerimento",
    RequerimentoAvocaçãoPlenário = "Requerimento avocação plenário",
    RequerimentoBaixaComissãoSemVotaçãoGeneralidade = "Requerimento Baixa Comissão sem Votação (Generalidade)",
    RequerimentoDeAdiamentoDeVotação = "Requerimento de adiamento de Votação",
    RequerimentoDeAdiamentoDeVotaçãoGeneralidade = "Requerimento de adiamento de Votação (Generalidade)",
    RequerimentoDispensaDoPrazoPrevistoArtº157RAR = "Requerimento dispensa do prazo previsto Artº 157 RAR",
    RequerimentoDispensaRedaçãoFinal = "Requerimento dispensa redação final",
    ResoluçãoDaARPublicaçãoDR = "Resolução da AR (Publicação DR)",
    ResoluçãoPublicaçãoDAR = "Resolução (Publicação DAR)",
    RetiradaDaIniciativa = "Retirada da iniciativa",
    VetoLeitura = "Veto (Leitura)",
    VetoPublicação = "Veto (Publicação)",
    VetoReceção = "Veto (Receção)",
    VotaçãoDeliberação = "Votação Deliberação",
    VotaçãoFinalGlobal = "Votação final global",
    VotaçãoGlobal = "Votação global",
    VotaçãoNaEspecialidade = "Votação na especialidade",
    VotaçãoNaGeneralidade = "Votação na generalidade",
    VotaçãoNovoDecreto = "Votação novo decreto",
}

export type SConjunta = {
    dataEntrada: null;
    descTipo:    DescTipo | null;
    id:          string;
    leg:         IniLeg;
    nr:          string;
    sel:         string;
    tipo:        IniTipo | null;
    titulo:      string;
}

export enum IniTipo {
    A = "A",
    D = "D",
    I = "I",
    J = "J",
    P = "P",
    R = "R",
    S = "S",
}

export type Intervencoesdebate = {
    dataReuniaoPlenaria: Date;
    oradores:            Oradore[] | null;
}

export type Oradore = {
    convidados:     Convidados;
    deputados:      null;
    faseDebate:     null;
    faseSessao:     IniTipo;
    horaInicio:     TimeHHMM;
    horaTermo:      TimeHHMM;
    linkVideo:      LinkVideo[] | null;
    membrosGoverno: MembrosGoverno;
    publicacao:     Publicacao[];
    sumario:        string;
    teor:           null;
}

export type Convidados = {
    cargo: null;
    honra: null;
    nome:  null;
    pais:  null;
}

export type LinkVideo = {
    link: string;
}

export type MembrosGoverno = {
    cargo:   null | string;
    governo: Governo | null;
    nome:    null | string;
}

export enum Governo {
    XxivGovernoConstitucional = "XXIV GOVERNO CONSTITUCIONAL",
}

export enum IniTextoSubst {
    Nao = "NAO",
    Sim = "SIM",
}

export type Peticoe = {
    assunto:     string;
    dcl:         null;
    descTipo:    null;
    id:          string;
    legislatura: IniLeg;
    numero:      string;
    sessao:      string;
    tipo:        null;
}

// Digits
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

// Hours
type HourTens = '0' | '1';
type HourUnits = Digit;
type Hour1x = '2';
type Hour2x = '0' | '1' | '2' | '3';

type Hour =
  | `${HourTens}${HourUnits}`           // 00–19
  | `${Hour1x}${Hour2x}`;               // 20–23

// Minutes
type MinuteTens = '0' | '1' | '2' | '3' | '4' | '5';
type MinuteUnits = Digit;
type Minute = `${MinuteTens}${MinuteUnits}`;

// Final template
type TimeHHMM = `${Hour}:${Minute}`;