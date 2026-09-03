export type NodeCategory = "feedstock" | "facility" | "product" | "customer"
export type FlowZone = "bukom" | "jurong" | "subsea"

export interface LocalizedString {
  id: string
  en: string
}

export interface FlowNode {
  id: string
  name: string
  fullName?: string
  icon: string
  category: NodeCategory
  zone: FlowZone
  column: "feedstocks" | "fuel_oil" | "cracker" | "base_chemicals" | "intermediates_facilities" | "derivatives" | "customers"
  description: LocalizedString
  subtext?: LocalizedString
  footnote?: LocalizedString
  applications?: LocalizedString[]
  keyFeatures?: LocalizedString[]
  inputs?: string[] // node ids
  outputs?: string[] // node ids
}

export interface FlowSection {
  id: string
  title: LocalizedString
  zone: FlowZone
  nodeIds: string[]
}

export interface FlowData {
  meta: {
    title: LocalizedString
    subtitle: LocalizedString
    description: LocalizedString
    footnotes: LocalizedString[]
  }
  categories: {
    id: NodeCategory
    label: LocalizedString
    bgClass: string
    textClass: string
    borderClass: string
  }[]
  zones: {
    id: FlowZone
    name: LocalizedString
    description?: LocalizedString
  }[]
  nodes: Record<string, FlowNode>
}

