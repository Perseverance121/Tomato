export interface PlantInfo {
  slug: string
  name: string
  emoji: string
  latinName?: string
  minNightTemp: number       // °C minimum safe night temp
  idealNightTemp: number     // °C ideal night temp
  sowIndoors: string
  plantOutside: string
  harvest: string
  frostTolerant: boolean
  description: string
  sowingGuide: string
  plantingGuide: string
  harvestGuide: string
  commonMistakes: string[]
  ukVarieties: string[]
  companions: string[]
  faqs: Array<{ q: string; a: string }>
}

export const plants: PlantInfo[] = [
  {
    slug: 'tomatoes',
    name: 'Tomatoes',
    emoji: '🍅',
    latinName: 'Solanum lycopersicum',
    minNightTemp: 7,
    idealNightTemp: 12,
    sowIndoors: 'February to March',
    plantOutside: 'Late May to June',
    harvest: 'July to October',
    frostTolerant: false,
    description: 'Tomatoes are the UK\'s most popular homegrown crop, but they\'re also the most frost-sensitive. Getting the timing right between sowing, hardening off, and planting outside makes the difference between a bumper crop and a failed season.',
    sowingGuide: 'Sow tomato seeds indoors from mid-February to late March. Use a heated propagator or warm windowsill — seeds need 18–24°C to germinate. Sow 6–8 weeks before your planned outdoor planting date. Pot on into individual 9cm pots once seedlings have two true leaves.',
    plantingGuide: 'Plant outside only once night temperatures are reliably above 7°C and all frost risk has passed — typically late May in southern England, June in the north and Scotland. Harden off for 7–14 days first by leaving plants outside during the day. Plant into rich, well-drained soil in the sunniest spot available.',
    harvestGuide: 'Harvest tomatoes when fully coloured and slightly soft to the touch. At the end of the season, bring in all remaining green fruits to ripen on a windowsill — never refrigerate.',
    commonMistakes: [
      'Planting out too early after a warm spell — a single frost will kill plants',
      'Not hardening off — sudden cold shocks slow growth by weeks',
      'Overwatering in cool weather — roots need oxygen, not waterlogging',
      'Under-feeding once plants are fruiting — tomatoes are hungry crops',
    ],
    ukVarieties: ['Gardener\'s Delight (cherry)', 'Moneymaker (classic)', 'Sungold (sweet cherry)', 'Tigerella (striped)', 'Alicante (reliable cordon)', 'Tumbling Tom (hanging basket)'],
    companions: ['Basil', 'Parsley', 'Borage', 'Marigolds', 'Carrots'],
    faqs: [
      { q: 'When is it safe to plant tomatoes outside in the UK?', a: 'Once night temperatures are reliably above 7°C and all frost risk has passed. This is typically mid-to-late May in southern England, late May to early June in northern England, and June in Scotland.' },
      { q: 'Can tomatoes survive a light frost?', a: 'No. Even a light frost (temperatures of -1°C or below) will kill tomato plants. Unlike some vegetables, tomatoes have no frost tolerance at all.' },
      { q: 'How do I harden off tomato plants?', a: 'Leave plants outside in a sheltered spot during the day for increasing periods over 7–14 days. Bring them in at night until frost risk has fully passed. This acclimates them to wind, direct sun, and temperature variation.' },
      { q: 'What\'s the minimum temperature for tomatoes to grow?', a: 'Tomatoes effectively stop growing below 10°C. Below 7°C, they can suffer cold damage even without frost. They grow and fruit best when nights stay above 12°C.' },
    ]
  },
  {
    slug: 'peppers',
    name: 'Peppers',
    emoji: '🌶️',
    latinName: 'Capsicum annuum',
    minNightTemp: 10,
    idealNightTemp: 15,
    sowIndoors: 'January to February',
    plantOutside: 'Late May to June',
    harvest: 'August to October',
    frostTolerant: false,
    description: 'Sweet peppers and chillies are even more heat-demanding than tomatoes, making them one of the trickier crops to grow in the UK. They need the earliest possible start and the longest possible season to produce a worthwhile harvest outdoors.',
    sowingGuide: 'Sow peppers and chillies early — January or February — as they need a long season. Use a heated propagator at 21–25°C. Germination can be slow (2–4 weeks). Pot on regularly and keep warm throughout their indoor life.',
    plantingGuide: 'Only plant outside once nights are reliably above 10°C — usually late May in the south, June in the north. A sheltered, south-facing position is ideal. Consider growing in pots so you can bring them in if cold weather returns.',
    harvestGuide: 'Sweet peppers can be harvested green or left to ripen to red, yellow or orange. Chillies are hottest when fully ripe. Leave a few on the plant until late season then dry or freeze for winter use.',
    commonMistakes: [
      'Sowing too late — peppers need 5+ months to crop well',
      'Not providing enough heat during the indoor growing phase',
      'Planting in too exposed a position — they love shelter and warmth',
      'Picking too early — let peppers colour up for best flavour',
    ],
    ukVarieties: ['Corno di Toro (sweet)', 'Gypsy (early sweet)', 'Cayenne (chilli)', 'Hungarian Hot Wax', 'Bell Boy (blocky sweet)', 'Apache (compact chilli)'],
    companions: ['Basil', 'Tomatoes', 'Carrots', 'Parsley'],
    faqs: [
      { q: 'When should I plant peppers outside in the UK?', a: 'Only once nights are consistently above 10°C and all frost risk is gone. Late May in southern England, June in northern England and Scotland. Peppers are even less cold-tolerant than tomatoes.' },
      { q: 'Can I grow chillies outside in the UK?', a: 'Yes, in most of England in a warm, sheltered spot. They need a south-facing wall or fence for best results. In Scotland, a polytunnel or greenhouse gives much more reliable results.' },
      { q: 'Why are my pepper plants not fruiting?', a: 'Most likely insufficient heat. Peppers need consistently warm temperatures to set fruit. Cold nights, even above frost level, will significantly delay or reduce fruiting.' },
    ]
  },
  {
    slug: 'courgettes',
    name: 'Courgettes',
    emoji: '🥒',
    latinName: 'Cucurbita pepo',
    minNightTemp: 7,
    idealNightTemp: 12,
    sowIndoors: 'April to May',
    plantOutside: 'Late May to June',
    harvest: 'July to September',
    frostTolerant: false,
    description: 'Courgettes are one of the most productive crops in the UK vegetable garden, but they\'re extremely frost-sensitive. One late frost can wipe out an entire plant overnight. Time your planting right and you\'ll be drowning in courgettes by July.',
    sowingGuide: 'Sow courgette seeds on their edge in individual deep pots from mid-April. They germinate quickly (5–7 days) at 18–20°C. Don\'t sow too early — courgette seedlings grow fast and will become pot-bound before it\'s safe to plant out.',
    plantingGuide: 'Plant outside once all frost risk has passed — late May in the south, June in the north. Courgettes need a large planting hole enriched with lots of compost. Plant at least 90cm apart — they spread dramatically. Water in well.',
    harvestGuide: 'Cut courgettes when 15–20cm long for best flavour. Check plants every 2–3 days in peak summer — they grow astonishingly fast. Overgrown marrows are edible but less tasty; compost any that escape your notice.',
    commonMistakes: [
      'Planting out too early — a frost will kill the plant completely',
      'Sowing too early and having pot-bound plants by planting time',
      'Planting too close together — they need 90cm minimum',
      'Not picking regularly — missed courgettes turn into marrows and stop the plant producing',
    ],
    ukVarieties: ['Black Beauty', 'Defender F1', 'Patio Star (compact)', 'One Ball (round)', 'Romanesco (ridged)', 'Midnight F1'],
    companions: ['Nasturtiums', 'Borage', 'Beans', 'Sweetcorn'],
    faqs: [
      { q: 'When can I plant courgettes outside in the UK?', a: 'Once all frost risk has passed and nights stay above 7°C. Late May in the south, early to mid-June in northern England and Scotland.' },
      { q: 'My courgette flowers are not setting fruit — why?', a: 'Courgettes produce separate male and female flowers. Early in the season, mostly male flowers appear. Once female flowers open (with a small swelling at the base), bees should pollinate them. In cool or wet weather, hand-pollinate using a paintbrush.' },
      { q: 'Can I start courgettes from seed outside?', a: 'Yes, from late May in the south once soil has warmed. Direct sowing avoids transplant shock and plants often catch up with those started indoors.' },
    ]
  },
  {
    slug: 'beans',
    name: 'French & Runner Beans',
    emoji: '🫘',
    latinName: 'Phaseolus vulgaris / Phaseolus coccineus',
    minNightTemp: 7,
    idealNightTemp: 12,
    sowIndoors: 'April to May',
    plantOutside: 'May to June',
    harvest: 'July to October',
    frostTolerant: false,
    description: 'Beans are among the most rewarding crops for UK gardeners — productive, easy and fast-growing. Both French beans and runner beans are frost-tender but grow quickly once conditions are right.',
    sowingGuide: 'Sow beans indoors in root trainers or deep pots from mid-April. They germinate in 7–10 days at 16–20°C. Alternatively, direct sow outside from late May once soil temperature is above 12°C.',
    plantingGuide: 'Plant out after the last frost, once nights are above 7°C. Erect supports before planting — runner beans can reach 2.5m. Plant 15cm apart for climbers, 22cm for bush French beans.',
    harvestGuide: 'Pick regularly when pods are about 10–15cm long and before you can see the beans inside. Daily picking during peak season keeps plants productive.',
    commonMistakes: [
      'Planting too early — beans sit sulking in cold soil and are prone to rotting',
      'Not erecting supports before planting — difficult to add later',
      'Letting pods mature on the plant — this signals the plant to stop producing',
    ],
    ukVarieties: ['Climbing French: Blue Lake', 'Bush French: Safari', 'Runner: Scarlet Emperor', 'Runner: Polestar', 'Runner: White Lady'],
    companions: ['Sweetcorn', 'Squash', 'Carrots', 'Marigolds'],
    faqs: [
      { q: 'When can I plant runner beans outside?', a: 'After the last frost once nights are above 7°C. Late May in southern England, early June in the north. Cold soil causes seeds to rot rather than germinate.' },
      { q: 'Why are my runner beans not setting pods?', a: 'Runner beans often drop flowers in hot, dry spells or if not getting enough water. Mist flowers with water and keep plants well-watered at the roots.' },
    ]
  },
  {
    slug: 'cucumbers',
    name: 'Cucumbers',
    emoji: '🥒',
    latinName: 'Cucumis sativus',
    minNightTemp: 10,
    idealNightTemp: 15,
    sowIndoors: 'March to April',
    plantOutside: 'Late May to June',
    harvest: 'July to September',
    frostTolerant: false,
    description: 'Outdoor cucumbers have been bred specifically for the UK\'s cooler climate and can crop well in sheltered southern gardens. They need warmth, shelter and consistent moisture to thrive.',
    sowingGuide: 'Sow cucumber seeds on their edge in individual pots from late March. They need 20–25°C to germinate well. Keep the growing medium just moist — cucumbers hate soggy roots.',
    plantingGuide: 'Plant outside only once nights are reliably above 10°C — late May in the south, June in the north. A south-facing fence or wall provides the warmth they love. In less sheltered spots, a cold frame or cloche helps enormously.',
    harvestGuide: 'Cut cucumbers with a clean knife before they turn yellow. Regular picking encourages more fruits. Outdoor cucumbers are best eaten fresh — they don\'t store as well as indoor varieties.',
    commonMistakes: [
      'Growing indoor varieties outside — choose ridge cucumber varieties for outdoor growing',
      'Planting in too exposed a position — they need a warm, sheltered spot',
      'Inconsistent watering — causes bitter fruits',
    ],
    ukVarieties: ['Marketmore (outdoor)', 'Masterpiece (outdoor)', 'La Diva (outdoor)', 'Crystal Lemon (novelty)', 'Burpless Tasty Green'],
    companions: ['Sunflowers', 'Nasturtiums', 'Beans'],
    faqs: [
      { q: 'Can I grow cucumbers outside in the UK?', a: 'Yes, using outdoor (ridge) varieties in a warm, sheltered position. Southern England gardens with south-facing walls are ideal. In northern England and Scotland, a polytunnel gives better results.' },
    ]
  },
  {
    slug: 'basil',
    name: 'Basil',
    emoji: '🌿',
    latinName: 'Ocimum basilicum',
    minNightTemp: 12,
    idealNightTemp: 16,
    sowIndoors: 'April to May',
    plantOutside: 'June',
    harvest: 'June to September',
    frostTolerant: false,
    description: 'Basil is the most cold-sensitive of common garden herbs — even a single chilly night can blacken the leaves and set the plant back significantly. It needs genuinely warm conditions to thrive outside in the UK.',
    sowingGuide: 'Sow basil thinly on the surface of moist compost from April in a warm propagator or windowsill at 18–24°C. Germination takes 7–14 days. Prick out carefully — basil dislikes root disturbance.',
    plantingGuide: 'Only plant outside once nights are reliably above 12°C — typically early June in most of England. A warm, sheltered spot is essential. Basil grows well in pots, which can be brought in if cold weather returns.',
    harvestGuide: 'Pick from the top, taking whole stems to encourage bushy growth. Remove flower buds as they appear to keep plants leafy. Harvest regularly — basil tastes best before it flowers.',
    commonMistakes: [
      'Planting out too early — even 8°C nights will cause black leaf edges',
      'Overwatering — basil prefers slightly dry roots',
      'Underfeeding — heavy leaf picking needs replacing with liquid feed',
    ],
    ukVarieties: ['Sweet Genovese (classic)', 'Cinnamon', 'Lemon', 'Thai', 'Purple Ruffles', 'Aristotle (compact)'],
    companions: ['Tomatoes', 'Peppers', 'Marigolds'],
    faqs: [
      { q: 'When can I plant basil outside in the UK?', a: 'Only in June once night temperatures are reliably above 12°C. Basil is the most cold-sensitive common herb — a single cold night will blacken the leaves.' },
      { q: 'Why do my basil leaves turn black?', a: 'Cold damage. Basil\'s leaves blacken when exposed to temperatures below about 8°C, even without frost. Always keep plants above 12°C at night.' },
    ]
  },
  {
    slug: 'sweetcorn',
    name: 'Sweetcorn',
    emoji: '🌽',
    latinName: 'Zea mays',
    minNightTemp: 7,
    idealNightTemp: 14,
    sowIndoors: 'April to May',
    plantOutside: 'Late May to June',
    harvest: 'August to September',
    frostTolerant: false,
    description: 'Sweetcorn is possible in most of the UK, though the further north you go, the more you\'ll need to choose early varieties. It needs warm soil, full sun and a block planting pattern for wind pollination.',
    sowingGuide: 'Sow sweetcorn in deep individual pots from late April — the taproot doesn\'t like disturbance. Two seeds per pot, remove the weaker seedling. Keep at 18–20°C to germinate.',
    plantingGuide: 'Plant in a block pattern (not rows) for good wind pollination — at least 4×4 plants minimum. Plant out after the last frost once nights are above 7°C, 45cm apart each way.',
    harvestGuide: 'Test by pulling back a husk and pressing a kernel — it should ooze milky juice, not watery or doughy. Cook or eat immediately after picking — sweetness fades fast.',
    commonMistakes: [
      'Planting in rows instead of blocks — poor pollination = missing kernels',
      'Growing too few plants — 16 minimum for decent pollination',
      'Harvesting too late — kernels become starchy',
    ],
    ukVarieties: ['Swift (early)', 'Lark (early)', 'Earlibird', 'Incredible F1', 'Sundance F1'],
    companions: ['Beans', 'Squash', 'Pumpkins', 'Courgettes'],
    faqs: [
      { q: 'Can I grow sweetcorn in the UK?', a: 'Yes, across most of England and Wales using early varieties. Scotland is challenging — choose the earliest possible varieties and use black polythene to warm the soil.' },
    ]
  },
  {
    slug: 'squash',
    name: 'Squash & Pumpkins',
    emoji: '🎃',
    latinName: 'Cucurbita maxima / pepo',
    minNightTemp: 7,
    idealNightTemp: 12,
    sowIndoors: 'April to May',
    plantOutside: 'Late May to June',
    harvest: 'September to October',
    frostTolerant: false,
    description: 'Winter squash and pumpkins are excellent UK crops — they store well and provide food deep into winter. They need space, rich soil and a frost-free growing season to develop their characteristic thick skins.',
    sowingGuide: 'Sow squash seeds on their edge in individual deep pots from late April. They germinate in 5–10 days at 18–20°C. Don\'t sow too early — they grow fast and need large pots if kept indoors long.',
    plantingGuide: 'Plant outside after last frost, 90cm–1.5m apart depending on variety. Dig a large planting hole and enrich heavily with compost or well-rotted manure. They are hungry, thirsty plants.',
    harvestGuide: 'Leave squash on the plant as long as possible to develop their skin. Harvest before the first autumn frost. Cure in a warm, sunny place for 2 weeks to harden the skin before storage.',
    commonMistakes: [
      'Underestimating the space needed — trailing varieties can spread 3m+',
      'Picking too early — immature squash won\'t store well',
      'Not curing after harvest — uncured squash rots quickly in storage',
    ],
    ukVarieties: ['Uchiki Kuri (red onion)', 'Crown Prince (grey)', 'Butternut (classic)', 'Turk\'s Turban', 'Jack O\'Lantern (pumpkin)', 'Hokkaido'],
    companions: ['Beans', 'Sweetcorn', 'Nasturtiums', 'Marigolds'],
    faqs: [
      { q: 'When can I plant pumpkins and squash outside in the UK?', a: 'After the last frost once nights are above 7°C — late May in the south, June in northern England and Scotland.' },
    ]
  },
]

export function getPlantBySlug(slug: string): PlantInfo | undefined {
  return plants.find(p => p.slug === slug)
}

export function getAllPlantSlugs(): string[] {
  return plants.map(p => p.slug)
}
