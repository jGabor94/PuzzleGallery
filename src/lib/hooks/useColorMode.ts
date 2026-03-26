"use client"

import { ColorModeContext } from "@/app/_providers/Context/context"
import { useContext } from "react"

const useColorMode = () => useContext(ColorModeContext)
export default useColorMode