DROP FUNCTION IF EXISTS set_updated_at;
DROP TABLE IF EXISTS join_space_user;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS space;
DROP TABLE IF EXISTS "user";

-- カラムが更新されるとupdated_atが自動的に更新されるトリガーの作成
CREATE FUNCTION set_updated_at() RETURNS TRIGGER AS
    $$
BEGIN
    IF
(TG_OP = 'UPDATE') THEN
        NEW.updated_at := now();
return NEW;
END IF;
END;
$$
LANGUAGE plpgsql;

CREATE TABLE "user"
(
  id          SERIAL        PRIMARY KEY,
  name        TEXT          NOT NULL UNIQUE,
  password    VARCHAR(128)   NOT NULL,
  salt        VARCHAR(32)   NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TABLE space
(
  id          SERIAL        PRIMARY KEY,
  name        TEXT          NOT NULL UNIQUE,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON space
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TABLE message
(
  id          SERIAL        PRIMARY KEY,
  content     VARCHAR(256)  NOT NULL,
  user_id     INTEGER       NOT NULL,
  space_id    INTEGER       NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (space_id) REFERENCES space(id)
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON message
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TABLE join_space_user
(
  id          SERIAL        PRIMARY KEY,
  user_id     INTEGER       NOT NULL,
  space_id    INTEGER       NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (space_id) REFERENCES space(id)
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON join_space_user
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
