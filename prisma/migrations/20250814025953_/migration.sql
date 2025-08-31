-- DropForeignKey
ALTER TABLE "public"."ServicesSection" DROP CONSTRAINT "ServicesSection_rootId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TestimonialSection" DROP CONSTRAINT "TestimonialSection_rootId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ServicesSection" ADD CONSTRAINT "ServicesSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TestimonialSection" ADD CONSTRAINT "TestimonialSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE CASCADE ON UPDATE CASCADE;
