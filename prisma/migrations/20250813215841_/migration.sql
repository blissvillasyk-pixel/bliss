/*
  Warnings:

  - You are about to drop the column `propertyListingButtonText` on the `HeroSection` table. All the data in the column will be lost.
  - You are about to drop the column `propertyListingSubtitle` on the `HeroSection` table. All the data in the column will be lost.
  - You are about to drop the column `propertyListingTitle` on the `HeroSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."HeroSection" DROP COLUMN "propertyListingButtonText",
DROP COLUMN "propertyListingSubtitle",
DROP COLUMN "propertyListingTitle";
