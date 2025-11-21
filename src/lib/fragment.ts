export type FragmentCtaButton = {
  cta_label: string | null
  cta_url: string | null
}

export type FragmentDocument = {
  document_type_en: string
  document_type_id: string
  document_en: {
    path: string
  }
  document_id: {
    path: string
  }
}

export type PostCategory = {
  id: number
  type: string
  name: string
  name_en: string
  slug: string
  slug_en: string
  description: string | null
  description_en: string | null
}

type AuthorAdmin = {
  name: string
  avatar: string
}

type MetaData = {
  meta_title: string | null
  meta_description: string | null
  meta_keyword: string | null
}

type MetaPost = {
  categories?: {
    [key: string]: string
  }
  article_content: {
    status_en: string
    status_id: string
    content_en: string
    content_id: string
  }
  seo_meta: {
    meta_tag_id: string
    meta_desc_id: string
    seo_text_id: string
    meta_tag_en: string
    meta_desc_en: string
    seo_text_en: string
  }
}

type Pivot = {
  post_id: number
  category_id: number
}

type Category = {
  id: number
  name: string
  name_en: string
  slug_en: string
  slug: string
  pivot: Pivot
}

export type CategoryDocument = {
  id: string
  name_id: string
  name_en: string
  deleted_at: string
  updated_at: string
  page: string
  section: string
}

export type ProductChemical = {
  id: string
  title: string
  title_en: string
  slug: string
  template: string | null
}

export type Post = {
  id: number
  post_type: string | null
  template: string | null
  title: string
  slug: string
  slug_en: string
  title_en: string
  type: string
  excerpt: string | null
  image: string
  featured: string
  created_at: string
  updated_at: string
  published_at: string
  status: string
  view_count: number
  author: string | null
  author_admin: AuthorAdmin
  meta_data: MetaData
  meta: MetaPost
  category: Category[]
  tag: string
  storage_url: string
  alt_image: string
  alt_image_en: string
}

export type PostNews = {
  slug_en: null
  id: number
  author: string | null
  template: string
  title: string
  title_en: string
  slug: string
  post_type: string
  type: string
  excerpt: any
  content: any
  featured: string
  image: string
  created_at: string
  updated_at: string
  status: string
  view_count: number
  meta_data: MetaData
  category: Category[]
  published_at: string
  meta: {
    categories?: string[]
    news_content: {
      status_id: string
      content_id: string
      status_en: string
      content_en: string
    }
    blog_content: {
      status_id: string
      content_id: string
      status_en: string
      content_en: string
    }
    seo_meta: SeoMeta
  }
  author_admin: AuthorAdmin
  alt_image: string
  alt_image_en: string
}

export type PostManagement = {
  id: number
  post_type: string
  template: string
  title: string
  slug: string
  title_en: string
  slug_en: string
  type: string
  excerpt: string
  image: string
  featured: string
  created_at: string
  updated_at: string
  status: string
  view_count: number
  author: string | null
  author_admin: AuthorAdmin
  meta_data: MetaData
  meta: {
    list: {
      category: string
      name_id: string
      name_en: string
      position_id: string
      position_en: string
      picture_id: string
      picture_en: string
      cv_id: {
        path: string
      }
      cv_en: {
        path: string
      }
      description_id: string
      description_en: string
      document_list_id: {
        title: string
        format: string
        cv: string
      }[]
      document_list_en: {
        title: string
        format: string
        cv: string
      }[]
    }
  }
  category: any[]
  tag: string
  storage_url: string
}

export type SeoMeta = {
  seo_text_id: string
  meta_tag_en: string
  meta_desc_en: string
  seo_text_en: string
  meta_title_id: string
  meta_title_en: string
  meta_tag_id: string
  meta_desc_id: string
}

export type NewsCategory = {
  id: number
  type: string
  name: string
  name_en: string
  slug: string
  slug_en: string
  description: string
  description_en: string
}

export type MetaSearchItem = {
  id: number | null
  type: string | null
  title_id: string | null
  title_en: string | null
  slug: string | null
  site_url: string | null
  category: string | null
  section: string | null
  published_at: string | null
  author: string | null
  publisher: string | null
  release_year: string | null
  meta: {
    section: string
    key: string
    value: string
  }[]
  meta_result: any[]
  document_file_id: string | null
  document_file_en: string | null
  image: string | null
}

