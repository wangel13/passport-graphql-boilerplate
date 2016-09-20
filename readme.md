##params

`DATABASE_URL` - postgreSQL database url in process.env.DATABASE_URL

##npm commands

`npm start` - start development server with nodemon

`npm serve` - start production server

##url's

`http://localhost:3000` - development server

`http://localhost:3000/graphql` - graphiql interface

##Users table creation script

```
-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    created_at timestamp without time zone DEFAULT now(),
    name character varying(128) COLLATE "default".pg_catalog,
    _id uuid,
    login text COLLATE "default".pg_catalog,
    password character varying COLLATE "default".pg_catalog,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to YOUR_USER;
```
##Graphql examples

User creation request
```
mutation Mutation{createUser(login:"MyLogin", password: "MyPassword") {
  login
}}
```

Get user
```
query{user(login: "MyLogin") {
  login
  name
  id
  _id
}}
```
