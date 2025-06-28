// 新商品データ
export interface NewProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  images: string[]
  mysteryLevel: number
  stock: number
  category: string
  featured?: boolean
  slug: string
  wholesalePrice: number
  isLimited?: boolean
  limitedQuantity?: number
  effects?: string[]
  testimonials?: string[]
}

export const newProducts: NewProduct[] = [
  // 天然石×お守りシリーズ
  {
    id: 'turquoise-victory',
    name: 'ターコイズ×勝守',
    price: 5500,
    originalPrice: 6000,
    description: 'ターコイズの力と勝守の組み合わせ。勝負運アップに最適なお守りペンダント。代々木八幡にてご祈祷済み。',
    images: ['/images/products/turquoise-victory.jpg'],
    mysteryLevel: 8,
    stock: 2,
    category: '天然石お守り',
    featured: true,
    slug: 'turquoise-victory',
    wholesalePrice: 1100,
    isLimited: true,
    limitedQuantity: 2,
    effects: ['勝負運向上', 'エネルギー浄化', '精神安定'],
    testimonials: ['勝負に勝てるようになった', '気持ちが落ち着く']
  },
  {
    id: 'tigereye-victory',
    name: 'タイガーアイ×勝（勝負運お守り）',
    price: 5500,
    description: 'タイガーアイの金運パワーと勝負運お守りの組み合わせ。ビジネス成功に導く開運ペンダント。',
    images: ['/images/products/tigereye-victory.jpg'],
    mysteryLevel: 8,
    stock: 6,
    category: '天然石お守り',
    slug: 'tigereye-victory',
    wholesalePrice: 1100,
    isLimited: true,
    limitedQuantity: 6
  },
  {
    id: 'aventurine-princess',
    name: 'アベンチュリン×姫守（女性限定のお守り）',
    price: 5500,
    description: '女性の美と幸運を守るアベンチュリンと姫守の特別な組み合わせ。女性限定の美運アップペンダント。',
    images: ['/images/products/aventurine-princess.jpg'],
    mysteryLevel: 8,
    stock: 4,
    category: '天然石お守り',
    slug: 'aventurine-princess',
    wholesalePrice: 1100,
    isLimited: true,
    limitedQuantity: 4
  },
  {
    id: 'coral-minori',
    name: '珊瑚×みのり（心願成就）',
    price: 5500,
    description: '海の恵み珊瑚とみのりお守りで心願成就。あなたの願いを叶える特別なペンダント。',
    images: ['/images/products/coral-minori.jpg'],
    mysteryLevel: 9,
    stock: 1,
    category: '天然石お守り',
    featured: true,
    slug: 'coral-minori',
    wholesalePrice: 1100,
    isLimited: true,
    limitedQuantity: 1
  },
  {
    id: 'aventurine-enmusubi',
    name: 'アベンチュリン×縁結び',
    price: 5500,
    description: '良縁を引き寄せるアベンチュリンと縁結びお守りの組み合わせ。運命の出会いをサポート。',
    images: ['/images/products/aventurine-enmusubi.jpg'],
    mysteryLevel: 8,
    stock: 5,
    category: '天然石お守り',
    slug: 'aventurine-enmusubi',
    wholesalePrice: 1100,
    isLimited: true,
    limitedQuantity: 5
  },
  {
    id: 'motherofpearl-omamori',
    name: 'マザーオブパール×お守り',
    price: 5500,
    description: '海の母なる力マザーオブパールと基本のお守りの組み合わせ。総合運アップに最適。',
    images: ['/images/products/motherofpearl-omamori.jpg'],
    mysteryLevel: 7,
    stock: 8,
    category: '天然石お守り',
    slug: 'motherofpearl-omamori',
    wholesalePrice: 1100,
    isLimited: true,
    limitedQuantity: 8
  },
  {
    id: 'onyx-beauty',
    name: 'オニキス、カーネリアン、スモーキークォーツ×美',
    price: 5500,
    description: '3つの天然石の力と美守の組み合わせ。内面からの美しさを引き出すペンダント。',
    images: ['/images/products/onyx-beauty.jpg'],
    mysteryLevel: 8,
    stock: 3,
    category: '天然石お守り',
    slug: 'onyx-beauty',
    wholesalePrice: 1100,
    isLimited: true,
    limitedQuantity: 3
  },

  // ミューラムテクノロジーシリーズ
  {
    id: 'muse-rack-pendant',
    name: 'ミューズラックペンダント',
    price: 33000,
    description: 'テラ（地球）、ペタ（太陽）、エクサ（宇宙）のエネルギーを放出するミューラムテクノロジーアイテム。',
    images: ['/images/products/muse-rack-pendant.jpg'],
    mysteryLevel: 10,
    stock: 1,
    category: 'ミューラムテクノロジー',
    featured: true,
    slug: 'muse-rack-pendant',
    wholesalePrice: 13200,
    isLimited: true,
    limitedQuantity: 1
  },
  {
    id: 'mue-lamp',
    name: 'ミューランプ',
    price: 33000,
    description: '宇宙エネルギーを放出する革新的なミューラムテクノロジーランプ。空間を浄化し、波動を高めます。',
    images: ['/images/products/mue-lamp.jpg'],
    mysteryLevel: 10,
    stock: 20,
    category: 'ミューラムテクノロジー',
    slug: 'mue-lamp',
    wholesalePrice: 13200,
    isLimited: true,
    limitedQuantity: 20
  },
  {
    id: 'mue-onram',
    name: 'ミューオンラム',
    price: 99000,
    description: '最高レベルのミューラムテクノロジー。強力な宇宙エネルギーで人生を変革します。',
    images: ['/images/products/mue-onram.jpg'],
    mysteryLevel: 10,
    stock: 100,
    category: 'ミューラムテクノロジー',
    featured: true,
    slug: 'mue-onram',
    wholesalePrice: 39600,
    isLimited: true,
    limitedQuantity: 100
  },
  {
    id: 'muse-rax',
    name: 'ミューズラックス',
    price: 41800,
    description: '中級レベルのミューラムテクノロジー。日常使いに最適なエネルギー放出アイテム。',
    images: ['/images/products/muse-rax.jpg'],
    mysteryLevel: 9,
    stock: 100,
    category: 'ミューラムテクノロジー',
    slug: 'muse-rax',
    wholesalePrice: 16720,
    isLimited: true,
    limitedQuantity: 100
  },
  {
    id: 'exa-rainbow-zero',
    name: 'エクサレインボーゼロ（SDカード付）',
    price: 77000,
    description: 'SDカード付きの高性能ミューラムテクノロジー。虹色の宇宙エネルギーを体感できます。',
    images: ['/images/products/exa-rainbow-zero.jpg'],
    mysteryLevel: 10,
    stock: 50,
    category: 'ミューラムテクノロジー',
    featured: true,
    slug: 'exa-rainbow-zero',
    wholesalePrice: 30800
  },

  // イヤシロチシリーズ
  {
    id: 'iyashirochi-aroma',
    name: 'イヤシロチアロマブレンド',
    price: 5280,
    description: '究極の浄化アロマブレンド。空間をイヤシロチ（聖地）に変える特別な香り。',
    images: ['/images/products/iyashirochi-aroma.jpg'],
    mysteryLevel: 7,
    stock: 50,
    category: 'イヤシロチシリーズ',
    slug: 'iyashirochi-aroma',
    wholesalePrice: 2112
  },
  {
    id: 'iyashirochi-alpha',
    name: 'イヤシロチα',
    price: 7480,
    description: 'イヤシロチ化を促進するα波調整アイテム。1回に作れる数は200個まで。',
    images: ['/images/products/iyashirochi-alpha.jpg'],
    mysteryLevel: 8,
    stock: 200,
    category: 'イヤシロチシリーズ',
    slug: 'iyashirochi-alpha',
    wholesalePrice: 2992
  },
  {
    id: 'iyashirochi-powder',
    name: 'イヤシロチパウダー',
    price: 13200,
    description: '強力な浄化パウダー。土地や建物のエネルギーを根本から変える特別な粉末。',
    images: ['/images/products/iyashirochi-powder.jpg'],
    mysteryLevel: 9,
    stock: 30,
    category: 'イヤシロチシリーズ',
    featured: true,
    slug: 'iyashirochi-powder',
    wholesalePrice: 5280
  },
  {
    id: 'internatural-sp',
    name: 'インターナチュラルSP',
    price: 16200,
    description: '自然界のエネルギーを活用したSPシリーズ。高次元の波動調整を実現。',
    images: ['/images/products/internatural-sp.jpg'],
    mysteryLevel: 9,
    stock: 20,
    category: 'イヤシロチシリーズ',
    slug: 'internatural-sp',
    wholesalePrice: 6480
  },

  // 高額スペシャルアイテム
  {
    id: 'ari-medick-god',
    name: '電子放射式波動転写器「Ari Medick神」',
    price: 217800,
    description: '究極の波動転写器。エアメディック ジンシリーズの最高峰モデル。',
    images: ['/images/products/ari-medick-god.jpg'],
    mysteryLevel: 10,
    stock: 1,
    category: 'スペシャルアイテム',
    featured: true,
    slug: 'ari-medick-god',
    wholesalePrice: 87120,
    isLimited: true,
    limitedQuantity: 1
  },
  {
    id: 'brain-refresher',
    name: '脳ビリビリ「ブレインリフレッシャー」',
    price: 418000,
    description: '脳を活性化する革新的なデバイス。思考力と集中力を劇的に向上させます。',
    images: ['/images/products/brain-refresher.jpg'],
    mysteryLevel: 10,
    stock: 5,
    category: 'スペシャルアイテム',
    featured: true,
    slug: 'brain-refresher',
    wholesalePrice: 209000
  },
  {
    id: 'home-sauna-kiwami',
    name: '波動石入りホームサウナ極み',
    price: 330000,
    description: '波動石を使用した家庭用サウナの極み。自宅で本格的な波動浴が可能。',
    images: ['/images/products/home-sauna-kiwami.jpg'],
    mysteryLevel: 10,
    stock: 3,
    category: 'スペシャルアイテム',
    slug: 'home-sauna-kiwami',
    wholesalePrice: 132000
  },
  {
    id: 'hydrogen-generator',
    name: '水素ジェネレーターフレアーエスピー',
    price: 495000,
    description: '最高級水素発生器。純度の高い水素で細胞レベルから若返りを実現。',
    images: ['/images/products/hydrogen-generator.jpg'],
    mysteryLevel: 10,
    stock: 2,
    category: 'スペシャルアイテム',
    featured: true,
    slug: 'hydrogen-generator',
    wholesalePrice: 198000
  },

  // その他の商品（一部抜粋）
  {
    id: 'dragon-salt',
    name: '龍神の塩',
    price: 1650,
    description: '龍神の力を宿した特別な塩。お清めや料理に使用できます。',
    images: ['/images/products/dragon-salt.jpg'],
    mysteryLevel: 6,
    stock: 100,
    category: 'その他',
    slug: 'dragon-salt',
    wholesalePrice: 550
  },
  {
    id: 'sleep-sheet',
    name: '安眠シート',
    price: 9900,
    description: '質の良い睡眠をサポートする特別なシート。波動で安眠を促進します。',
    images: ['/images/products/sleep-sheet.jpg'],
    mysteryLevel: 7,
    stock: 50,
    category: 'その他',
    slug: 'sleep-sheet',
    wholesalePrice: 3960
  },
  {
    id: 'enzyme-infinity',
    name: '酵素∞ Infinity zyme',
    price: 32400,
    description: '発酵玄米、よもぎ含有食品。体内から健康をサポートする酵素サプリメント。',
    images: ['/images/products/enzyme-infinity.jpg'],
    mysteryLevel: 8,
    stock: 30,
    category: 'その他',
    slug: 'enzyme-infinity',
    wholesalePrice: 12960
  }
]

// カテゴリー別の商品取得
export const getProductsByCategory = (category: string): NewProduct[] => {
  return newProducts.filter(product => product.category === category)
}

// おすすめ商品取得
export const getFeaturedProducts = (): NewProduct[] => {
  return newProducts.filter(product => product.featured === true)
}

// 全カテゴリー取得
export const getAllCategories = (): string[] => {
  return Array.from(new Set(newProducts.map(product => product.category)))
}