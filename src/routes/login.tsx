import {createEffect, createSignal, Show} from 'solid-js'
import {useParams, useRouteData} from 'solid-start'
import {FormError} from 'solid-start/data'
import {
    createServerAction$,
    createServerData$,
    redirect,
} from 'solid-start/server'
import db from '~/db'
import {createUserSession, getUser, login, register} from '~/db/session'

import modelDr from '~/lib/model'
const model = modelDr


function validateUsername(username: unknown) {
    if (typeof username !== 'string' || username.length < 3) {
        return `Usernames must be at least 3 characters long`
    }
}

function validatePassword(password: unknown) {
    if (typeof password !== 'string' || password.length < 6) {
        return `Passwords must be at least 6 characters long`
    }
}

export function routeData() {
    return createServerData$(async (_, {request}) => {
        if (await getUser(db, request)) {
            throw redirect('/')
        }
        return {}
    })
}



const ssr = async (form: FormData) => {
    const loginType = form.get('loginType')
        , username = form.get('username')
        , password = form.get('password')
        , redirectTo = form.get('redirectTo') || '/'
    if (
        typeof loginType !== 'string' ||
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        typeof redirectTo !== 'string'
    ) {
        throw new FormError(`Form not submitted correctly.`)
    }

    const fields = {loginType, username, password}
    const fieldErrors = {
        username: validateUsername(username),
        password: validatePassword(password),
    }

    if (Object.values(fieldErrors).some(Boolean)) {
        throw new FormError('Fields invalid', {fieldErrors, fields})
    }

    switch (loginType) {
        case 'login': {
            const user = await login({username, password})
            if (!user) {
                throw new FormError(`Username/Password combination is incorrect`, {
                    fields,
                })
            }
            console.log('user', user, redirectTo)
            return createUserSession(`${user.id}`, redirectTo)
        }
        case 'register': {
            const userExists = await db.user.findUnique({where: {username}})
            if (userExists) {
                throw new FormError(`User with username ${username} already exists`, {
                    fields,
                })
            }
            const user = await register({username, password})
            if (!user) {
                throw new FormError(
                    `Something went wrong trying to create a new user.`,
                    {
                        fields,
                    }
                )
            }
            return createUserSession(`${user.id}`, redirectTo)
        }
        default: {
            throw new FormError(`Login type invalid`, {fields})
        }
    }
}


export default function Login() {
    const data = useRouteData<typeof routeData>()
    const params = useParams()

    const [loggingIn, {Form}] = createServerAction$(ssr)

    const loginTypeSig = createSignal('login')
        , loginType = loginTypeSig[0]


    return (
        <main>
            <section class='content'>
                <h1>Авторизация</h1>
                <Form>
                    <input
                        type="hidden"
                        name="redirectTo"
                        value={params.redirectTo ?? '/'}
                    />
                    <fieldset>
                        <label>
                            <input
                                type="radio" name="loginType" value="login"
                                checked={true}
                                use:model={loginTypeSig}
                            /> Вход
                        </label>
                        <label>
                            <input
                                type="radio" name="loginType" value="register"
                                use:model={loginTypeSig}
                            /> Регистрация
                        </label>
                    </fieldset>

                    <div class='fields'>
                        <label for="username-input">Пользователь</label>
                        <input name="username" placeholder="demo"/>

                        <Show when={loggingIn.error?.fieldErrors?.username}>
                            <small role="alert">{loggingIn.error.fieldErrors.username}</small>
                        </Show>

                        <label for="password-input">Пароль</label>
                        <input name="password" type="password" placeholder="demodemo"/>

                        <Show when={loggingIn.error?.fieldErrors?.password}>
                            <small role="alert">{loggingIn.error.fieldErrors.password}</small>
                        </Show>

                        <Show when={loggingIn.error}>
                            <small role="alert" id="error-message">
                                {loggingIn.error.message}
                            </small>
                        </Show>
                    </div>
                    <button type="submit">{data() ? (loginType() == 'login' ? 'Войти' : 'Зарегистрироваться') : ''}</button>
                </Form>
            </section>
        </main>
    )
}
