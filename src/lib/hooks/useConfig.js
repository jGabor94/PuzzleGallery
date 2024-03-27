import { ConfigContext } from "@/app/_providers/ConfigProvider/Provider"
import { useContext } from "react"

export default function useConfig() {

    const config = useContext(ConfigContext)

    return config

}