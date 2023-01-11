--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-1.pgdg22.04+1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cakes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cakes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price double precision NOT NULL,
    image character varying(255) NOT NULL,
    description text
);


--
-- Name: cakes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cakes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cakes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cakes_id_seq OWNED BY public.cakes.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(255) NOT NULL
);


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "cakeId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "totalPrice" numeric(255,0) NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: cakes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes ALTER COLUMN id SET DEFAULT nextval('public.cakes_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: cakes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cakes VALUES (5, 'bolo', 20, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (6, 'bolo 1', 20, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (7, 'bolo 30', 21, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (8, 'bolo de chocolate', 21, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (9, 'bolo de chocolate 1', 20, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (10, 'bolo de morango', 20, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (11, 'bolo de oreo', 32, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (12, 'bolo de oreo de morango', 31, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (13, 'bolo de oreo aaaa', 31.32, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');
INSERT INTO public.cakes VALUES (14, 'bolo de aaaaaa', 80, 'https://blog.pajaris.com.br/wp-content/uploads/2020/10/bolo-de-pote-de-oreo-768x768.jpg', 'aaaaaaaa');


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients VALUES (6, 'João', 'rio de janeiro, RJ', '21985712371');
INSERT INTO public.clients VALUES (7, 'João', 'rio de janeiro, RJ', '21985712371');
INSERT INTO public.clients VALUES (8, 'Thais', 'rio de janeiro, RJ', '21985712371');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES (37, 6, 6, 5, '2023-01-11 15:33:45.338', 100);
INSERT INTO public.orders VALUES (38, 8, 5, 5, '2023-01-11 15:34:13.609', 100);
INSERT INTO public.orders VALUES (39, 8, 5, 3, '2023-01-11 15:34:22.369', 60);


--
-- Name: cakes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cakes_id_seq', 14, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_id_seq', 8, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 39, true);


--
-- Name: cakes cakes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes
    ADD CONSTRAINT cakes_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

