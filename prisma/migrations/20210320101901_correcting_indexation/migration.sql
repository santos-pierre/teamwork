-- DropIndex
DROP INDEX "Account.compound_id_provider_account_id_provider_id_user_id_ind";

-- CreateIndex
CREATE INDEX "Account.compound_id_index" ON "Account"("compound_id");

-- CreateIndex
CREATE INDEX "Account.provider_account_id_index" ON "Account"("provider_account_id");

-- CreateIndex
CREATE INDEX "Account.provider_id_index" ON "Account"("provider_id");

-- CreateIndex
CREATE INDEX "Account.user_id_index" ON "Account"("user_id");

-- CreateIndex
CREATE INDEX "Session.access_token_index" ON "Session"("access_token");
