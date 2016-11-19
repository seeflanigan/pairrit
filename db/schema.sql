/* Import pgcrypto so we can auto-generate uuid pks 
//
// Note specifically that the extension must be created (loaded) once for
// each database in which you wish to use it. Once it has been loaded into a
// running instance of the database server it will be there for use from then
// on spanning restarts.
//
// http://www.starkandwayne.com/blog/uuid-primary-keys-in-postgresql/
*/
DROP DATABASE IF EXISTS pairrit;
CREATE DATABASE pairrit;

\c pairrit

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE pairs(
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hash         varchar,
  name         varchar,
  channel_id   varchar,
  participants text[] default '{}',
  created_at   timestamptz default now()
);
