INSERT INTO public."Servicio"("NumServicio", "FechaInicio", "FechaFin", "DiaServicio", "IdTecnico")
VALUES ('10', '2020-10-19 07:00', '2020-10-19 18:00', '-L-', 1);
INSERT INTO public."Servicio"("NumServicio", "FechaInicio", "FechaFin", "DiaServicio", "IdTecnico")
VALUES ('10', '2020-10-20 07:00', '2020-10-20 18:00', '-M-', 1);
INSERT INTO public."Servicio"("NumServicio", "FechaInicio", "FechaFin", "DiaServicio", "IdTecnico")
VALUES ('10', '2020-10-21 07:00', '2020-10-21 18:00', '-X-', 1);
INSERT INTO public."Servicio"("NumServicio", "FechaInicio", "FechaFin", "DiaServicio", "IdTecnico")
VALUES ('10', '2020-10-22 07:00', '2020-10-24 18:00', '-J-V-S-', 1);



--===========================================================================
--===========================================================================
--===========================================================================
--===========================================================================
-- SEQUENCE: public.Tecnico_Id_seq
-- DROP SEQUENCE public."Tecnico_Id_seq";
CREATE SEQUENCE public."Tecnico_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public."Tecnico_Id_seq"
    OWNER TO postgres;

-- Table: public.Tecnico
-- DROP TABLE public."Tecnico";
CREATE TABLE public."Tecnico"
(
    "Id" integer NOT NULL DEFAULT nextval('"Tecnico_Id_seq"'::regclass),
    "Nombres" text COLLATE pg_catalog."default" NOT NULL,
    "Identificacion" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Tecnico_pkey" PRIMARY KEY ("Id")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."Tecnico"
    OWNER to postgres;

INSERT INTO public."Tecnico"("Nombres", "Identificacion") VALUES ('Jonathan', '1109845095');
INSERT INTO public."Tecnico"("Nombres", "Identificacion") VALUES ('Jonathan David', '1109845096');
--===========================================================================

-- SEQUENCE: public.Servicio_Id_seq
-- DROP SEQUENCE public."Servicio_Id_seq";
CREATE SEQUENCE public."Servicio_Id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
ALTER SEQUENCE public."Servicio_Id_seq"
    OWNER TO postgres;

-- Table: public.Servicio
-- DROP TABLE public."Servicio";
CREATE TABLE public."Servicio"
(
    "Id" integer NOT NULL DEFAULT nextval('"Servicio_Id_seq"'::regclass),
    "IdentificacionServicio" text COLLATE pg_catalog."default" NOT NULL,
    "FechaInicio" text COLLATE pg_catalog."default" NOT NULL,
    "FechaFin" text COLLATE pg_catalog."default" NOT NULL,
    "IdentificacionTecnico" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("Id")
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;
ALTER TABLE public."Servicio"
    OWNER to postgres;


INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
VALUES ('10', '2020-10-19 07:00', '2020-10-19 20:00', '1109845095');
INSERT INTO public."Servicio"("IdentificacionServicio", "FechaInicio", "FechaFin", "IdentificacionTecnico")
VALUES ('11', '2020-10-20 07:00', '2020-10-20 20:00', '1109845095');