export type MetaTopics = {
  id: number
  name: string
  name_en: string
  slug: string
  slug_en: string
  description: string
  description_en: string
  active_posts_count: number
}

export type MetaIntro = {
  status_id: string | null
  status_en: string | null
  description_id: string | null
  description_en: string | null
  title_id: string | null
  title_en: string | null
  image_id: string
  image_en: string
}

export type MetaCover = {
  status_id: string | null
  status_en: string | null
  small_title_id: string | null
  small_title_en: string | null
  title_id: string | null
  title_en: string | null
  description_id: string | null
  description_en: string | null
  image_mobile_id: string | null
  image_mobile_en: string | null
  image_desktop_id: string | null
  image_desktop_en: string | null
  vide_id?: {
    path: string
  } | null
  vide_en?: {
    path: string
  } | null
  alt_text_image_mobile_id: string
  alt_text_image_mobile_en: string
  alt_text_image_desktop_id: string
  alt_text_image_desktop_en: string
  logo_id?: string
  logo_en?: string
  alt_text_logo_id?: string
  alt_text_logo_en?: string
}

type Subsidiary = {
  title: string
}

export type CategoryBusinessLine = {
  small_title: string
  logo: string
  small_title_subsidiary: string
  subsidiary_list: Subsidiary[]
  title: string
}

export type BusinessLineItem = {
  status: string
  icon: string
  title: string
  description: string
  image: string
  cta_url: string
  categories: CategoryBusinessLine[]
  logo: string
  cta_label: string
  small_title: string
}

export type MetaBusinessLine = {
  status_id: string
  status_en: string
  list_id: BusinessLineItem[]
  list_en: BusinessLineItem[]
}

export type MetaHomeIntro = {
  status_id: string
  title_id: string
  description_id: string
  discover_id: {
    title: string
    subtitle: string
    url: string
    image: string
  }[]
  status_en: string
  title_en: string
  description_en: string
  discover_en: {
    title: string
    subtitle: string
    url: string
    image: string
  }[]
  label_discover_id: string
  label_discover_en: string
}

export type MetaHomeBusinessSolutions = {
  status_id: string
  title_id: string
  description_id: string
  status_en: string
  title_en: string
  description_en: string
  card_id: {
    title: string
    description: string
    cta_label: string
    image: string
    cta_url: string
  }[]
  card_en: {
    title: string
    description: string
    cta_label: string
    image: string
    cta_url: string
  }[]
}

export type MetaHomeInNumbers = {
  status_id: string
  title_id: string
  description_id: string
  numbers_id: { title: string; small_title: string }[]
  cta_label_id: string
  cta_url_id: string
  cta_label2_id: string
  cta_url2_id: string
  status_en: string
  title_en: string
  description_en: string
  numbers_en: { title: string; small_title: string }[]
  cta_label_en: string
  cta_url_en: string
  cta_label2_en: string
  cta_url2_en: string
}

export type MetaHomeFinancialReport = {
  status_id: string
  title_id: string
  info_id: string
  status_en: string
  title_en: string
  info_en: string
}

export type MetaHomeSmallBanner = {
  status_id: string
  logo_id: string
  title_id: string
  description_id: string
  cta_label_id: string
  cta_url_id: string
  status_en: string
  logo_en: string
  title_en: string
  description_en: string
  cta_label_en: string
  cta_url_en: string
}

export type MetaHomeNews = {
  status_id: string
  section_title_id: string
  title_id: string
  status_en: string
  section_title_en: string
  title_en: string
}

export type MetaHomeQuicklink = {
  status_id: string
  title_id: string
  image_id: string
  list_id: {
    title: string
    url: string
  }[]
  status_en: string
  title_en: string
  image_en: string
  list_en: { title: string; url: string }[]
  section_title_id: string | null
  section_title_en: string | null
  alt_text_id: string
  alt_text_en: string
}

export type ContentItem = {
  status: string | null
  image_position: "left" | "right"
  title: string | null
  description: string | null
  image: string | null
  cta_label: string | null
  cta_url: string | null
}

export type MetaContentLeftRight = {
  status_id: string | null
  status_en: string | null
  list_en: ContentItem[]
  list_id: ContentItem[]
}

export type IconListHorizontalItem = {
  status: string | null
  icon: string | null
  title: string | null
  description: string | null
}

export type MetaIconListHorizontal = {
  status_id: string | null
  status_en: string | null
  title_id: string | null
  title_en: string | null
  description_id: string | null
  description_en: string | null
  list_id: IconListHorizontalItem[]
  list_en: IconListHorizontalItem[]
}

