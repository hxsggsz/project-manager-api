-- CreateTable
CREATE TABLE "user" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "githubId" STRING,
    "linkedinID" STRING,
    "username" STRING NOT NULL,
    "profilePhoto" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
