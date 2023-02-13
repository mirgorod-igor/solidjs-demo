import {createServerData$, redirect} from 'solid-start/server'
import {getUser} from './session'
import db from '.'

export const useUser = () => createServerData$(
    async (_, {request}) => {
        const user = await getUser(db, request)
//console.log('url', request.url, user)
        if (!user && !request.url.endsWith('/login')) {
            throw redirect('/login')
        }

        return user
    }
)
