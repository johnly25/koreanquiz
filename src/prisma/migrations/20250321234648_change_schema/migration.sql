/*
  Warnings:

  - You are about to drop the `Choice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionChoice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuestionChoice" DROP CONSTRAINT "QuestionChoice_choiceid_fkey";

-- DropForeignKey
ALTER TABLE "QuestionChoice" DROP CONSTRAINT "QuestionChoice_questionid_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answer" TEXT NOT NULL;

-- DropTable
DROP TABLE "Choice";

-- DropTable
DROP TABLE "QuestionChoice";

-- CreateTable
CREATE TABLE "KoreanAlphabet" (
    "id" SERIAL NOT NULL,
    "letter" TEXT NOT NULL,
    "romanization" TEXT NOT NULL,
    "isVowel" BOOLEAN NOT NULL,

    CONSTRAINT "KoreanAlphabet_pkey" PRIMARY KEY ("id")
);
