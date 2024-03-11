-- CreateTable
CREATE TABLE "casos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "profissao" TEXT NOT NULL,
    "docs" TEXT NOT NULL,
    "consultorId" INTEGER NOT NULL,
    "fase" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "prazoAplicacao" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "empresaAberta" TEXT NOT NULL,
    "businessPlan" TEXT NOT NULL,
    "diploma" TEXT NOT NULL,
    "historico" TEXT NOT NULL,
    "equivalencia" TEXT NOT NULL,
    "lor" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "vistoId" INTEGER,
    CONSTRAINT "casos_consultorId_fkey" FOREIGN KEY ("consultorId") REFERENCES "consultores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "casos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "casos_vistoId_fkey" FOREIGN KEY ("vistoId") REFERENCES "vistos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "consultores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "consultores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vistos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "vistos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "casos_nome_key" ON "casos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "consultores_nome_key" ON "consultores"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "vistos_tipo_key" ON "vistos"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