export type MetaSmallBannerLangItem = {
  status_id: string
  title_id: string
  description_id: string
  cta_label_id: string
  cta_url_id: string
  logo_id: string
  status_en: string
  title_en: string
  description_en: string
  cta_label_en: string
  cta_url_en: string
  logo_en: string
}

export type SmallBannerItem = {
  status: string
  logo: string
  title: string
  description: string
  cta_label: string
  cta_url: string
}

export type MetaSmallBanner = {
  status_id: string | null
  status_en: string | null
  title_id: string | null
  title_en: string | null
  list_id: SmallBannerItem[]
  list_en: SmallBannerItem[]
}

export type MetaNews = {
  status_id: string | null
  status_en: string | null
  section_title_id: string | null
  section_title_en: string | null
  title_id: string | null
  title_en: string | null
}

export type MetaNewsDetail = {
  id: number
  post_type: string
  template: string
  title: string
  slug: string
  title_en: string
  slug_en: string
  type: string
  excerpt: string
  image: string
  featured: string
  created_at: string
  updated_at: string
  status: string
  view_count: number
  author: {
    name: string
    avatar: string
  }
  author_admin: {
    name: string
    avatar: string
  }
  meta_data: MetaData
  meta: MetaPost
  category: Category[]
  tag: string
  storage_url: string
}

export type MetaQuickLink = {
  status_id: string | null
  status_en: string | null
  title_id: string | null
  title_en: string | null
  image_id: string | null
  image_en: string | null
}

export type MetaProductionFlow = {
  status_id: string | null
  title_id: string | null
  description_id: string | null
  big_image_id: string | null
  big_image2_id: string | null
  status_en: string | null
  title_en: string | null
  description_en: string | null
  big_image_en: string | null
  big_image2_en: string | null
  alt_text_big_image_en: string
  alt_text_big_image_id: string
  alt_text_big_image2_en: string
  alt_text_big_image2_id: string
}

export type MetaImageTextSocial = {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  status_en: string
  title_en: string
  description_en: string
  image_en: string
  list_id: Array<{
    icon: string
    title: string
    description: string
  }>
  list_en: Array<{
    icon: string
    title: string
    description: string
  }>
}

export type MetaSmallBannerSocial = {
  status_id: string
  title_id: string
  description_id: string
  cta_label_id: string
  cta_url_id: string
  logo_id: string
  status_en: string
  title_en: string
  description_en: string
  cta_label_en: string
  cta_url_en: string
  logo_en: string
}

export type MetaDocument = {
  status_id: string | null
  title_id: string | null
  document_title_id: string | null
  document_desc_id: string | null
  document_id: string | null
  status_en: string | null
  title_en: string | null
  document_title_en: string | null
  document_desc_en: string | null
  document_en: string | null
}

type DocumentCategory = {
  id: number
  name_id: string
  name_en: string
  deleted_at: string | null
  created_at: string
  updated_at: string
  page: string
  section: string
}

export type MetaDocumentItem = {
  id: number
  category?: DocumentCategory
  category_id?: string
  page?: string
  section?: string
  document_name_id?: string
  document_name_en?: string
  document_type?: string
  document_file_id?: string
  document_file_en?: string
  image?: string
  published_at?: string
  deleted_at?: string | null
  created_at?: string
  updated_at?: string
  description_id?: string
  description_en?: string
  language?: string
  author?: string
  publisher?: string
  release_year?: number
  pages?: number
  format?: string
  itemLanguage?: string
}

export type MetaContentBlock = {
  status_id: string
  title_id: string
  description_id: string
  status_en: string
  title_en: string
  description_en: string
}

export type MetaDisclaimerContent = {
  status_id: string
  title_id: string
  description_id: string
  status_en: string
  title_en: string
  description_en: string
}

export type MetaCopyrightContent = {
  status_id: string
  title_id: string
  description_id: string
  status_en: string
  title_en: string
  description_en: string
}

type MetaProductItem = {
  status: string | null
  title: string | null
  description: string | null
  image: string | null
  product: string
} & FragmentCtaButton

export type MetaProducts = {
  status_id: string | null
  title_id: string | null
  list_id: MetaProductItem[]
  status_en: string | null
  title_en: string | null
  list_en: MetaProductItem[]
}

