"use client"

import useSWR, { Fetcher } from "swr"
import usePage from "./usePage"
import SA_GetImages from "../actions/image/getImages"

const fetcher: Fetcher<string[]> = () => { return ["asd"] }

export default function useImageList() {

    const { page } = usePage()

    const { data: imageList, mutate, isLoading } = useSWR(["imageList", page], async ([key, page]) => {
        const res = await SA_GetImages(page)
        return res.payload
    }, { revalidateOnMount: false })

    return { imageList, mutate, isLoading }

}