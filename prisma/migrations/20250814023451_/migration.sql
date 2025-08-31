-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('VILLA', 'APARTEMEN', 'RUMAH', 'RITEL', 'PROPERTI_MEWAH');

-- DropForeignKey
ALTER TABLE "public"."AboutData" DROP CONSTRAINT "AboutData_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AboutSection" DROP CONSTRAINT "AboutSection_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ContactInformation" DROP CONSTRAINT "ContactInformation_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CopyrightInformation" DROP CONSTRAINT "CopyrightInformation_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CtaSection" DROP CONSTRAINT "CtaSection_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FinalCtaSection" DROP CONSTRAINT "FinalCtaSection_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."HeroSection" DROP CONSTRAINT "HeroSection_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LogoInformation" DROP CONSTRAINT "LogoInformation_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PropertyPageSection" DROP CONSTRAINT "PropertyPageSection_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PropertySection" DROP CONSTRAINT "PropertySection_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RelatedPropertiesSection" DROP CONSTRAINT "RelatedPropertiesSection_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceData" DROP CONSTRAINT "ServiceData_servicesSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SocialMediaInformation" DROP CONSTRAINT "SocialMediaInformation_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TestimonialData" DROP CONSTRAINT "TestimonialData_testimonialSectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WhyData" DROP CONSTRAINT "WhyData_whyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WhySection" DROP CONSTRAINT "WhySection_rootId_fkey";

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],
    "address" TEXT NOT NULL,
    "type" "public"."PropertyType" NOT NULL,
    "room" INTEGER NOT NULL,
    "bath" INTEGER NOT NULL,
    "sqft" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "isAvailable" BOOLEAN NOT NULL,
    "rootId" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."LogoInformation" ADD CONSTRAINT "LogoInformation_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactInformation" ADD CONSTRAINT "ContactInformation_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CopyrightInformation" ADD CONSTRAINT "CopyrightInformation_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialMediaInformation" ADD CONSTRAINT "SocialMediaInformation_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeroSection" ADD CONSTRAINT "HeroSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AboutSection" ADD CONSTRAINT "AboutSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AboutData" ADD CONSTRAINT "AboutData_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "public"."AboutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertySection" ADD CONSTRAINT "PropertySection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhySection" ADD CONSTRAINT "WhySection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhyData" ADD CONSTRAINT "WhyData_whyId_fkey" FOREIGN KEY ("whyId") REFERENCES "public"."WhySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CtaSection" ADD CONSTRAINT "CtaSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceData" ADD CONSTRAINT "ServiceData_servicesSectionId_fkey" FOREIGN KEY ("servicesSectionId") REFERENCES "public"."ServicesSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TestimonialData" ADD CONSTRAINT "TestimonialData_testimonialSectionId_fkey" FOREIGN KEY ("testimonialSectionId") REFERENCES "public"."TestimonialSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RelatedPropertiesSection" ADD CONSTRAINT "RelatedPropertiesSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FinalCtaSection" ADD CONSTRAINT "FinalCtaSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyPageSection" ADD CONSTRAINT "PropertyPageSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;
