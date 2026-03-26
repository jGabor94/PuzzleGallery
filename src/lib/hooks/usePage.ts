"use client"

import { PaginationContext } from "@/app/_providers/Context/context"
import { useContext } from "react"

const usePage = () => useContext(PaginationContext)
export default usePage