type ProductDatasheet = {
  status: string | null
  sidebarmenu_title: string | null
  title: string | null
  description: string | null
  image: string | null
  card_title: string | null
  delivery_method: string | null
  application: string | null
  datasheet_name: string | null
  datasheet_file: string | null
  datasheet_name2: string | null
  datasheet_file2: string | null
  upload: string | null
}

export type ProductDatasheetDetail = {
  status: string
  sidebarmenu_title: string
  title: string
  description: string
  image: string
  file: string
}

export type ProductDatasheet2 = {
  status: string | null
  list: ProductDatasheetDetail[]
}

export type MetaProductDatasheet2 = {
  status_id: string | null
  status_en: string | null
  title_id: string | null
  title_en: string | null
  datasheet_list_id: ProductDatasheet2[]
  datasheet_list_en: ProductDatasheet2[]
}

export type MetaProductDatasheet = {
  status_id: string | null
  status_en: string | null
  title_id: string | null
  title_en: string | null
  datasheet_list_id: ProductDatasheet[]
  datasheet_list_en: ProductDatasheet[]
}

type FrameworkFile = {
  title: string | null
  document: string | null
}

type FrameworkDetail = {
  initial_letter: string | null
  description: string | null
  icon: string | null
}

export type MetaFramework = {
  status_id: string
  title_id: string
  description_id: string
  file_id: FrameworkFile[]
  image_id: string
  framework_id: FrameworkDetail[]
  status_en: string
  title_en: string
  description_en: string
  file_en: FrameworkFile[]
  image_en: string
  framework_en: FrameworkDetail[]
}

type Rating = {
  publish: string
  title: string
  logo: string
  description: string
  score: string
  score_description: string
  short_description: string
}

type Recognition = {
  publish: string
  title: string
  logo: string
  description: string
}

export type MetaEvaluation = {
  status_id: string
  title_id: string
  description_id: string
  rating_id: Rating[]
  eecognition_id: Recognition[]
  status_en: string
  title_en: string
  description_en: string
  rating_en: Rating[]
  eecognition_en: Recognition[]
}

export type MetaPoint = {
  status_id: string
  title_id: string
  description_id: string
  small_title_id: string
  list_poin_id: {
    title: string
    description: string
    image: string
  }[]
  status_en: string
  title_en: string
  description_en: string
  small_title_en: string
  list_poin_en: {
    title: string
    description: string
    image: string
  }[]
  small_description_id: string
  small_description_en: string
}

export type MetaPointGoveranance = {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  list_id: {
    title: string
    description: string
  }[]
  status_en: string
  title_en: string
  description_en: string
  image_en: string
  list_en: {
    title: string
    description: string
  }[]
}

export type MetaImageText = {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  small_label_id: string
  cta_label_id: string
  cta_url_id: string
  status_en: string
  title_en: string
  description_en: string
  image_en: string
  small_label_en: string
  cta_label_en: string
  cta_url_en: string
}

export type MetaProcurement = {
  status_id: string
  title_id: string
  description_id: string
  list_id: {
    icon: string
    description: string
  }[]
  status_en: string
  title_en: string
  description_en: string
  list_en: {
    icon: string
    description: string
  }[]
}

export type ProgramSocialItem = {
  title: string
  icon: string
  intro: string
  description: string
}

export type MetaPointImage = {
  status_id: string
  title_id: string
  description_id: string
  small_title_id: string
  image_id: string
  list_poin_id: {
    icon: string
    title: string
    description: string
  }[]
  status_en: string
  title_en: string
  description_en: string
  small_title_en: string
  image_en: string
  list_poin_en: {
    icon: string
    title: string
    description: string
  }[]
}

export type MetaInNumbers = {
  status_id: string
  title_id: string
  description_id: string
  numbers_id: {
    number: string
    title: string
    small_title: string
    icon?: string
  }[]
  status_en: string
  title_en: string
  description_en: string
  numbers_en: {
    number: string
    title: string
    small_title: string
    icon?: string
  }[]
}

export type MetaInNumbersSocial = {
  status_id: string
  title_id: string
  description_id: string
  performance_id: {
    title: string
    subtitle: string
    value: string
  }[]
  status_en: string
  title_en: string
  description_en: string
  performance_en: {
    title: string
    subtitle: string
    value: string
  }[]
}

export type ProgramItem = {
  title: string
  subtitle: string
  value: string
  cta_label: string
  cta_url: string
  content_popup: string
  icon: string
}

