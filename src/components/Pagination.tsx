import { FiMoreHorizontal } from 'solid-icons/fi'
import {createSignal, For, Resource} from 'solid-js'

function calcPages(num: number, pageCount: number) {
    let pg: store.PageNum[]
    if (pageCount < 2) {
        pg = []
    } else if (pageCount < 7) {
        pg = [...Array(pageCount).keys()]
    } else {
        const lastPage = pageCount - 1
            , middle = num <= 3 ? 3 : num >= lastPage - 3 ? lastPage - 3 : num

        pg = [
            0,
            num <= 2 ? 1 : 'l',
            middle - 1, middle, middle + 1,
            num + 1 >= lastPage - 1 ? lastPage - 1 : 'r',
            lastPage
        ]
    }

    return pg
}

type Props<T> = {
    store: Resource<api.PagedList<T>|undefined>
}

const Pagination = <T,>(p: Props<T>) => {
    let dots = false
    const [page, setPage] = createSignal<store.PageNum>(0)

    const pages = calcPages(page() as number, Math.ceil(p.store()?.total! / 10))
    //this._pages[1](pg)

    return <ul class='paging'>
        {
            pages.map(it => (
                dots = isNaN(it as number),
                <li
                    classList={{
                        dots, active: page() == it
                    }}
                    onClick={_ => setPage(it)}
                >{isNaN(it as number) ? <FiMoreHorizontal /> : it as number + 1}</li>
            ))
        }
    </ul>
}

export default Pagination
