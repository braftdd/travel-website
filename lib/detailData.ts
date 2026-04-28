import type { Stay, Flight, TravelPackage } from './searchData';

// ─── Gallery image sets (confirmed working from codebase) ─────────────────────

const G = {
  beach:        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=90',
  overwater:    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=90',
  oceanPool:    'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=90',
  resortPool:   'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=90',
  hotelSuite:   'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=90',
  luxInterior:  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=90',
  dubaiTower:   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90',
  dubaiCity:    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=90',
  santorini:    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=90',
  americaCity:  'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1200&q=90',
  thailand:     'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=90',
};

const GALLERIES: Record<string, string[]> = {
  Thailand:  [G.overwater, G.oceanPool, G.beach, G.resortPool, G.hotelSuite],
  UAE:       [G.dubaiTower, G.dubaiCity, G.luxInterior, G.resortPool, G.hotelSuite],
  America:   [G.hotelSuite, G.americaCity, G.resortPool, G.luxInterior, G.beach],
  AmericaBeach: [G.beach, G.resortPool, G.hotelSuite, G.oceanPool, G.luxInterior],
  Europe:    [G.santorini, G.resortPool, G.luxInterior, G.hotelSuite, G.beach],
  Mountain:  [G.hotelSuite, G.luxInterior, G.resortPool, G.beach, G.oceanPool],
};

export function getGallery(stay: Stay): string[] {
  if (stay.destination === 'Thailand') return GALLERIES.Thailand;
  if (stay.destination === 'UAE')       return GALLERIES.UAE;
  if (stay.destination === 'Europe') {
    if (['Swiss Alps'].includes(stay.city)) return GALLERIES.Mountain;
    return GALLERIES.Europe;
  }
  if (stay.destination === 'America') {
    if (['Miami', 'Hawaii'].includes(stay.city)) return GALLERIES.AmericaBeach;
    return GALLERIES.America;
  }
  return GALLERIES.Thailand;
}

// ─── Hotel descriptions ───────────────────────────────────────────────────────