export type MetaAboutAwards = {
  status_id: string
  list_id: { award_title: string; year: string; image: string }[]
  status_en: string
  list_en: { award_title: string; year: string; image: string }[]
}

export type MetaAboutCertification = {
  status_id: string
  list_id: {
    certification_title: string
    year: string
    image: string
    description: string
  }[]
  status_en: string
  list_en: {
    certification_title: string
    year: string
    image: string
    description: string
  }[]
}

export type MetaAboutVissionMission = {
  status_id: string
  mision_title_id: string
  mision_description_id: string
  mision_image_id: string
  vission_title_id: string
  vision_description_id: string
  visson_image_id: string
  status_en: string
  mision_title_en: string
  mision_description_en: string
  mision_image_en: string
  vission_title_en: string
  vision_description_en: string
  visson_image_en: string
  alt_text_mission_id: string
  alt_text_mission_en: string
  alt_text_vission_id: string
  alt_text_vission_en: string
}

export type MetaAboutCoreValues = {
  status_id: string
  title_id: string
  value_id: {
    title: string
    description: string
    image: string
  }[]
  status_en: string
  title_en: string
  value_en: {
    title: string
    description: string
    image: string
  }[]
}

export type MetaAboutMilestone = {
  status_id: string
  small_title_id: string
  title_id: string
  list_id: {
    year: string
    description: string
    image1: string
    image2: string
    alt_text1: string
    alt_text2: string
  }[]
  status_en: string
  small_title_en: string
  title_en: string
  list_en: {
    year: string
    description: string
    image1: string
    image2: string
    alt_text1: string
    alt_text2: string
  }[]
}

export type MetaAboutDownload = {
  status_id: string
  title_id: string
  list_id: {
    title: string
    subtitle: string
    file: string
  }[]
  status_en: string
  title_en: string
  list_en: {
    title: string
    subtitle: string
    file: string
  }[]
}

export type MetaAboutManagement = {
  status_id: string
  category_id: { category_title: string }[]
  status_en: string
  category_en: { category_title: string }[]
}

export type MetaAboutStructure = {
  status_id: string
  organization_title_id: string
  organization_image_id: string
  organization_updated_date_id: string
  corperate_title_id: string
  corperate_image_id: string
  corperate_updated_date_id: string
  table_title_id: string
  content_id: string
  list_id: {
    title: string
    subtitle: string
    file: string
  }[]
  status_en: string
  organization_title_en: string
  organization_image_en: string
  organization_updated_date_en: string
  corperate_title_en: string
  corperate_image_en: string
  corperate_updated_date_en: string
  table_title_en: string
  content_en: string
  list_en: {
    title: string
    subtitle: string
    file: string
  }[]
  alt_text_image_organization_id: string
  alt_text_image_corperate_id: string
  alt_text_image_organization_en: string
  alt_text_image_corperate_en: string
}

export type MetaContactUsBanner = {
  status_id: string
  image_mobile_id: string
  image_desktop_id: string
  title_id: string
  head_office_name_id: string
  head_office_label_id: string
  head_office_address_id: string
  phone_id: string
  fax_id: string
  status_en: string
  image_mobile_en: string
  image_desktop_en: string
  title_en: string
  head_office_name_en: string
  head_office_label_en: string
  head_office_address_en: string
  phone_en: string
  fax_en: string
}

export type MetaContactUsCompanyOffice = {
  status_id: string
  title_id: string
  list_company_id: {
    company_name: string
    subtitle: string
    office: {
      title: string
      address: string
      phone: string
      fax: string
    }[]
  }[]
  status_en: string
  title_en: string
  list_company_en: {
    company_name: string
    subtitle: string
    office: {
      title: string
      address: string
      phone: string
      fax: string
    }[]
  }[]
}

export type MetaInvestorOverviewContent = {
  status_id: string
  content_id: string
  status_en: string
  content_en: string
}

export type MetaInvestorCard = {
  title_en: string
  title_id: string
  status_id: string
  list_id: {
    title: string
    subtitle: string
    address: string
    contact1: string
    contact2: string
  }[]
  status_en: string
  list_en: {
    title: string
    subtitle: string
    address: string
    contact1: string
    contact2: string
  }[]
}

export type MetaInvestorContent = {
  status_id: string
  list_id: {
    status: string
    title: string
    list: {
      title: string
      content: string
    }[]
  }[]
  status_en: string
  list_en: {
    status: string
    title: string
    list: {
      title: string
      content: string
    }[]
  }[]
}

