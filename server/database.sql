CREATE DATABASE customers

-- create customers table
CREATE TABLE IF NOT EXISTS public.customers
(
    customer_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(10) COLLATE pg_catalog."default",
    street_address character varying(50) COLLATE pg_catalog."default",
    city character varying(20) COLLATE pg_catalog."default",
    country character varying(5) COLLATE pg_catalog."default",
    postal_code character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT customers_pkey PRIMARY KEY (customer_id)
)

TABLESPACE pg_default;

ALTER TABLE public.customers
    OWNER to postgres;

-- create orders table
CREATE TABLE IF NOT EXISTS public.orders
(
    order_id character varying(10) NOT NULL,
    order_date date,
    shipping_date date,
    product_id character varying(10) NOT NULL,
    customer_id character varying(10) NOT NULL,
    PRIMARY KEY (order_id),
);

ALTER TABLE public.orders
    OWNER to postgres;

ALTER TABLE public.orders
    ADD CONSTRAINT fk_cust_id FOREIGN KEY (cust_id)
    REFERENCES public.customers (cust_id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX fki_fk_cust_id
    ON public.orders(cust_id);

-- create acme orders table
CREATE TABLE IF NOT EXISTS public.acme
(
    order_id character varying(10) NOT NULL,
    product_id character varying(10) NOT NULL,
    customer_id character varying(10) NOT NULL,
    PRIMARY KEY (order_id)
);

ALTER TABLE public.acme
    OWNER to postgres;

-- create maxo orders table
CREATE TABLE IF NOT EXISTS public.maxo
(
    order_id character varying(10) NOT NULL,
    product_id character varying(10) NOT NULL,
    customer_id character varying(10) NOT NULL,
    PRIMARY KEY (order_id)
);

ALTER TABLE public.maxo
    OWNER to postgres;