const DESCRIPTIONS: Record<number, string> = {
  // Thailand · Phuket
  1: "Set on a private peninsula above Pansea Beach, Amanpuri has defined the meaning of barefoot luxury in Thailand since 1988. Forty pavilions and thirty private villas, each with a personal sala and private infinity pool, are connected by jungle pathways to a crystalline bay. The resort's culinary programme, water sports marina, and award-winning Aman Spa complete an experience that has no equal on the island.",
  2: "Trisara — meaning 'third garden in heaven' in Sanskrit — cascades down a verdant hillside to a secluded bay on Phuket's northwest coast. Each of the private villas features an infinity pool cantilevered above the Andaman Sea, offering near-total seclusion and views that shift with the light. The resort's award-winning PRU restaurant serves the island's most celebrated farm-to-table cuisine.",
  3: "Framed by tropical forest and opening directly onto the white sand of Pansea Beach, The Surin Phuket delivers an unassuming form of luxury that has become rare. The thatched-roof cottages are elegantly minimal, each designed to blur the boundary between interior and the natural world outside. It remains one of the few resorts on the island that feels genuinely embedded in its landscape.",
  4: "Nestled within the Laguna Phuket complex, Banyan Tree Phuket is renowned for its spectacular pool villas — each featuring a private outdoor pool, sala and tropical garden. The resort's Banyan Tree Spa is consistently ranked among the finest in Southeast Asia, offering ancient healing traditions reinterpreted for the contemporary traveller. Sophisticated dining and direct beach access make it one of the island's most complete retreats.",
  5: "Rosewood Phuket occupies a dramatic hillside on Emerald Bay, where private villas perch above the Andaman Sea in a series of terraced cascades. The architecture draws on local Sino-Portuguese heritage while incorporating sweeping glass facades that frame the endless ocean view. With one of the island's finest spa programmes and a stunning beach club, it represents the next generation of ultra-luxury on Phuket.",
  // Thailand · Koh Samui
  6: "Clinging to a steep hillside above the Gulf of Thailand, the Four Seasons Koh Samui comprises forty-two pool villas designed by acclaimed architect Bensley. Each villa feels like a private residence, with a horizon-edge pool appearing to merge with the sea below and an outdoor sala ideal for alfresco dining at sunset. The resort's signature Thai cuisine and comprehensive water sports confirm its status as the definitive luxury address on the island.",
  7: "The Conrad Koh Samui occupies a dramatic cliffside position on the island's south coast, commanding sweeping views of the Gulf of Thailand beyond. All eighty private villas feature personal infinity pools and open-plan living spaces with floor-to-ceiling glass. The resort's farm-to-fork restaurant and comprehensive spa complete one of the most secluded luxury experiences in the Gulf.",
  8: "Vana Belle, a Luxury Collection Resort, unfolds along a pristine stretch of Chaweng Noi Bay — one of Koh Samui's most sheltered coves. The architecture blends traditional Sino-Thai references with contemporary coastal design, resulting in an atmosphere that is both sophisticated and effortlessly relaxed. Guests are drawn to the resort's beachfront infinity pool, its Thai-herb spa, and the intimacy of a property where each guest is known by name.",
  9: "Perched on a dramatic headland at the northern tip of Koh Samui, Six Senses Samui combines sixty-six pool villas with the brand's signature commitment to wellness and sustainability. The resort's spa is considered one of the finest in all of Thailand, drawing on Ayurvedic traditions and local botanical therapies. Panoramic views of the gulf, private beach access, and an exceptional farm-to-table restaurant make this one of Asia's most sought-after retreats.",
  // Thailand · Chiang Mai
  10: "The Four Seasons Tented Camp Golden Triangle offers one of the world's most adventurous luxury experiences, set in the remote hill country where Thailand, Myanmar and Laos meet. Fifteen tented suites sit on elevated platforms deep in the jungle canopy, accessible by elephant or boat, with open-air bathrooms and private viewing decks. Conservation programmes with the Golden Triangle Asian Elephant Foundation define the resort's philosophy.",
  11: "Spread across sixty hectares of Northern Thai countryside, Dhara Dhevi recreates the grandeur of a Lanna-era royal city in immaculate detail. The property's villas and colonial-style residence suites are set amid rice paddies, lotus ponds, and mature orchards that provide much of the resort's kitchen with daily harvests. It remains the most architecturally ambitious luxury resort in all of Thailand.",
  12: "Raya Heritage sits on the banks of the Ping River just outside Chiang Mai, offering a serene Northern Thai retreat within easy reach of the city's temples and night markets. The intimate resort comprises river-fronting villas set among teak forests, with a philosophy centred on responsible engagement with local communities. The spa draws exclusively on Northern Thai herbal traditions.",
  // Thailand · Bangkok
  13: "The Mandarin Oriental Bangkok, opened in 1876, holds an undisputed position as one of the world's great hotels — a living monument to the golden age of travel on the banks of the Chao Phraya River. Its Authors' Lounge has welcomed Somerset Maugham, Joseph Conrad and Graham Greene, and the tradition of literary elegance continues in carefully preserved suites and salons. The property's nine restaurants and bars, legendary spa, and river-view terraces are, together, without parallel in the city.",
  14: "The Siam is Bangkok's most extraordinary private hotel — an art deco fantasy set along the Chao Phraya River, where every room, corridor and terrace forms part of one of Asia's finest private art collections. The twenty-eight suites and nine pool villas, designed by Bill Bensley, each feel entirely unique, appointed with antiques, rare textiles and curated objets d'art. Its Opium Spa, river pool and Michelin-recognised restaurant make it unmissable.",
  15: "Capella Bangkok occupies a gracious riverside plot in the historic Charoenkrung district, bringing the Singapore brand's hallmark of residential luxury to the Thai capital. All suites and residences have direct river views, and the property's soaring riverside colonnades and infinity pool create one of the most cinematic settings in Southeast Asia. The Auriga Wellness spa, three acclaimed restaurants, and twenty-four-hour butler service define the guest experience.",
  // UAE · Dubai
  16: "The Burj Al Arab stands alone — the world's most recognised hotel, built in the form of a billowing sail on its own artificial island just off Jumeirah Beach. All two hundred and two suites are duplex, finished in gold leaf, marble and bespoke fabrics, each arriving with a dedicated twenty-four-hour butler, Rolls-Royce airport transfer, and private beach club access. No other hotel on earth has redefined the concept of luxury with such absolute conviction.",
  17: "Designed by Giorgio Armani in partnership with Emaar Properties, the Armani Hotel occupies the lower floors of the Burj Khalifa — the world's tallest building — and is the first hotel in the legendary designer's portfolio. Every detail of the property, from the building materials to the staff uniforms, reflects Armani's philosophy of understated, rigorously controlled elegance. The hotel's Armani/Ristorante and unmatched views across Downtown Dubai cement its place at the apex of the city's luxury hierarchy.",
  18: "The One&Only Royal Mirage is a rare anomaly in Dubai: a resort that looks and feels as though it has existed for centuries, its Moorish domes and palm-fringed gardens a world apart from the city's steel-and-glass skyline. Set on a kilometre of pristine private beach, the property's three residential wings draw inspiration from Arabian palaces and North African riads. The resort's dining programme, evening entertainment, and spa are among the most celebrated in the region.",
  19: "Atlantis The Royal is Dubai's boldest statement in luxury hospitality, a ninety-storey sculptural tower redefining what an ultra-luxury resort can be. The property features world-first experiences including the iconic Sky Pool suspended between towers at ninety-six floors, and restaurants by Heston Blumenthal, Nobu Matsuhisa, and José Andrés. Every detail — from the underwater suite experience to the private beach — has been designed to astonish.",
  20: "The Address Downtown occupies one of the most coveted positions in Dubai, at the foot of the Burj Khalifa overlooking the Dubai Fountain in the heart of Downtown. The hotel's rooms and suites are finished with cool contemporary precision, and the rooftop pool's reflections of the world's tallest tower create one of the city's most photographed moments. Direct access to the Dubai Mall adds a layer of convenience that few luxury hotels can match.",
  21: "Jumeirah Al Naseem is the most refined addition to the Madinat Jumeirah complex, a tranquil boutique-scale retreat that stands in elegant contrast to its more flamboyant neighbours. All rooms and suites open onto a private beach or the resort's immaculate gardens, and guests have full access to the world-class facilities of the wider Jumeirah complex. The turtle rehabilitation centre, celebrated spa, and collection of dining venues are particular highlights.",
  // UAE · Abu Dhabi
  22: "Emirates Palace Mandarin Oriental is the largest and most opulent hotel ever built, a kilometre-long palace of gold and marble set on over a kilometre of private beach. The property's rooms and suites are appointed with gold leaf, mosaic tiles, and hand-woven carpets, and its vast rotunda dome is adorned with one of the world's finest crystal chandeliers. Dining, entertainment and spa facilities here set a standard that few hotels globally can approach.",
  23: "The St. Regis Saadiyat Island Resort occupies a privileged position on the pristine shores of Saadiyat Island, Abu Dhabi's most exclusive address. The resort's rooms and suites are distributed across low-rise buildings connected by walkways and lush gardens, with direct access to one of the UAE's finest natural beaches. The celebrated St. Regis butler service and proximity to the Louvre Abu Dhabi define this as the capital's finest resort.",
  24: "The Louvre Abu Dhabi Beach Resort neighbours the iconic museum that inspired its name, offering culturally enriched luxury on Saadiyat Island's celebrated beach. The resort's architecture references the latticed dome of the Louvre Abu Dhabi itself, creating shaded terraces and cool colonnades that frame the turquoise Arabian Gulf beyond. Guests enjoy a privileged connection to Abu Dhabi's growing cultural quarter alongside the full amenities of a world-class beach resort.",
  25: "Nestled between an old-fashioned souk and a sweeping corniche on Abu Dhabi's waterfront, Shangri-La Qaryat Al Beri brings traditional Arabian architecture and the brand's celebrated Chi Spa philosophy to the UAE capital. All rooms and suites have private balconies overlooking the lagoon, the corniche, or the illuminated Sheikh Zayed Grand Mosque. The resort's fleet of private abras connects guests to the neighbouring Souk Qaryat Al Beri for an authentic evening's shopping.",
  // America · Miami
  26: "The Setai Miami Beach occupies a lovingly restored 1936 Art Deco tower on Collins Avenue, weaving heritage architecture with a Southeast Asian aesthetic that creates an atmosphere of contemplative calm rare on South Beach. Three heated outdoor pools aligned with the constellation of Orion form the centrepiece of a property designed by award-winning interior architect Jaya Ibrahim. The Setai Restaurant, one of Miami's most acclaimed dining experiences, and the spa complete the offer.",
  27: "Faena Hotel is South Beach's most extravagantly curated luxury experience, a vision filled with the artwork, theatrical staging and artistic energy of a cultural institution as much as a hotel. The hotel's centrepiece — a gilded wooly mammoth skeleton by Damien Hirst — sets the tone for a property where every corridor is a gallery and every meal a performance. The Faena Forum arts venue, the beach club, and the legendary Los Fuegos restaurant by Francis Mallmann confirm this as Miami's most remarkable address.",
  28: "The Four Seasons Hotel at The Surf Club invites guests into one of the most legendary resort addresses in Miami Beach history — the original 1930s Surf Club members' building, meticulously restored by architect Joseph Dirand. The hotel's tower rooms and suites, each with ocean or bay views, frame a guest experience calibrated to the highest standard of personalised hospitality. The celebrated Le Sirenuse at The Surf Club restaurant and world-class spa define the property.",
  // America · New York
  29: "The Plaza Hotel, opened in 1907 at the corner of Fifth Avenue and Central Park South, is as much a cultural landmark as a place to sleep — its Edwardian Baroque facade and gilded public rooms have hosted every American President, visiting monarch and Hollywood star of the past century. The renowned Palm Court, intimate Champagne Bar, and legendary Eloise character who inhabits its corridors are all part of an irreplaceable New York mythology. Following a complete restoration, its rooms and suites blend original grandeur with every modern comfort.",
  30: "Aman New York, housed within the restored 1924 Crown Building on Fifth Avenue, represents the brand's most ambitious urban venture — a crown-jewel property in which the Aman philosophy of serene sanctuary is transplanted to the heart of Manhattan. The eighty-three rooms, suites and residences, each with twelve-foot ceilings and floor-to-ceiling windows overlooking Fifth Avenue, are the city's most spacious luxury hotel accommodations. The six-floor spa complex, rooftop bar, and acclaimed restaurant are already counted among the most sought-after in New York.",
  31: "The Mark, on Madison Avenue at 77th Street, occupies a discreet position on the Upper East Side that has long defined the neighbourhood's particular brand of understated elegance. The hotel's interiors, conceived by Jacques Grange, combine Modernist French design with New York's energy in rooms that feel more like private apartments than hotel rooms. The Mark Restaurant by Jean-Georges Vongerichten and New York's largest hotel suite — all three floors of the Penthouse — round out the offer.",
  // America · Los Angeles
  32: "Hotel Bel-Air has occupied its eleven-acre garden retreat in the Bel-Air hills since 1946, remaining one of the most discreet and beloved luxury addresses in the United States. Its rooms and suites are concealed among rose gardens, mature sycamores, and century plants along Stone Canyon Creek, offering a seclusion that feels extraordinary in the heart of Los Angeles. The Wolfgang Puck restaurant, recently restored spa, and famous Swan Lake are as much a part of LA's mythology as its most celebrated films.",
  33: "The Beverly Hills Hotel, opened in 1912 and nicknamed The Pink Palace, is one of the most iconic properties in the world — a legendary address where Hollywood history was made in its bungalows and poolside cabanas. The hotel's forty-seven poolside cabanas and twenty-three bungalows have hosted everyone from Marilyn Monroe and Frank Sinatra to Howard Hughes. The Polo Lounge and La Bella Vita spa continue to set the standard for glamorous Los Angeles luxury.",
  // America · Hawaii
  34: "The Four Seasons Maui at Wailea commands a breathtaking position on Wailea beach, where the hotel's signature towers frame views of Molokini Crater and the island of Kahoolawe across the clearest water in the Hawaiian chain. Seven restaurants and bars reflect the full depth of Hawaiian culinary tradition, and the exclusive Serenity Pool adults-only area and 22,000-square-foot spa complete an experience that is, by virtually every measure, the finest resort in the Hawaiian islands.",
  35: "Montage Kapalua Bay occupies the northwest tip of Maui in a spectacular position above Kapalua Bay, long acknowledged as one of the most beautiful beaches in the world. The resort's ocean view suites and villas, set among pineapple fields and sea cliffs, offer an intimacy and privacy rare in a resort of this calibre. The spa, the acclaimed Cane & Canoe restaurant, and the resort's proximity to two championship golf courses make it Maui's most complete residential resort experience.",
  // Europe · Santorini
  36: "Canaves Oia Suites is widely regarded as the finest address in Santorini, its collection of cave suites carved into the famous blue-and-white caldera cliffs above the village of Oia. Each suite features a private infinity pool precisely positioned to frame the island's legendary sunset, and the property's sense of intimate seclusion makes it feel like a private residence rather than a hotel. The sister restaurants and a signature cave spa ensure that guests rarely need to venture beyond the property's extraordinary clifftop setting.",
  37: "Grace Hotel Santorini commands one of the most dramatic positions on the caldera, its pool and terraces cantilevered high above Imerovigli for uninterrupted views from Oia to Akrotiri. The hotel's suites are individually designed, each capturing the island's palette of white, cobalt and terracotta in a contemporary idiom that feels both timeless and current. The outdoor Champagne Bar has become one of the most photographed locations in Greece, its sunbeds suspended over the cliff above the volcano.",
  38: "Katikies, carved into the caldera wall above Oia, helped define the international image of luxury in Santorini. Its series of interconnected levels descend the cliff face, connecting whitewashed suites, cave pools and hanging terraces with spectacular views over the flooded crater. The hotel's Michelin-starred Melitini restaurant and the cliff-top pool, appearing to dissolve into the Aegean horizon, are experiences that guests carry for a lifetime.",
  // Europe · Mykonos
  39: "Cavo Tagoo sits above Mykonos Town on a natural promontory with views across the Cyclades that seem to encompass half the Aegean, and since 1980 it has been the island's defining luxury address. The hotel's cave suites and swim-up pool rooms have been copied but never equalled across Greece, and the famous Alios restaurant transforms into one of the island's great after-dinner venues as the evening progresses. The infinity pool bar, carved from living rock, is one of the most-photographed details in all of Mediterranean luxury travel.",
  40: "Myconian Utopia Relais & Châteaux is among the most exclusive retreats in the Cyclades, a collection of just twenty-four suites perched on a hilltop above Elia Beach with views across the Aegean to the island of Ikaria. Each suite has been individually conceived by a different Greek designer, creating an atmospheric private museum of contemporary Hellenic culture. The infinity pool, surrounded by natural rock and aromatic herbs, is the social heart of a property that values absolute privacy above all else.",
  // Europe · Mallorca
  41: "Belmond La Residencia occupies two converted sixteenth-century manor houses in the mountain village of Deià — one of the most romantically beautiful places in the western Mediterranean. The hotel is beloved by artists, writers and musicians who come for the extraordinary landscape of the Tramuntana mountains cascading to the sea below. Restaurant El Olivo, one of the finest in the Balearics, and the legendary Belmond spa complete an experience that feels both timeless and impossible to replicate.",
  42: "Cap Vermell Grand Hotel commands the sea cliffs above Canyamel Bay on Mallorca's northeastern coast, a location that combines dramatic landscape with rare seclusion. The hotel's rooms and suites, many with private terraces or plunge pools, incorporate traditional Mallorcan craftsmanship into a contemporary luxury aesthetic. The celebrated thalassotherapy spa, drawing on the therapeutic properties of Mediterranean seawater, is considered among the finest in Spain.",
  // Europe · Amalfi Coast
  43: "Hotel Caruso, set in a restored eleventh-century palazzo high above the village of Ravello, offers what many consider the single most beautiful view in all of Italy — the infinite blue of the Tyrrhenian Sea framed by terraced lemon groves and ancient stone walls. The hotel's outdoor pool appears to float in mid-air against the sky and sea, a detail that has become one of the most iconic images in luxury travel. Its Belvedere restaurant, romantic gardens and intimacy of just forty-eight rooms make it one of the great hotels of the world.",
  44: "Il San Pietro di Positano occupies a dramatic cliffside setting above Positano, accessible only by a private lift through the living rock, and has maintained its position as the Amalfi Coast's most celebrated address since 1970. The hotel's rooms — each a unique space opening onto private terraces with sea views — are connected by flowering pathways that cling to the cliff face above a private beach. The sailing programme, three-star kitchen garden, and celebrated restaurant represent an approach to Italian luxury hospitality that has influenced hotels worldwide.",
  // Europe · Paris
  45: "The Ritz Paris, opened by César Ritz in 1898 at Place Vendôme, is the hotel that gave its name to the very concept of luxurious elegance — and following a four-year restoration, it is more perfect than ever. The one hundred and forty-two rooms and suites are finished with eighteenth-century-inspired boiseries, silk damasks and Swarovski chandeliers, set around the most beautiful inner garden in Paris. The Bar Hemingway and L'Espadon restaurant confirm its position at the absolute summit of Parisian hospitality.",
  46: "Le Bristol Paris, on Rue du Faubourg Saint-Honoré, is the quintessential grand Parisian palace — a property whose art, antiques and personal service define the haute couture of luxury hospitality. The hotel's fifty-six-metre rooftop pool overlooking the Sacré-Cœur and the garden maintained in year-round floral precision are among the most spectacular details of any city hotel in the world. Restaurant Epicure, holder of three Michelin stars under Eric Frechon, is one of the great dining experiences in the world.",
  // Europe · Côte d'Azur
  47: "The Grand-Hôtel du Cap-Ferrat, Four Seasons, has stood at the very tip of Cap Ferrat since 1908, its white Edwardian facade and garden of fourteen hectares representing the most aristocratic address on the Côte d'Azur. The Olympic-size pool, carved from the cliff above the sea, the Club Dauphin beach club, and the spa are among the finest on the entire Riviera. Guests arrive to a property where the scale, silence and extraordinary light of the Mediterranean combine to create an atmosphere of absolute privilege.",
  48: "Hotel du Cap-Eden-Roc is the legendary property at the tip of the Cap d'Antibes that the writers of the Jazz Age — Fitzgerald, Hemingway, Picasso — made their summer court, and it has remained the pre-eminent hotel of the French Riviera for one hundred and fifty years. The Pavillon Eden-Roc, set directly above the sea on a granite promontory, houses the most celebrated open-air restaurant in France, and the hotel's saltwater pool, blasted from the rock, is an icon of twentieth-century Mediterranean luxury.",
  // Europe · Swiss Alps
  49: "The Chedi Andermatt brings an unexpected Asian tranquillity to the Swiss Alps, its long white forms and minimalist Japanese aesthetic contrasting dramatically with the stone chalets and baroque architecture of the surrounding valley. The fifty-five-metre indoor swimming pool — the longest in the Alps — the wine library, and the acclaimed Japanese restaurant create an atmosphere of refined understatement unique in Swiss mountain hospitality. Access to the Andermatt-Sedrun ski area and world-class golf in summer make it a year-round proposition.",
  50: "Badrutt's Palace in St Moritz has been one of the great institutions of European winter life since 1896, a hotel that not only invented the concept of the winter holiday but has hosted the social summit of global aristocracy and creativity for over a century. The Romanesque towers and lakeside setting are beloved icons of the Engadin valley, and the Cinebar, Palace Grill, and King's Club nightclub form the social heart of St Moritz's impossibly glamorous season. No other hotel in the world commands quite this combination of history, setting and permanent prestige.",
  // Europe · London
  51: "Claridge's, on Brook Street in Mayfair, has been the quintessential London address since the nineteenth century — a hotel synonymous with the highest standards of English hospitality and the discreet entertainment of royalty, diplomats, and the world's most celebrated creative figures. The hotel's Art Deco interiors, meticulously preserved following major restoration, provide the setting for the Mayfair Bar, the Fumoir, and the unequalled afternoon tea in the foyer. Suite No. 212, reserved for European royalty in exile during the Second World War, remains a tangible piece of living history.",
  52: "The Savoy, opened by Richard D'Oyly Carte in 1889 and London's first truly modern luxury hotel, remains one of the world's great landmark properties — the place that invented the dry martini, installed the first electric lights in London, and welcomed a guest list including Claude Monet, Oscar Wilde, and every head of state of the twentieth century. The hotel's Edwardian and Art Deco interiors, restored at a cost of £220 million, frame the Thames-view suites, the River Restaurant and the legendary American Bar with grandeur entirely appropriate to its history.",
  // Europe · Barcelona
  53: "Hotel Arts is Barcelona's definitive luxury address on the waterfront, its forty-four-storey tower commanding 360-degree views from the Mediterranean to the Tibidabo hills. The hotel's facilities include an outdoor pool that appears to hover above the port, a beach club directly on the Barceloneta sand, and the Six Senses spa — the group's first in Barcelona. Restaurant Enoteca under Paco Pérez holds two Michelin stars and is considered the most sophisticated dining experience in the city.",
  54: "W Barcelona rises from the sea at the far end of the Barceloneta beachfront in the form of a ship's sail, an architectural statement as bold as the brand itself. The rooms and suites, all with unobstructed Mediterranean views, are among the most glamorously designed in the city, and the hotel's WET pool deck and Eclipse rooftop bar define Barcelona's luxury nightlife. The beach access, avant-garde restaurant, and full-service AWAY Spa create a complete luxury resort experience at the heart of the city.",
};

