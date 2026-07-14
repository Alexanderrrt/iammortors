-- Staff-reviewed quote examples used to propose pricing updates.
-- Run this in Supabase SQL editor before enabling persistent training data.

create table if not exists public.training_examples (
  id text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'archived')),
  vehicle_class_id text not null,
  vehicle_text text not null default '',
  service_id text not null,
  photo_urls jsonb not null default '[]'::jsonb,
  approved_low numeric not null check (approved_low >= 0),
  approved_high numeric not null check (approved_high >= approved_low),
  inspection_notes text not null default '',
  staff_notes text not null default '',
  approved_by text,
  approved_at timestamptz
);

create index if not exists training_examples_status_created_idx
  on public.training_examples (status, created_at desc);
create index if not exists training_examples_service_status_idx
  on public.training_examples (service_id, status);

alter table public.training_examples enable row level security;

drop trigger if exists training_examples_updated_at on public.training_examples;
create or replace function public.set_training_examples_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger training_examples_updated_at
before update on public.training_examples
for each row execute function public.set_training_examples_updated_at();

-- The server uses the Supabase service role; there are intentionally no public policies.
