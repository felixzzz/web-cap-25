import {
  MetaContentLeftRight,
  MetaBusinessLine,
  MetaCover,
  MetaIconListHorizontal,
  MetaIntro,
  MetaNews,
  MetaQuickLink,
  MetaSmallBanner,
  MetaProductionFlow,
  MetaDocument,
  MetaHomeBusinessSolutions,
  MetaHomeInNumbers,
  MetaHomeFinancialReport,
  MetaHomeSmallBanner,
  MetaHomeNews,
  MetaHomeQuicklink,
  MetaHomeIntro,
  MetaDisclaimerContent,
  MetaCopyrightContent,
  MetaProducts,
  MetaProductDatasheet,
  MetaFramework,
  MetaEvaluation,
  MetaAboutAwards,
  MetaAboutCertification,
  MetaPoint,
  MetaPointImage,
  MetaSmallBannerLangItem,
  MetaInNumbers,
  ProgramItem,
  FragmentDocument,
  MetaPointGoveranance,
  ProgramSocialItem,
  MetaInNumbersSocial,
  MetaImageText,
  MetaProcurement,
  MetaAboutVissionMission,
  MetaAboutCoreValues,
  MetaAboutDownload,
  MetaAboutMilestone,
  MetaAboutManagement,
  MetaAboutStructure,
  MetaContactUsBanner,
  MetaContactUsCompanyOffice,
  MetaInvestorOverviewContent,
  MetaInvestorCard,
  MetaInvestorContent,
  MetaImageTextSocial,
  MetaSmallBannerSocial,
  MetaGovernanceCorporateSecretary,
  MetaGovernanceInternalAudit,
  MetaGovernanceCommittee,
  MetaGovernanceRiskManagement,
  MetaGovernanceCodeConduct,
  MetaGovernancePolicy,
  MetaGovernanceWhistleblowing,
  SeoMeta,
  MetaProductDatasheet2,
  MetaFinancialCalendar,
  MetaGovernanceRegulation,
  MetaEmbeddedVideo,
} from "./fragment"

export type HttpHandlerResponse<T> = {
  success: string
  data: T
}

export type PaginationHandlerResponse<T> = {
  current_page: number
  data: T
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: { url: string | null; label: string; active: boolean }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export type HttpGeneralResponse<T> = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  published_at: string | null
  meta_seo_title: string | null
  meta_seo_description: string | null
  meta_keyword: string | null
  meta: T
  storage_url: string
}

export type BodyContactUs = {
  type?: string
  firstname?: string
  lastname?: string
  email?: string
  country?: string
  topic_id?: string
  message?: string
}

export type HomeProps = {
  banner?: MetaCover
  intro?: MetaHomeIntro
  business_solution?: MetaHomeBusinessSolutions
  in_numbers?: MetaHomeInNumbers
  financial_report?: MetaHomeFinancialReport
  small_banner?: MetaHomeSmallBanner
  news?: MetaHomeNews
  quicklink?: MetaHomeQuicklink
}

export type OurBusinessProps = {
  banner?: MetaCover
  intro?: MetaIntro
  business_line?: MetaBusinessLine
}

export type ReportsAndPublicationsProp = {
  banner?: MetaCover
  document?: {
    status_en: string
    status_id: string
  }
}

export type BusinessSolutionsProp = {
  banner?: MetaCover
  content_left_right?: MetaContentLeftRight
  content_left_right2?: MetaContentLeftRight
  content_left_right_2?: MetaContentLeftRight
  icon_list_horizontal?: MetaIconListHorizontal
  small_banner?: MetaSmallBanner
  news?: MetaNews
  quicklink?: MetaQuickLink
  seo_meta?: SeoMeta
  contant_tab: BusinessSolutionsContentTab
  environmental_performance?: MetaInNumbers
  circular_economy_tabs?: CircularEconomyTabsMap
  policy_performance?: MetaInNumbers
  policy_items?: { items_en?: CircularEconomyTabItem[]; items_id?: CircularEconomyTabItem[] }
  end_to_end_performance?: MetaInNumbers
  end_to_end_items?: { items_en?: CircularEconomyTabItem[]; items_id?: CircularEconomyTabItem[] }
  technology_performance?: MetaInNumbers
  technology_items?: { items_en?: CircularEconomyTabItem[]; items_id?: CircularEconomyTabItem[] }
}

