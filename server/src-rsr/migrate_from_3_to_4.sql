CREATE TABLE hdb_catalog.custom_resolver (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  url TEXT UNIQUE,
  url_from_env TEXT UNIQUE,
  headers json,

CONSTRAINT either_url_env CHECK (
  (url IS NULL) != (url_from_env IS NULL)
)
);