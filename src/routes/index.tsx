/*import {NewItem, Input, Select, List, OrgList, TreeList} from 'components'

import {region, product, org, fetchData} from 'stores/home'
import {regionList} from 'stores'
*/


import {redirect, refetchRouteData, useRouteData} from 'solid-start'


import {getUser, logout} from '~/db/session'
import db from '~/db'
import {createRenderEffect, createSignal, For, Show} from 'solid-js'

import {useUser} from '~/db/useUser'
import {useRegions} from '~/db/useRegions'
import {List} from '~/components'

/*

const changeHandlerFactory = <T,>(store: store.Edit<T>, fieldName: keyof T, asNumber?: boolean) =>
	e => store.value[fieldName] = (asNumber ? parseInt(e.target.value) : e.target.value) as T[keyof T]



const NewRegion = () =>
	<NewItem name='region' store={region.edit}>
		<Input placeholder='ИД' edit={region.edit}
		       onChange={changeHandlerFactory(region.edit, 'id', true)} asNumber />
		<Input placeholder='название' edit={region.edit}
		       onChange={changeHandlerFactory(region.edit, 'name')} />
		<Input placeholder='код' edit={region.edit}
		       onChange={changeHandlerFactory(region.edit, 'code')} />
	</NewItem>

const NewOrg = () =>
	<NewItem name='org' store={org.edit}>
		<Input placeholder='название' edit={org.edit}
		       onChange={changeHandlerFactory(org.edit, 'name')} />
		<Select edit={org.edit} list={regionList}
		        onChange={changeHandlerFactory(org.edit, 'regionId', true)} />
		<Input placeholder='юр. адрес' edit={org.edit}
		       onChange={changeHandlerFactory(org.edit, 'legalAddr')} />
		<Select edit={org.edit}
		        onChange={changeHandlerFactory(org.edit, 'trade')}
		>
			<option value='w' defaultChecked>опт</option>
			<option value='r'>роз</option>
		</Select>
	</NewItem>


const NewProduct = () =>
	<NewItem name='product' store={product.edit}>
		<Input placeholder='название' edit={product.edit}
		       onChange={changeHandlerFactory(product.edit, 'name')} />
	</NewItem>



/*
const NewPrice = () => {
	return <NewItem name='price' store={price.edit}>
		<Select edit={price.edit} list={regionList}
		        onChange={changeHandlerFactory(price.edit, 'regionId', true)} />
		<Select edit={price.edit} list={product.list}
		        onChange={changeHandlerFactory(price.edit, 'productId', true)} />
		<Input placeholder='введите цену' edit={price.edit}
		       onChange={changeHandlerFactory(price.edit, 'price', true)} asNumber />
	</NewItem>
}
*/


import sty from '~/styles/home.module.sass'
import {createServerAction$} from 'solid-start/server'



type Props = {

}


const TabButton = (p: { num, title }) => <>
	<input type='radio' checked={p.num == 0 || undefined} id={'toggler' + p.num} name='toggler' class='_T_' />
	<label for={'toggler' + p.num}>{p.title}</label>
</>

/*
const ProductList = () => {
	return <TreeList href={it => `product/${it.id}`} store={product.list}>
		{
			(it, level) => <div key={it.id} className={sty.product}>
				{new Array(level).fill(<u />)}
				<Link href={`product/${it.id}`}>{it.name}</Link>
			</div>
		}
	</TreeList>
}
*/




export function routeData() {
	return {
		regions: useRegions({
			params: {
				pageNum: '1', pageSize: '10'
			}
		}),
		user: useUser()
	}
}

export default function Home() {
	const rs = useRouteData<typeof routeData>()
		, {user, regions} = rs

	const [, {Form}] = createServerAction$((f: FormData, {request}) =>
		logout(request)
	)

console.log('regions', regions(), regions.state, regions.loading)

	return <>
		<header>
			{/*<span>{user()?.username}</span>*/}
			<Form>
				<button name="logout" type="submit">
					Logout
				</button>
			</Form>
		</header>

		<main class={sty.main}>
			<section class='content'>
				<div class={sty.tabs}>
					{
						['Регионы', 'Производители', 'Продукты'].map((it, i) =>
							<TabButton num={i} title={it} />
						)
					}

					<div>
						<List store={regions}>{
							it => <span>{it.name}</span>
						}</List>
						<hr />
						{/*<NewRegion />*/}
					</div>
					{/*<div>
						<OrgList />
						<hr />
						<NewOrg />
					</div>
					<div>
						<ProductList />
						<hr />
						<NewProduct />
					</div>*/}
				</div>
			</section>
		</main>
	</>
}



