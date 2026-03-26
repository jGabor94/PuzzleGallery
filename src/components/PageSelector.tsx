"use client"

import usePage from "@/lib/hooks/usePage";
import Pagination from '@mui/material/Pagination';
import { ChangeEvent, FC } from "react";

interface PageSelectorProps {
    imageNumber: number
}

const PageSelector: FC<PageSelectorProps> = ({ imageNumber }) => {

    const { page, setPage } = usePage()

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Pagination color="primary" count={Math.ceil(imageNumber / Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string))} page={page} onChange={handleChange} />
    )
}

export default PageSelector