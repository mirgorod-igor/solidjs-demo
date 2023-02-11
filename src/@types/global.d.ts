declare namespace NodeJS {
    interface Global {
        prisma: import('@prisma/client').PrismaClient
    }

    interface ProcessEnv {
        SESSION_SECRET: string
    }
}
