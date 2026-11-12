export type Flow2Category = "feedstock" | "facility" | "product"
export type Flow2Zone = "upstream" | "intermediate"

export interface LocalizedString {
  id: string
  en: string
}

export type FlowNodeColorPreset = "product" | "facility" | "exclude" | "custom"

export interface FlowLegendItem {
  id: string
  labelEn: string
  labelId: string
  color: string
  type: "solid" | "outline"
  borderColor?: string
}

export const DEFAULT_FLOW_LEGENDS: FlowLegendItem[] = [
  {
    id: "chandra-asri-product",
    labelEn: "Chandra Asri Product",
    labelId: "Produk Chandra Asri",
    color: "#0082C8",
    type: "solid",
    borderColor: "#0070ad",
  },
  {
    id: "chandra-asri-facility",
    labelEn: "Chandra Asri Facility",
    labelId: "Fasilitas Chandra Asri",
    color: "#ffffff",
    type: "outline",
    borderColor: "#0082C8",
  },
  {
    id: "exclude-chandra-asri",
    labelEn: "Exclude Chandra Asri Owned Ecosystem",
    labelId: "Di Luar Ekosistem Chandra Asri",
    color: "#1B2B5A",
    type: "solid",
    borderColor: "#131f42",
  },
]

export interface Flow2Node {
  id: string
  name: string
  fullName?: string
  iconType: string
  category: Flow2Category
  zone: Flow2Zone
  colorPreset?: FlowNodeColorPreset
  customBgColor?: string
  customTextColor?: string
  customBorderColor?: string
  customIconUrl?: string
  definition?: LocalizedString
  mainFunction: LocalizedString
  inputs?: string[] // node ids
  outputs?: string[] // node ids
}

export interface Flow2Data {
  meta: {
    title: LocalizedString
    subtitle: LocalizedString
    description: LocalizedString
  }
  nodes: Record<string, Flow2Node>
}

