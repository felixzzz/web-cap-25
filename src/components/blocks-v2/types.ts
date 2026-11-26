export type Locale = "en" | "id"

export interface HeroBannerData {
  eyebrow_en?: string
  eyebrow_id?: string
  title_en: string
  title_id: string
  background_image: string
  alt_en?: string
  alt_id?: string
}

export interface TwoColumnDefinitionData {
  title_en: string
  title_id: string
  paragraphs_en: string[]
  paragraphs_id: string[]
}

export interface PillarItem {
  id: string
  nav_label_en: string
  nav_label_id: string
  badge_label_en?: string
  badge_label_id?: string
  banner_image: string
  cta_label_en: string
  cta_label_id: string
  cta_url: string
  description_en: string
  description_id: string
}

export interface PillarSectionData {
  section_title_en: string
  section_title_id: string
  items: PillarItem[]
}

export interface TabItem {
  id: string
  label_en: string
  label_id: string
  blocks: PageBlock[]
}

export interface TabSwitcherData {
  default_tab?: string
  tabs: TabItem[]
}

export interface AsterHighlightCardData {
  brand?: string
  title_en: string
  title_id: string
  description_en: string
  description_id: string
  cta_label_en: string
  cta_label_id: string
  cta_url: string
  products: string[]
}

export interface ProductGridItem {
  title: string
  subtitle_en: string
  subtitle_id: string
  image: string
  cta_label_en: string
  cta_label_id: string
  cta_url: string
}

export interface ProductGridData {
  title_en: string
  title_id: string
  items: ProductGridItem[]
}

export interface ProductionFlowData {
  title_en: string
  title_id: string
  description_en: string
  description_id: string
  interactive_slug?: string
}

export interface FacilityGridItem {
  title: string
  description_en: string
  description_id: string
  image: string
}

export interface FacilitiesGridData {
  title_en: string
  title_id: string
  items: FacilityGridItem[]
}

export interface VideoSectionData {
  title_en: string
  title_id: string
  youtube_url: string
}

export interface ZigzagFeatureItem {
  title_en?: string
  title_id?: string
  description_en: string
  description_id: string
  image: string
  image_position?: "left" | "right"
  cta_label_en?: string
  cta_label_id?: string
  cta_url?: string
}

export interface ZigzagFeatureListData {
  title_en?: string
  title_id?: string
  items: ZigzagFeatureItem[]
}

export interface CtaBannerData {
  brand?: "chandra-asri" | "aster" | "cdi" | "cass" | string
  title_en: string
  title_id: string
  description_en: string
  description_id: string
  cta_label_en: string
  cta_label_id: string
  cta_url: string
  background_image: string
}

export type PageBlock =
  | { id: string; type: "hero_banner"; data: HeroBannerData }
  | { id: string; type: "two_column_definition"; data: TwoColumnDefinitionData }
  | { id: string; type: "pillar_section"; data: PillarSectionData }
  | { id: string; type: "tab_switcher"; data: TabSwitcherData }
  | { id: string; type: "aster_highlight_card"; data: AsterHighlightCardData }
  | { id: string; type: "product_grid"; data: ProductGridData }
  | { id: string; type: "production_flow"; data: ProductionFlowData }
  | { id: string; type: "facilities_grid"; data: FacilitiesGridData }
  | { id: string; type: "video_section"; data: VideoSectionData }
  | { id: string; type: "zigzag_feature_list"; data: ZigzagFeatureListData }
  | { id: string; type: "cta_banner"; data: CtaBannerData }
