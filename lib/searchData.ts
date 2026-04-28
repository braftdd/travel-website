// ─── Types ────────────────────────────────────────────────────────────────────

export interface Stay {
  id: number;
  type: 'stay';
  name: string;
  city: string;
  location: string;
  destination: string;
  price: number;
  rating: number;
  tag: string;
  image: string;
  amenities: string[];
}

export interface Flight {
  id: number;
  type: 'flight';
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  duration: string;
  flightClass: 'Economy' | 'Business' | 'First';
  price: number;
  airline: string;
  destination: string;
}

export interface TravelPackage {
  id: number;
  type: 'package';
  name: string;
  hotel: string;
  route: string;
  nights: number;
  price: number;
  image: string;
  destination: string;
  includes: string[];
}

export type SearchResult = Stay | Flight | TravelPackage;
export type ResultType = 'all' | 'stay' | 'flight' | 'package';
export type SortBy = 'recommended' | 'price-asc' | 'price-desc' | 'rating';

// ─── Images (confirmed working from codebase) ─────────────────────────────────

const IMG = {
  tropicalVilla:   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=85',
  oceanPool:       'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=700&q=85',
  beach:           'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=85',
  thailand:        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&q=85',
  resortPool:      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=85',
  dubaiTower:      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85',
  dubaiCity:       'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=85',
  luxuryInterior:  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=85',
  hotelSuite:      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&q=85',
  santorini:       'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&q=85',
  americaCity:     'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=700&q=85',
};

// ─── Stays ────────────────────────────────────────────────────────────────────

