-- 1) Lets each matrimony submission carry up to 4 photos (public grid view).
alter table public.matrimony_interests add column if not exists photo_urls text[] not null default '{}';

-- 2) Family History video gallery — admin-managed, publicly viewable.
create table if not exists public.family_videos (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  video_url text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.family_videos enable row level security;

drop policy if exists "Public read access" on public.family_videos;
create policy "Public read access" on public.family_videos for select using (true);

drop policy if exists "Public write access" on public.family_videos;
create policy "Public write access" on public.family_videos for insert with check (true);

drop policy if exists "Public update access" on public.family_videos;
create policy "Public update access" on public.family_videos for update using (true) with check (true);

drop policy if exists "Public delete access" on public.family_videos;
create policy "Public delete access" on public.family_videos for delete using (true);