export function getHotelDescription(stay: Stay): string {
  return DESCRIPTIONS[stay.id] ?? `${stay.name} is an extraordinary luxury property set in the heart of ${stay.city}. Each carefully appointed suite offers a seamless blend of local culture and international refinement, with personalised service that anticipates every desire. World-class dining, an award-winning spa, and effortless access to the destination's finest experiences make this an unmissable address.`;
}

// ─── Hotel tags ───────────────────────────────────────────────────────────────

export function getHotelTags(stay: Stay): string[] {
  const tags: string[] = [`${stay.rating}-Star`, 'Luxury Resort'];
  if (stay.amenities.includes('Beach')) tags.push('Beachfront');
  if (stay.amenities.includes('Spa'))   tags.push('Award-Winning Spa');
  if (stay.amenities.includes('Pool'))  tags.push('Private Pool');
  if (stay.tag.toLowerCase().includes('villa')) tags.push('Private Villas');
  if (stay.city === 'Paris' || stay.city === 'London') tags.push('City Centre');
  return tags.slice(0, 4);
}

// ─── Full amenities ───────────────────────────────────────────────────────────

export interface AmenityItem {
  label: string;
  available: boolean;
  icon: string; // lucide icon name
}

export function getFullAmenities(stay: Stay): AmenityItem[] {
  const has = (name: string) => stay.amenities.some(a =>
    a.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(a.toLowerCase())
  );
  return [
    { label: 'Swimming Pool',    available: has('Pool'),       icon: 'Waves' },
    { label: 'Spa & Wellness',   available: has('Spa'),        icon: 'Sparkles' },
    { label: 'Private Beach',    available: has('Beach'),      icon: 'Umbrella' },
    { label: 'Restaurant',       available: has('Restaurant'), icon: 'UtensilsCrossed' },
    { label: 'Fitness Centre',   available: has('Gym'),        icon: 'Dumbbell' },
    { label: 'Room Service',     available: true,              icon: 'Bell' },
    { label: 'Free WiFi',        available: true,              icon: 'Wifi' },
    { label: 'Airport Transfer', available: true,              icon: 'Car' },
    { label: 'Bar & Lounge',     available: true,              icon: 'Wine' },
    { label: 'Concierge',        available: true,              icon: 'Star' },
  ];
}

