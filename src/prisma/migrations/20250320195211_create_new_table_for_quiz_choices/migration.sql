/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `Choice` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Choice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_questionId_fkey";

-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "isCorrect",
DROP COLUMN "questionId";

-- CreateTable
CREATE TABLE "QuestionChoice" (
    "id" SERIAL NOT NULL,
    "choiceid" INTEGER NOT NULL,
    "questionid" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "QuestionChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionChoice" ADD CONSTRAINT "QuestionChoice_choiceid_fkey" FOREIGN KEY ("choiceid") REFERENCES "Choice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionChoice" ADD CONSTRAINT "QuestionChoice_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
