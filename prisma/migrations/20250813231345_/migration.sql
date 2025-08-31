-- CreateTable
CREATE TABLE "public"."PropertyPageSection" (
    "id" TEXT NOT NULL,
    "rootId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,

    CONSTRAINT "PropertyPageSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyPageSection_rootId_key" ON "public"."PropertyPageSection"("rootId");

-- AddForeignKey
ALTER TABLE "public"."PropertyPageSection" ADD CONSTRAINT "PropertyPageSection_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Root"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
