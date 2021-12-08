CREATE TABLE dbInfo (
  version INTEGER
);
INSERT INTO dbInfo (version) VALUES (5);

CREATE TABLE challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  challengeId CHAR(255),
  score INTEGER,
  bonus INTEGER NOT NULL DEFAULT 5,
  goldMedalAvailable INTEGER NOT NULL DEFAULT 1 CHECK(goldMedalAvailable IN (0,1)),
  silverMedalAvailable INTEGER NOT NULL DEFAULT 1 CHECK(silverMedalAvailable IN (0,1)),
  bronzeMedalAvailable INTEGER NOT NULL DEFAULT 1 CHECK(bronzeMedalAvailable IN (0,1))
);

CREATE TABLE challengeEntries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  challengeId CHAR(255),
  timestamp CHAR(255)
);

CREATE TABLE badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  moduleId CHAR(255),
  timestamp CHAR(255)
);

CREATE TABLE teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name CHAR(255) UNIQUE,
  description CHAR(2048),
  ownerId INTEGER UNIQUE
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  accountId CHAR(255) NOT NULL UNIQUE,
  teamId INTEGER unsigned,
  familyName CHAR(255),
  givenName CHAR(255),
  role CHAR(255),
  instructor_UN CHAR(255),
  max_progress CHAR(255) DEFAULT '1',
  solution_disabled CHAR(255) DEFAULT 1,
  score INTEGER NOT NULL DEFAULT 0,
  goldMedalCount INTEGER NOT NULL DEFAULT 0,
  silverMedalCount INTEGER NOT NULL DEFAULT 0,
  bronzeMedalCount INTEGER NOT NULL DEFAULT 0
);

