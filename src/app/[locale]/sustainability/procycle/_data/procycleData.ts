export interface ProCycleProductItem {
  name_en: string
  name_id: string
  url: string
}

export interface ProCycleCategory {
  key: string
  tab_label_en: string
  tab_label_id: string
  title_en: string
  title_id: string
  description_en: string
  description_id: string
  product_list_title_en: string
  product_list_title_id: string
  products: ProCycleProductItem[]
}

export interface ProCycleData {
  banner: {
    status_en: "active" | "inactive"
    status_id: "active" | "inactive"
    small_title_en: string
    small_title_id: string
    title_en: string
    title_id: string
    description_en: string
    description_id: string
    image_desktop_en: string
    image_desktop_id: string
    image_mobile_en: string
    image_mobile_id: string
    alt_text_image_desktop_en: string
    alt_text_image_desktop_id: string
    alt_text_image_mobile_en: string
    alt_text_image_mobile_id: string
  }
  intro: {
    en: string
    id: string
  }
  approach: {
    title_en: string
    title_id: string
    description_en: string
    description_id: string
  }
  categoriesSection: {
    section_title_en: string
    section_title_id: string
    section_subtitle_en: string
    section_subtitle_id: string
    categories: ProCycleCategory[]
  }
  bottom_banner: {
    status_en: "active" | "inactive"
    status_id: "active" | "inactive"
    image_desktop_en: string
    image_desktop_id: string
    image_mobile_en: string
    image_mobile_id: string
    alt_text_image_desktop_en: string
    alt_text_image_desktop_id: string
    alt_text_image_mobile_en: string
    alt_text_image_mobile_id: string
    url_en?: string
    url_id?: string
  }
  meta: {
    meta_title_en: string
    meta_title_id: string
    meta_desc_en: string
    meta_desc_id: string
  }
}

