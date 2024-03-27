"use client"

import { ColorModeContext } from "@/app/_providers/providers"
import { useContext } from "react"

const useColorMode = () => useContext(ColorModeContext)
export default useColorMode