export type CircularEconomyTabItem = {
  status: string
  title: string
  image: string
  description: string
  cta_label: string
  cta_url: string
}

export type CircularEconomyTabData = {
  performance?: MetaInNumbers
  items?: CircularEconomyTabItem[]
}

export type CircularEconomyTabsMap = {
  policy: CircularEconomyTabData
  "end-to-end": CircularEconomyTabData
  technology: CircularEconomyTabData
}

export type ChemicalSolutionsProps = {
  banner?: MetaCover
  intro?: MetaIntro
  production_flow?: MetaProductionFlow
  document?: MetaDocument
  product?: MetaProducts
  facilities?: MetaProducts
  embedded_video?: MetaEmbeddedVideo
}

export type EnvironmentPageProps = {
  banner?: MetaCover
  intro?: MetaIntro & {
    program_id: ProgramItem[]
    program_en: ProgramItem[]
  }
  image_text?: MetaIntro
  small_banner?: MetaSmallBannerLangItem
  point?: MetaPoint
  point_image?: MetaPointImage
  in_numbers?: MetaInNumbers
}

type InformationCard = {
  number: string
  title: string
  description: string
}

export type MetaInformation = {
  status_id: string
  title_id: string
  description_id: string
  status_en: string
  title_en: string
  description_en: string
  card_id: InformationCard[]
  card_en: InformationCard[]
}

export type GovernancePageProps = {
  banner?: MetaCover
  intro?: MetaIntro & FragmentDocument
  point?: MetaPointGoveranance
  in_numbers?: MetaInNumbers
  image_text?: MetaImageText
  procurement?: MetaProcurement
  cyber_security?: MetaHomeBusinessSolutions
  information?: MetaInformation
  image_text2?: MetaImageText2
}

export type MetaHumanRight = {
  status_id: string
  title_id: string
  description_id: string
  small_description_id: string
  file_title_id: string
  file_id: {
    path: string
  }
  status_en: string
  title_en: string
  description_en: string
  small_description_en: string
  file_title_en: string
  file_en: {
    path: string
  }
}

export type SocialPageProps = {
  partnership_progrem: any
  banner?: MetaCover
  intro?: MetaIntro & {
    program_id: ProgramSocialItem[]
    program_en: ProgramSocialItem[]
  }
  in_numbers?: MetaInNumbersSocial
  image_text?: MetaImageTextSocial // temporary, because the backend is not ready yet
  small_banner?: MetaSmallBannerSocial // temporary, because the backend is not ready yet
  point?: MetaPoint
  point_image?: MetaPointImage
  human_right?: MetaHumanRight
}

export type DisclaimerProps = {
  disclaimer_content: MetaDisclaimerContent
  copyright_content: MetaCopyrightContent
}

export type DetailChemicalSolutionsProps = {
  banner?: MetaCover
  product_datasheet?: MetaProductDatasheet
  product_datasheet2: MetaProductDatasheet2
  seo_meta?: SeoMeta
  // product_datasheet3?: MetaProductDatasheet
}

export type SustainabilityProps = {
  banner?: MetaCover
  intro?: MetaIntro
  framework?: MetaFramework
  evaluation?: MetaEvaluation
}

export type AwardsProps = {
  banner?: MetaCover
  awards?: MetaAboutAwards
  certification?: MetaAboutCertification
}

export type WhoWeAreProps = {
  banner?: MetaCover
  intro?: MetaIntro
  vision_mission?: MetaAboutVissionMission
  in_numbers?: MetaHomeInNumbers
  core_values?: MetaAboutCoreValues
  milestone?: MetaAboutMilestone
  download?: MetaAboutDownload
}

export type ManagementAndStructureProps = {
  banner?: MetaCover
  management?: MetaAboutManagement
  download?: MetaAboutDownload
  structure?: MetaAboutStructure
}

