/*
  Warnings:

  - A unique constraint covering the columns `[choice]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Choice_choice_key" ON "Choice"("choice");
