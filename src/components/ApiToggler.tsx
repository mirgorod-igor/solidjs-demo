import {Resource} from 'solid-js'

type Props = {
    id
    name
    store: Resource<any>
    onChange?: ChangeEventHandler<HTMLInputElement>
}

const ApiToggler = (p: Props) => {
    const st = p.store.state

    return <input
        type='radio' id={`${p.name}-${p.id}`} class={'_T_ '+st}
        checked={st == 'pending'} onChange={p.onChange}
    />
}


export default ApiToggler
