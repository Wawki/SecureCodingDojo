CREATE TABLE `dbInfo` (
  `version` INT NULL
) DEFAULT CHARSET=utf8;
INSERT INTO `dbInfo` (`version`) VALUES (5);

CREATE TABLE challenges (
  `id` int(11) PRIMARY KEY AUTOINCREMENT,
  `challengeId` CHAR(255),
  `score` int(11),
  `bonus` int(11) NOT NULL DEFAULT 5,
  `goldMedalAvailable` int(11) NOT NULL DEFAULT 1 CHECK(goldMedalAvailable IN (0,1)),
  `silverMedalAvailable` int(11) NOT NULL DEFAULT 1 CHECK(silverMedalAvailable IN (0,1)),
  `bronzeMedalAvailable` int(11) NOT NULL DEFAULT 1 CHECK(bronzeMedalAvailable IN (0,1))
);

CREATE TABLE `challengeEntries` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'The entry id',
  `userId` int(11) DEFAULT NULL COMMENT 'The user id that passed the challenge',
  `challengeId` varchar(255) DEFAULT NULL COMMENT 'The id of the challenge that was passed',
  `timestamp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `badges` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'The entry id',
  `userId` int(11) DEFAULT NULL COMMENT 'The user id that passed the challenge',
  `moduleId` varchar(255) DEFAULT NULL COMMENT 'The id of the training module',
  `timestamp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) DEFAULT CHARSET=utf8;


CREATE TABLE `teams` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `ownerId` int(11) DEFAULT NULL COMMENT 'The userid of the person who created this team',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `ownerid_UNIQUE` (`ownerId`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'The user id',
  `accountId` varchar(255) NOT NULL COMMENT 'The user account name',
  `teamId` int(10) unsigned DEFAULT NULL COMMENT 'The id of the team the user belongs to',
  `familyName` varchar(255) DEFAULT NULL,
  `givenName` varchar(255) DEFAULT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `goldMedalCount` int(11) NOT NULL DEFAULT 0,
  `silverMedalCount` int(11) NOT NULL DEFAULT 0,
  `bronzeMedalCount` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `account_name_UNIQUE` (`accountId`)
) DEFAULT CHARSET=utf8;