// ─── Reviews pool ─────────────────────────────────────────────────────────────

export interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
}

const REVIEWS: Review[] = [
  { name: 'Sophie Laurent',     date: 'March 2026',    rating: 5, text: 'An absolutely transcendent experience from the moment of arrival. The attention to detail is extraordinary — every member of staff seemed to know exactly what we needed before we asked. The most memorable stay of our lives.' },
  { name: 'James Worthington',  date: 'February 2026', rating: 5, text: "We've stayed at luxury hotels around the world, but nothing compares to this. The combination of setting, service and cuisine is genuinely without equal. We have already booked our return visit for next year." },
  { name: 'Isabelle Chen',      date: 'January 2026',  rating: 5, text: 'The villa exceeded every expectation. Waking up to that view every morning felt surreal, and the in-villa dining was some of the best food we ate on the entire trip. The spa treatments were extraordinary.' },
  { name: 'Marcus Webb',        date: 'December 2025', rating: 5, text: 'Simply impeccable in every respect. From the complimentary arrival transfer to the personalised turndown, the standard of care never wavered once. This is what true luxury hospitality looks like.' },
  { name: 'Amelia Hoffmann',    date: 'November 2025', rating: 5, text: 'I travel extensively for work and rarely write reviews, but this property deserves every word of praise I can offer. The room was breathtaking, the food was outstanding, and the staff were the most professional I have encountered anywhere in the world.' },
  { name: 'Oliver Park',        date: 'October 2025',  rating: 4, text: "We celebrated our anniversary here and the team made it feel truly special. Small touches throughout — from the handwritten note on arrival to the surprise champagne at dinner — showed a real commitment to making each stay unique. We'll be back." },
  { name: 'Charlotte Müller',   date: 'September 2025', rating: 5, text: 'The definition of a perfect hotel stay. The balance between grandeur and warmth is remarkable — never stuffy, always gracious. The pool experience alone is worth the stay, and the food across all outlets was exceptional.' },
  { name: 'Ethan Nakamura',     date: 'August 2025',   rating: 5, text: 'A world unto itself. We barely left the property during a week-long stay, which says everything about how complete the experience is. The spa, the beach, the dining — each is a destination in its own right.' },
  { name: 'Valentina Rossi',    date: 'July 2025',     rating: 5, text: 'Every detail is considered and executed with exceptional care. The morning yoga overlooking the sea, the evening cocktails on the terrace, the extraordinary quality of the bed linen — it all adds up to something genuinely transformative.' },
  { name: 'Hugo Bellamy',       date: 'June 2025',     rating: 4, text: "One of the finest properties I have stayed in during thirty years of luxury travel. The architecture alone is worth visiting, but it's the quality of the people — from the GM to the housekeeping team — that truly sets this apart." },
  { name: 'Natasha Volkov',     date: 'May 2025',      rating: 5, text: 'We were travelling with young children and the team handled every aspect of our stay with warmth, patience and genuine enthusiasm. The kids club is outstanding and the in-room amenities for families are thoughtfully curated.' },
  { name: 'Frederick Dumont',   date: 'April 2025',    rating: 5, text: 'There are hotels and then there is this. The craftsmanship in every corner of the property reflects an extraordinary investment in quality, and the service philosophy — generous, discreet, instinctively correct — is remarkable.' },
];

