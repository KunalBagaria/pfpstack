-- CreateTable
CREATE TABLE `User` (
    `name` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,
    `public_key` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_public_key_key`(`public_key`),
    PRIMARY KEY (`public_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
