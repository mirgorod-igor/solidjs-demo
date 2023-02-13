// @refresh reload
import {Suspense} from 'solid-js'
import {
    Body,
    ErrorBoundary,
    FileRoutes,
    Head,
    Html,
    Meta,
    Routes,
    Scripts,
    Title, useRouteData,
} from 'solid-start'

import '@fontsource/roboto'
import '@fontsource/roboto-condensed'
import '@fontsource/inter'



import '~/styles/root.sass'
import {createServerAction$} from 'solid-start/server'
import {getUserId, logout} from '~/db/session'
import {useUser} from '~/db/useUser'
import {createRouteData} from 'solid-start/data'




export default function Root() {

    return (
        <Html lang="ru">
            <Head>
                <Title>SolidJS|Prisma - demo</Title>
                <Meta charset="utf-8"/>
                <Meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Body>
                <ErrorBoundary>
                    <Suspense fallback={<div>Loading</div>}>
                        <Routes>
                            <FileRoutes/>
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
                <Scripts/>
            </Body>
        </Html>
    )
}
