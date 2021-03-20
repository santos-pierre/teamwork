/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[compound_id]` on the table `Account`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[session_token,access_token]` on the table `Session`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[email]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[token]` on the table `VerificationRequest`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account.compound_id_unique" ON "Account"("compound_id");

-- CreateIndex
CREATE INDEX "Account.compound_id_provider_account_id_provider_id_user_id_index" ON "Account"("compound_id", "provider_account_id", "provider_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session.session_token_access_token_unique" ON "Session"("session_token", "access_token");

-- CreateIndex
CREATE INDEX "Session.session_token_access_token_index" ON "Session"("session_token", "access_token");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE INDEX "User.email_index" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest.token_unique" ON "VerificationRequest"("token");

-- CreateIndex
CREATE INDEX "VerificationRequest.token_index" ON "VerificationRequest"("token");
