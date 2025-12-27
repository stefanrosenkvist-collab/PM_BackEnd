-------------------------------------------------------------------------------------------------------
-- Migration: Add projectId Column to Arbetsorder Table
-- Date: 2024-12-09
-- Description: Adds projectId column to Arbetsorder table to link work orders to projects
-------------------------------------------------------------------------------------------------------

-- Add projectId column
ALTER TABLE IF EXISTS public."Arbetsorder"
    ADD COLUMN IF NOT EXISTS "projectId" text COLLATE pg_catalog."default";

-- Add comment to document the column
COMMENT ON COLUMN public."Arbetsorder"."projectId" IS 'Reference to Project ID, allowing arbetsorders to be linked directly to projects';

