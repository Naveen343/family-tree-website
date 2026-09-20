-- Adds tables for the Charity, Academics and Family Matrimony pages.
-- Run once in the Supabase SQL editor, after the earlier scripts in this folder.

-- ---------------------------------------------------------------------------
-- Charity + Academics: both pages are simple published/unpublished post lists,
-- same shape as the existing `news` table, distinguished by `category`.
-- ---------------------------------------------------------------------------
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('charity', 'academics')),
  title text not null,
  description text not null,
  link text,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists community_posts_category_idx on public.community_posts(category);

alter table public.community_posts enable row level security;

drop policy if exists "Public read access" on public.community_posts;
create policy "Public read access" on public.community_posts for select using (true);

drop policy if exists "Public write access" on public.community_posts;
create policy "Public write access" on public.community_posts for insert with check (true);

drop policy if exists "Public update access" on public.community_posts;
create policy "Public update access" on public.community_posts for update using (true) with check (true);

drop policy if exists "Public delete access" on public.community_posts;
create policy "Public delete access" on public.community_posts for delete using (true);

-- ---------------------------------------------------------------------------
-- Family Matrimony: people submit their interest privately. There is no
-- public profile directory — submissions are only ever read from the admin
-- dashboard (Upload Dashboard > Matrimony tab), never rendered on the public
-- Family Matrimony page. Same no-login trust model as the rest of this app.
-- ---------------------------------------------------------------------------
create table if not exists public.matrimony_interests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  age int,
  gender text check (gender in ('M', 'F')),
  branch text,
  education text,
  occupation text,
  location text,
  about text,
  contact_phone text,
  contact_email text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.matrimony_interests enable row level security;

drop policy if exists "Public submit access" on public.matrimony_interests;
create policy "Public submit access" on public.matrimony_interests for insert with check (true);

drop policy if exists "Admin read access" on public.matrimony_interests;
create policy "Admin read access" on public.matrimony_interests for select using (true);

drop policy if exists "Admin update access" on public.matrimony_interests;
create policy "Admin update access" on public.matrimony_interests for update using (true) with check (true);

drop policy if exists "Admin delete access" on public.matrimony_interests;
create policy "Admin delete access" on public.matrimony_interests for delete using (true);
