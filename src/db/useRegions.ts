import {createServerData$, redirect} from 'solid-start/server'
import db from '.'
import {RouteDataFunc, RouteDataFuncArgs} from '@solidjs/router'

import '~/lib/std'


type Page = {
    pageNum: number
    pageSize: number
}

export const useRegions = ({params}: RouteDataFuncArgs) => createServerData$(
    async ([_, pageNum, pageSize], {request}) => {
        console.log('useRegions', pageNum, pageSize)
        const [skip, take] = pageNum && pageSize ? [pageNum.int * pageSize.int, pageSize.int] : []

        const items = await db.region.findMany({
            skip, take,
            orderBy: {
                name: 'asc'
            }
        })

        const total = await db.region.count()

        console.log('useRegions', items)

        return {
            items, total
        }
    },
    {
        key: () => ['regions', params.pageNum, params.pageSize]
    }
)
