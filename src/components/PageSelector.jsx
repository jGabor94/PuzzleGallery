"use client"

import usePage from "@/lib/hooks/usePage";
import Pagination from '@mui/material/Pagination';


export default function PageSelector({ imageNumber }) {

    const { page, setPage } = usePage()


    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Pagination color="primary" count={Math.ceil(imageNumber / process.env.itemsPerPage)} page={page} onChange={handleChange} />
    )
}