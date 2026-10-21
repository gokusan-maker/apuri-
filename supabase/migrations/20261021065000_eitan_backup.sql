-- えいたん（英単語アプリ）：引き継ぎコードでのクラウドバックアップ。
-- 共有の Supabase プロジェクト（mljhjdzuabaujluearbd）に適用ずみ。ほかのアプリとは eitan スキーマと eitan_ で始まる関数で分ける。
create schema if not exists eitan;
revoke all on schema eitan from public, anon, authenticated;

create table if not exists eitan.backups (
  code_hash text primary key,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint eitan_backups_size check (pg_column_size(data) < 2000000)
);
alter table eitan.backups enable row level security;
revoke all on eitan.backups from public, anon, authenticated;

-- コードはハッシュにして保存（コードそのものはサーバーに残さない）
create or replace function public.eitan_backup_save(p_code text, p_data jsonb)
returns timestamptz
language plpgsql security definer set search_path = '' as $$
declare t timestamptz := now();
begin
  if p_code is null or p_code !~ '^[A-Z2-9]{16}$' then
    raise exception 'invalid code';
  end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' then
    raise exception 'invalid data';
  end if;
  insert into eitan.backups (code_hash, data, updated_at)
  values (encode(sha256(convert_to(p_code, 'UTF8')), 'hex'), p_data, t)
  on conflict (code_hash) do update set data = excluded.data, updated_at = t;
  return t;
end;
$$;

create or replace function public.eitan_backup_load(p_code text)
returns jsonb
language plpgsql security definer set search_path = '' stable as $$
declare d jsonb;
begin
  if p_code is null or p_code !~ '^[A-Z2-9]{16}$' then
    raise exception 'invalid code';
  end if;
  select data into d from eitan.backups where code_hash = encode(sha256(convert_to(p_code, 'UTF8')), 'hex');
  return d;
end;
$$;

revoke execute on function public.eitan_backup_save(text, jsonb) from public;
revoke execute on function public.eitan_backup_load(text) from public;
grant execute on function public.eitan_backup_save(text, jsonb) to anon, authenticated;
grant execute on function public.eitan_backup_load(text) to anon, authenticated;
