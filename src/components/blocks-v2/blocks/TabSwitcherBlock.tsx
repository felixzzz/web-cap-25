"use client"

import React, { useState } from "react"
import { Locale, TabSwitcherData } from "../types"
import { pickText } from "../utils"
import { BlockRenderer } from "../BlockRenderer"

interface TabSwitcherBlockProps {
  data: TabSwitcherData
  locale: Locale
}

export const TabSwitcherBlock: React.FC<TabSwitcherBlockProps> = ({
  data,
  locale,
}) => {
  const initialTab =
    data.default_tab && data.tabs.some((t) => t.id === data.default_tab)
      ? data.default_tab
      : data.tabs[0]?.id || ""

  const [activeTabId, setActiveTabId] = useState<string>(initialTab)
  const activeTab =
    data.tabs.find((t) => t.id === activeTabId) || data.tabs[0]

  return (
    <div className="w-full">
      <div className="container">
        <div
          role="tablist"
          className="grid grid-cols-2 border-b border-slate-200"
        >
          {data.tabs.map((tab) => {
            const label = pickText(locale, tab.label_en, tab.label_id)
            const isActive = tab.id === activeTab?.id

            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
                className={`border-b-2 py-4 text-center text-base font-semibold transition-colors md:text-lg ${
                  isActive
                    ? "border-[#0070B8] text-[#0070B8]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab && <BlockRenderer blocks={activeTab.blocks} locale={locale} />}
    </div>
  )
}
