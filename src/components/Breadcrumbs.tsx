type Props = {
    items: [string, string][]
}
const Breadcrumbs = (p: Props) => {
    return <nav class='breakcrumbs'>
        {
            p.items.map(it => <a href={it[0]}>{it[1]}</a>)
        }
    </nav>
}

export default Breadcrumbs
