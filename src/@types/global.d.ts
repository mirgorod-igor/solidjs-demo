declare namespace NodeJS {
    interface Global {
        prisma: import('@prisma/client').PrismaClient
    }

    interface ProcessEnv {
        TABLE_NAME: string
    }
}
