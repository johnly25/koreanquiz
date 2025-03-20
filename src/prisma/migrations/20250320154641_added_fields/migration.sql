/*
  Warnings:

  - You are about to drop the `Quiz_Score` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `choice` to the `Choice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCorrect` to the `Choice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Choice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionType` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizid` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Choice" ADD COLUMN     "choice" TEXT NOT NULL,
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL,
ADD COLUMN     "questionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "questionType" TEXT NOT NULL,
ADD COLUMN     "quizid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Quiz_Score";

-- CreateTable
CREATE TABLE "UserQuiz" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "quizid" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "timetaken" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserQuiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserQuiz" ADD CONSTRAINT "UserQuiz_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuiz" ADD CONSTRAINT "UserQuiz_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
