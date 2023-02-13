import {List} from '~/components'


import {tradeMap, regionMap} from 'stores'
import {org} from 'stores/home'

//import sty from 'styles/list.module.sass'




const OrgList = () => {
    const region = (id: number) => <b>{regionMap[id]}</b>

    return <List
        class='orgs' store={org.list}
        group={['regionId', region]}
    >
        {
            it => <Fragment key={it.id}>
                <a href={'org/' + it.id}>{it.name}</a>
                <span>{it.legalAddr}</span>
                <span>{tradeMap[it.trade]}</span>
            </Fragment>
        }
    </List>
}


export default OrgList