export type ContactUsProps = {
  banner?: MetaContactUsBanner
  company_office?: MetaContactUsCompanyOffice
}

export type InvestorProps = {
  banner?: MetaCover
  intro?: MetaIntro
  overview_content?: MetaInvestorOverviewContent
  card?: MetaInvestorCard
  financial_calendar?: MetaFinancialCalendar
}

export type InvestorStocksAndBondsProps = {
  banner?: MetaCover
  investor_content?: MetaInvestorContent
}

export type GovernanceProps = {
  banner?: MetaCover
  corporate_secretary?: MetaGovernanceCorporateSecretary
  internal_audit?: MetaGovernanceInternalAudit
  committee?: MetaGovernanceCommittee
  risk_management?: MetaGovernanceRiskManagement
  code_conduct?: MetaGovernanceCodeConduct
  policy?: MetaGovernancePolicy
  whistleblowing?: MetaGovernanceWhistleblowing
  she_regulation?: MetaGovernanceRegulation
  seo_meta?: SeoMeta
}

export type WhistleblowingProps = {
  banner?: MetaCover
  seo_meta: SeoMeta
}

type Dynamic = {
  id: number
  title: string
  title_en: string
  template: string
  parent: number
  dynamic: string
  slug: string
}

export type DynamicProps = Dynamic & {
  children: Dynamic[]
}

export type MetaImageText2 = {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  status_en: string
  title_en: string
  description_en: string
  image_en: string
}

export type BusinessSolutionsContentTab = {
  status_id: string
  tab_id: {
    status: string
    title: string
    description: string
    list: {
      status: string
      title: string
      list: {
        status: string
        image: string
        description: string
      }[]
    }[]
  }[]
  status_en: string
  tab_en: {
    status: string
    title: string
    description: string
    list: {
      status: string
      title: string
      list: {
        status: string
        image: string
        description: string
      }[]
    }[]
  }[]
  title_id: string
  title_en: string
}

export type DocumentsCategories = {
  id: number
  sort: string
  name_id: string
  name_en: string
  deleted_at: string
  created_at: string
  updated_at: string
  page: string
  section: string
}

export type MetaContentPoint = {
  status_id: string
  title_id: string
  image_id: string
  description_id: string
  status_en: string
  title_en: string
  image_en: string
  description_en: string
}

export type ProductResponsibility = {
  banner?: MetaCover
  content_left_image?: ContentProductResponsibility
  contant_tab: BusinessSolutionsContentTab
  content_left_right_2?: MetaContentLeftRight
  icon_list_horizontal?: MetaIconListHorizontal
  small_banner?: MetaSmallBanner
  news?: MetaNews
  content_point?: MetaContentPoint
  seo_meta: SeoMeta
}

export type ContentProductResponsibility = {
  status_id: string
  title_id: string
  image_id: string
  list_id: [
    {
      status?: string
      order?: string
      title?: string
      description?: string
    },
  ]
  status_en: string
  title_en: string
  image_en: string
  list_en: [
    {
      status?: string
      order?: string
      title?: string
      description?: string
    },
  ]
  title2_id: string
  title2_en: string
  description_id: string
  description_en: string
}

export type MetaPraticesOfEmployment = {
  banner?: MetaCover
  content_left_image?: ContentProductResponsibility
  contant_tab: BusinessSolutionsContentTab
  content_left_right_2?: MetaContentLeftRight
  icon_list_horizontal?: MetaIconListHorizontal
  small_banner?: MetaSmallBanner
  news?: MetaNews
  content_point?: MetaContentPoint
  seo_meta: SeoMeta
}

export type MetaPracticeContent = {
  top_content?: ContentProductResponsibility
  bottom_content?: MetaContentPoint
}

export type EventPageProps = {
  banner?: MetaCover
  content_left_image?: ContentProductResponsibility
  content_left_right?: MetaContentLeftRight
  contant_tab?: BusinessSolutionsContentTab
  icon_list_horizontal?: MetaIconListHorizontal
  content_left_right_2?: MetaContentLeftRight
  small_banner?: MetaSmallBanner
  news?: MetaNews
  content_point?: MetaContentPoint
  seo_meta?: SeoMeta
}