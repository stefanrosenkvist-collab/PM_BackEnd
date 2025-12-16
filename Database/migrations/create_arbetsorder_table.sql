-------------------------------------------------------------------------------------------------------
-- Migration: Create Arbetsorder Table
-- Date: 2024
-- Description: Creates the Arbetsorder table for work orders linked to Tasks
-------------------------------------------------------------------------------------------------------

-- Table: public.Arbetsorder
-- DROP TABLE IF EXISTS public."Arbetsorder";
-------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."Arbetsorder"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "taskId" text COLLATE pg_catalog."default",
    "addressWorkplace" text COLLATE pg_catalog."default",
    "ourOrderNumber" text COLLATE pg_catalog."default",
    "customerOrderNumber" text COLLATE pg_catalog."default",
    "contactPerson" text COLLATE pg_catalog."default",
    "contactPersonPhone" text COLLATE pg_catalog."default",
    "contactPersonEmail" text COLLATE pg_catalog."default",
    "workType" text COLLATE pg_catalog."default",
    "workStartCheckboxes" text[] COLLATE pg_catalog."default",
    "workCompletionCheckboxes" text[] COLLATE pg_catalog."default",
    "materialUsageCheckboxes" text[] COLLATE pg_catalog."default",
    "materialSpecification" text COLLATE pg_catalog."default",
    "noSeriousRisksIdentified" boolean NOT NULL DEFAULT false,
    "risksIdentified" boolean NOT NULL DEFAULT false,
    "riskContactNote" text COLLATE pg_catalog."default",
    "riskCategories" text[] COLLATE pg_catalog."default",
    "controlledItems" text[] COLLATE pg_catalog."default",
    "riskDescription" text COLLATE pg_catalog."default",
    "riskActionInstruction" text COLLATE pg_catalog."default",
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Arbetsorder_pkey" PRIMARY KEY (id),
    CONSTRAINT "Arbetsorder_taskId_fkey" FOREIGN KEY ("taskId")
        REFERENCES public."Task" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Arbetsorder"
    OWNER to postgres;

