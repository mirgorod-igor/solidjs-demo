import {Pagination, RemoveToggler} from '~/components'


import {children, For, JSX, Resource, Show, Signal} from 'solid-js'

import sty from '~/styles/list.module.sass'
import {useRouteData} from 'solid-start'





type Props<T extends Id> = {
	class?: JSX.HTMLAttributes<HTMLDivElement>['class']
	//store: store.PagedList<T>
	store: Resource<api.PagedList<T>|undefined>
	children(it: T): JSX.Element
	//group?: [keyof T, (id) => JSX.Element]
}


const List = <T extends Id,>(p: Props<T>) => {

	/*const st = p.store.state

	const wait = !st || st == 'pending'*/

/*
	let show = {}

	const group = (it: T) => {
		const id = it[p.group![0]] as number
		return !show[id] && (
			show[id] = true, p.group![1](id)
		)
	}
*/

	//const c = children(() => p.children)

	return <>
		<div
			class={`${sty.list} ${p.class ?? ''}`}
		    classList={{
				wait: false//p.store.state == 'pending'
			}}
		>
			<For each={p.store()?.items}>
				{
					it => <>
						<RemoveToggler id={it.id} store={/*p.store.remove?.(it.id)*/{type: 'remove'}}>
							{p.children(it)}
						</RemoveToggler>
					</>
				}
			</For>
			{/*{
				items.map((it, i) => <Fragment key={i}>
					{{p.group ? group(it) : undefined}}
					<RemoveToggler id={it.id} store={p.store.remove(it.id)}>
						{p.children(it, i)}
					</RemoveToggler>
				</Fragment>)
			}*/}
		</div>
		<Show when={p.store()?.total}>
			<Pagination store={p.store} />
		</Show>
	</>
}



export default List
