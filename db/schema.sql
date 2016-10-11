/* Import pgcrypto so we can auto-generate uuid pks 
//
// Note specifically that the extension must be created (loaded) once for
// each database in which you wish to use it. Once it has been loaded into a
// running instance of the database server it will be there for use from then
// on spanning restarts.
//
// http://www.starkandwayne.com/blog/uuid-primary-keys-in-postgresql/
*/
CREATE DATABASE pairrit;

\c pairrit

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE pairs(
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  body       jsonb,
  search     tsvector,
  created_at timestamptz default now()
);
CREATE INDEX idx_pairs        on pairs using GIN(body jsonb_path_ops);
CREATE INDEX idx_pairs_search on pairs using GIN(search);

