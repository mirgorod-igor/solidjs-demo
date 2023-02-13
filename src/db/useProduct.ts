import {createServerData$, redirect} from 'solid-start/server/browser'
import {getUser} from '~/db/session'
import db from '~/db/index'

export const useUser = () =>
    createServerData$(async (_, {request}) => {
        const user = await getUser(db, request)

        if (!user) {
            throw redirect('/login')
        }

        return user
    })
