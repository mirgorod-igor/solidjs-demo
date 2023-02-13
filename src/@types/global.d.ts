declare namespace NodeJS {
    interface Global {
        prisma: import('@prisma/client').PrismaClient
    }

    interface ProcessEnv {
        SESSION_SECRET: string
    }
}


interface String {
    readonly int: number
}


interface Array {
    assoc<
        T extends Record<string, any>, KN extends keyof T, VN extends keyof T
    >(
        this: T[], nameKey: KN, nameValue: VN
    ): Record<T[KN], T[VN]>
    groupBy<T>(this: T[], keyName: keyof T): Record<number, T[]>
}
