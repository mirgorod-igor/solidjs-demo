import {ApiToggler} from '~/components'
import {JSX} from 'solid-js'



type Props = {
    id
    store: store.Remove
    children: JSX.Element
    class?: string
    style?: JSX.CSSProperties
}

const RemoveToggler = (p: Props) => {
    const name = 'remove-' + p.store.type
    return <div class={p.class} style={p.style}>
        <ApiToggler id={p.id} store={p.store} name={name} onChange={_ => p.store.remove()} />
        {p.children}
        <label for={name + '-' + p.id}>&ndash;</label>
    </div>
}

export default RemoveToggler