export const PRODUCT_FLOW_2_DATA: Flow2Data = {
  meta: {
    title: {
      id: "Alur Proses dan Produk Industri Petrokimia",
      en: "Petrochemical Industry Process & Product Flow",
    },
    subtitle: {
      id: "Industri Hulu ke Industri Antara (Upstream to Intermediate)",
      en: "Upstream to Intermediate Industry",
    },
    description: {
      id: "Pemetaan komprehensif alur pengolahan bahan baku minyak mentah dan gas alam melalui fasilitas kilang, cracker, hingga menghasilkan produk kimia hilir bernilai tambah.",
      en: "Comprehensive mapping of crude oil and natural gas feedstock processing through refineries and cracker facilities to downstream petrochemical products.",
    },
  },
  nodes: {
    // ---------------- UPSTREAM: FEEDSTOCKS ----------------
    "crude-oil": {
      id: "crude-oil",
      name: "CRUDE OIL",
      fullName: "Crude Oil (Minyak Mentah)",
      iconType: "flask",
      category: "feedstock",
      zone: "upstream",
      definition: {
        en: "Crude oil is a naturally occurring, dark-colored liquid made of complex hydrocarbons formed from ancient organic matter over millions of years and extracted through wells drilled on land or offshore.",
        id: "Minyak mentah adalah cairan alami berwarna gelap yang tersusun dari hidrokarbon kompleks yang terbentuk dari materi organik purba selama jutaan tahun dan diekstraksi melalui sumur bor di darat atau lepas pantai.",
      },
      mainFunction: {
        en: "Primary feedstock for refining operations.",
        id: "Bahan baku utama untuk operasi pengilangan (refining).",
      },
      inputs: [],
      outputs: ["refinery-plant"],
    },

    "natural-gas": {
      id: "natural-gas",
      name: "NATURAL GAS",
      fullName: "Natural Gas (Gas Alam)",
      iconType: "flask",
      category: "feedstock",
      zone: "upstream",
      definition: {
        en: "Natural gas is a naturally occurring fossil fuel that consists mainly of methane and other smaller particles. It is formed from the remains of plants and animals buried deep beneath the Earth for millions of years.",
        id: "Gas alam adalah bahan bakar fosil alami yang terutama terdiri dari metana dan partikel lainnya. Terbentuk dari sisa-sisa tumbuhan dan hewan yang terkubur jauh di bawah permukaan bumi selama jutaan tahun.",
      },
      mainFunction: {
        en: "Primary feedstock for Petrochemicals & Fuels",
        id: "Bahan baku utama untuk Petrokimia & Bahan Bakar",
      },
      inputs: [],
      outputs: ["gas-separation-unit"],
    },

    // ---------------- UPSTREAM: REFINING & GAS SEPARATION ----------------
    "refinery-plant": {
      id: "refinery-plant",
      name: "REFINERY",
      fullName: "Refinery Plant",
      iconType: "plant",
      category: "facility",
      zone: "upstream",
      mainFunction: {
        en: "A facility that make oil refinery turns crude oil into useful products. Crude oil contains different hydrocarbons that are separated and processed into everyday products and industrial materials. After refining, the oil is classified as either light petroleum or heavy petroleum based on its properties.",
        id: "Fasilitas kilang minyak yang mengolah minyak mentah menjadi produk yang bermanfaat. Minyak mentah mengandung berbagai hidrokarbon yang dipisahkan dan diproses menjadi produk sehari-hari dan material industri. Setelah pemurnian, minyak diklasifikasikan sebagai minyak bumi ringan atau berat berdasarkan sifat-sifatnya.",
      },
      inputs: ["crude-oil"],
      outputs: ["lpg", "naphtha"],
    },

    "gas-separation-unit": {
      id: "gas-separation-unit",
      name: "GAS SEPARATION UNIT",
      fullName: "Gas Separation Unit Plant",
      iconType: "plant",
      category: "facility",
      zone: "upstream",
      mainFunction: {
        en: "A facility that separating specific gases or removing unwanted impurities, liquids, and solid particles from a gas mixture.",
        id: "Fasilitas yang memisahkan gas-gas spesifik atau menghilangkan kotoran, cairan, dan partikel padat yang tidak diinginkan dari campuran gas.",
      },
      inputs: ["natural-gas"],
      outputs: ["condensate"],
    },

    // ---------------- UPSTREAM: INTERMEDIATE FEEDSTOCKS ----------------
    "naphtha": {
      id: "naphtha",
      name: "NAPHTHA",
      fullName: "Naphtha (Nafta)",
      iconType: "flask",
      category: "product",
      zone: "upstream",
      definition: {
        en: "A hydrocarbon liquid processed from crude oil. This product belongs to organic compounds and is frequently called crude oil distillate.",
        id: "Cairan hidrokarbon yang diproses dari minyak mentah. Produk ini tergolong senyawa organik dan sering disebut sebagai distilat minyak mentah.",
      },
      mainFunction: {
        en: "As petrochemicals industry feedstocks, naphtha as a raw material to produce intermediate industry product such as ethylene, propylene, Pygas, and many more",
        id: "Sebagai bahan baku industri petrokimia, nafta digunakan untuk memproduksi produk industri antara seperti etilena, propilena, Pygas, dan lainnya.",
      },
      inputs: ["refinery-plant"],
      outputs: ["ethylene-cracker-plant"],
    },

    "lpg": {
      id: "lpg",
      name: "LPG",
      fullName: "Liquefied Petroleum Gas (LPG)",
      iconType: "flask",
      category: "product",
      zone: "upstream",
      definition: {
        en: "A liquid gas stored in a gas holder, either in bulk or in a cylinder, making it convenient to bring and distribute everywhere. The gas has a high calorific value and heat, so it can be utilized as a temporary energy source.",
        id: "Gas cair yang disimpan dalam penampung gas, baik dalam jumlah besar maupun dalam silinder/tabung, sehingga praktis untuk dibawa dan didistribusikan ke mana saja. Gas ini memiliki nilai kalor dan panas yang tinggi sehingga dapat dimanfaatkan sebagai sumber energi.",
      },
      mainFunction: {
        en: "LPG that being processed from crude oil with distillation, will be separating the LPG from gases into isobutane, propane, and butane. Then stored into the gases platform such as tank to be marketed",
        id: "LPG yang diproses dari minyak mentah dengan distilasi dipisahkan menjadi isobutana, propana, dan butana, kemudian disimpan dalam tangki untuk dipasarkan.",
      },
      inputs: ["refinery-plant"],
      outputs: ["ethylene-cracker-plant"],
    },

    "condensate": {
      id: "condensate",
      name: "CONDENSATE",
      fullName: "Condensate (Kondensat)",
      iconType: "flask",
      category: "product",
      zone: "upstream",
      definition: {
        en: "A low-density and low-viscosity liquid hydrocarbons that generally exists from the underground natural gas where the form will be condenses into liquid depend on the pressure and temperature level when reaching the surfaces.",
        id: "Hidrokarbon cair berdensitas rendah dan viskositas rendah yang umumnya berasal dari gas alam bawah tanah di mana wujudnya mengembun menjadi cairan tergantung pada tingkat tekanan dan suhu saat mencapai permukaan.",
      },
      mainFunction: {
        en: "Primary feedstock for steam crackers to produce base chemicals",
        id: "Bahan baku utama untuk steam cracker dalam memproduksi bahan kimia dasar.",
      },
      inputs: ["gas-separation-unit"],
      outputs: ["ethylene-cracker-plant"],
    },

    // ---------------- UPSTREAM: ETHYLENE CRACKER PLANT ----------------
    "ethylene-cracker-plant": {
      id: "ethylene-cracker-plant",
      name: "ETHYLENE CRACKER PLANT",
      fullName: "Ethylene Cracker Plant (Pabrik Perengkah Etilena)",
      iconType: "plant",
      category: "facility",
      zone: "upstream",
      definition: {
        en: "A facility that crack larger hydrocarbons molecules into smaller molecules.",
        id: "Fasilitas yang memecah (merengkah) molekul hidrokarbon yang lebih besar menjadi molekul-molekul yang lebih kecil.",
      },
      mainFunction: {
        en: "Break down primary feedstock (LPG, Naphtha, Condensate) through Thermal Cracking Process in the high temperature, then compressing the mixture molecules then goes to the cold box to being processed in the cold-section through Cryogenic Distillation Processes into valuable molecules such propylene, ethylene, etc.",
        id: "Mengurai bahan baku utama (LPG, Nafta, Kondensat) melalui Proses Perengkahan Termal pada suhu tinggi, kemudian mengompresi molekul campuran yang selanjutnya masuk ke kotak dingin untuk diproses pada bagian dingin melalui Proses Distilasi Kriogenik menjadi molekul berharga seperti propilena, etilena, dll.",
      },
      inputs: ["lpg", "naphtha", "condensate"],
      outputs: ["ethylene", "propylene", "raw-c4", "pygas", "pfo"],
    },

    // ---------------- UPSTREAM: BASE CHEMICALS (CRACKER OUTPUTS) ----------------
    "ethylene": {
      id: "ethylene",
      name: "ETHYLENE",
      fullName: "Ethylene (Etilena)",
      iconType: "flask",
      category: "product",
      zone: "upstream",
      definition: {
        en: "Ethylene is the simplest alkene compound, consisting of a carbon-carbon double bond, and is the second simplest unsaturated hydrocarbon. The structure of ethylene is C2H4 or H2C=CH2.",
        id: "Etilena adalah senyawa alkena paling sederhana, terdiri dari ikatan rangkap dua karbon-karbon, dan merupakan hidrokarbon tak jenuh paling sederhana kedua. Struktur etilena adalah C2H4 atau H2C=CH2.",
      },
      mainFunction: {
        en: "As the most widely used organic chemical in the world, Ethylene has two main functions. First, as a monomer to produce polyethylene through polymerization process. Second, as a base material to make two-carbon compounds such as ethanol, ethylene oxide, vinyl chloride, and acetaldehyde",
        id: "Sebagai bahan kimia organik yang paling banyak digunakan di dunia, Etilena memiliki dua fungsi utama: Pertama, sebagai monomer untuk menghasilkan polietilena melalui proses polimerisasi; Kedua, sebagai bahan dasar untuk membuat senyawa dua karbon seperti etanol, etilena oksida, vinil klorida, dan asetaldehida.",
      },
      inputs: ["ethylene-cracker-plant"],
      outputs: ["polyethylene-plant", "styrene-monomer-plant"],
    },

    "propylene": {
      id: "propylene",
      name: "PROPYLENE",
      fullName: "Propylene (Propilena)",
      iconType: "flask",
      category: "product",
      zone: "upstream",
      definition: {
        en: "Propylene is a basic chemical that creates more complex chemicals. It forms several chemicals, such as cumene, acrylonitrile, acrylic acid, and propylene oxide.",
        id: "Propilena adalah bahan kimia dasar yang digunakan untuk menciptakan bahan kimia yang lebih kompleks, seperti kumena, akrilonitril, asam akrilat, dan propilena oksida.",
      },
      mainFunction: {
        en: "Propylene is used as raw material to produce Polypropylene (PP), and other chemicals",
        id: "Propilena digunakan sebagai bahan baku untuk memproduksi Polipropilena (PP) dan bahan kimia lainnya.",
      },
      inputs: ["ethylene-cracker-plant"],
      outputs: ["polypropylene-plant"],
    },

    "raw-c4": {
      id: "raw-c4",
      name: "RAW C-4",
      fullName: "Raw C-4 (Crude C-4)",
      iconType: "flask",
      category: "product",
      zone: "upstream",
      definition: {
        en: "Raw C-4 or Crude C-4 is a multi-component of hydrocarbon gas mixture containing molecules with four carbon atoms that produced in the cracking plant from the primary feedstock",
        id: "Raw C-4 atau Crude C-4 adalah campuran gas hidrokarbon multi-komponen yang mengandung molekul dengan empat atom karbon yang dihasilkan di pabrik perengkahan dari bahan baku utama.",
      },
      mainFunction: {
        en: "As the main material to produce Butadiene and Raff-1 through Extractive Distillation Process.",
        id: "Sebagai bahan utama untuk memproduksi Butadiena dan Raff-1 melalui Proses Distilasi Ekstraktif.",
      },
      inputs: ["ethylene-cracker-plant"],
      outputs: ["butadiene-plant"],
    },

    "pygas": {
      id: "pygas",
      name: "PYGAS",
      fullName: "Pyrolysis Gasoline (Pygas)",
      iconType: "flask",
      category: "product",
      zone: "upstream",
      definition: {
        en: "Pyrolysis Gasoline (Pygas) is a high-octane gasoline number mixture that contains high aromatics content.",
        id: "Pyrolysis Gasoline (Pygas) adalah campuran bensin beroktan tinggi yang memiliki kandungan aromatik tinggi.",
      },
      mainFunction: {
        en: "Pygas (Pyrolysis Gasoline) contains aromatics which can be further processed to produce many high-value-added products such as Benzene, Toluene, and Xylene. Pygas is mainly sold to regional customers.",
        id: "Pygas mengandung senyawa aromatik yang dapat diproses lebih lanjut untuk menghasilkan produk bernilai tambah tinggi seperti Benzena, Toluena, dan Xilena. Pygas utamanya dijual kepada pelanggan regional.",
      },
      inputs: ["ethylene-cracker-plant"],
      outputs: [],
    },

    "pfo": {
      id: "pfo",
      name: "PFO",
      fullName: "Pyrolysis Fuel Oil (PFO)",
      iconType: "flask",
      category: "product",
      zone: "upstream",
      definition: {
        en: "Pyrolysis Fuel Oil (PFO) is the bottom product of Naphtha steam cracking. It is a viscous liquid that contains a mixture of heavier aromatic hydrocarbons (C10 & above).",
        id: "Pyrolysis Fuel Oil (PFO) adalah produk dasar dari steam cracking Nafta. Berupa cairan kental yang mengandung campuran hidrokarbon aromatik yang lebih berat (C10 ke atas).",
      },
      mainFunction: {
        en: "PFO processed in the PFO stripper from Gasoline Fractionator to produced PFO, then PFO can be used as raw material for carbon black or utilize as a fuel",
        id: "PFO diproses pada PFO stripper dari Fraksinator Bensin untuk menghasilkan PFO, yang kemudian dapat digunakan sebagai bahan baku pembuatan carbon black atau dimanfaatkan sebagai bahan bakar.",
      },
      inputs: ["ethylene-cracker-plant"],
      outputs: [],
    },

    // ---------------- INTERMEDIATE: PLANTS ----------------
    "polyethylene-plant": {
      id: "polyethylene-plant",
      name: "POLYETHYLENE PLANT",
      fullName: "Polyethylene Plant",
      iconType: "plant",
      category: "facility",
      zone: "intermediate",
      mainFunction: {
        en: "A facility that produced polyethylene products such as HDPE and LLDPE where Chandra Asri has three trains of polyethylene plant that produced over than 730 KTA.",
        id: "Fasilitas yang memproduksi produk polietilena seperti HDPE dan LLDPE di mana Chandra Asri memiliki tiga lini produksi pabrik polietilena yang memproduksi lebih dari 730 KTA.",
      },
      inputs: ["ethylene"],
      outputs: ["hdpe", "lldpe"],
    },

    "styrene-monomer-plant": {
      id: "styrene-monomer-plant",
      name: "STYRENE MONOMER PLANT",
      fullName: "Styrene Monomer Plant",
      iconType: "plant",
      category: "facility",
      zone: "intermediate",
      mainFunction: {
        en: "A facility that produced styrene monomer and toluene products where Chandra Asri has two trains of styrene monomer plant that produced 340 KTA.",
        id: "Fasilitas yang memproduksi produk stirena monomer dan toluena di mana Chandra Asri memiliki dua lini produksi pabrik stirena monomer berkapasitas 340 KTA.",
      },
      inputs: ["ethylene"],
      outputs: ["styrene-monomer", "toluene"],
    },

    "polypropylene-plant": {
      id: "polypropylene-plant",
      name: "POLYPROPYLENE PLANT",
      fullName: "Polypropylene Plant",
      iconType: "plant",
      category: "facility",
      zone: "intermediate",
      mainFunction: {
        en: "A facility that produced variety of polypropylene products such as Homo, Random, and Impact where Chandra Asri has three trains of propylene plant that produced 590 KTA.",
        id: "Fasilitas yang memproduksi berbagai macam produk polipropilena seperti Homo, Random, dan Impact di mana Chandra Asri memiliki tiga lini produksi berkapasitas 590 KTA.",
      },
      inputs: ["propylene"],
      outputs: ["homo-pp", "random-pp", "impact-pp"],
    },

    "butadiene-plant": {
      id: "butadiene-plant",
      name: "BUTADIENE PLANT",
      fullName: "Butadiene Plant",
      iconType: "plant",
      category: "facility",
      zone: "intermediate",
      mainFunction: {
        en: "A facility that produced Butadiene and Raff-1 where Chandra Asri has butadiene plant that produced 137 KTA.",
        id: "Fasilitas yang memproduksi Butadiena dan Raff-1 di mana Chandra Asri memiliki pabrik butadiena berkapasitas 137 KTA.",
      },
      inputs: ["raw-c4"],
      outputs: ["butadiene", "raff-1"],
    },

    // ---------------- INTERMEDIATE: DERIVATIVE PRODUCTS ----------------
    "hdpe": {
      id: "hdpe",
      name: "HDPE",
      fullName: "High-Density Polyethylene (HDPE)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "HDPE (High-Density Polyethylene) is impact-resistant and durable, making it suitable for producing plastics that are resilient in many conditions. HDPE is a thermoplastic with high durability and low flexibility that has high crystallinity up to 80%.",
        id: "HDPE (High-Density Polyethylene) tahan benturan dan tahan lama, menjadikannya cocok untuk memproduksi plastik yang tangguh dalam berbagai kondisi. HDPE adalah termoplastik dengan daya tahan tinggi dan fleksibilitas rendah yang memiliki kristalinitas hingga 80%.",
      },
      mainFunction: {
        en: "With its form, HDPE in the downstream industry utilize as raw material to produce such as packaging industry (bottle spray, bottle tray), construction industry (water pipes, culvert pipes), food and beverage industry (milk bottle, water gallon, etc), and many more.",
        id: "Dalam industri hilir dimanfaatkan sebagai bahan baku untuk industri kemasan (botol semprot, baki botol), industri konstruksi (pipa air, pipa gorong-gorong), industri makanan dan minuman (botol susu, galon air, dll), dan banyak lagi.",
      },
      inputs: ["polyethylene-plant"],
      outputs: [],
    },

    "lldpe": {
      id: "lldpe",
      name: "LLDPE",
      fullName: "Linear Low-Density Polyethylene (LLDPE)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "LLDPE (Linear Low-Density Polyethylene) is a thermoplastic commodity that can be formed into very thin, tear-resistant sheets, and has shorter molecular chains.",
        id: "LLDPE (Linear Low-Density Polyethylene) adalah komoditas termoplastik yang dapat dibentuk menjadi lembaran sangat tipis dan tahan robek, serta memiliki rantai molekul yang lebih pendek.",
      },
      mainFunction: {
        en: "With its form, LLDPE application uses in the downstream industry to produce such as bubble wrap, trash bag, shopping bag, plastic bucket, shampoo sachet packaging, and many more.",
        id: "Aplikasinya pada industri hilir digunakan untuk memproduksi bubble wrap, kantong sampah, kantong belanja, ember plastik, kemasan sachet sampo, dan banyak lagi.",
      },
      inputs: ["polyethylene-plant"],
      outputs: [],
    },

    "styrene-monomer": {
      id: "styrene-monomer",
      name: "STYRENE MONOMER",
      fullName: "Styrene Monomer (SM)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "Styrene Monomer is an organic monomer aromatics compound with a purity of >99.8% and used as raw material to produced various of products.",
        id: "Stirena Monomer adalah senyawa aromatik monomer organik dengan kemurnian >99,8% dan digunakan sebagai bahan baku untuk memproduksi berbagai macam produk.",
      },
      mainFunction: {
        en: "Styrene Monomer is a compound that plays a crucial role in many sectors with derivative products such as Acrylonitrile Butadiene Styrene (used for automotive parts and electrical components), Polystyrene (used in household appliances including food containers and drinking bottle), Unsaturated Polyester Resin (used to make pipes and fiberglass), Expanded Polystyrene (used for building insulation), Styrene-Butadiene Latex (used to make carpets), Styrene Acrylonitrile (used to make tableware and kitchen utensils), and Styrene-Butadiene Rubber (used to make shoe soles and vehicle tires)",
        id: "Senyawa penting dalam berbagai sektor dengan produk turunan seperti ABS (komponen otomotif dan elektronik), Polistirena (perabot rumah tangga, wadah makanan), Unsaturated Polyester Resin (pipa & fiberglass), EPS (insulasi bangunan), Lateks SBR (karpet), SAN (peralatan makan & dapur), dan Karet SBR (sol sepatu & ban kendaraan).",
      },
      inputs: ["styrene-monomer-plant"],
      outputs: [],
    },

    "toluene": {
      id: "toluene",
      name: "TOLUENE",
      fullName: "Toluene (Toluena)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "Toluene is a precursor aromatic hydrocarbon material with purity >98.5% purity and is produced as a by-product of Styrene Monomer production.",
        id: "Toluena adalah bahan hidrokarbon aromatik prekursor dengan kemurnian >98,5% dan diproduksi sebagai produk sampingan dari produksi Stirena Monomer.",
      },
      mainFunction: {
        en: "Toluene is commonly used to solvent in various of application such as paint thinner, permanent markers, and certain glues.",
        id: "Toluena umumnya digunakan sebagai pelarut dalam berbagai aplikasi seperti pengencer cat (thinner), spidol permanen, dan perekat tertentu.",
      },
      inputs: ["styrene-monomer-plant"],
      outputs: [],
    },

    "homo-pp": {
      id: "homo-pp",
      name: "HOMO-PP",
      fullName: "Homopolymer Polypropylene (Homo-PP)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "Homo-PP (Homopolymer Polypropylene) is a variety of polypropylene with one reactor and no ethylene contents.",
        id: "Homo-PP (Homopolymer Polypropylene) adalah varian polipropilena dengan satu reaktor dan tanpa kandungan etilena.",
      },
      mainFunction: {
        en: "Homo-PP has rigid and glossy properties, the application uses for thin wall, bottle caps, plastic furniture, houseware, and many more.",
        id: "Memiliki sifat kaku dan berkilau, aplikasinya digunakan untuk wadah dinding tipis (thin wall), tutup botol, furnitur plastik, peralatan rumah tangga, dan lainnya.",
      },
      inputs: ["polypropylene-plant"],
      outputs: [],
    },

    "random-pp": {
      id: "random-pp",
      name: "RANDOM-PP",
      fullName: "Random Polypropylene (Random-PP)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "Random-PP (Random Polypropylene) is polymerization between propylene and specific portion of ethylene.",
        id: "Random-PP (Random Polypropylene) adalah hasil polimerisasi antara propilena dan sejumlah porsi tertentu dari etilena.",
      },
      mainFunction: {
        en: "Random-PP has clear and tough properties, the application uses for food & drink container, beauty product platform, medical component platform, and many more.",
        id: "Memiliki sifat bening dan kuat, aplikasinya digunakan untuk wadah makanan & minuman, kemasan produk kecantikan, komponen medis, dan banyak lagi.",
      },
      inputs: ["polypropylene-plant"],
      outputs: [],
    },

    "impact-pp": {
      id: "impact-pp",
      name: "IMPACT-PP",
      fullName: "Impact Polypropylene (Impact-PP / Block-PP)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "Block-PP/Impact-PP (Impact Polypropylene) consist of propylene and ethylene in the rubbery phase. Impact-PP has two reactors in series and ethylene content by 7-9% (low rubber) or up to 15% (high rubber).",
        id: "Block-PP/Impact-PP (Impact Polypropylene) terdiri dari propilena dan etilena dalam fase karet. Impact-PP memiliki dua reaktor seri dengan kandungan etilena 7-9% (low rubber) atau hingga 15% (high rubber).",
      },
      mainFunction: {
        en: "Impact-PP has rigid, strength, and flexible properties, the application uses for car bumper, car dashboard, automotive parts, battery case, washing machine box, and many more.",
        id: "Memiliki sifat kaku, kuat, dan lentur, aplikasinya digunakan untuk bumper mobil, dasbor mobil, suku cadang otomotif, kotak baterai/aki, tabung mesin cuci, dan banyak lagi.",
      },
      inputs: ["polypropylene-plant"],
      outputs: [],
    },

    "butadiene": {
      id: "butadiene",
      name: "BUTADIENE",
      fullName: "1,3-Butadiene (C4H6)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "C4H6 or also known as 1,3-Butadiene, is a simple conjugated diene. It is mainly derived using an extractive distillation process from the Crude C4 stream.",
        id: "C4H6 atau dikenal sebagai 1,3-Butadiena, adalah diena terkonjugasi sederhana. Terutama diperoleh menggunakan proses distilasi ekstraktif dari aliran Crude C4.",
      },
      mainFunction: {
        en: "Butadiene is polymerized to produce many products such as Styrene Butadiene Rubber (used to make various tire such as Formula-1 and common cars), Styrene Butadiene Latex (used to make carpets), Acrylonitrile Butadiene Styrene (used to make computer housing), Styrene Acrylonitrile (used to make juicer), Poly-Butadiene (used to make golf-ball), Neoprene (used to make conveyor belt), and Nitrile Rubber (used to make gasket).",
        id: "Butadiena dipolimerisasi untuk menghasilkan berbagai produk seperti Karet SBR (ban mobil & Formula-1), Lateks SBR (karpet), ABS (casing komputer), SAN (juicer), Poli-butadiena (bola golf), Neoprene (conveyor belt), dan Karet Nitril (gasket).",
      },
      inputs: ["butadiene-plant"],
      outputs: [],
    },

    "raff-1": {
      id: "raff-1",
      name: "RAFF-1",
      fullName: "Raffinate-1 (Raff-1)",
      iconType: "flask",
      category: "product",
      zone: "intermediate",
      definition: {
        en: "Raff-1 (Raffinate-1) consists of Isobutylene, Butene-1, Butene-2 and small amounts of Butanes and other compounds.",
        id: "Raff-1 (Raffinate-1) terdiri dari Isobutilena, Butena-1, Butena-2, serta sejumlah kecil Butana dan senyawa lainnya.",
      },
      mainFunction: {
        en: "Raff-1 has Isobutylene where it is main material for Methyl Tertiary Butyl Ether or MTBE (used as an Octane Booster for gasoline) and Di-Isobutylene.",
        id: "Raff-1 mengandung Isobutilena yang merupakan bahan utama untuk MTBE (Methyl Tertiary Butyl Ether - peningkat oktan bensin) dan Di-Isobutilena.",
      },
      inputs: ["butadiene-plant"],
      outputs: [],
    },
  },
}

