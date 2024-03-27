import httpStatus from "http-status"
import { toPlainObject } from "./assets"

export const usingMiddlewares = (stack, req, index = 0) => {

    const current = stack[index]

    if (index < stack.length - 1) {
        const next = usingMiddlewares(stack, req, index + 1)
        return () => current(next, req)
    }
    return () => current(req)


}

export const makeServerAction = (...args) => async (...args2) => {
    try {
        const result = await usingMiddlewares(args, { params: args2 })()
        return result
    } catch (error) {
        console.error(error)
        return createServerActionResponse({ status: 500 })
    }


}

export const createServerActionResponse = (cfg = {}) => {

    cfg.status = cfg.status ? cfg.status : 200
    cfg.payload = cfg.payload ? cfg.payload : null

    return toPlainObject({
        status: {
            code: cfg.status,
            name: httpStatus[`${cfg.status}_NAME`],
            result: httpStatus[`${cfg.status}_MESSAGE`]
        },
        error: cfg.error ? cfg.error : cfg.status === 200 ? null : httpStatus[`${cfg.status}_NAME`],
        payload: cfg.payload
    })
}