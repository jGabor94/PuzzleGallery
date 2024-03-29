"use client"

import usePage from "@/lib/hooks/usePage";
import Pagination from '@mui/material/Pagination';


export default function PageSelector({ imageNumber }) {

    const { page, setPage } = usePage()


    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Pagination color="primary" count={Math.ceil(imageNumber / process.env.NEXT_PUBLIC_ITEMS_PER_PAGE)} page={page} onChange={handleChange} />
    )
}