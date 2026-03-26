import httpStatus from "http-status"
import { toPlainObject } from "../assets"
import { ExpandObject } from "@/lib/types/types"

type StatusCode = 100 | 101 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511

interface ServerActionResponseConfig {
    status?: StatusCode,
    payload?: any,
    error?: any
}

export interface DefaultServerActionResponse {
    statusCode: StatusCode,
    statusName: string,
    statusMessage: string,
    error: any,
    payload: any
}

export interface ServerActionResponse<T extends ServerActionResponseConfig = {}> {
    statusCode: T["status"] extends StatusCode ? T["status"] : 200,
    statusName: string,
    statusMessage: string,
    error: ErrorType<T>,
    payload: PayloadType<T>
}

export interface Status500 {
    statusCode: 500,
    statusName: string,
    statusMessage: string,
    error: string,
    payload: null
}



const defaultConfig: Required<ServerActionResponseConfig> = {
    status: 200,
    payload: null,
    error: null
}



type PayloadType<T> = T extends { payload: infer P } ? P : null;
type ErrorType<T> = T extends { error: infer P } ? P : null;

export const createServerActionResponse = <T extends ServerActionResponseConfig>(cfg?: T): ExpandObject<ServerActionResponse<T>> => {

    const config = { ...defaultConfig, ...cfg }

    const response = {
        statusCode: config.status as any,
        statusName: httpStatus[`${config.status}_NAME`],
        statusMessage: httpStatus[`${config.status}_MESSAGE`],
        error: cfg?.error ?? null,
        payload: cfg?.payload ?? null,
    }

    return toPlainObject(response)
}