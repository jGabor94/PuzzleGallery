import { ExpandObject } from "../types/types"
import { DefaultServerActionResponse, ServerActionResponse, Status500, createServerActionResponse } from "./serverAction/response"

type Controller<T = any> = (req: any) => Promise<any>
type Chain = () => Promise<any>
type Middleware = (next: ServerAction, req: Request) => Promise<any>

export type Next = () => Chain

export interface Params {
    params: any
}

export type Request = {
    params: any,
    [key: string]: any
}


export type ServerAction = () => Promise<ServerActionResponse>



export const usingMiddlewares = (stack: Stack, req: Request, index: number = 0): Chain => {

    const current = stack[index]

    if (index < stack.length - 1) {
        const next = usingMiddlewares(stack, req, index + 1)
        return () => (current as Middleware)(next, req)
    }
    return () => (current as Controller)(req)


}


type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;

type Stack = Array<(...args: any[]) => any>

type ControllerArgsType<T extends Stack> = Parameters<T extends [...infer _, infer L] ? L : never>
type ParamsType<T extends Stack> = "params" extends keyof ControllerArgsType<T>[0] ? IfAny<ControllerArgsType<T>[0]["params"], [], ControllerArgsType<T>[0]["params"]> : [];
type ControllerReturnType<T extends Stack> = Awaited<ReturnType<T extends [...infer _, infer L] ? L : never>>;


// Definiáljuk a StackUnion típust, amely az összes függvény visszatérési típusának unióját reprezentálja
type StackUnion<T extends Stack> = Exclude<Awaited<ReturnType<T[number]>>, Exclude<Awaited<ReturnType<T[number]>>, DefaultServerActionResponse>>

export const makeServerAction = <Args extends Stack>(...stack: Args) => {
    return async (...ServerActionParams: ParamsType<Args>): Promise<StackUnion<Args> | ExpandObject<Status500>> => {
        try {
            const chain = usingMiddlewares(stack, ({ params: ServerActionParams }))
            const result = await chain()
            return result
        } catch (error) {
            console.error(error)
            return createServerActionResponse({ status: 500, error: "Szerver hiba" })
        }
    }

}



