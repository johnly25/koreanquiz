-- CreateTable
CREATE TABLE "QuestionChoice" (
    "id" SERIAL NOT NULL,
    "choiceid" INTEGER NOT NULL,
    "questionid" INTEGER NOT NULL,

    CONSTRAINT "QuestionChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Choice" (
    "id" SERIAL NOT NULL,
    "choice" TEXT NOT NULL,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Choice_choice_key" ON "Choice"("choice");

-- AddForeignKey
ALTER TABLE "QuestionChoice" ADD CONSTRAINT "QuestionChoice_choiceid_fkey" FOREIGN KEY ("choiceid") REFERENCES "Choice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionChoice" ADD CONSTRAINT "QuestionChoice_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
