import React from "react"
import { Locale, PageBlock } from "./types"
import { HeroBannerBlock } from "./blocks/HeroBannerBlock"
import { TwoColumnDefinitionBlock } from "./blocks/TwoColumnDefinitionBlock"
import { PillarSectionBlock } from "./blocks/PillarSectionBlock"
import { TabSwitcherBlock } from "./blocks/TabSwitcherBlock"
import { AsterHighlightCardBlock } from "./blocks/AsterHighlightCardBlock"
import { ProductGridBlock } from "./blocks/ProductGridBlock"
import { ProductionFlowBlock } from "./blocks/ProductionFlowBlock"
import { FacilitiesGridBlock } from "./blocks/FacilitiesGridBlock"
import { VideoSectionBlock } from "./blocks/VideoSectionBlock"
import { ZigzagFeatureListBlock } from "./blocks/ZigzagFeatureListBlock"
import { CtaBannerBlock } from "./blocks/CtaBannerBlock"

interface BlockRendererProps {
  blocks: PageBlock[]
  locale: Locale
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  blocks,
  locale,
}) => {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "hero_banner":
            return (
              <HeroBannerBlock key={block.id} data={block.data} locale={locale} />
            )
          case "two_column_definition":
            return (
              <TwoColumnDefinitionBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "pillar_section":
            return (
              <PillarSectionBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "tab_switcher":
            return (
              <TabSwitcherBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "aster_highlight_card":
            return (
              <AsterHighlightCardBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "product_grid":
            return (
              <ProductGridBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "production_flow":
            return (
              <ProductionFlowBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "facilities_grid":
            return (
              <FacilitiesGridBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "video_section":
            return (
              <VideoSectionBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "zigzag_feature_list":
            return (
              <ZigzagFeatureListBlock
                key={block.id}
                data={block.data}
                locale={locale}
              />
            )
          case "cta_banner":
            return (
              <CtaBannerBlock key={block.id} data={block.data} locale={locale} />
            )
          default:
            return null
        }
      })}
    </>
  )
}
