import {ApiToggler} from '~/components'


//import sty from 'styles/home.module.sass'



const NewToggler = (p: { id: string, edit: store.Edit<any> }) => {
	return <span class='toggler:new'>
		<input
			type='radio' id={p.id} class='_T_'
			onClick={e => p.edit.edited = e.currentTarget.checked}/>
		<label for={p.id}> добавить</label>
	</span>
}

const SubmitToggler = (p: Props) => {
	return <div class='newItem'>
		<ApiToggler id={p.name} store={p.store} name='submit' />
		{p.children}
		<span class='icon:check' onClick={_ => p.store.submit()} />
		<span class='icon:cancel' onClick={_ => p.store.cancel()} />
		<span class='icon:loading' />
	</div>
}



type Props = {
	name: string
	children: JSX.Element
	store: store.Edit<any>
}

const NewItem = (p: Props) => {
	const opened = p.store.isEdited()
	return opened
		? <SubmitToggler {...p}>
			{p.children}
		</SubmitToggler>
		: <NewToggler id={'toggler_new_' + p.name} edit={p.store} />
}


export default NewItem
