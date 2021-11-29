--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)

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

--
-- Name: financialEventType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."financialEventType" AS ENUM (
    'INCOME',
    'OUTCOME'
);


ALTER TYPE public."financialEventType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: financialEvents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."financialEvents" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    value double precision NOT NULL,
    description character varying(255) NOT NULL,
    type public."financialEventType" NOT NULL,
    date date NOT NULL,
    CONSTRAINT "financialEvents_value_check" CHECK ((value > (0)::double precision))
);


ALTER TABLE public."financialEvents" OWNER TO postgres;

--
-- Name: financialEvents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."financialEvents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."financialEvents_id_seq" OWNER TO postgres;

--
-- Name: financialEvents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."financialEvents_id_seq" OWNED BY public."financialEvents".id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(255) NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: financialEvents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."financialEvents" ALTER COLUMN id SET DEFAULT nextval('public."financialEvents_id_seq"'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: financialEvents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."financialEvents" (id, "userId", value, description, type, date) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, "userId", token) FROM stdin;
1	3	807968d1-8a0e-4b07-a1ac-d750d1981b67
2	5	3ec63c7e-6567-4084-8c59-c40db9cf8b1b
3	6	6a9b089d-f415-42b4-9db7-ec5750981649
4	7	1f931d1e-41ae-4162-9dcd-c2b4131f5557
5	8	adb17b10-9244-42c0-98cd-b37254db6a45
6	9	c1f4a39d-11ed-4b25-8169-37db2cbb3dbc
7	10	e7d4f43c-f028-4f94-a144-bad1dccfb60a
8	11	fefb822d-fd4a-48e8-9709-498360a583ba
9	12	2c149440-59d7-4e19-a551-7dc4a629d9db
10	16	cd3e68f3-a2f6-4611-a924-7b04eed427cf
11	17	56a1b3e6-7952-4a2f-b4ab-23e9b875e54f
12	18	80203b80-f910-4806-ae38-338b3bc42343
13	19	c480ab26-1b84-4dde-bcd8-70457272a32e
14	20	27decf83-4958-44ce-b1a3-8997a0a558f0
15	21	ebf77543-295b-40ee-b65f-88000ccb4119
16	22	9d024abc-a8f6-4fef-ae89-aa49ab60a74e
17	23	b9dcbaf1-931e-4a05-9ce6-95d6639cb615
18	24	a04a60e1-1a4b-4adf-bbf0-f82dc9a32e81
19	28	40b70300-961a-4504-abf9-78c5a98cfaa0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
\.


--
-- Name: financialEvents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."financialEvents_id_seq"', 1, false);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 28, true);


--
-- Name: financialEvents financialEvents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."financialEvents"
    ADD CONSTRAINT "financialEvents_pkey" PRIMARY KEY (id);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: financialEvents financialEvents_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."financialEvents"
    ADD CONSTRAINT "financialEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

