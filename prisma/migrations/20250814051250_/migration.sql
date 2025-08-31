-- AlterTable
ALTER TABLE "public"."PropertyPageSection" ADD COLUMN     "ctaButtonText" TEXT NOT NULL DEFAULT 'Hubungi Kami',
ADD COLUMN     "ctaSubtitle" TEXT NOT NULL DEFAULT 'Hubungi tim kami untuk konsultasi personal dan temukan properti impian Anda',
ADD COLUMN     "ctaTitle" TEXT NOT NULL DEFAULT 'Tidak Menemukan Properti yang Cocok?';