export function getReviews(hotelId: number): Review[] {
  return [
    REVIEWS[hotelId % REVIEWS.length],
    REVIEWS[(hotelId + 4) % REVIEWS.length],
    REVIEWS[(hotelId + 8) % REVIEWS.length],
  ];
}

// ─── Flight detail data ───────────────────────────────────────────────────────

export interface FlightDetail {
  departureTime: string;
  arrivalTime:   string;
  departureTerm: string;
  arrivalTerm:   string;
  aircraft:      string;
  seatPitch:     string;
  amenities:     string[];
  baggage:       string;
  cancellation:  string;
  changeFee:     string;
  refund:        string;
}

const FLIGHT_DETAILS: Record<number, FlightDetail> = {
  55: { departureTime: '09:10', arrivalTime: '23:40', departureTerm: 'Terminal 1', arrivalTerm: 'Terminal 2', aircraft: 'Airbus A340-600', seatPitch: '31" (Economy)', amenities: ['Meal included', 'Entertainment', 'USB charging'], baggage: '1 × 23 kg checked + 1 carry-on', cancellation: 'Non-refundable', changeFee: '€150 per person', refund: 'Flight credit only' },
  56: { departureTime: '09:10', arrivalTime: '23:40', departureTerm: 'Terminal 1', arrivalTerm: 'Terminal 2', aircraft: 'Airbus A340-600', seatPitch: '78" lie-flat (Business)', amenities: ['Wi-Fi', 'Meal included', 'Entertainment', 'Lounge Access', 'Amenity Kit'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free cancellation up to 48h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
  57: { departureTime: '11:30', arrivalTime: '06:40+1', departureTerm: 'Terminal 2', arrivalTerm: 'Suvarnabhumi T1', aircraft: 'Boeing 777-300ER', seatPitch: '76" lie-flat (Business)', amenities: ['Wi-Fi', 'Meal included', 'Entertainment', 'Lounge Access'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 48h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
  58: { departureTime: '21:20', arrivalTime: '17:05+1', departureTerm: 'Terminal 5', arrivalTerm: 'Terminal 1', aircraft: 'Boeing 787-9 Dreamliner', seatPitch: '74" lie-flat (Business)', amenities: ['Wi-Fi', 'Meal included', 'Entertainment', 'Lounge Access', 'Amenity Kit'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 72h before', changeFee: 'Free twice', refund: 'Full refund within 24h' },
  59: { departureTime: '07:15', arrivalTime: '14:20', departureTerm: 'Terminal 1', arrivalTerm: 'Terminal 3', aircraft: 'Airbus A380', seatPitch: '31" (Economy)', amenities: ['Meal included', 'Entertainment', 'USB charging'], baggage: '1 × 23 kg checked + 1 carry-on', cancellation: 'Non-refundable', changeFee: '€120 per person', refund: 'Flight credit only' },
  60: { departureTime: '14:30', arrivalTime: '22:45', departureTerm: 'Terminal 2', arrivalTerm: 'Terminal 3', aircraft: 'Airbus A380', seatPitch: '82" lie-flat Private Suite (First)', amenities: ['Wi-Fi', 'Gourmet dining', 'Private Suite', 'Shower Spa', 'Chauffeur transfer', 'Lounge Access'], baggage: '3 × 32 kg checked + 1 carry-on', cancellation: 'Free cancellation up to 24h', changeFee: 'Complimentary', refund: 'Full refund' },
  61: { departureTime: '08:00', arrivalTime: '18:00', departureTerm: 'Terminal 3', arrivalTerm: 'Terminal 3', aircraft: 'Airbus A380', seatPitch: '76" lie-flat (Business)', amenities: ['Wi-Fi', 'Meal included', 'Entertainment', 'Lounge Access', 'Amenity Kit'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 48h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
  62: { departureTime: '13:00', arrivalTime: '22:45', departureTerm: 'Terminal 2E', arrivalTerm: 'Terminal 1', aircraft: 'Boeing 787-9 Dreamliner', seatPitch: '74" lie-flat (Business)', amenities: ['Wi-Fi', 'Meal included', 'Entertainment', 'Lounge Access'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 48h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
  63: { departureTime: '10:25', arrivalTime: '14:10', departureTerm: 'Terminal 1', arrivalTerm: 'Terminal E', aircraft: 'Airbus A330-300', seatPitch: '31" (Economy)', amenities: ['Meal included', 'Entertainment'], baggage: '1 × 23 kg checked + 1 carry-on', cancellation: 'Non-refundable', changeFee: '€100 per person', refund: 'Flight credit only' },
  64: { departureTime: '10:25', arrivalTime: '14:10', departureTerm: 'Terminal 1', arrivalTerm: 'Terminal E', aircraft: 'Airbus A330-300', seatPitch: '78" lie-flat (Business)', amenities: ['Wi-Fi', 'Meal included', 'Entertainment', 'Lounge Access', 'Amenity Kit'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 48h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
  65: { departureTime: '09:30', arrivalTime: '12:40', departureTerm: 'Terminal 5', arrivalTerm: 'Terminal 7', aircraft: 'Boeing 777-300ER', seatPitch: '78" lie-flat (Business)', amenities: ['Wi-Fi', 'Meal included', 'Entertainment', 'Lounge Access', 'Amenity Kit'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 48h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
  66: { departureTime: '13:40', arrivalTime: '16:00+1', departureTerm: 'Terminal 1', arrivalTerm: 'Terminal B', aircraft: 'Airbus A340-600', seatPitch: '78" lie-flat (Business)', amenities: ['Wi-Fi', 'Meal included', 'Entertainment', 'Lounge Access'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 48h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
  67: { departureTime: '07:00', arrivalTime: '10:20', departureTerm: 'Terminal 2', arrivalTerm: 'Main Terminal', aircraft: 'Airbus A320', seatPitch: '30" (Economy)', amenities: ['Snack included', 'Entertainment'], baggage: '1 × 23 kg checked + 1 carry-on', cancellation: 'Non-refundable', changeFee: '€60 per person', refund: 'Flight credit only' },
  68: { departureTime: '06:50', arrivalTime: '08:50', departureTerm: 'Terminal 1', arrivalTerm: 'Terminal 2', aircraft: 'Airbus A319', seatPitch: '30" (Economy)', amenities: ['Snack available'], baggage: '1 × 23 kg checked + 1 carry-on', cancellation: 'Non-refundable', changeFee: '€50 per person', refund: 'Flight credit only' },
  69: { departureTime: '06:30', arrivalTime: '09:40', departureTerm: 'Terminal 5', arrivalTerm: 'Terminal 1', aircraft: 'Airbus A321', seatPitch: '30" (Economy)', amenities: ['Snack available', 'Entertainment'], baggage: '1 × 23 kg checked + 1 carry-on', cancellation: 'Non-refundable', changeFee: '€50 per person', refund: 'Flight credit only' },
  70: { departureTime: '08:15', arrivalTime: '09:20', departureTerm: 'Terminal A', arrivalTerm: 'Terminal 2', aircraft: 'Airbus A220-300', seatPitch: '76" lie-flat (Business)', amenities: ['Gourmet meal', 'Wi-Fi', 'Lounge Access'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 24h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
  71: { departureTime: '07:00', arrivalTime: '08:25', departureTerm: 'Terminal 1', arrivalTerm: 'Terminal 2E', aircraft: 'Airbus A320', seatPitch: '76" lie-flat (Business)', amenities: ['Gourmet meal', 'Lounge Access', 'Wi-Fi'], baggage: '2 × 32 kg checked + 1 carry-on', cancellation: 'Free up to 24h before', changeFee: 'Free once', refund: 'Full refund within 24h' },
};

export function getFlightDetail(flight: Flight): FlightDetail {
  return FLIGHT_DETAILS[flight.id] ?? {
    departureTime: '10:00', arrivalTime: '16:00',
    departureTerm: 'Terminal 1', arrivalTerm: 'Terminal 2',
    aircraft: 'Airbus A320', seatPitch: '30" (Economy)',
    amenities: ['Meal included'], baggage: '1 × 23 kg + carry-on',
    cancellation: 'Non-refundable', changeFee: '€100 per person', refund: 'Flight credit only',
  };
}

// ─── Package detail data ──────────────────────────────────────────────────────

export interface PackageDetail {
  flightRoute:     string;
  flightAirline:   string;
  flightClass:     string;
  flightDuration:  string;
  departureTime:   string;
  arrivalTime:     string;
  hotelNights:     string;
  hotelRoom:       string;
  transferVehicle: string;
  transferRoute:   string;
  transferTime:    string;
  included:        string[];
  flightCost:      number;
  hotelCost:       number;
  transferCost:    number;
  discount:        number;
}

const PKG_DETAILS: Record<number, PackageDetail> = {
  72: { flightRoute: 'FRA → HKT', flightAirline: 'Lufthansa', flightClass: 'Business Class', flightDuration: '12h 30m · Direct', departureTime: '09:10', arrivalTime: '23:40', hotelNights: '7 nights', hotelRoom: 'Beachfront Pavilion', transferVehicle: 'Mercedes V-Class', transferRoute: 'Phuket Int\'l Airport → Amanpuri', transferTime: '45 minutes', included: ['Return Business Class flights', '7 nights in Beachfront Pavilion', 'Daily breakfast for two', 'Private airport transfer', 'Welcome amenities', '24h concierge'], flightCost: 4200, hotelCost: 12600, transferCost: 400, discount: 7400 },
  73: { flightRoute: 'MUC → BKK', flightAirline: 'Thai Airways', flightClass: 'Business Class', flightDuration: '11h 10m · Direct', departureTime: '11:30', arrivalTime: '06:40+1', hotelNights: '10 nights', hotelRoom: 'Pool Villa', transferVehicle: 'Private Minivan', transferRoute: 'Suvarnabhumi Airport → Banyan Tree Phuket', transferTime: '90 minutes', included: ['Return Business Class flights', '10 nights in Pool Villa', 'Daily breakfast', 'Private airport transfer', 'One spa treatment per person', 'Welcome fruit basket'], flightCost: 5200, hotelCost: 7500, transferCost: 500, discount: 3800 },
  74: { flightRoute: 'FRA → BKK', flightAirline: 'Lufthansa', flightClass: 'Business Class', flightDuration: '10h 30m · Direct', departureTime: '09:10', arrivalTime: '23:40', hotelNights: '7 nights', hotelRoom: 'Ocean Pool Villa', transferVehicle: 'Mercedes E-Class', transferRoute: 'Koh Samui Airport → Six Senses Samui', transferTime: '30 minutes', included: ['Return Business Class flights', '7 nights in Ocean Pool Villa', 'Daily breakfast for two', 'Private airport transfer', 'Wellness consultation', 'Complimentary minibar daily'], flightCost: 4200, hotelCost: 9450, transferCost: 300, discount: 3350 },
  75: { flightRoute: 'FRA → DXB', flightAirline: 'Lufthansa', flightClass: 'Business Class', flightDuration: '6h 05m · Direct', departureTime: '07:15', arrivalTime: '14:20', hotelNights: '7 nights', hotelRoom: 'Signature Suite', transferVehicle: 'Rolls-Royce Ghost', transferRoute: 'Dubai Int\'l → Armani Hotel', transferTime: '25 minutes', included: ['Return Business Class flights', '7 nights in Signature Suite', 'Daily breakfast', 'Rolls-Royce transfer both ways', 'Complimentary spa credit $300', 'Priority Burj Khalifa access'], flightCost: 3200, hotelCost: 7700, transferCost: 800, discount: 2800 },
  76: { flightRoute: 'MUC → DXB', flightAirline: 'Emirates', flightClass: 'First Class', flightDuration: '6h 15m · Direct', departureTime: '14:30', arrivalTime: '22:45', hotelNights: '5 nights', hotelRoom: 'Royal Suite', transferVehicle: 'Rolls-Royce Phantom', transferRoute: 'Dubai Int\'l → Burj Al Arab', transferTime: '20 minutes', included: ['Return First Class flights', '5 nights in Royal Suite', 'All-inclusive dining', 'Rolls-Royce Phantom both ways', 'Private butler', 'Underwater restaurant dining', 'Complimentary spa access'], flightCost: 9600, hotelCost: 16000, transferCost: 1200, discount: 12300 },
  77: { flightRoute: 'FRA → MIA', flightAirline: 'Lufthansa', flightClass: 'Business Class', flightDuration: '11h 45m · Direct', departureTime: '10:25', arrivalTime: '14:10', hotelNights: '7 nights', hotelRoom: 'Saxony Suite', transferVehicle: 'Cadillac Escalade', transferRoute: 'Miami Int\'l → Faena Hotel', transferTime: '25 minutes', included: ['Return Business Class flights', '7 nights in Saxony Suite', 'Daily breakfast', 'Private airport transfer', 'Welcome champagne', 'Reserved pool cabana'], flightCost: 3200, hotelCost: 5950, transferCost: 350, discount: 2700 },
  78: { flightRoute: 'LHR → JFK', flightAirline: 'British Airways', flightClass: 'Business Class', flightDuration: '8h 10m · Direct', departureTime: '09:30', arrivalTime: '12:40', hotelNights: '5 nights', hotelRoom: 'Loft Suite', transferVehicle: 'Mercedes S-Class', transferRoute: 'JFK Airport → Aman New York', transferTime: '55 minutes', included: ['Return Business Class flights', '5 nights in Loft Suite', 'Daily breakfast', 'Chauffeur transfer', 'Spa access', 'Private rooftop bar access'], flightCost: 3800, hotelCost: 9000, transferCost: 600, discount: 2200 },
  79: { flightRoute: 'FRA → JTR', flightAirline: 'Aegean Airlines', flightClass: 'Economy', flightDuration: '3h 20m · Direct', departureTime: '07:00', arrivalTime: '10:20', hotelNights: '5 nights', hotelRoom: 'Cliff Suite', transferVehicle: 'Private Minibus', transferRoute: 'Santorini Airport → Canaves Oia', transferTime: '35 minutes', included: ['Return Economy flights', '5 nights in Cliff Suite', 'Daily breakfast', 'Airport transfer', 'Sunset wine tasting', 'Cave spa treatment'], flightCost: 760, hotelCost: 4600, transferCost: 200, discount: 360 },
  80: { flightRoute: 'LHR → CDG', flightAirline: 'Air France', flightClass: 'Business Class', flightDuration: '1h 25m · Direct', departureTime: '07:00', arrivalTime: '08:25', hotelNights: '6 nights', hotelRoom: 'Imperial Suite', transferVehicle: 'Mercedes S-Class', transferRoute: 'CDG → The Ritz Paris', transferTime: '45 minutes', included: ['Return Business Class flights', '6 nights in Imperial Suite', 'Daily breakfast', 'Chauffeur transfer', 'Complimentary dinner for two', 'Access to Ritz Health Club'], flightCost: 1040, hotelCost: 13200, transferCost: 600, discount: 1040 },
  81: { flightRoute: 'MUC → NAP', flightAirline: 'Lufthansa', flightClass: 'Business Class', flightDuration: '2h 10m · Direct', departureTime: '08:00', arrivalTime: '09:50', hotelNights: '6 nights', hotelRoom: 'Belvedere Suite', transferVehicle: 'Mercedes V-Class', transferRoute: 'Naples Airport → Hotel Caruso, Ravello', transferTime: '70 minutes', included: ['Return Business Class flights', '6 nights in Belvedere Suite', 'Daily breakfast', 'Private transfer with guide', 'Boat trip along the Amalfi Coast', 'Complimentary spa treatment'], flightCost: 1200, hotelCost: 6600, transferCost: 400, discount: 800 },
};

export function getPackageDetail(pkg: TravelPackage): PackageDetail {
  return PKG_DETAILS[pkg.id] ?? {
    flightRoute: pkg.route, flightAirline: 'Lufthansa', flightClass: 'Business Class',
    flightDuration: '8h · Direct', departureTime: '09:00', arrivalTime: '17:00',
    hotelNights: `${pkg.nights} nights`, hotelRoom: 'Deluxe Room',
    transferVehicle: 'Mercedes E-Class', transferRoute: 'Airport → Hotel',
    transferTime: '30 minutes', included: pkg.includes.map(i => `${i} included`),
    flightCost: Math.round(pkg.price * 0.35), hotelCost: Math.round(pkg.price * 0.55),
    transferCost: Math.round(pkg.price * 0.07), discount: Math.round(pkg.price * 0.1),
  };
}
