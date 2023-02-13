import {createRenderEffect, For, Signal} from 'solid-js'

import valueDr from '~/lib/value'
const value = valueDr


type TabProps<T extends string|number> = {
    store: Signal<T>
    value: T
    default?: boolean
}

const Tab = <T extends string|number,>(p: TabProps<T>) => {

    const [value] = p.store

    return <input
        id={'tab-'+value()}
        checked={p.default} name='tab' class='_T_' type='radio'
        use:value={p.store}
    />
}

type Props<T extends string|number> = {
    items: [T, string, boolean?][]
    store: Signal<T>
}

const TabButtons = <T extends string|number,>(p: Props<T>) => {
    return <div class='tabs'>
        {
            p.items.map(it => <>
                <Tab store={p.store} value={it[0]} default={it[2]} />
                <label for={`tab-${it[0]}`}>{it[1]}</label>
            </>)
        }
    </div>
}


export default TabButtons
