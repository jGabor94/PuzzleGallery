"use client"

import { PaginationContext } from "@/app/_providers/providers"
import { useContext } from "react"

const usePage = () => useContext(PaginationContext)
export default usePage