export type MetaGovernanceCorporateSecretary = {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  position_id: string
  file_title_id: string
  file_id: {
    path: string
  }
  name_id: string
  name_en: string
  status_en: string
  title_en: string
  description_en: string
  image_en: string
  position_en: string
  file_title_en: string
  file_en: {
    path: string
  }
  popup_description_id: string
  popup_description_en: string
  cv_id: {
    path: string
  }
  cv_en: {
    path: string
  }
}

export type MetaGovernanceInternalAudit = {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  file_title_id: string
  file_id: {
    path: string
  }
  status_en: string
  title_en: string
  description_en: string
  image_en: string
  file_title_en: string
  file_en: {
    path: string
  }
}

export type MetaGovernanceCommittee = {
  status_id: string
  title_id: string
  description_id: string
  category_id: {
    status: string
    title_committee: string
    description: string
    file_title: string
    file: string
    title: string
    subtitle: string
    members: {
      name: string
      position: string
      picture: string
    }[]
  }[]
  status_en: string
  title_en: string
  description_en: string
  category_en: {
    status: string
    title_committee: string
    description: string
    file_title: string
    file: string
    title: string
    subtitle: string
    members: {
      name: string
      position: string
      picture: string
    }[]
  }[]
}

export type MetaGovernanceRiskManagement = {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  status_en: string
  title_en: string
  description_en: string
  image_en: string
  file_title_id: string
  file_id: {
    path: string
  }
  file_title_en: string
  file_en: {
    path: string
  }
}

export type MetaGovernanceCodeConduct = {
  status_id: string
  title_id: string
  description_id: string
  image_id: string
  position_id: string
  file_title_id: string
  file_id: {
    path: string
  }
  status_en: string
  title_en: string
  description_en: string
  image_en: string
  position_en: string
  file_title_en: string
  file_en: {
    path: string
  }
}

export type MetaGovernancePolicy = {
  status_id: string
  title_id: string
  description_id: string
  status_en: string
  title_en: string
  description_en: string
}

export type MetaGovernanceRegulation = {
  status_id: string
  title_id: string
  description_id: string
  status_en: string
  title_en: string
  description_en: string
}

export type MetaGovernanceWhistleblowing = {
  status_id: string
  title_id: string
  description_id: string
  list_id: {
    status: string
    title: string
    complaint_handling: {
      status: string
      title_step: string
    }[]
  }[]
  status_en: string
  title_en: string
  description_en: string
  complaint_handling_title_id: string
  complaint_handling_title_en: string
  list_en: {
    status: string
    title: string
    complaint_handling: {
      status: string
      title_step: string
    }[]
  }[]
  complaint_handling_en: {
    status: string
    title_step: string
  }[]
  complaint_handling_id: {
    status: string
    title_step: string
  }[]
}

export type MetaFinancialCalendar = {
  status_id: string
  title_id: string
  status_en: string
  title_en: string
}

export type MetaProduct = {
  id: number
  post_type: any
  template: any
  title: string
  slug: string
  title_en: string
  type: string
  excerpt: any
  image: string
  featured: string
  created_at: string
  updated_at: string
  status: string
  view_count: number
  author: any
  author_admin: {
    name: string
    avatar: string
  }
  meta_data: MetaData
  meta: {
    categories: any
    banner: {
      status_id: string
      small_title_id: string
      title_id: string
      image_mobile_id: string
      image_desktop_id: string
      status_en: string
      small_title_en: string
      title_en: string
      image_mobile_en: string
      image_desktop_en: string
      thumbnail_image_id: string
      thumbnail_desc_id: string
      thumbnail_image_en: string
      thumbnail_desc_en: string
      alt_text_thumbnail_image_id: string
      alt_text_image_mobile_id: string
      alt_text_image_desktop_id: string
      alt_text_thumbnail_image_en: string
      alt_text_image_mobile_en: string
      alt_text_image_desktop_en: string
    }
    product_datasheet: ProductDatasheet
    seo_meta: SeoMeta
    product_datasheet2: ProductDatasheet2
  }
  category: Category[]
  tag: string
  storage_url: string
}

export type SmallPopup = {
  status_id: string
  title_id: string
  description_id: string
  status_en: string
  title_en: string
  description_en: string
}

export type MetaEmbeddedVideo = {
  video_url_id?: string
  video_url_en?: string
}