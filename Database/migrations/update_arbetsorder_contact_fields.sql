-- Migration: Update Arbetsorder table to replace contactPersonTel with contactPerson, contactPersonPhone, contactPersonEmail

-- Add new columns
ALTER TABLE IF EXISTS public."Arbetsorder"
    ADD COLUMN IF NOT EXISTS "contactPerson" text COLLATE pg_catalog."default",
    ADD COLUMN IF NOT EXISTS "contactPersonPhone" text COLLATE pg_catalog."default",
    ADD COLUMN IF NOT EXISTS "contactPersonEmail" text COLLATE pg_catalog."default";

-- Migrate existing data from contactPersonTel to contactPersonPhone if needed
-- (assuming the old field contained phone numbers)
UPDATE public."Arbetsorder" 
SET "contactPersonPhone" = "contactPersonTel" 
WHERE "contactPersonTel" IS NOT NULL AND "contactPersonPhone" IS NULL;

-- Drop the old column
ALTER TABLE IF EXISTS public."Arbetsorder" 
DROP COLUMN IF EXISTS "contactPersonTel";

