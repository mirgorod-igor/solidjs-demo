import { Signal } from 'solid-js'

function value(el: HTMLInputElement, value: () => Signal<string|number>) {
    const [_, set] = value()
    el.addEventListener('change', e => {
        set((e.currentTarget as HTMLInputElement)!.value)
    })
}


declare module 'solid-js' {

    namespace JSX {

        // use:model
        interface Directives {
            value: Signal<string|number>
        }
    }
}


export default value