export const PRODUCT_FLOW_DATA: FlowData = {
  meta: {
    title: {
      id: "Fasilitas Energi dan Kimia Terintegrasi di Singapura",
      en: "Integrated Energy and Chemicals Platform Based in Singapore",
    },
    subtitle: {
      id: "Solusi Terpadu Hulu hingga Hilir",
      en: "End-to-End Integrated Upstream & Downstream Solutions",
    },
    description: {
      id: "Kompleks refinery dan kimia yang dioperasikan oleh Aster, serta seluruh stasiun pengisian bahan bakar umum (SPBU) bermerek Esso di Singapura.",
      en: "Refinery and chemical complex operated by Aster, and all Esso-branded petrol stations in Singapore.",
    },
    footnotes: [
      {
        id: "1. Polietilena Berdensitas Tinggi yang Baru Diakuisisi (Newly Acquired High-Density Polyethylene)",
        en: "1. Newly Acquired High-Density Polyethylene",
      },
    ],
  },
  categories: [
    {
      id: "feedstock",
      label: { id: "Bahan Baku (Feedstock)", en: "Feedstock" },
      bgClass: "bg-white",
      textClass: "text-[#062C48]",
      borderClass: "border-[#062C48]/30",
    },
    {
      id: "facility",
      label: { id: "Fasilitas Chandra Asri", en: "Chandra Asri Facilities" },
      bgClass: "bg-[#0082C8]",
      textClass: "text-white",
      borderClass: "border-[#0082C8]",
    },
    {
      id: "product",
      label: { id: "Produk Chandra Asri", en: "Chandra Asri Products" },
      bgClass: "bg-white",
      textClass: "text-[#0082C8]",
      borderClass: "border-[#00A3E0]",
    },
    {
      id: "customer",
      label: { id: "Pelanggan & Konsumen", en: "Customers" },
      bgClass: "bg-[#0F172A]",
      textClass: "text-white",
      borderClass: "border-[#0F172A]",
    },
  ],
  zones: [
    {
      id: "bukom",
      name: { id: "Pulau Bukom", en: "Bukom Island" },
      description: {
        id: "Pusat Pengilangan (Refinery) dan Ethylene Cracker Complex",
        en: "Refinery Center and Ethylene Cracker Complex Hub",
      },
    },
    {
      id: "subsea",
      name: { id: "Pipa Bawah Laut", en: "Subsea pipeline" },
      description: {
        id: "Jaringan transmisi pipa bawah laut terintegrasi Bukom ke Jurong",
        en: "Integrated subsea pipeline transmitting base chemicals to Jurong Island",
      },
    },
    {
      id: "jurong",
      name: { id: "Pulau Jurong", en: "Jurong Island" },
      description: {
        id: "Pusat Bahan Kimia Dasar, Fasilitas MEG & Turunan SMPO/PO",
        en: "Base Chemicals Hub, MEG Plant & SMPO / PO Derivatives Facilities",
      },
    },
  ],
  nodes: {
    // ----------------------------------------------------
    // FEEDSTOCKS & REFINERY (BUKOM)
    // ----------------------------------------------------
    "crude-oil": {
      id: "crude-oil",
      name: "CRUDE OIL",
      fullName: "Crude Petroleum Oil",
      icon: "crude-oil",
      category: "feedstock",
      zone: "bukom",
      column: "feedstocks",
      description: {
        id: "Minyak mentah yang diimpor dari berbagai sumber global sebagai bahan baku utama fasilitas pengilangan.",
        en: "Crude oil imported globally as the primary feedstock for refinery processing operations.",
      },
      applications: [
        { id: "Bahan baku pengolahan kilang minyak", en: "Refinery processing feedstock" },
        { id: "Sumber fraksinasi hidrokarbon", en: "Hydrocarbon fractionation source" },
      ],
      outputs: ["refinery-complex"],
    },
    "refinery-complex": {
      id: "refinery-complex",
      name: "REFINERY COMPLEX",
      fullName: "Bukom Integrated Refinery Complex",
      icon: "refinery",
      category: "facility",
      zone: "bukom",
      column: "feedstocks",
      description: {
        id: "Fasilitas pengilangan minyak kelas dunia di Pulau Bukom yang memproses minyak mentah menjadi berbagai produk bahan bakar dan bahan baku petrokimia.",
        en: "World-scale refinery facility on Bukom Island converting crude oil into fuels, specialty oils, and petrochemical feedstocks.",
      },
      applications: [
        { id: "Distilasi atmosferik dan vakum", en: "Atmospheric and vacuum distillation" },
        { id: "Konversi dan reforming katalitik", en: "Conversion and catalytic reforming" },
      ],
      inputs: ["crude-oil"],
      outputs: ["lpg", "naphtha", "hydrowax", "gas-oil", "mogas", "jet-fuel", "base-oil", "bitumen-fuel-oil"],
    },

    // ----------------------------------------------------
    // FUEL & OIL PRODUCTS (BUKOM)
    // ----------------------------------------------------
    lpg: {
      id: "lpg",
      name: "LPG",
      fullName: "Liquefied Petroleum Gas",
      icon: "lpg",
      category: "product",
      zone: "bukom",
      column: "fuel_oil",
      description: {
        id: "Gas minyak cair (propana dan butana) yang digunakan sebagai bahan bakar rumah tangga, industri, dan bahan baku perengkahan (cracking).",
        en: "Liquefied petroleum gas used as domestic fuel, industrial energy, and light cracking feedstock.",
      },
      applications: [
        { id: "Bahan baku perengkahan olefin", en: "Olefin cracker feedstock" },
        { id: "Bahan bakar energi & industri", en: "Commercial & industrial heating fuel" },
      ],
      inputs: ["refinery-complex"],
      outputs: ["ethylene-cracker"],
    },
    naphtha: {
      id: "naphtha",
      name: "NAPHTHA",
      fullName: "Light & Heavy Naphtha",
      icon: "naphtha",
      category: "product",
      zone: "bukom",
      column: "fuel_oil",
      description: {
        id: "Fraksi hidrokarbon cair ringan yang merupakan bahan baku utama untuk Ethylene Cracker Complex dalam menghasilkan olefin.",
        en: "Light liquid hydrocarbon fraction acting as the primary feedstock for the Ethylene Cracker Complex to generate olefins.",
      },
      applications: [
        { id: "Bahan baku utama cracker etilena", en: "Main steam cracker feedstock" },
        { id: "Pelarut kimia dan blending bensin", en: "Chemical solvents & gasoline blending" },
      ],
      inputs: ["refinery-complex"],
      outputs: ["ethylene-cracker"],
    },
    hydrowax: {
      id: "hydrowax",
      name: "HYDROWAX",
      fullName: "Hydrocracked Vacuum Gas Oil / Hydrowax",
      icon: "hydrowax",
      category: "product",
      zone: "bukom",
      column: "fuel_oil",
      description: {
        id: "Produk residu hasil hydrocracking berkualitas tinggi yang sangat baik sebagai umpan cracker dan minyak pelumas dasar.",
        en: "High-quality unconverted oil from hydrocracking units, ideal as premium steam cracker feed.",
      },
      applications: [
        { id: "Umpan efisiensi tinggi pada cracker", en: "High-yield ethylene cracker feed" },
        { id: "Sintesis pelumas mutu tinggi", en: "High-performance lubricant synthesis" },
      ],
      inputs: ["refinery-complex"],
      outputs: ["ethylene-cracker"],
    },
    "gas-oil": {
      id: "gas-oil",
      name: "GAS OIL",
      fullName: "Diesel / Gas Oil",
      icon: "gas-oil",
      category: "product",
      zone: "bukom",
      column: "fuel_oil",
      description: {
        id: "Bahan bakar diesel untuk transportasi darat, laut, armada industri, dan sebagian sebagai umpan cracker.",
        en: "Diesel and gas oil for automotive transport, marine fleets, industrial machinery, and secondary cracker feedstock.",
      },
      applications: [
        { id: "Bahan bakar transportasi & logistik", en: "Transport & industrial diesel fuel" },
        { id: "Umpan penyeimbang perengkahan", en: "Secondary steam cracking feed" },
      ],
      inputs: ["refinery-complex"],
      outputs: ["ethylene-cracker"],
    },
    mogas: {
      id: "mogas",
      name: "MOGAS",
      fullName: "Motor Gasoline (Petrol)",
      icon: "mogas",
      category: "product",
      zone: "bukom",
      column: "fuel_oil",
      description: {
        id: "Bensin kendaraan bermotor bermutu tinggi yang didistribusikan ke jaringan SPBU Esso di Singapura dan pasar ekspor regional.",
        en: "High-grade motor gasoline supplied to Esso-branded retail service station network in Singapore and regional export markets.",
      },
      applications: [
        { id: "Bahan bakar SPBU retail Esso", en: "Esso retail fuel stations" },
        { id: "Kendaraan penumpang & komersial", en: "Passenger & commercial automotive" },
      ],
      inputs: ["refinery-complex"],
      outputs: ["customers-bukom"],
    },
    "jet-fuel": {
      id: "jet-fuel",
      name: "JET FUEL",
      fullName: "Aviation Turbine Fuel (Jet A-1)",
      icon: "jet-fuel",
      category: "product",
      zone: "bukom",
      column: "fuel_oil",
      description: {
        id: "Bahan bakar penerbangan berstandar internasional untuk melayani hub penerbangan Bandara Changi Singapura dan maskapai global.",
        en: "Premium aviation turbine fuel meeting international specs, fueling global airlines and Singapore Changi Airport hub.",
      },
      applications: [
        { id: "Bahan bakar pesawat terbang komersial", en: "Commercial aviation fuel" },
        { id: "Penerbangan militer & kargo", en: "Cargo and transport aviation" },
      ],
      inputs: ["refinery-complex"],
      outputs: ["customers-bukom"],
    },
    "base-oil": {
      id: "base-oil",
      name: "BASE OIL",
      fullName: "Lubricant Base Oil",
      icon: "base-oil",
      category: "product",
      zone: "bukom",
      column: "fuel_oil",
      description: {
        id: "Minyak pelumas dasar berkualitas tinggi yang digunakan untuk formulasi oli mesin, transmisi, dan pelumas industri.",
        en: "High-specification base oil utilized for formulating automotive engine oils, gear oils, and specialized industrial lubricants.",
      },
      applications: [
        { id: "Formulasi oli mesin & transmisi", en: "Engine and transmission lubricants" },
        { id: "Cairan hidrolik & pelumas industri", en: "Hydraulic fluids & industrial greases" },
      ],
      inputs: ["refinery-complex"],
      outputs: ["customers-bukom"],
    },
    "bitumen-fuel-oil": {
      id: "bitumen-fuel-oil",
      name: "BITUMEN/ FUEL OIL",
      fullName: "Bitumen / Heavy Fuel Oil",
      icon: "bitumen",
      category: "product",
      zone: "bukom",
      column: "fuel_oil",
      description: {
        id: "Bitumen (aspal) untuk infrastruktur jalan raya serta fuel oil untuk bunker kapal laut dan pembangkit tenaga.",
        en: "Bitumen for road construction & infrastructure, along with marine fuel oil for international bunkering.",
      },
      applications: [
        { id: "Konstruksi jalan & infrastruktur", en: "Road paving & infrastructure" },
        { id: "Bahan bakar kapal laut (bunkering)", en: "Marine shipping bunkering" },
      ],
      inputs: ["refinery-complex"],
      outputs: ["customers-bukom"],
    },

    // ----------------------------------------------------
    // ETHYLENE CRACKER COMPLEX & CUSTOMERS (BUKOM)
    // ----------------------------------------------------
    "ethylene-cracker": {
      id: "ethylene-cracker",
      name: "ETHYLENE CRACKER COMPLEX",
      fullName: "Bukom Steam Ethylene Cracker",
      icon: "cracker",
      category: "facility",
      zone: "bukom",
      column: "cracker",
      description: {
        id: "Pabrik perengkahan uap canggih yang mengubah naphtha, LPG, hydrowax, dan gas oil menjadi olefin dasar bernilai tinggi.",
        en: "Advanced steam cracker plant converting liquid and gas feeds into critical chemical building blocks (olefins).",
      },
      applications: [
        { id: "Perengkahan termal hidrokarbon", en: "Thermal steam cracking" },
        { id: "Produksi etilena, propilena, butadiena, aromatik", en: "Ethylene, propylene, butadiene & aromatics production" },
      ],
      inputs: ["lpg", "naphtha", "hydrowax", "gas-oil"],
      outputs: ["customers-bukom", "ethylene", "propylene", "benzene", "butadiene"],
    },
    "customers-bukom": {
      id: "customers-bukom",
      name: "CUSTOMERS",
      fullName: "Domestic & Regional End Markets",
      icon: "customers",
      category: "customer",
      zone: "bukom",
      column: "customers",
      description: {
        id: "Jaringan pelanggan energi, transportasi, SPBU Esso, dan industri konsumen hilir di Singapura dan Asia Pasifik.",
        en: "Energy off-takers, aviation, marine bunkering, retail Esso station drivers, and downstream industrial buyers.",
      },
      inputs: ["mogas", "jet-fuel", "base-oil", "bitumen-fuel-oil", "ethylene-cracker"],
    },

    // ----------------------------------------------------
    // BASE CHEMICALS (JURONG ISLAND - VIA SUBSEA PIPELINE)
    // ----------------------------------------------------
    ethylene: {
      id: "ethylene",
      name: "ETHYLENE",
      fullName: "Polymer-Grade Ethylene (C2H4)",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "base_chemicals",
      description: {
        id: "Bahan kimia dasar etilena murni yang dialirkan via pipa bawah laut menuju fasilitas MEG dan polietilena di Pulau Jurong.",
        en: "Pure monomer ethylene transferred via subsea pipeline for MEG production and high-density polyethylene polymer synthesis.",
      },
      applications: [
        { id: "Bahan baku sintesis MEG & SMPO", en: "Feedstock for MEG & SMPO production" },
        { id: "Polimerisasi HDPE & LDPE", en: "HDPE & LDPE polymerization" },
      ],
      inputs: ["ethylene-cracker"],
      outputs: ["meg-facility", "smpo-facility", "hdpe"],
    },
    propylene: {
      id: "propylene",
      name: "PROPYLENE",
      fullName: "Chemical / Polymer-Grade Propylene (C3H6)",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "base_chemicals",
      description: {
        id: "Monomer propilena yang dialirkan untuk pembuatan Propylene Oxide (PO), polipropilena, dan turunan kimia lainnya.",
        en: "Chemical building block delivered to Jurong Island for Propylene Oxide (PO) and downstream oxo-alcohols.",
      },
      applications: [
        { id: "Bahan baku SMPO & PO derivatives", en: "Feedstock for SMPO & PO derivatives" },
        { id: "Plastik polipropilena & pelarut", en: "Polypropylene plastics & solvents" },
      ],
      inputs: ["ethylene-cracker"],
      outputs: ["meg-facility", "smpo-facility"],
    },
    benzene: {
      id: "benzene",
      name: "BENZENE",
      fullName: "High-Purity Benzene (C6H6)",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "base_chemicals",
      description: {
        id: "Senyawa aromatik murni yang digunakan sebagai bahan baku sintesis Styrene Monomer (SM) pada unit SMPO.",
        en: "Pure aromatic hydrocarbon used as essential building block for Styrene Monomer (SM) synthesis in the SMPO plant.",
      },
      applications: [
        { id: "Sintesis monomer stirena (SM)", en: "Styrene Monomer (SM) synthesis" },
        { id: "Resin polimer & nilon", en: "Engineering resins & polymers" },
      ],
      inputs: ["ethylene-cracker"],
      outputs: ["meg-facility", "smpo-facility"],
    },
    butadiene: {
      id: "butadiene",
      name: "BUTADIENE",
      fullName: "1,3-Butadiene (C4H6)",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "base_chemicals",
      description: {
        id: "Diena hidrokarbon reaktif untuk pembuatan karet sintetis, resin ABS, dan kopolimer polimer berperforma tinggi.",
        en: "Highly reactive diene hydrocarbon used in synthetic rubbers, ABS engineering plastics, and specialty elastomers.",
      },
      applications: [
        { id: "Karet sintetis SBR & PBR", en: "Synthetic rubbers (SBR, PBR)" },
        { id: "Resin ABS & pelapis lateks", en: "ABS resins & latex coatings" },
      ],
      inputs: ["ethylene-cracker"],
      outputs: ["meg-facility", "smpo-facility"],
    },

    // ----------------------------------------------------
    // INTERMEDIATES FACILITIES (JURONG)
    // ----------------------------------------------------
    "meg-facility": {
      id: "meg-facility",
      name: "MEG",
      fullName: "Monoethylene Glycol (MEG) Production Plant",
      icon: "meg-plant",
      category: "facility",
      zone: "jurong",
      column: "intermediates_facilities",
      description: {
        id: "Fasilitas produksi MEG mutakhir di Pulau Jurong yang mengonversi olefin etilena menjadi Ethoxylates, HPEO, dan Monoethylene Glycol.",
        en: "State-of-the-art MEG manufacturing facility on Jurong Island producing Ethoxylates, HPEO, and MEG for global markets.",
      },
      applications: [
        { id: "Oksidasi etilena katalitik", en: "Catalytic ethylene oxidation" },
        { id: "Pemurnian HPEO & glikol", en: "HPEO purification & glycol hydration" },
      ],
      inputs: ["ethylene", "propylene", "benzene", "butadiene"],
      outputs: ["ethoxylates", "hpeo", "meg-product"],
    },
    "smpo-facility": {
      id: "smpo-facility",
      name: "SMPO & PO DERIVATIVES",
      fullName: "Styrene Monomer & Propylene Oxide Derivatives Complex",
      icon: "smpo-plant",
      category: "facility",
      zone: "jurong",
      column: "intermediates_facilities",
      description: {
        id: "Kompleks terintegrasi SMPO & Turunan PO di Pulau Jurong yang memproses olefin dan aromatik menjadi PO, Styrene Monomer, Monopropylene Glycol (MPG), dan Polyols.",
        en: "Integrated SMPO and downstream PO derivatives complex manufacturing PO, Styrene Monomer, MPG, and Polyols.",
      },
      applications: [
        { id: "Koproduksi PO dan Monomer Stirena", en: "Co-production of PO and Styrene Monomer" },
        { id: "Sintesis MPG dan Polieter Poliol", en: "Synthesis of MPG and Polyether Polyols" },
      ],
      inputs: ["ethylene", "propylene", "benzene", "butadiene"],
      outputs: ["po", "sm", "mpg", "polyols"],
    },

    // ----------------------------------------------------
    // INTERMEDIATES & DERIVATIVES PRODUCTS (JURONG)
    // ----------------------------------------------------
    ethoxylates: {
      id: "ethoxylates",
      name: "ETHOXYLATES",
      fullName: "Fatty Alcohol & Specialty Ethoxylates",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "derivatives",
      description: {
        id: "Surfaktan non-ionik penting untuk industri deterjen rumah tangga, pembersih industri, perawatan pribadi, dan agrikultur.",
        en: "Key non-ionic surfactants for home detergents, industrial cleaners, personal care formulations, and agrochemicals.",
      },
      applications: [
        { id: "Deterjen & pembersih rumah tangga", en: "Household detergents & cleaning" },
        { id: "Produk perawatan pribadi & kosmetik", en: "Personal care & cosmetics" },
      ],
      inputs: ["meg-facility"],
      outputs: ["customers-jurong"],
    },
    hpeo: {
      id: "hpeo",
      name: "HPEO",
      fullName: "High Purity Ethylene Oxide",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "derivatives",
      description: {
        id: "Etilena oksida berkemurnian tinggi untuk bahan perantara kimia khusus, zat peningkat kinerja beton, dan farmasi.",
        en: "Ultra-pure ethylene oxide used in specialty chemical intermediates, polycarboxylate ether (PCE) concrete admixtures, and pharma.",
      },
      applications: [
        { id: "PCE pereduksi air beton (konstruksi)", en: "Polycarboxylate concrete admixtures" },
        { id: "Bahan kimia khusus & farmasi", en: "Specialty chemicals & pharmaceuticals" },
      ],
      inputs: ["meg-facility"],
      outputs: ["customers-jurong"],
    },
    "meg-product": {
      id: "meg-product",
      name: "MEG",
      fullName: "Monoethylene Glycol (Purified)",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "derivatives",
      description: {
        id: "Senyawa kimia esensial untuk pembuatan serat poliester tekstil, resin botol PET daur ulang, dan cairan pendingin pendingin.",
        en: "Essential chemical intermediate for polyester textile fibers, PET packaging resins, and automotive engine coolants.",
      },
      applications: [
        { id: "Serat poliester kain & tekstil", en: "Polyester apparel & textile fibers" },
        { id: "Kemasan botol PET & pendingin mesin", en: "PET packaging bottles & coolants" },
      ],
      inputs: ["meg-facility"],
      outputs: ["customers-jurong"],
    },
    po: {
      id: "po",
      name: "PO",
      fullName: "Propylene Oxide",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "derivatives",
      description: {
        id: "Bahan kimia perantara serbaguna untuk memproduksi polieter poliol (busa poliuretan), glikol propilena, dan surfaktan.",
        en: "Versatile chemical building block for producing polyether polyols (polyurethane foams), propylene glycols, and surfactants.",
      },
      applications: [
        { id: "Bahan baku utama poliol & MPG", en: "Key feed for polyols & MPG" },
        { id: "Busa fleksibel & insulasi kaku", en: "Flexible foams & rigid insulation" },
      ],
      inputs: ["smpo-facility"],
      outputs: ["customers-jurong"],
    },
    sm: {
      id: "sm",
      name: "SM",
      fullName: "Styrene Monomer",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "derivatives",
      description: {
        id: "Monomer cair untuk pembuatan polistirena (PS, EPS), ABS untuk komponen elektronik/otomotif, dan karet SBR.",
        en: "Liquid monomer for polystyrene plastics (PS, EPS), automotive ABS resins, and synthetic elastomer compounds.",
      },
      applications: [
        { id: "Plastik kemasan & kotak elektronik PS/EPS", en: "PS/EPS packaging & appliances" },
        { id: "Komponen otomotif ABS & ban karet", en: "Automotive ABS parts & tires" },
      ],
      inputs: ["smpo-facility"],
      outputs: ["customers-jurong"],
    },
    mpg: {
      id: "mpg",
      name: "MPG",
      fullName: "Monopropylene Glycol (USP / Tech Grade)",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "derivatives",
      description: {
        id: "Cairan tidak berbau dan higroskopis untuk industri makanan, farmasi (grade USP), resin poliester tak jenuh (UPR), dan kosmetik.",
        en: "Odorless, hygroscopic liquid used in food flavors, pharmaceuticals (USP grade), unsaturated polyester resins, and cosmetics.",
      },
      applications: [
        { id: "Farmasi, makanan & kosmetik (USP)", en: "Pharma, food flavors & cosmetics (USP)" },
        { id: "Resin poliester UPR & fiberglass", en: "Unsaturated polyester resins & fiberglass" },
      ],
      inputs: ["smpo-facility"],
      outputs: ["customers-jurong"],
    },
    polyols: {
      id: "polyols",
      name: "POLYOLS",
      fullName: "Polyether Polyols",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "derivatives",
      description: {
        id: "Bahan dasar poliol untuk formulasi busa poliuretan fleksibel (kasur, jok mobil) dan busa kaku untuk insulasi termal kulkas & bangunan.",
        en: "Polyether polyols formulated into flexible polyurethane foams (mattresses, automotive seats) and rigid thermal insulation panels.",
      },
      applications: [
        { id: "Kasur busa, furnitur & jok otomotif", en: "Bedding mattresses & car seating" },
        { id: "Panel insulasi pendingin & konstruksi", en: "Refrigeration & construction insulation" },
      ],
      inputs: ["smpo-facility"],
      outputs: ["customers-jurong"],
    },
    hdpe: {
      id: "hdpe",
      name: "HDPE¹",
      fullName: "High-Density Polyethylene (Newly Acquired)",
      icon: "chemical",
      category: "product",
      zone: "jurong",
      column: "derivatives",
      footnote: {
        id: "1. Polietilena Berdensitas Tinggi yang Baru Diakuisisi",
        en: "1. Newly Acquired High-Density Polyethylene",
      },
      description: {
        id: "Polimer termoplastik serbaguna berdensitas tinggi untuk pipa air minum, botol kemasan tahan kimia, jeriken industri, dan film kemasan.",
        en: "High-density thermoplastic polymer asset supplying potable water pipes, rigid blow-molded bottles, containers, and geomembranes.",
      },
      applications: [
        { id: "Pipa infrastruktur air bersih & gas", en: "Water & gas infrastructure pipes" },
        { id: "Kemasan jeriken & botol industri", en: "Industrial jerrycans & blow molding" },
      ],
      inputs: ["ethylene"],
      outputs: ["customers-jurong"],
    },

    // ----------------------------------------------------
    // CUSTOMERS (JURONG)
    // ----------------------------------------------------
    "customers-jurong": {
      id: "customers-jurong",
      name: "CUSTOMERS",
      fullName: "Global Chemical & Industrial Customers",
      icon: "customers",
      category: "customer",
      zone: "jurong",
      column: "customers",
      description: {
        id: "Jaringan manufaktur global, produsen barang konsumen FMCG, konstruksi, otomotif, tekstil, dan industri pengolahan plastik di seluruh dunia.",
        en: "Global manufacturers, FMCG brand owners, construction giants, automotive tiers, textiles, and plastics processors worldwide.",
      },
      inputs: ["ethoxylates", "hpeo", "meg-product", "po", "sm", "mpg", "polyols", "hdpe"],
    },
  },
}
