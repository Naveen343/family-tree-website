-- Opens up create/update/delete on the family tree so members can be added and
-- edited from the Family Tree page. Uses the same trust model already in place
-- for the `news` table and the `homepage-media` storage bucket in this project
-- (no login system yet — access is via the app's anon key). Run once in the
-- Supabase SQL editor after family_members_seed.sql.

drop policy if exists "Public write access" on public.family_members;
create policy "Public write access" on public.family_members
  for insert with check (true);

drop policy if exists "Public update access" on public.family_members;
create policy "Public update access" on public.family_members
  for update using (true) with check (true);

drop policy if exists "Public delete access" on public.family_members;
create policy "Public delete access" on public.family_members
  for delete using (true);
