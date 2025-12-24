-- 1. Create the table
create table qr_codes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  long_url text not null,
  title text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Security (RLS)
alter table qr_codes enable row level security;

-- 3. Create Policy: "Users can only see their own codes"
create policy "Users can view their own codes"
  on qr_codes for select
  using (auth.uid() = user_id);

-- 4. Create Policy: "Users can insert their own codes"
create policy "Users can insert their own codes"
  on qr_codes for insert
  with check (auth.uid() = user_id);

-- 5. Create Policy: "Users can delete their own codes"
create policy "Users can delete their own codes"
  on qr_codes for delete
  using (auth.uid() = user_id);