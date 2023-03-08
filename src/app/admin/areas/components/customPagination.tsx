'use client'
import {Pagination} from "react-bootstrap";
import {FC} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";


interface CustomPaginationProps {
    count: number
    take: number
    skip: number
}

interface PaginationItemProps {
    page: number | 'prev' | 'next'
    currentPage: number
    numberOfPages: number
    skip: number
    take: number
}

const PaginationItem: FC<PaginationItemProps> = ({page, currentPage, numberOfPages, take, skip}) => {
    const pathName = usePathname()
    const active = page === currentPage
    if (page === 'prev') {
        return (
            <Pagination.Prev disabled={currentPage === 1}/>
        )
    } else if (page === 'next') {
        return (
            <Pagination.Next disabled={currentPage === numberOfPages}/>
        )

    } else {
        return (
            <li className={`page-item d-none d-sm-block ${active && 'active'} `}>
                <Link href={`${pathName}?take=${take}&skip=${skip + ((page - currentPage) * take)}`} className="page-link ">{page}</Link>
            </li>
        )
    }
}

const CustomPagination: FC<CustomPaginationProps> = ({skip, take, count}) => {
    const numberOfPages = Math.ceil(count / take)
    const currentPage = Math.ceil(skip / take) + 1
    const pages = []
    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i)
    }
    return (
        <Pagination className='pagination-light'>
            {pages.map(page => <PaginationItem page={page} currentPage={currentPage} numberOfPages={numberOfPages}
                                               take={take} skip={skip}/>)}
        </Pagination>
    )
}
export default CustomPagination