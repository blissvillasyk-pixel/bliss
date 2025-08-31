-- CreateEnum
CREATE TYPE "public"."SocialMediaIcon" AS ENUM ('FACEBOOK', 'TWITTER', 'INSTAGRAM', 'LINKEDIN', 'YOUTUBE', 'TIKTOK', 'PINTEREST', 'WEBSITE', 'WHATSAPP', 'TELEGRAM', 'LINE', 'KAKAO', 'WECHAT', 'WEIBO', 'X');

-- CreateTable
CREATE TABLE "public"."Root" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Root_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LogoInformation" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "LogoInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactInformation" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ContactInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CopyrightInformation" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,

    CONSTRAINT "CopyrightInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SocialMediaInformation" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "icon" "public"."SocialMediaIcon" NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "SocialMediaInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HeroSection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "image" TEXT,
    "propertyListingTitle" TEXT NOT NULL,
    "propertyListingSubtitle" TEXT NOT NULL,
    "propertyListingButtonText" TEXT NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AboutSection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "AboutSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AboutData" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "aboutId" TEXT NOT NULL,

    CONSTRAINT "AboutData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PropertySection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,

    CONSTRAINT "PropertySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WhySection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "WhySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WhyData" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whyId" TEXT NOT NULL,

    CONSTRAINT "WhyData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CtaSection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "CtaSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServicesSection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,

    CONSTRAINT "ServicesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceData" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "servicesSectionId" TEXT NOT NULL,

    CONSTRAINT "ServiceData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TestimonialSection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,

    CONSTRAINT "TestimonialSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TestimonialData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "content" TEXT NOT NULL,
    "urlVideo" TEXT,
    "testimonialSectionId" TEXT NOT NULL,

    CONSTRAINT "TestimonialData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RelatedPropertiesSection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,

    CONSTRAINT "RelatedPropertiesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FinalCtaSection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "primaryButtonText" TEXT NOT NULL,
    "secondaryButtonText" TEXT NOT NULL,

    CONSTRAINT "FinalCtaSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LogoInformation_rootId_key" ON "public"."LogoInformation"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInformation_rootId_key" ON "public"."ContactInformation"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "CopyrightInformation_rootId_key" ON "public"."CopyrightInformation"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialMediaInformation_rootId_key" ON "public"."SocialMediaInformation"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "HeroSection_rootId_key" ON "public"."HeroSection"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "AboutSection_rootId_key" ON "public"."AboutSection"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertySection_rootId_key" ON "public"."PropertySection"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "WhySection_rootId_key" ON "public"."WhySection"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "CtaSection_rootId_key" ON "public"."CtaSection"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "ServicesSection_rootId_key" ON "public"."ServicesSection"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "TestimonialSection_rootId_key" ON "public"."TestimonialSection"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedPropertiesSection_rootId_key" ON "public"."RelatedPropertiesSection"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "FinalCtaSection_rootId_key" ON "public"."FinalCtaSection"("rootId");

-- AddForeignKey
ALTER TABLE "public"."LogoInformation" ADD CONSTRAINT "LogoInformation_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactInformation" ADD CONSTRAINT "ContactInformation_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CopyrightInformation" ADD CONSTRAINT "CopyrightInformation_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SocialMediaInformation" ADD CONSTRAINT "SocialMediaInformation_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HeroSection" ADD CONSTRAINT "HeroSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AboutSection" ADD CONSTRAINT "AboutSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AboutData" ADD CONSTRAINT "AboutData_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "public"."AboutSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertySection" ADD CONSTRAINT "PropertySection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhySection" ADD CONSTRAINT "WhySection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhyData" ADD CONSTRAINT "WhyData_whyId_fkey" FOREIGN KEY ("whyId") REFERENCES "public"."WhySection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CtaSection" ADD CONSTRAINT "CtaSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServicesSection" ADD CONSTRAINT "ServicesSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceData" ADD CONSTRAINT "ServiceData_servicesSectionId_fkey" FOREIGN KEY ("servicesSectionId") REFERENCES "public"."ServicesSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TestimonialSection" ADD CONSTRAINT "TestimonialSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TestimonialData" ADD CONSTRAINT "TestimonialData_testimonialSectionId_fkey" FOREIGN KEY ("testimonialSectionId") REFERENCES "public"."TestimonialSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RelatedPropertiesSection" ADD CONSTRAINT "RelatedPropertiesSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FinalCtaSection" ADD CONSTRAINT "FinalCtaSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