export const DEFAULT_PROCYCLE_DATA: ProCycleData = {
  banner: {
    status_en: "active",
    status_id: "active",
    small_title_en: "",
    small_title_id: "",
    title_en: "ProCycle",
    title_id: "ProCycle",
    description_en: "Sustainable Product For Sustainable Growth",
    description_id: "Produk Berkelanjutan untuk Pertumbuhan Berkelanjutan",
    image_desktop_en: "/img/sustainability/procycle-full-reference.jpg",
    image_desktop_id: "/img/sustainability/procycle-full-reference.jpg",
    image_mobile_en: "/img/sustainability/procycle-full-reference.jpg",
    image_mobile_id: "/img/sustainability/procycle-full-reference.jpg",
    alt_text_image_desktop_en: "ProCycle - Sustainable Product For Sustainable Growth",
    alt_text_image_desktop_id: "ProCycle - Produk Berkelanjutan untuk Pertumbuhan Berkelanjutan",
    alt_text_image_mobile_en: "ProCycle Banner Mobile",
    alt_text_image_mobile_id: "ProCycle Banner Mobile",
  },
  intro: {
    en: "In a rapidly evolving world, sustainable growth is achieved and began through sustainable products. At Chandra Asri Group, we aspire to be a trusted growth partner by creating value beyond products and delivering solutions that support long-term business sustainability.",
    id: "Di dunia yang terus berkembang pesat, pertumbuhan berkelanjutan dicapai dan dimulai melalui produk-produk yang berkelanjutan. Di Chandra Asri Group, kami bercita-cita menjadi mitra pertumbuhan tepercaya dengan menciptakan nilai di luar produk dan menghadirkan solusi yang mendukung keberlanjutan bisnis jangka panjang.",
  },
  approach: {
    title_en: "Our Approach",
    title_id: "Pendekatan Kami",
    description_en: "By embedding sustainability at the core of our operations, this initiative guides us in reducing environmental impact, conserving natural resources, promoting responsible consumption and production, and advancing the efficient use of resources across the value chain. Through innovation and collaboration, we are committed to be a trusted partner in shaping a more sustainable tomorrow.",
    description_id: "Dengan menanamkan keberlanjutan pada inti operasional kami, inisiatif ini memandu kami dalam mengurangi dampak lingkungan, menghemat sumber daya alam, mempromosikan konsumsi dan produksi yang bertanggung jawab, serta memajukan penggunaan sumber daya yang efisien di seluruh rantai nilai. Melalui inovasi dan kolaborasi, kami berkomitmen untuk menjadi mitra tepercaya dalam membentuk hari esok yang lebih berkelanjutan.",
  },
  categoriesSection: {
    section_title_en: "Our Sustainable Product",
    section_title_id: "Produk Berkelanjutan Kami",
    section_subtitle_en: "Chandra Asri has started developing a sustainable product management by grouping actions into 5 categories:",
    section_subtitle_id: "Chandra Asri telah mulai mengembangkan pengelolaan produk berkelanjutan dengan mengelompokkan tindakan ke dalam 5 kategori:",
    categories: [
      {
        key: "contain",
        tab_label_en: "Contain",
        tab_label_id: "Contain",
        title_en: "What is Contain?",
        title_id: "Apa itu Contain?",
        description_en: "Focuses on incorporating recycled content into products to reduce environmental impact while maintaining performance and quality standards. Decrease dependence on virgin resources, reduce waste sent to landfill, and lower the overall carbon footprint across the value chain. It supports the transition toward a circular economy by giving valuable materials a second life and promoting responsible resource utilization.",
        description_id: "Berfokus pada penggabungan konten daur ulang ke dalam produk untuk mengurangi dampak lingkungan sambil mempertahankan standar kinerja dan kualitas. Mengurangi ketergantungan pada sumber daya perawan, mengurangi limbah yang dikirim ke TPA, dan menurunkan jejak karbon keseluruhan di sepanjang rantai nilai. Ini mendukung transisi menuju ekonomi sirkular dengan memberikan material berharga kehidupan kedua dan mempromosikan pemanfaatan sumber daya yang bertanggung jawab.",
        product_list_title_en: "Product List",
        product_list_title_id: "Daftar Produk",
        products: [
          {
            name_en: "Recycled content in Bag Film Packaging",
            name_id: "Konten daur ulang dalam Kemasan Bag Film",
            url: "#",
          },
        ],
      },
      {
        key: "control",
        tab_label_en: "Control",
        tab_label_id: "Control",
        title_en: "What is Control?",
        title_id: "Apa itu Control?",
        description_en: "Focuses on rigorous monitoring, emissions reduction, and process efficiency to minimize ecological footprint and maintain safe, high-standard chemical and polymer manufacturing operations.",
        description_id: "Berfokus pada pemantauan ketat, pengurangan emisi, dan efisiensi proses guna meminimalkan jejak ekologis serta menjaga operasional manufaktur kimia dan polimer yang aman dan berstandar tinggi.",
        product_list_title_en: "Product List",
        product_list_title_id: "Daftar Produk",
        products: [
          {
            name_en: "Eco-controlled Polymer Solutions",
            name_id: "Solusi Polimer Terkontrol Ramah Lingkungan",
            url: "#",
          },
        ],
      },
      {
        key: "circular",
        tab_label_en: "Circular",
        tab_label_id: "Circular",
        title_en: "What is Circular?",
        title_id: "Apa itu Circular?",
        description_en: "Enabling closed-loop material cycles through advanced mechanical and chemical recycling technologies, supporting industry partners in achieving circularity.",
        description_id: "Mewujudkan siklus material tertutup melalui teknologi daur ulang mekanis dan kimia tingkat lanjut, mendukung mitra industri dalam mencapai sirkularitas.",
        product_list_title_en: "Product List",
        product_list_title_id: "Daftar Produk",
        products: [
          {
            name_en: "Circular Resin Solutions",
            name_id: "Solusi Resin Sirkular",
            url: "#",
          },
        ],
      },
      {
        key: "conserve",
        tab_label_en: "Conserve",
        tab_label_id: "Conserve",
        title_en: "What is Conserve?",
        title_id: "Apa itu Conserve?",
        description_en: "Prioritizing the conservation of water, energy, and natural resources through process optimization, heat recovery, and renewable energy integration.",
        description_id: "Memprioritaskan konservasi air, energi, dan sumber daya alam melalui optimalisasi proses, pemulihan panas, dan integrasi energi terbarukan.",
        product_list_title_en: "Product List",
        product_list_title_id: "Daftar Produk",
        products: [
          {
            name_en: "Resource-optimized Materials",
            name_id: "Material yang Dioptimalkan Sumber Daya",
            url: "#",
          },
        ],
      },
      {
        key: "cycle",
        tab_label_en: "Cycle",
        tab_label_id: "Cycle",
        title_en: "What is Cycle?",
        title_id: "Apa itu Cycle?",
        description_en: "Collaborating across the entire product lifecycle from feedstock to end-of-life recovery, fostering multi-stakeholder partnerships for long-term sustainability.",
        description_id: "Berkolaborasi di seluruh siklus hidup produk mulai dari bahan baku hingga pemulihan akhir masa pakai, mendorong kemitraan multi-pemangku kepentingan untuk keberlanjutan jangka panjang.",
        product_list_title_en: "Product List",
        product_list_title_id: "Daftar Produk",
        products: [
          {
            name_en: "Full Lifecycle Polymer Systems",
            name_id: "Sistem Polimer Siklus Hidup Penuh",
            url: "#",
          },
        ],
      },
    ],
  },
  bottom_banner: {
    status_en: "active",
    status_id: "active",
    image_desktop_en: "/img/sustainability/procycle-full-reference.jpg",
    image_desktop_id: "/img/sustainability/procycle-full-reference.jpg",
    image_mobile_en: "/img/sustainability/procycle-full-reference.jpg",
    image_mobile_id: "/img/sustainability/procycle-full-reference.jpg",
    alt_text_image_desktop_en: "Chandra Asri ProCycle",
    alt_text_image_desktop_id: "Chandra Asri ProCycle",
    alt_text_image_mobile_en: "Chandra Asri ProCycle",
    alt_text_image_mobile_id: "Chandra Asri ProCycle",
    url_en: "/our-business",
    url_id: "/our-business",
  },
  meta: {
    meta_title_en: "ProCycle - Sustainable Products | Chandra Asri Group",
    meta_title_id: "ProCycle - Produk Berkelanjutan | Chandra Asri Group",
    meta_desc_en: "Discover ProCycle, Chandra Asri Group's sustainable product management across Contain, Control, Circular, Conserve, and Cycle.",
    meta_desc_id: "Pelajari ProCycle, pengelolaan produk berkelanjutan dari Chandra Asri Group melalui Contain, Control, Circular, Conserve, dan Cycle.",
  },
}
