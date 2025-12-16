-------------------------------------------------------------------------------------------------------
-- Migration: Create Customer Table
-- Date: 2024-12-16
-- Description: Creates the Customer table for customer management
-------------------------------------------------------------------------------------------------------

-- Table: public.Customer
-- DROP TABLE IF EXISTS public."Customer";
-------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public."Customer"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "customerName" text COLLATE pg_catalog."default" NOT NULL,
    "streetAddress" text COLLATE pg_catalog."default",
    "postalCode" text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default",
    "contactPerson" text COLLATE pg_catalog."default",
    "contactPersonPhone" text COLLATE pg_catalog."default",
    "contactPersonEmail" text COLLATE pg_catalog."default",
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Customer_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Customer"
    OWNER to postgres;

