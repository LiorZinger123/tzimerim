-- CreateTable
CREATE TABLE `Resort` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `images` JSON NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `averageReview` DOUBLE NOT NULL,
    `reviews` JSON NOT NULL,
    `aboutUs` VARCHAR(191) NOT NULL,
    `importantNotes` JSON NOT NULL,
    `attractions` JSON NOT NULL,
    `breakfast` INTEGER NULL,

    UNIQUE INDEX `Resort_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resortId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `accessorizes` JSON NOT NULL,
    `importantNotes` JSON NOT NULL,
    `weekdayPrice` INTEGER NOT NULL,
    `weekendPrice` INTEGER NOT NULL,
    `maxCapacity` INTEGER NOT NULL,
    `minAdults` INTEGER NULL,
    `maxAdults` INTEGER NULL,
    `maxKids` INTEGER NULL,
    `maxBabies` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `resortId` INTEGER NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_resortId_fkey` FOREIGN KEY (`resortId`) REFERENCES `Resort`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_resortId_fkey` FOREIGN KEY (`resortId`) REFERENCES `Resort`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