export const stays: Stay[] = [

  // ── Thailand · Phuket (5) ──────────────────────────────────────────────────
  {
    id: 1, type: 'stay', city: 'Phuket',
    name: 'Amanpuri', location: 'Phuket, Thailand', destination: 'Thailand',
    price: 1800, rating: 5, tag: 'Beachfront Pavilion',
    image: IMG.tropicalVilla, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },
  {
    id: 2, type: 'stay', city: 'Phuket',
    name: 'Trisara', location: 'Phuket, Thailand', destination: 'Thailand',
    price: 1400, rating: 5, tag: 'Ocean Villa',
    image: IMG.oceanPool, amenities: ['Pool', 'Beach', 'Spa'],
  },
  {
    id: 3, type: 'stay', city: 'Phuket',
    name: 'The Surin Phuket', location: 'Phuket, Thailand', destination: 'Thailand',
    price: 890, rating: 5, tag: 'Beachfront Cottage',
    image: IMG.beach, amenities: ['Beach', 'Restaurant', 'Spa'],
  },
  {
    id: 4, type: 'stay', city: 'Phuket',
    name: 'Banyan Tree Phuket', location: 'Phuket, Thailand', destination: 'Thailand',
    price: 750, rating: 5, tag: 'Pool Villa',
    image: IMG.thailand, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 5, type: 'stay', city: 'Phuket',
    name: 'Rosewood Phuket', location: 'Phuket, Thailand', destination: 'Thailand',
    price: 1200, rating: 5, tag: 'Treehouse Villa',
    image: IMG.resortPool, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },

  // ── Thailand · Koh Samui (4) ───────────────────────────────────────────────
  {
    id: 6, type: 'stay', city: 'Koh Samui',
    name: 'Four Seasons Koh Samui', location: 'Koh Samui, Thailand', destination: 'Thailand',
    price: 1100, rating: 5, tag: 'Hillside Villa',
    image: IMG.tropicalVilla, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },
  {
    id: 7, type: 'stay', city: 'Koh Samui',
    name: 'Conrad Koh Samui', location: 'Koh Samui, Thailand', destination: 'Thailand',
    price: 680, rating: 5, tag: 'Cliff Villa',
    image: IMG.oceanPool, amenities: ['Pool', 'Restaurant', 'Spa'],
  },
  {
    id: 8, type: 'stay', city: 'Koh Samui',
    name: 'Vana Belle', location: 'Koh Samui, Thailand', destination: 'Thailand',
    price: 920, rating: 5, tag: 'Beachfront Suite',
    image: IMG.beach, amenities: ['Pool', 'Beach', 'Restaurant'],
  },
  {
    id: 9, type: 'stay', city: 'Koh Samui',
    name: 'Six Senses Samui', location: 'Koh Samui, Thailand', destination: 'Thailand',
    price: 1350, rating: 5, tag: 'Ocean Pool Villa',
    image: IMG.resortPool, amenities: ['Pool', 'Spa', 'Beach', 'Restaurant'],
  },

  // ── Thailand · Chiang Mai (3) ──────────────────────────────────────────────
  {
    id: 10, type: 'stay', city: 'Chiang Mai',
    name: 'Four Seasons Tented Camp', location: 'Chiang Mai, Thailand', destination: 'Thailand',
    price: 850, rating: 5, tag: 'Luxury Tent',
    image: IMG.thailand, amenities: ['Spa', 'Restaurant'],
  },
  {
    id: 11, type: 'stay', city: 'Chiang Mai',
    name: 'Dhara Dhevi', location: 'Chiang Mai, Thailand', destination: 'Thailand',
    price: 620, rating: 5, tag: 'Lanna Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 12, type: 'stay', city: 'Chiang Mai',
    name: 'Raya Heritage', location: 'Chiang Mai, Thailand', destination: 'Thailand',
    price: 480, rating: 5, tag: 'River Villa',
    image: IMG.beach, amenities: ['Pool', 'Restaurant', 'Spa'],
  },

  // ── Thailand · Bangkok (3) ────────────────────────────────────────────────
  {
    id: 13, type: 'stay', city: 'Bangkok',
    name: 'Mandarin Oriental Bangkok', location: 'Bangkok, Thailand', destination: 'Thailand',
    price: 650, rating: 5, tag: 'River Suite',
    image: IMG.luxuryInterior, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 14, type: 'stay', city: 'Bangkok',
    name: 'The Siam', location: 'Bangkok, Thailand', destination: 'Thailand',
    price: 780, rating: 5, tag: 'Pool Villa',
    image: IMG.oceanPool, amenities: ['Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 15, type: 'stay', city: 'Bangkok',
    name: 'Capella Bangkok', location: 'Bangkok, Thailand', destination: 'Thailand',
    price: 850, rating: 5, tag: 'Riverview Suite',
    image: IMG.hotelSuite, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },

  // ── UAE · Dubai (6) ───────────────────────────────────────────────────────
  {
    id: 16, type: 'stay', city: 'Dubai',
    name: 'Burj Al Arab', location: 'Dubai, UAE', destination: 'UAE',
    price: 3200, rating: 5, tag: 'Royal Suite',
    image: IMG.dubaiTower, amenities: ['Pool', 'Spa', 'Restaurant', 'Beach'],
  },
  {
    id: 17, type: 'stay', city: 'Dubai',
    name: 'Armani Hotel', location: 'Dubai, UAE', destination: 'UAE',
    price: 1100, rating: 5, tag: 'Signature Suite',
    image: IMG.luxuryInterior, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 18, type: 'stay', city: 'Dubai',
    name: 'One&Only Royal Mirage', location: 'Dubai, UAE', destination: 'UAE',
    price: 890, rating: 5, tag: 'Arabian Court',
    image: IMG.resortPool, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },
  {
    id: 19, type: 'stay', city: 'Dubai',
    name: 'Atlantis The Royal', location: 'Dubai, UAE', destination: 'UAE',
    price: 1600, rating: 5, tag: 'Sky Pool Suite',
    image: IMG.dubaiCity, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 20, type: 'stay', city: 'Dubai',
    name: 'Address Downtown', location: 'Dubai, UAE', destination: 'UAE',
    price: 620, rating: 5, tag: 'Fountain Suite',
    image: IMG.hotelSuite, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 21, type: 'stay', city: 'Dubai',
    name: 'Jumeirah Al Naseem', location: 'Dubai, UAE', destination: 'UAE',
    price: 780, rating: 5, tag: 'Beachfront Suite',
    image: IMG.dubaiTower, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },

  // ── UAE · Abu Dhabi (4) ───────────────────────────────────────────────────
  {
    id: 22, type: 'stay', city: 'Abu Dhabi',
    name: 'Emirates Palace', location: 'Abu Dhabi, UAE', destination: 'UAE',
    price: 1400, rating: 5, tag: 'Palace Suite',
    image: IMG.luxuryInterior, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },
  {
    id: 23, type: 'stay', city: 'Abu Dhabi',
    name: 'St. Regis Saadiyat', location: 'Abu Dhabi, UAE', destination: 'UAE',
    price: 920, rating: 5, tag: 'Island Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 24, type: 'stay', city: 'Abu Dhabi',
    name: 'Louvre Abu Dhabi Beach', location: 'Abu Dhabi, UAE', destination: 'UAE',
    price: 740, rating: 5, tag: 'Beachfront Room',
    image: IMG.beach, amenities: ['Pool', 'Beach', 'Restaurant'],
  },
  {
    id: 25, type: 'stay', city: 'Abu Dhabi',
    name: 'Shangri-La Qaryat Al Beri', location: 'Abu Dhabi, UAE', destination: 'UAE',
    price: 680, rating: 5, tag: 'Horizon Suite',
    image: IMG.dubaiCity, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },

  // ── America · Miami (3) ───────────────────────────────────────────────────
  {
    id: 26, type: 'stay', city: 'Miami',
    name: 'The Setai', location: 'Miami Beach, USA', destination: 'America',
    price: 680, rating: 5, tag: 'Penthouse Suite',
    image: IMG.hotelSuite, amenities: ['Pool', 'Gym', 'Restaurant', 'Spa'],
  },
  {
    id: 27, type: 'stay', city: 'Miami',
    name: 'Faena Hotel Miami', location: 'Miami Beach, USA', destination: 'America',
    price: 850, rating: 5, tag: 'Saxony Suite',
    image: IMG.americaCity, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },
  {
    id: 28, type: 'stay', city: 'Miami',
    name: 'Four Seasons Surf Club', location: 'Miami Beach, USA', destination: 'America',
    price: 780, rating: 5, tag: 'Ocean Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant', 'Gym'],
  },

  // ── America · New York (3) ────────────────────────────────────────────────
  {
    id: 29, type: 'stay', city: 'New York',
    name: 'The Plaza', location: 'New York, USA', destination: 'America',
    price: 950, rating: 5, tag: 'Central Park Suite',
    image: IMG.luxuryInterior, amenities: ['Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 30, type: 'stay', city: 'New York',
    name: 'Aman New York', location: 'New York, USA', destination: 'America',
    price: 1800, rating: 5, tag: 'Loft Suite',
    image: IMG.hotelSuite, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 31, type: 'stay', city: 'New York',
    name: 'The Mark', location: 'New York, USA', destination: 'America',
    price: 720, rating: 5, tag: 'Penthouse',
    image: IMG.americaCity, amenities: ['Restaurant', 'Gym', 'Spa'],
  },

  // ── America · Los Angeles (2) ─────────────────────────────────────────────
  {
    id: 32, type: 'stay', city: 'Los Angeles',
    name: 'Hotel Bel-Air', location: 'Los Angeles, USA', destination: 'America',
    price: 980, rating: 5, tag: 'Garden Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 33, type: 'stay', city: 'Los Angeles',
    name: 'Beverly Hills Hotel', location: 'Beverly Hills, USA', destination: 'America',
    price: 650, rating: 5, tag: 'Bungalow',
    image: IMG.beach, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },

  // ── America · Hawaii (2) ──────────────────────────────────────────────────
  {
    id: 34, type: 'stay', city: 'Hawaii',
    name: 'Four Seasons Maui', location: 'Maui, Hawaii', destination: 'America',
    price: 1200, rating: 5, tag: 'Ocean Lanai Suite',
    image: IMG.tropicalVilla, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },
  {
    id: 35, type: 'stay', city: 'Hawaii',
    name: 'Montage Kapalua Bay', location: 'Maui, Hawaii', destination: 'America',
    price: 890, rating: 5, tag: 'Bay Suite',
    image: IMG.oceanPool, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant', 'Gym'],
  },

  // ── Europe · Santorini (3) ────────────────────────────────────────────────
  {
    id: 36, type: 'stay', city: 'Santorini',
    name: 'Canaves Oia', location: 'Santorini, Greece', destination: 'Europe',
    price: 920, rating: 5, tag: 'Cliff Suite',
    image: IMG.santorini, amenities: ['Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 37, type: 'stay', city: 'Santorini',
    name: 'Grace Hotel Santorini', location: 'Santorini, Greece', destination: 'Europe',
    price: 680, rating: 5, tag: 'Caldera Suite',
    image: IMG.santorini, amenities: ['Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 38, type: 'stay', city: 'Santorini',
    name: 'Katikies Santorini', location: 'Santorini, Greece', destination: 'Europe',
    price: 750, rating: 5, tag: 'Infinity Pool Cave',
    image: IMG.resortPool, amenities: ['Pool', 'Restaurant', 'Spa'],
  },

  // ── Europe · Mykonos (2) ──────────────────────────────────────────────────
  {
    id: 39, type: 'stay', city: 'Mykonos',
    name: 'Cavo Tagoo', location: 'Mykonos, Greece', destination: 'Europe',
    price: 850, rating: 5, tag: 'Cave Suite',
    image: IMG.santorini, amenities: ['Pool', 'Restaurant', 'Spa'],
  },
  {
    id: 40, type: 'stay', city: 'Mykonos',
    name: 'Myconian Utopia', location: 'Mykonos, Greece', destination: 'Europe',
    price: 780, rating: 5, tag: 'Private Pool Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Spa', 'Restaurant'],
  },

  // ── Europe · Mallorca (2) ─────────────────────────────────────────────────
  {
    id: 41, type: 'stay', city: 'Mallorca',
    name: 'Belmond La Residencia', location: 'Mallorca, Spain', destination: 'Europe',
    price: 620, rating: 5, tag: 'Mountain Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 42, type: 'stay', city: 'Mallorca',
    name: 'Cap Vermell Grand Hotel', location: 'Mallorca, Spain', destination: 'Europe',
    price: 840, rating: 5, tag: 'Sea View Suite',
    image: IMG.beach, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },

  // ── Europe · Amalfi Coast (2) ─────────────────────────────────────────────
  {
    id: 43, type: 'stay', city: 'Amalfi Coast',
    name: 'Hotel Caruso', location: 'Amalfi Coast, Italy', destination: 'Europe',
    price: 1100, rating: 5, tag: 'Belvedere Suite',
    image: IMG.santorini, amenities: ['Pool', 'Spa', 'Restaurant'],
  },
  {
    id: 44, type: 'stay', city: 'Amalfi Coast',
    name: 'Il San Pietro di Positano', location: 'Amalfi Coast, Italy', destination: 'Europe',
    price: 950, rating: 5, tag: 'Cliffside Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Restaurant', 'Spa', 'Beach'],
  },

  // ── Europe · Paris (2) ────────────────────────────────────────────────────
  {
    id: 45, type: 'stay', city: 'Paris',
    name: 'The Ritz Paris', location: 'Paris, France', destination: 'Europe',
    price: 2200, rating: 5, tag: 'Imperial Suite',
    image: IMG.luxuryInterior, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 46, type: 'stay', city: 'Paris',
    name: 'Le Bristol Paris', location: 'Paris, France', destination: 'Europe',
    price: 1800, rating: 5, tag: 'Prestige Suite',
    image: IMG.hotelSuite, amenities: ['Pool', 'Spa', 'Restaurant'],
  },

  // ── Europe · Côte d'Azur (2) ──────────────────────────────────────────────
  {
    id: 47, type: 'stay', city: "Côte d'Azur",
    name: "Grand-Hôtel du Cap-Ferrat", location: "Côte d'Azur, France", destination: 'Europe',
    price: 1600, rating: 5, tag: 'Sea View Suite',
    image: IMG.beach, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },
  {
    id: 48, type: 'stay', city: "Côte d'Azur",
    name: 'Hotel du Cap-Eden-Roc', location: "Côte d'Azur, France", destination: 'Europe',
    price: 2400, rating: 5, tag: 'Pavilion Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },

  // ── Europe · Swiss Alps (2) ───────────────────────────────────────────────
  {
    id: 49, type: 'stay', city: 'Swiss Alps',
    name: 'The Chedi Andermatt', location: 'Swiss Alps, Switzerland', destination: 'Europe',
    price: 680, rating: 5, tag: 'Mountain Suite',
    image: IMG.hotelSuite, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 50, type: 'stay', city: 'Swiss Alps',
    name: "Badrutt's Palace", location: 'Swiss Alps, Switzerland', destination: 'Europe',
    price: 940, rating: 5, tag: 'Palace Suite',
    image: IMG.luxuryInterior, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },

  // ── Europe · London (2) ───────────────────────────────────────────────────
  {
    id: 51, type: 'stay', city: 'London',
    name: "Claridge's", location: 'London, United Kingdom', destination: 'Europe',
    price: 850, rating: 5, tag: 'Grand Piano Suite',
    image: IMG.hotelSuite, amenities: ['Restaurant', 'Spa', 'Gym'],
  },
  {
    id: 52, type: 'stay', city: 'London',
    name: 'The Savoy', location: 'London, United Kingdom', destination: 'Europe',
    price: 720, rating: 5, tag: 'River Suite',
    image: IMG.luxuryInterior, amenities: ['Restaurant', 'Spa', 'Gym'],
  },

  // ── Europe · Barcelona (2) ────────────────────────────────────────────────
  {
    id: 53, type: 'stay', city: 'Barcelona',
    name: 'Hotel Arts Barcelona', location: 'Barcelona, Spain', destination: 'Europe',
    price: 480, rating: 5, tag: 'Sea View Suite',
    image: IMG.beach, amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'],
  },
  {
    id: 54, type: 'stay', city: 'Barcelona',
    name: 'W Barcelona', location: 'Barcelona, Spain', destination: 'Europe',
    price: 520, rating: 5, tag: 'Wow Suite',
    image: IMG.resortPool, amenities: ['Pool', 'Beach', 'Spa', 'Restaurant'],
  },
];

// ─── Flights ──────────────────────────────────────────────────────────────────

export const flights: Flight[] = [
  // ── Thailand ──────────────────────────────────────────────────────────────
  {
    id: 55, type: 'flight',
    from: 'Frankfurt', to: 'Bangkok', fromCode: 'FRA', toCode: 'BKK',
    duration: '10h 30m', flightClass: 'Economy', price: 820,
    airline: 'Lufthansa', destination: 'Thailand',
  },
  {
    id: 56, type: 'flight',
    from: 'Frankfurt', to: 'Bangkok', fromCode: 'FRA', toCode: 'BKK',
    duration: '10h 30m', flightClass: 'Business', price: 2400,
    airline: 'Lufthansa', destination: 'Thailand',
  },
  {
    id: 57, type: 'flight',
    from: 'Munich', to: 'Bangkok', fromCode: 'MUC', toCode: 'BKK',
    duration: '11h 10m', flightClass: 'Business', price: 2650,
    airline: 'Thai Airways', destination: 'Thailand',
  },
  {
    id: 58, type: 'flight',
    from: 'London', to: 'Phuket', fromCode: 'LHR', toCode: 'HKT',
    duration: '12h 45m', flightClass: 'Business', price: 2200,
    airline: 'British Airways', destination: 'Thailand',
  },

  // ── UAE ───────────────────────────────────────────────────────────────────
  {
    id: 59, type: 'flight',
    from: 'Frankfurt', to: 'Dubai', fromCode: 'FRA', toCode: 'DXB',
    duration: '6h 05m', flightClass: 'Economy', price: 580,
    airline: 'Lufthansa', destination: 'UAE',
  },
  {
    id: 60, type: 'flight',
    from: 'Munich', to: 'Dubai', fromCode: 'MUC', toCode: 'DXB',
    duration: '6h 15m', flightClass: 'First', price: 4800,
    airline: 'Emirates', destination: 'UAE',
  },
  {
    id: 61, type: 'flight',
    from: 'London', to: 'Dubai', fromCode: 'LHR', toCode: 'DXB',
    duration: '7h 00m', flightClass: 'Business', price: 2200,
    airline: 'Emirates', destination: 'UAE',
  },
  {
    id: 62, type: 'flight',
    from: 'Paris', to: 'Abu Dhabi', fromCode: 'CDG', toCode: 'AUH',
    duration: '6h 45m', flightClass: 'Business', price: 2100,
    airline: 'Etihad', destination: 'UAE',
  },

  // ── America ───────────────────────────────────────────────────────────────
  {
    id: 63, type: 'flight',
    from: 'Frankfurt', to: 'Miami', fromCode: 'FRA', toCode: 'MIA',
    duration: '11h 45m', flightClass: 'Economy', price: 480,
    airline: 'Lufthansa', destination: 'America',
  },
  {
    id: 64, type: 'flight',
    from: 'Frankfurt', to: 'Miami', fromCode: 'FRA', toCode: 'MIA',
    duration: '11h 45m', flightClass: 'Business', price: 3200,
    airline: 'Lufthansa', destination: 'America',
  },
  {
    id: 65, type: 'flight',
    from: 'London', to: 'New York', fromCode: 'LHR', toCode: 'JFK',
    duration: '8h 10m', flightClass: 'Business', price: 1900,
    airline: 'British Airways', destination: 'America',
  },
  {
    id: 66, type: 'flight',
    from: 'Frankfurt', to: 'Los Angeles', fromCode: 'FRA', toCode: 'LAX',
    duration: '12h 20m', flightClass: 'Business', price: 2800,
    airline: 'Lufthansa', destination: 'America',
  },

  // ── Europe ────────────────────────────────────────────────────────────────
  {
    id: 67, type: 'flight',
    from: 'Munich', to: 'Santorini', fromCode: 'MUC', toCode: 'JTR',
    duration: '3h 20m', flightClass: 'Economy', price: 380,
    airline: 'Aegean', destination: 'Europe',
  },
  {
    id: 68, type: 'flight',
    from: 'Frankfurt', to: 'Nice', fromCode: 'FRA', toCode: 'NCE',
    duration: '2h 00m', flightClass: 'Economy', price: 160,
    airline: 'Lufthansa', destination: 'Europe',
  },
  {
    id: 69, type: 'flight',
    from: 'London', to: 'Barcelona', fromCode: 'LHR', toCode: 'BCN',
    duration: '2h 10m', flightClass: 'Economy', price: 140,
    airline: 'Iberia', destination: 'Europe',
  },
  {
    id: 70, type: 'flight',
    from: 'Zurich', to: 'London', fromCode: 'ZRH', toCode: 'LHR',
    duration: '2h 05m', flightClass: 'Business', price: 680,
    airline: 'Swiss', destination: 'Europe',
  },
  {
    id: 71, type: 'flight',
    from: 'Frankfurt', to: 'Paris', fromCode: 'FRA', toCode: 'CDG',
    duration: '1h 25m', flightClass: 'Business', price: 520,
    airline: 'Air France', destination: 'Europe',
  },
];

// ─── Packages ─────────────────────────────────────────────────────────────────

export const packages: TravelPackage[] = [
  // ── Thailand ──────────────────────────────────────────────────────────────
  {
    id: 72, type: 'package',
    name: 'Phuket Luxury Escape', hotel: 'Amanpuri', route: 'FRA → HKT',
    nights: 7, price: 9800,
    image: IMG.tropicalVilla,
    destination: 'Thailand', includes: ['Flight', 'Hotel', 'Transfer'],
  },
  {
    id: 73, type: 'package',
    name: 'Thailand Paradise', hotel: 'Banyan Tree Phuket', route: 'MUC → BKK',
    nights: 10, price: 7400,
    image: IMG.beach,
    destination: 'Thailand', includes: ['Flight', 'Hotel', 'Transfer'],
  },
  {
    id: 74, type: 'package',
    name: 'Samui Retreat', hotel: 'Six Senses Samui', route: 'FRA → BKK',
    nights: 7, price: 8600,
    image: IMG.oceanPool,
    destination: 'Thailand', includes: ['Flight', 'Hotel', 'Transfer'],
  },

  // ── UAE ───────────────────────────────────────────────────────────────────
  {
    id: 75, type: 'package',
    name: 'Dubai Luxury Collection', hotel: 'Armani Hotel', route: 'FRA → DXB',
    nights: 7, price: 8900,
    image: IMG.luxuryInterior,
    destination: 'UAE', includes: ['Flight', 'Hotel', 'Transfer'],
  },
  {
    id: 76, type: 'package',
    name: 'Emirates First Class', hotel: 'Burj Al Arab', route: 'MUC → DXB',
    nights: 5, price: 14500,
    image: IMG.dubaiTower,
    destination: 'UAE', includes: ['Flight', 'Hotel', 'Transfer'],
  },

  // ── America ───────────────────────────────────────────────────────────────
  {
    id: 77, type: 'package',
    name: 'Miami Beach Escape', hotel: 'Faena Hotel', route: 'FRA → MIA',
    nights: 7, price: 6800,
    image: IMG.hotelSuite,
    destination: 'America', includes: ['Flight', 'Hotel', 'Transfer'],
  },
  {
    id: 78, type: 'package',
    name: 'New York Penthouse Week', hotel: 'Aman New York', route: 'LHR → JFK',
    nights: 5, price: 11200,
    image: IMG.americaCity,
    destination: 'America', includes: ['Flight', 'Hotel', 'Transfer'],
  },

  // ── Europe ────────────────────────────────────────────────────────────────
  {
    id: 79, type: 'package',
    name: 'Greek Island Escape', hotel: 'Canaves Oia', route: 'FRA → JTR',
    nights: 5, price: 6200,
    image: IMG.santorini,
    destination: 'Europe', includes: ['Flight', 'Hotel', 'Transfer'],
  },
  {
    id: 80, type: 'package',
    name: 'Paris & Riviera', hotel: 'The Ritz Paris', route: 'LHR → CDG',
    nights: 6, price: 13800,
    image: IMG.luxuryInterior,
    destination: 'Europe', includes: ['Flight', 'Hotel', 'Transfer'],
  },
  {
    id: 81, type: 'package',
    name: 'Amalfi Coastal Dream', hotel: 'Hotel Caruso', route: 'MUC → NAP',
    nights: 6, price: 7400,
    image: IMG.resortPool,
    destination: 'Europe', includes: ['Flight', 'Hotel', 'Transfer'],
  },
];

export const ALL_RESULTS: SearchResult[] = [...stays, ...flights, ...packages];

// ─── Filter constants ─────────────────────────────────────────────────────────

export const DESTINATIONS = ['Thailand', 'UAE', 'America', 'Europe'];
export const AMENITIES    = ['Pool', 'Spa', 'Beach', 'Restaurant', 'Gym'];
export const FLIGHT_CLASSES: Array<'Economy' | 'Business' | 'First'> = ['Economy', 'Business', 'First'];
export const MAX_PRICE = 6000;

// ─── City/region lookup helpers ───────────────────────────────────────────────

export const CITY_DESTINATION: Record<string, string> = {
  'Phuket':        'Thailand',
  'Koh Samui':     'Thailand',
  'Chiang Mai':    'Thailand',
  'Bangkok':       'Thailand',
  'Dubai':         'UAE',
  'Abu Dhabi':     'UAE',
  'Miami':         'America',
  'New York':      'America',
  'Los Angeles':   'America',
  'Hawaii':        'America',
  'Santorini':     'Europe',
  'Mykonos':       'Europe',
  'Mallorca':      'Europe',
  'Amalfi Coast':  'Europe',
  'Paris':         'Europe',
  "Côte d'Azur":  'Europe',
  'Swiss Alps':    'Europe',
  'London':        'Europe',
  'Barcelona':     'Europe',
};

export const DESTINATION_CITIES: Record<string, { city: string; country: string }[]> = {
  Thailand: [
    { city: 'Phuket',      country: 'Thailand' },
    { city: 'Koh Samui',   country: 'Thailand' },
    { city: 'Chiang Mai',  country: 'Thailand' },
    { city: 'Bangkok',     country: 'Thailand' },
  ],
  UAE: [
    { city: 'Dubai',       country: 'UAE' },
    { city: 'Abu Dhabi',   country: 'UAE' },
  ],
  America: [
    { city: 'Miami',       country: 'USA' },
    { city: 'New York',    country: 'USA' },
    { city: 'Los Angeles', country: 'USA' },
    { city: 'Hawaii',      country: 'USA' },
  ],
  Europe: [
    { city: 'Santorini',    country: 'Greece' },
    { city: 'Mykonos',      country: 'Greece' },
    { city: 'Mallorca',     country: 'Spain' },
    { city: 'Amalfi Coast', country: 'Italy' },
    { city: 'Paris',        country: 'France' },
    { city: "Côte d'Azur",  country: 'France' },
    { city: 'Swiss Alps',   country: 'Switzerland' },
    { city: 'London',       country: 'United Kingdom' },
    { city: 'Barcelona',    country: 'Spain' },
  ],
};
