-- Add customization columns
alter table qr_codes 
add column color text default '#000000',
add column bgcolor text default '#ffffff';

-- Add analytics column
alter table qr_codes 
add column scan_count integer default 0;