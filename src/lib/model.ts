import { Signal } from 'solid-js'

function model(el: HTMLInputElement, state: () => Signal<string>) {
    const [_, set] = state()
    el.addEventListener('change', e => {
        set((e.currentTarget as HTMLInputElement)!.value)
    })
}


declare module 'solid-js' {

    namespace JSX {

        // use:model
        interface Directives {
            model: Signal<string>
        }
    }
}


export default model
