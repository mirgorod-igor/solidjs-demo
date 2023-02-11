import { Prisma, PrismaClient } from '@prisma/client'

const conf: Prisma.PrismaClientOptions = {
    log: ['query', 'info', 'warn', 'error']
}

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient(conf)
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient(conf)
    }
    db = global.prisma
}
export default db
