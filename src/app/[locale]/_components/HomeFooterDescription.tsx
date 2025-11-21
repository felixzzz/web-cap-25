"use client"

import Anim from "@/components/global/Anim"
import { useState } from "react"

export default function HomeFooterDescription() {
  const [isReadMore, setIsReadMore] = useState(false)

  return (
    <section className="block bg-[#E3EBED] lg:hidden">
      <Anim>
        <div className="container relative py-6 text-sm">
          {isReadMore
            ? `Chandra Asri is Indonesia's largest integrated petrochemical
        company, known for its diverse product portfolio, including olefins,
        polyethylene, polypropylene, and other specialty chemicals. Established
        in the early 1990s, it operates a world-class plant complex in Cilegon,
        Banten. With a focus on innovation and sustainability, Chandra Asri
        caters to various industries, from packaging and automotive to
        agriculture and constructor.`
            : `Chandra Asri is Indonesia's largest integrated petrochemical
        company, known for its diverse product portfolio, including olefin...`}
          <span
            className={
              isReadMore
                ? "ml-2 cursor-pointer font-bold text-primary"
                : "cursor-pointer font-bold text-primary"
            }
            onClick={() => setIsReadMore(!isReadMore)}
          >
            {isReadMore ? "Less Read" : "Read More"}
          </span>
        </div>
      </Anim>
    </section>
  )
}
