"use client"

import { ConfigContext } from "@/app/_providers/Context/context"
import { useContext } from "react"

const useConfig = () => useContext(ConfigContext)
export default useConfig
