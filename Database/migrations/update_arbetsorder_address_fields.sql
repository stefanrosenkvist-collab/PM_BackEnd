-------------------------------------------------------------------------------------------------------
-- Migration: Update Arbetsorder Table - Split Address Fields
-- Date: 2025-12-09
-- Description: Adds new address fields (workplace, street, postalCode, city) and migrates data from addressWorkplace
-------------------------------------------------------------------------------------------------------

-- Add new columns
ALTER TABLE IF EXISTS public."Arbetsorder"
    ADD COLUMN IF NOT EXISTS "workplace" text COLLATE pg_catalog."default",
    ADD COLUMN IF NOT EXISTS "street" text COLLATE pg_catalog."default",
    ADD COLUMN IF NOT EXISTS "postalCode" text COLLATE pg_catalog."default",
    ADD COLUMN IF NOT EXISTS "city" text COLLATE pg_catalog."default";

-- Migrate existing data from addressWorkplace to workplace
UPDATE public."Arbetsorder" 
SET "workplace" = "addressWorkplace" 
WHERE "addressWorkplace" IS NOT NULL AND "workplace" IS NULL;

-- Drop the old addressWorkplace column after migration
ALTER TABLE IF EXISTS public."Arbetsorder" DROP COLUMN IF EXISTS "addressWorkplace";

