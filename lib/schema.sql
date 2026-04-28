-- Orbis Travel Platform — Database Schema

-- Users
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- Hotels
create table hotels (
  id text primary key,
  name text not null,
  city text not null,
  country text not null,
  price_per_night numeric(10, 2) not null,
  rating numeric(2, 1) not null,
  amenities text[] default '{}',
  image_url text,
  description text
);

-- Flights
create table flights (
  id text primary key,
  origin text not null,
  destination text not null,
  airline text not null,
  duration text not null,
  class text not null,
  price numeric(10, 2) not null,
  departure_date date
);

-- Packages
create table packages (
  id text primary key,
  name text not null,
  hotel_id text references hotels(id),
  flight_id text references flights(id),
  total_price numeric(10, 2) not null,
  discount numeric(10, 2) default 0,
  nights integer not null,
  destination text
);

-- Bookings
create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  type text not null check (type in ('stay', 'flight', 'package')),
  reference_id text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  total_price numeric(10, 2) not null,
  created_at timestamptz default now()
);

-- Saved Items
create table saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  type text not null check (type in ('stay', 'flight', 'package')),
  reference_id text not null,
  unique (user_id, type, reference_id)
);
