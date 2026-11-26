import { getPage } from "@/lib/api"
import { PageBlock } from "./types"

export type OurBusinessV2Slug =
  | "our-business-v2"
  | "our-business-v2-energy-and-chemicals"
  | "our-business-v2-infrastructure"
  | "our-business-v2-mobility-solutions"
  | "our-business-v2-shared-service"

export interface FallbackPageEntry {
  title_en: string
  title_id: string
  description_en: string
  description_id: string
  blocks: PageBlock[]
}

export const FALLBACK_PAGES: Record<OurBusinessV2Slug, FallbackPageEntry> = {
  "our-business-v2": {
    title_en: "Our Business Solutions | Chandra Asri Group",
    title_id: "Solusi Bisnis Kami | Chandra Asri Group",
    description_en:
      "Explore Chandra Asri Group business solutions across Energy & Chemicals, Integrated Infrastructure, Mobility Solutions, and Shared Services.",
    description_id:
      "Jelajahi solusi bisnis Chandra Asri Group di bidang Energi & Kimia, Infrastruktur Terintegrasi, Solusi Mobilitas, dan Layanan Bersama.",
    blocks: [
      {
        id: "overview-hero",
        type: "hero_banner",
        data: {
          eyebrow_en: "OVERVIEW",
          eyebrow_id: "IKHTISAR",
          title_en:
            "Our Business Solutions are Used in a Wide Range of Industries in Southeast Asia",
          title_id:
            "Solusi Bisnis Kami Digunakan di Berbagai Industri di Asia Tenggara",
          background_image: "/img/placeholder.jpg",
          alt_en: "Chandra Asri Group industrial operations",
          alt_id: "Operasional industri Chandra Asri Group",
        },
      },
      {
        id: "overview-definition",
        type: "two_column_definition",
        data: {
          title_en: "All-in-one solution to grow your business",
          title_id: "Solusi menyeluruh untuk menumbuhkan bisnis Anda",
          paragraphs_en: [
            "Chandra Asri Group is a leading industrial company in Southeast Asia, spanning three strategic pillars: <strong>Energy & Chemicals</strong>, <strong>Integrated Infrastructure</strong>, and <strong>Mobility Solutions</strong>.",
            "Since its establishment in 1992, the Group has built a strong track record as a trusted Growth Partner, with businesses and assets across Indonesia and Singapore, and an expanding presence into Malaysia.",
            'The Group’s Singapore based activities are principally undertaken through Aster Chemicals & Energy ("Aster"), a Chandra Asri led joint venture with Glencore.',
          ],
          paragraphs_id: [
            "Chandra Asri Group adalah perusahaan industri terkemuka di Asia Tenggara yang mencakup tiga pilar strategis: <strong>Energi & Kimia</strong>, <strong>Infrastruktur Terintegrasi</strong>, dan <strong>Solusi Mobilitas</strong>.",
            "Sejak didirikan pada tahun 1992, Grup ini telah membangun rekam jejak yang kuat sebagai Mitra Pertumbuhan terpercaya, dengan bisnis dan aset di Indonesia dan Singapura, serta ekspansi ke Malaysia.",
            'Aktivitas Grup yang berbasis di Singapura dijalankan terutama melalui Aster Chemicals & Energy ("Aster"), perusahaan patungan yang dipimpin Chandra Asri bersama Glencore.',
          ],
        },
      },
      {
        id: "overview-core-pillars",
        type: "pillar_section",
        data: {
          section_title_en: "Our Core Business Pillars",
          section_title_id: "Pilar Bisnis Inti Kami",
          items: [
            {
              id: "energy-chemicals",
              nav_label_en: "Energy & Chemicals",
              nav_label_id: "Energi & Kimia",
              badge_label_en: "Chandra Asri Energy & Chemicals",
              badge_label_id: "Chandra Asri Energi & Kimia",
              banner_image: "/img/placeholder.jpg",
              cta_label_en: "View Detail",
              cta_label_id: "Lihat Detail",
              cta_url: "/our-business-v2/energy-and-chemicals",
              description_en:
                '<strong>Energy & Chemicals</strong> is anchored by integrated operations in Indonesia and Singapore. These include a 0.9 million metric ton naphtha cracker in Cilegon, a refinery with a capacity of more than 300,000 barrels per day and a 1.1 million metric ton naphtha cracker on Bukom Island, and 2.5 million metric tons of downstream chemical assets on Jurong Island. The Group is also expanding its chemicals portfolio through Chandra Asri Alkali ("CAA"), which is developing a world scale Chlor-alkali and ethylene dichloride complex in Cilegon.',
              description_id:
                "<strong>Energi & Kimia</strong> bertumpu pada operasi terintegrasi di Indonesia dan Singapura, termasuk naphtha cracker 0,9 juta metrik ton di Cilegon, kilang lebih dari 300.000 barel/hari dan naphtha cracker 1,1 juta metrik ton di Pulau Bukom, serta aset kimia hilir 2,5 juta metrik ton di Pulau Jurong.",
            },
            {
              id: "integrated-infrastructure",
              nav_label_en: "Integrated Infrastructure",
              nav_label_id: "Infrastruktur Terintegrasi",
              badge_label_en: "Chandra Asri Integrated Infrastructure",
              badge_label_id: "Chandra Asri Infrastruktur Terintegrasi",
              banner_image: "/img/placeholder.jpg",
              cta_label_en: "View Detail",
              cta_label_id: "Lihat Detail",
              cta_url: "/our-business-v2/infrastructure",
              description_en:
                '<strong>Integrated Infrastructure</strong> comprises four core areas: Energy, Water, Port & Storage, and Logistics, providing essential services that support industrial activity and regional connectivity. These businesses are held under Chandra Daya Investasi ("CDI"), the Group’s listed infrastructure holding company.',
              description_id:
                '<strong>Infrastruktur Terintegrasi</strong> mencakup empat bidang utama: Energi, Air, Pelabuhan & Penyimpanan, dan Logistik di bawah naungan Chandra Daya Investasi ("CDI").',
            },
            {
              id: "mobility-solutions",
              nav_label_en: "Mobility Solutions",
              nav_label_id: "Solusi Mobilitas",
              badge_label_en: "Chandra Asri Mobility Solutions",
              badge_label_id: "Chandra Asri Solusi Mobilitas",
              banner_image: "/img/placeholder.jpg",
              cta_label_en: "View Detail",
              cta_label_id: "Lihat Detail",
              cta_url: "/our-business-v2/mobility-solutions",
              description_en:
                "<strong>Mobility Solutions</strong> connects the Group with consumers across the transportation value chain, encompassing Singapore’s Esso retail fuel network, aviation fuels and infrastructure, and automotive mobility, including the proposed acquisition of Cycle & Carriage’s businesses in Singapore and Malaysia.",
              description_id:
                "<strong>Solusi Mobilitas</strong> menghubungkan Grup dengan konsumen di seluruh rantai nilai transportasi, mencakup jaringan ritel bahan bakar Esso di Singapura, bahan bakar aviasi, serta mobilitas otomotif.",
            },
          ],
        },
      },
      {
        id: "overview-wider-business",
        type: "pillar_section",
        data: {
          section_title_en: "Our Wider Business",
          section_title_id: "Bisnis Kami Lainnya",
          items: [
            {
              id: "shared-service",
              nav_label_en: "Shared Service",
              nav_label_id: "Layanan Bersama",
              badge_label_en: "Chandra Asri Shared Service",
              badge_label_id: "Chandra Asri Layanan Bersama",
              banner_image: "/img/placeholder.jpg",
              cta_label_en: "View Detail",
              cta_label_id: "Lihat Detail",
              cta_url: "/our-business-v2/shared-service",
              description_en:
                "<strong>Shared Services</strong> from PT Chandra Asri Sentral Solusi (CASS) is PT Chandra Asri Pacific Tbk (Chandra Asri Group) expanded and diversified business portfolio. Established formerly known as PT Chandra Asri Konsultasi (CAK), and began its first operations in 2025 as the Shared Service Center (SSC) for Aster Chemicals and Energy Pte. Ltd.<br/><br/>CASS continues its expansion by managing administrative operations for Chandra Asri Group’s assets in Singapore, while preparing to broaden its service portfolio and support more entities across the Group.",
              description_id:
                "<strong>Layanan Bersama</strong> dari PT Chandra Asri Sentral Solusi (CASS) mendukung operasional back-office korporat untuk aset Chandra Asri Group di Indonesia dan Singapura.",
            },
          ],
        },
      },
      {
        id: "overview-cta",
        type: "cta_banner",
        data: {
          brand: "chandra-asri",
          title_en: "Let’s Build What’s Next, Together",
          title_id: "Mari Bangun Masa Depan Bersama",
          description_en:
            "Explore how Chandra Asri Group’s solutions across Energy & Chemicals, Integrated Infrastructure, and Mobility Solutions can help create new possibilities for your business.",
          description_id:
            "Jelajahi bagaimana solusi Chandra Asri Group di bidang Energi & Kimia, Infrastruktur Terintegrasi, dan Solusi Mobilitas dapat menciptakan peluang baru bagi bisnis Anda.",
          cta_label_en: "Contact Us",
          cta_label_id: "Hubungi Kami",
          cta_url: "/contact-us",
          background_image: "/img/placeholder.jpg",
        },
      },
    ],
  },

  "our-business-v2-energy-and-chemicals": {
    title_en: "Energy & Chemicals Solutions | Chandra Asri Group",
    title_id: "Solusi Energi & Kimia | Chandra Asri Group",
    description_en:
      "A world-class integrated energy & chemicals complex across Indonesia and Singapore.",
    description_id:
      "Kompleks energi & kimia terintegrasi kelas dunia di Indonesia dan Singapura.",
    blocks: [
      {
        id: "ec-hero",
        type: "hero_banner",
        data: {
          title_en: "Energy & Chemicals Solutions with Top Quality Processing",
          title_id:
            "Solusi Energi & Kimia dengan Pemrosesan Berkualitas Tinggi",
          background_image: "/img/placeholder.jpg",
        },
      },
      {
        id: "ec-definition",
        type: "two_column_definition",
        data: {
          title_en:
            "A world-class integrated energy & chemicals complex to meet your needs",
          title_id:
            "Kompleks energi & kimia terintegrasi kelas dunia untuk memenuhi kebutuhan Anda",
          paragraphs_en: [
            "Chandra Asri Group is a leading industrial company in Southeast Asia, operating the largest integrated petrochemical complex in Indonesia. We continue to grow organically through projects like the CA-EDC plant, which supports the EV ecosystem and key industries by producing caustic soda and ethylene dichloride.",
            "As part of our regional expansion, together with Glencore, we acquired Shell Singapore Pte. Ltd. through our joint venture, CAPGC Pte. Ltd. The newly named Aster Chemicals and Energy Pte. Ltd. operates integrated facilities in Bukom and Jurong Island, including a refinery and an ethylene cracker unit.",
            "Our operations are supported by a skilled team, on-site jetty, and tank farm, enabling efficient storage and logistics that enhance overall production reliability.",
          ],
          paragraphs_id: [
            "Chandra Asri Group adalah perusahaan industri terkemuka di Asia Tenggara yang mengoperasikan kompleks petrokimia terintegrasi terbesar di Indonesia.",
            "Sebagai bagian dari ekspansi regional bersama Glencore, Aster Chemicals and Energy Pte. Ltd. mengoperasikan fasilitas terintegrasi di Pulau Bukom dan Pulau Jurong.",
            "Operasional kami didukung tim terampil, dermaga terintegrasi, dan tank farm untuk keandalan produksi.",
          ],
        },
      },
      {
        id: "ec-tabs",
        type: "tab_switcher",
        data: {
          default_tab: "chemicals",
          tabs: [
            {
              id: "energy",
              label_en: "Energy",
              label_id: "Energi",
              blocks: [
                {
                  id: "energy-journey",
                  type: "two_column_definition",
                  data: {
                    title_en: "Our Journey",
                    title_id: "Perjalanan Kami",
                    paragraphs_en: [
                      "<strong>In 2025</strong>, Chandra Asri Group and Glencore officially acquired the Shell Energy and Chemicals Park (SECP) in Singapore. This acquisition was carried out through CAPGC Pte. Ltd., a joint venture predominantly owned and operated by Chandra Asri Group, with Glencore holding a minority stake.",
                      "Aster’s integrated facilities are located across two sites: Bukom and Jurong Island. The energy business is operated at Aster Bukom, which houses a refinery with a capacity of 237,000 barrels per day and an ethylene cracker unit with a capacity of 1.1 million tons per annum.",
                    ],
                    paragraphs_id: [
                      "<strong>Pada tahun 2025</strong>, Chandra Asri Group dan Glencore resmi mengakuisisi Shell Energy and Chemicals Park (SECP) di Singapura melalui CAPGC Pte. Ltd.",
                      "Fasilitas terintegrasi Aster berlokasi di Pulau Bukom (kilang 237.000 barel/hari dan unit ethylene cracker 1,1 juta ton/tahun) serta Pulau Jurong.",
                    ],
                  },
                },
                {
                  id: "energy-aster-solution",
                  type: "zigzag_feature_list",
                  data: {
                    title_en: "Aster Energy Solution",
                    title_id: "Solusi Energi Aster",
                    items: [
                      {
                        image: "/img/placeholder.jpg",
                        image_position: "left",
                        description_en:
                          "Aster Energy is transforming the energy landscape in Singapore and the region through solar innovation and sustainable solutions to empower communities and accelerate the energy transition in support of Singapore’s sustainability 2030 goals.<br/><br/>Our solar solutions are used across our manufacturing sites and are designed to meet the unique energy demands of the manufacturing sector, enabling more efficient operations for a cleaner, low-carbon future.",
                        description_id:
                          "Aster Energy mentransformasi lanskap energi di Singapura dan kawasan melalui inovasi surya dan solusi berkelanjutan untuk mendukung transisi energi 2030.",
                      },
                    ],
                  },
                },
                {
                  id: "energy-cta",
                  type: "cta_banner",
                  data: {
                    brand: "aster",
                    title_en: "Let’s Build What’s Next, Together",
                    title_id: "Mari Bangun Masa Depan Bersama",
                    description_en:
                      "Explore how Chandra Asri Group’s solutions across Energy & Chemicals, Integrated Infrastructure, and Mobility Solutions can help create new possibilities for your business.",
                    description_id:
                      "Jelajahi bagaimana solusi Chandra Asri Group dapat menciptakan peluang baru bagi bisnis Anda.",
                    cta_label_en: "Contact Us",
                    cta_label_id: "Hubungi Kami",
                    cta_url: "/contact-us",
                    background_image: "/img/placeholder.jpg",
                  },
                },
              ],
            },
            {
              id: "chemicals",
              label_en: "Chemicals",
              label_id: "Kimia",
              blocks: [
                {
                  id: "chem-intro",
                  type: "two_column_definition",
                  data: {
                    title_en: "Our Chemical Solution Products",
                    title_id: "Produk Solusi Kimia Kami",
                    paragraphs_en: [
                      "As a leading Energy and Chemicals solutions provider in Southeast Asia, Chandra Asri Group operates world-class chemical manufacturing facilities in <strong>Indonesia</strong> and through its subsidiary, Aster, in <strong>Singapore</strong>.",
                    ],
                    paragraphs_id: [
                      "Sebagai penyedia solusi Energi dan Kimia terkemuka di Asia Tenggara, Chandra Asri Group mengoperasikan fasilitas manufaktur kimia kelas dunia di <strong>Indonesia</strong> dan melalui anak usahanya, Aster, di <strong>Singapura</strong>.",
                    ],
                  },
                },
                {
                  id: "chem-product-grid",
                  type: "product_grid",
                  data: {
                    title_en: "Chandra Asri Group's Chemical Solution Products",
                    title_id: "Produk Solusi Kimia Chandra Asri Group",
                    items: [
                      {
                        title: "Olefins",
                        subtitle_en:
                          "Building block chemicals for downstream products.",
                        subtitle_id:
                          "Bahan kimia dasar untuk produk hilir.",
                        image: "/img/placeholder.jpg",
                        cta_label_en: "View Details",
                        cta_label_id: "Lihat Detail",
                        cta_url: "/our-business/chemical-solutions",
                      },
                      {
                        title: "Polyolefins",
                        subtitle_en:
                          "Broad range of Polyethylene and Polypropylene.",
                        subtitle_id:
                          "Beragam produk Polietilena dan Polipropilena.",
                        image: "/img/placeholder.jpg",
                        cta_label_en: "View Details",
                        cta_label_id: "Lihat Detail",
                        cta_url: "/our-business/chemical-solutions",
                      },
                      {
                        title: "Styrene Monomer",
                        subtitle_en:
                          "Materials for downstream polymer production.",
                        subtitle_id:
                          "Material untuk produksi polimer hilir.",
                        image: "/img/placeholder.jpg",
                        cta_label_en: "View Details",
                        cta_label_id: "Lihat Detail",
                        cta_url: "/our-business/chemical-solutions",
                      },
                      {
                        title: "Butadiene",
                        subtitle_en:
                          "Commercially viable raw material for synthetic rubber.",
                        subtitle_id:
                          "Bahan baku utama untuk karet sintetis.",
                        image: "/img/placeholder.jpg",
                        cta_label_en: "View Details",
                        cta_label_id: "Lihat Detail",
                        cta_url: "/our-business/chemical-solutions",
                      },
                      {
                        title: "MTBE",
                        subtitle_en:
                          "Octane enhancer in gasoline blending.",
                        subtitle_id:
                          "Peningkat oktan pada pencampuran bensin.",
                        image: "/img/placeholder.jpg",
                        cta_label_en: "View Details",
                        cta_label_id: "Lihat Detail",
                        cta_url: "/our-business/chemical-solutions",
                      },
                      {
                        title: "Chlor Alkali",
                        subtitle_en:
                          "Produces hydrogen, sodium hypochlorite, and caustic soda.",
                        subtitle_id:
                          "Memproduksi hidrogen, natrium hipoklorit, dan soda kaustik.",
                        image: "/img/placeholder.jpg",
                        cta_label_en: "View Details",
                        cta_label_id: "Lihat Detail",
                        cta_url: "/our-business/chemical-solutions",
                      },
                      {
                        title: "Ethylene Dichloride",
                        subtitle_en:
                          "Chlorine-based chemical used to produce PVC.",
                        subtitle_id:
                          "Bahan kimia berbasis klorin untuk produksi PVC.",
                        image: "/img/placeholder.jpg",
                        cta_label_en: "View Details",
                        cta_label_id: "Lihat Detail",
                        cta_url: "/our-business/chemical-solutions",
                      },
                      {
                        title: "Industrial Packaging",
                        subtitle_en:
                          "Sustainable film solutions engineered for high-performance packaging.",
                        subtitle_id:
                          "Solusi film berkelanjutan untuk kemasan berkinerja tinggi.",
                        image: "/img/placeholder.jpg",
                        cta_label_en: "View Details",
                        cta_label_id: "Lihat Detail",
                        cta_url: "/our-business/chemical-solutions",
                      },
                    ],
                  },
                },
                {
                  id: "chem-aster-card",
                  type: "aster_highlight_card",
                  data: {
                    brand: "aster",
                    title_en: "Aster's Chemical Solution Products",
                    title_id: "Produk Solusi Kimia Aster",
                    description_en:
                      "As part of Chandra Asri Group, Aster operates facilities on Bukom and Jurong Island in Singapore for integrated refining and petrochemical production.<br/><br/>Aster Bukom focuses on refining and ethylene production, while Aster Jurong Island manufactures key chemicals.",
                    description_id:
                      "Sebagai bagian dari Chandra Asri Group, Aster mengoperasikan fasilitas di Pulau Bukom dan Pulau Jurong, Singapura untuk produksi kilang dan petrokimia terintegrasi.",
                    cta_label_en: "Learn our Products",
                    cta_label_id: "Pelajari Produk Kami",
                    cta_url: "https://www.aster.com.sg",
                    products: [
                      "Butadiene",
                      "Di-Ethylene Glycols",
                      "Ethoxylates",
                      "Ethylene",
                      "High Density Polyethylene (HDPE)",
                      "High-Purity EO",
                      "Mono-Ethylene Glycol",
                      "Polyols",
                      "Propylenes",
                      "Raffinate-1",
                      "Di-Propylene Glycol",
                      "Propylene Glycol (Industrial Grade)",
                      "Propylene Glycol (US Pharmacopeia)",
                      "Propylene Oxide",
                    ],
                  },
                },
                {
                  id: "chem-production-flow",
                  type: "production_flow",
                  data: {
                    title_en: "Explore Our Production Flow",
                    title_id: "Jelajahi Alur Produksi Kami",
                    description_en:
                      "We pride ourselves on a meticulously designed production chemical flow that ensures precision, reliability, and optimal performance at every stage. Dive into the heart of our process to discover how we turn raw materials into high-quality products seamlessly.",
                    description_id:
                      "Kami bangga dengan alur produksi kimia yang dirancang secara cermat untuk memastikan presisi, keandalan, dan kinerja optimal di setiap tahap.",
                    interactive_slug: "chemical-production-flow",
                  },
                },
                {
                  id: "chem-facilities",
                  type: "facilities_grid",
                  data: {
                    title_en: "Chemical Solution Facilities",
                    title_id: "Fasilitas Solusi Kimia",
                    items: [
                      {
                        title: "Olefins Plant",
                        description_en:
                          "Indonesia’s sole naphtha cracker utilizing Lummus technology with world-scale Ethylene and Propylene capacity.",
                        description_id:
                          "Satu-satunya naphtha cracker di Indonesia dengan teknologi Lummus.",
                        image: "/img/placeholder.jpg",
                      },
                      {
                        title: "Polyethylene Plant",
                        description_en:
                          "High-capacity LLDPE and HDPE trains supporting flexible and rigid packaging applications.",
                        description_id:
                          "Pabrik LLDPE dan HDPE berkapasitas tinggi untuk aplikasi kemasan.",
                        image: "/img/placeholder.jpg",
                      },
                      {
                        title: "Polypropylene Plant",
                        description_en:
                          "Three production lines delivering homopolymer, random copolymer, and impact copolymer grades.",
                        description_id:
                          "Tiga lini produksi yang menghasilkan berbagai grade polipropilena.",
                        image: "/img/placeholder.jpg",
                      },
                      {
                        title: "Styrene Monomer Plant",
                        description_en:
                          "Sole domestic producer of Styrene Monomer serving Indonesian manufacturing industries.",
                        description_id:
                          "Produsen tunggal Styrene Monomer di Indonesia.",
                        image: "/img/placeholder.jpg",
                      },
                      {
                        title: "Butadiene Plant",
                        description_en:
                          "Extractive distillation plant producing high-purity Butadiene and Raffinate-1.",
                        description_id:
                          "Pabrik distilasi ekstraktif penghasil Butadiene dan Raffinate-1.",
                        image: "/img/placeholder.jpg",
                      },
                      {
                        title: "Supporting Facilities",
                        description_en:
                          "On-site jetty, tank farm, power generation, water treatment, and firefighting infrastructure.",
                        description_id:
                          "Dermaga, tank farm, pembangkit listrik, dan pengolahan air terintegrasi.",
                        image: "/img/placeholder.jpg",
                      },
                      {
                        title: "MTBE & B1 Plants",
                        description_en:
                          "Producing high-purity MTBE and Butene-1 supporting domestic fuel and polymer needs.",
                        description_id:
                          "Memproduksi MTBE dan Butene-1 untuk kebutuhan bahan bakar dan polimer.",
                        image: "/img/placeholder.jpg",
                      },
                      {
                        title: "Aster Jurong Island",
                        description_en:
                          "Downstream chemical complex producing EO, MEG, Polyols, Propylene Oxide, and Ethoxylates.",
                        description_id:
                          "Kompleks kimia hilir di Pulau Jurong penghasil EO, MEG, dan Polyols.",
                        image: "/img/placeholder.jpg",
                      },
                    ],
                  },
                },
                {
                  id: "chem-video",
                  type: "video_section",
                  data: {
                    title_en:
                      "We are present in your everyday lives.\nWe are your Growth Partner.",
                    title_id:
                      "Kami hadir dalam keseharian Anda.\nKami adalah Mitra Pertumbuhan Anda.",
                    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                  },
                },
                {
                  id: "chem-cta",
                  type: "cta_banner",
                  data: {
                    brand: "chandra-asri",
                    title_en: "Let’s Build What’s Next, Together",
                    title_id: "Mari Bangun Masa Depan Bersama",
                    description_en:
                      "Explore how Chandra Asri Group’s solutions across Energy & Chemicals, Integrated Infrastructure, and Mobility Solutions can help create new possibilities for your business.",
                    description_id:
                      "Jelajahi bagaimana solusi Chandra Asri Group dapat menciptakan peluang baru bagi bisnis Anda.",
                    cta_label_en: "Contact Us",
                    cta_label_id: "Hubungi Kami",
                    cta_url: "/contact-us",
                    background_image: "/img/placeholder.jpg",
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  },

  "our-business-v2-infrastructure": {
    title_en: "Infrastructure Solutions | Chandra Asri Group",
    title_id: "Solusi Infrastruktur | Chandra Asri Group",
    description_en:
      "Integrated infrastructure services across Power, Water, Ports & Storage, and Logistics through PT Chandra Daya Investasi Tbk (CDI).",
    description_id:
      "Layanan infrastruktur terintegrasi di bidang Daya, Air, Pelabuhan & Penyimpanan, serta Logistik melalui PT Chandra Daya Investasi Tbk (CDI).",
    blocks: [
      {
        id: "infra-hero",
        type: "hero_banner",
        data: {
          title_en:
            "Infrastructure Solutions for Efficient Industrial Growth",
          title_id:
            "Solusi Infrastruktur untuk Pertumbuhan Industri yang Efisien",
          background_image: "/img/placeholder.jpg",
        },
      },
      {
        id: "infra-definition",
        type: "two_column_definition",
        data: {
          title_en: "Integrated services to support your business infrastructure",
          title_id:
            "Layanan terintegrasi untuk mendukung infrastruktur bisnis Anda",
          paragraphs_en: [
            "Our infrastructure businesses are managed by PT Chandra Daya Investasi Tbk (CDI), our listed infrastructure holding company which spans across four pillars: <strong>Power, Water, Ports & Storage,</strong> and <strong>Logistics</strong>. Our presence delivers essential services that support industrial activity and regional connectivity.",
          ],
          paragraphs_id: [
            "Bisnis infrastruktur kami dikelola oleh PT Chandra Daya Investasi Tbk (CDI), perusahaan induk infrastruktur tercatat yang mencakup empat pilar: <strong>Daya, Air, Pelabuhan & Penyimpanan,</strong> serta <strong>Logistik</strong>.",
          ],
        },
      },
      {
        id: "infra-pillars",
        type: "zigzag_feature_list",
        data: {
          title_en: "Our Infrastructure Pillars",
          title_id: "Pilar Infrastruktur Kami",
          items: [
            {
              title_en: "Power",
              title_id: "Daya (Power)",
              image: "/img/placeholder.jpg",
              image_position: "left",
              cta_label_en: "View Detail",
              cta_label_id: "Lihat Detail",
              cta_url: "/our-business/power-supply",
              description_en:
                "Our power business and operations are managed by PT Chandra Daya Investasi Tbk (CDI Group) and run by <strong>PT Krakatau Chandra Energi (KCE)</strong> which was acquired from PT Krakatau Sarana Infrastruktur in 2023.",
              description_id:
                "Bisnis kelistrikan kami dikelola oleh PT Chandra Daya Investasi Tbk (CDI Group) melalui <strong>PT Krakatau Chandra Energi (KCE)</strong>.",
            },
            {
              title_en: "Water",
              title_id: "Air (Water)",
              image: "/img/placeholder.jpg",
              image_position: "right",
              cta_label_en: "View Detail",
              cta_label_id: "Lihat Detail",
              cta_url: "/our-business/industrial-water",
              description_en:
                "Our water business and activities are managed by PT Chandra Daya Investasi Tbk (CDI Group) and handled by <strong>PT Krakatau Tirta Industri (KTI)</strong> where we hold a 49% stake.",
              description_id:
                "Bisnis air industri kami dikelola oleh CDI Group melalui kepemilikan 49% saham di <strong>PT Krakatau Tirta Industri (KTI)</strong>.",
            },
            {
              title_en: "Ports & Storage",
              title_id: "Pelabuhan & Penyimpanan",
              image: "/img/placeholder.jpg",
              image_position: "left",
              cta_label_en: "View Detail",
              cta_label_id: "Lihat Detail",
              cta_url: "/our-business/ports-and-storage",
              description_en:
                "Chandra Asri Group through PT Chandra Daya Investasi Tbk (CDI Group) provides ports and tank services for refined chemical and petroleum products through <strong>PT Chandra Pelabuhan Nusantara (CPN)</strong>, <strong>PT Chandra Samudera Port (CSP)</strong>, and <strong>PT Redeco Petrolin Utama (RPU)</strong>.",
              description_id:
                "Melalui CDI Group, kami menyediakan layanan pelabuhan dan tangki penyimpanan melalui <strong>CPN</strong>, <strong>CSP</strong>, dan <strong>RPU</strong>.",
            },
            {
              title_en: "Logistics",
              title_id: "Logistik",
              image: "/img/placeholder.jpg",
              image_position: "right",
              cta_label_en: "View Detail",
              cta_label_id: "Lihat Detail",
              cta_url: "/our-business/logistics",
              description_en:
                "Chandra Asri Group through PT Chandra Daya Investasi Tbk (CDI Group) is pioneering shipping and warehousing logistics through <strong>PT Chandra Shipping International (CSI)</strong>, <strong>PT Chandra Cold Chain (CCC)</strong>, and <strong>PT SCG Barito Logistics (SBL)</strong>.",
              description_id:
                "Melalui CDI Group, kami mengembangkan layanan perkapalan dan pergudangan melalui <strong>CSI</strong>, <strong>CCC</strong>, dan <strong>SBL</strong>.",
            },
          ],
        },
      },
      {
        id: "infra-cta",
        type: "cta_banner",
        data: {
          brand: "cdi",
          title_en: "Let’s Build What’s Next, Together",
          title_id: "Mari Bangun Masa Depan Bersama",
          description_en:
            "Explore how Chandra Daya Investasi Group’s solutions across Power, Water, Ports & Storage, and Logistics can help create new possibilities for your business.",
          description_id:
            "Jelajahi bagaimana solusi Chandra Daya Investasi Group di bidang Daya, Air, Pelabuhan & Penyimpanan, serta Logistik dapat menciptakan peluang baru bagi bisnis Anda.",
          cta_label_en: "Visit Us",
          cta_label_id: "Kunjungi Kami",
          cta_url: "https://chandradayainvestasi.com",
          background_image: "/img/placeholder.jpg",
        },
      },
    ],
  },

  "our-business-v2-mobility-solutions": {
    title_en: "Mobility Solutions | Chandra Asri Group",
    title_id: "Solusi Mobilitas | Chandra Asri Group",
    description_en:
      "Driving connectivity through effective mobility solutions across fuel retail, aviation fuels, and automotive mobility.",
    description_id:
      "Mendorong konektivitas melalui solusi mobilitas yang efektif di ritel bahan bakar, bahan bakar aviasi, dan mobilitas otomotif.",
    blocks: [
      {
        id: "mobility-hero",
        type: "hero_banner",
        data: {
          title_en:
            "Driving Connectivity through Effective Mobility Solutions",
          title_id:
            "Mendorong Konektivitas melalui Solusi Mobilitas yang Efektif",
          background_image: "/img/placeholder.jpg",
        },
      },
      {
        id: "mobility-definition",
        type: "two_column_definition",
        data: {
          title_en: "Integrated services to support your business infrastructure",
          title_id:
            "Layanan terintegrasi untuk mendukung mobilitas bisnis Anda",
          paragraphs_en: [
            "Our Mobility Solutions is a strategic growth platform that expands our reach across the transportation value chain and brings us closer to consumers. Through our businesses in fuel retail, aviation fuels and infrastructure, and automotive mobility, we are building an integrated mobility platform to capture growth opportunities across Southeast Asia.",
          ],
          paragraphs_id: [
            "Solusi Mobilitas kami merupakan platform pertumbuhan strategis yang memperluas jangkauan di seluruh rantai nilai transportasi, mencakup ritel bahan bakar, bahan bakar aviasi, dan mobilitas otomotif di Asia Tenggara.",
          ],
        },
      },
      {
        id: "mobility-cta",
        type: "cta_banner",
        data: {
          brand: "aster",
          title_en: "Let’s Build What’s Next, Together",
          title_id: "Mari Bangun Masa Depan Bersama",
          description_en:
            "Explore how Chandra Asri Group’s solutions across Energy & Chemicals, Integrated Infrastructure, and Mobility Solutions can help create new possibilities for your business.",
          description_id:
            "Jelajahi bagaimana solusi Chandra Asri Group dapat menciptakan peluang baru bagi bisnis Anda.",
          cta_label_en: "Contact Us",
          cta_label_id: "Hubungi Kami",
          cta_url: "/contact-us",
          background_image: "/img/placeholder.jpg",
        },
      },
    ],
  },

  "our-business-v2-shared-service": {
    title_en: "Shared Service | Chandra Asri Group",
    title_id: "Layanan Bersama | Chandra Asri Group",
    description_en:
      "PT Chandra Asri Sentral Solusi (CASS) empowering Chandra Asri Group growth through integrated corporate back-office solutions.",
    description_id:
      "PT Chandra Asri Sentral Solusi (CASS) memberdayakan pertumbuhan Chandra Asri Group melalui solusi back-office korporat terintegrasi.",
    blocks: [
      {
        id: "ss-hero",
        type: "hero_banner",
        data: {
          title_en:
            "Driving Innovation, Enabling Growth, Supporting the Future",
          title_id:
            "Mendorong Inovasi, Memungkinkan Pertumbuhan, Mendukung Masa Depan",
          background_image: "/img/placeholder.jpg",
        },
      },
      {
        id: "ss-definition",
        type: "two_column_definition",
        data: {
          title_en:
            "A Shared Service Center Empowering Chandra Asri Group Growth",
          title_id:
            "Pusat Layanan Bersama yang Memberdayakan Pertumbuhan Chandra Asri Group",
          paragraphs_en: [
            "As a trusted shared services partner, PT Chandra Asri Sentral Solusi (CASS) enhances the operational capabilities of companies across the Chandra Asri Group through structured, proven, and high-standard corporate back-office solutions, strengthening operations, supporting regional expansion, and enabling long-term strategic growth.",
            "CASS’s services include Finance & Accounting, Contract & Procurement, Customer Operations, Human Resources, and Information Technology, all designed to strengthen the company’s operational foundation in an integrated manner.",
          ],
          paragraphs_id: [
            "Sebagai mitra layanan bersama terpercaya, PT Chandra Asri Sentral Solusi (CASS) meningkatkan kapabilitas operasional perusahaan di Chandra Asri Group melalui solusi back-office korporat berstandar tinggi.",
            "Layanan CASS mencakup Keuangan & Akuntansi, Kontrak & Pengadaan, Operasi Pelanggan, Sumber Daya Manusia, dan Teknologi Informasi secara terintegrasi.",
          ],
        },
      },
      {
        id: "ss-cta",
        type: "cta_banner",
        data: {
          brand: "cass",
          title_en: "Explore Our Services",
          title_id: "Jelajahi Layanan Kami",
          description_en:
            "Find how Chandra Asri Sentral Solusi as trusted shared services partner, strengthening operations, supporting regional expansion, and enabling Chandra Asri Group’s long-term strategic growth.",
          description_id:
            "Temukan bagaimana Chandra Asri Sentral Solusi sebagai mitra layanan bersama memperkuat operasional dan mendukung pertumbuhan strategis jangka panjang Chandra Asri Group.",
          cta_label_en: "Visit Us",
          cta_label_id: "Kunjungi Kami",
          cta_url: "/contact-us",
          background_image: "/img/placeholder.jpg",
        },
      },
    ],
  },
}

export async function getComponentPageData(slug: OurBusinessV2Slug) {
  const fallback = FALLBACK_PAGES[slug]
  try {
    const res = await getPage(slug)
    const cmsBlocks = res?.meta?.page_blocks?.blocks
    return {
      cmsPage: res || null,
      blocks:
        Array.isArray(cmsBlocks) && cmsBlocks.length > 0
          ? (cmsBlocks as PageBlock[])
          : fallback.blocks,
      fallback,
    }
  } catch {
    return {
      cmsPage: null,
      blocks: fallback.blocks,
      fallback,
    }
  }
}
