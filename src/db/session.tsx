import {PrismaClient} from '@prisma/client'
import {redirect} from 'solid-start/server'
import {createCookieSessionStorage} from 'solid-start/session'
import db from '.'


type LoginForm = {
    username: string;
    password: string;
};

export async function register({username, password}: LoginForm) {
    return db.user.create({
        data: {username, password},
    })
}

export async function login({username, password}: LoginForm) {
    const user = await db.user.findUnique({
        where: { username }
    })
    return user && password === user.password ? user : null
}

const sessionSecret = import.meta.env.SESSION_SECRET

const storage = createCookieSessionStorage({
    cookie: {
        name: 'RJ_session',
        // secure doesn't work on localhost for Safari
        // https://web.dev/when-to-use-local-https/
        secure: true,
        secrets: ['hello'],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})

export function getUserSession(req: Request) {
    console.log('cookies', req.headers.get('Cookie'))
    return storage.getSession(req.headers.get('Cookie'))
}

export async function getUserId(req: Request) {
    const session = await getUserSession(req)
    console.log('session', session.data)
    const userId = session.get('userId') as number
    return userId || null
}

export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const session = await getUserSession(request)
        , userId = session.get('userId')
    if (userId) {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
        throw redirect(`/login?${searchParams}`)
    }

    return userId || null
}

export async function getUser(db: PrismaClient, req: Request) {
    const userId = await getUserId(req)
    if (userId) {
        try {
            const user = await db.user.findUnique({
                where: { id: userId }
            })
            return user
        }
        catch {
            throw logout(req)
        }
    }
    else {
        return null
    }
}


export async function logout(request: Request) {
    const session = await storage.getSession(request.headers.get('Cookie'))
    return redirect('/login', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}


export async function createUserSession(userId: number, redirectTo: string) {
    const session = await storage.getSession()
    session.set('userId', userId)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}
