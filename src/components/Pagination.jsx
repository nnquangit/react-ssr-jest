import React from 'react'

export const Pagination = ({page, total, perpage, onChange}) => {
    page = parseInt(page)

    if (!total) {
        return ''
    }

    let list = []
    let totalPages = Math.floor(total / perpage)

    let from = Math.max(Math.min(totalPages - 4, Math.max(page - 2, 1)), 1)
    let to = Math.min(from + 4, totalPages)

    for (let i = from; i <= to; i++) {
        list.push(i)
    }

    let goTo = (e, p) => {
        e.preventDefault()
        onChange(p)
    }

    let itemRender = (text, page, disable = false, active = false, hide = false) => {
        if (hide) {
            return ''
        }
        return (<li className={'page-item ' + (disable ? 'disabled ' : '')}>
            <a role="menuitem" className="page-link" href="" onClick={(e) => goTo(e, page)}>{text}</a>
        </li>)
    }

    return (<nav>
        <ul className="pagination pagination-md">
            {itemRender('«', 1, page < 2)}
            {itemRender('‹', Math.max(page - 1, 1), page < 2)}
            {list.map(v => (<li key={v} className={'page-item ' + (v === page ? 'active' : '')}>
                <a role="menuitem" className="page-link" href="" onClick={(e) => goTo(e, v)}>{v}</a>
            </li>))}
            {itemRender('›', Math.min(page + 1, totalPages), page >= totalPages)}
            {itemRender('»', totalPages, page >= totalPages)}
        </ul>
    </nav>)
}
