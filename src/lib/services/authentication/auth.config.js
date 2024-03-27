import { NextResponse } from "next/server"


class ProtectedRoutes {
    constructor(defs) {
        this.defs = defs
    }
    check(auth, req) {

        let matched = false

        this.defs.forEach(def => {
            if (req.nextUrl.pathname.startsWith(def.path)) {
                matched = def
                return
            }
        })

        if (matched) {
            if (!auth?.user) {
                return matched?.reverse ? true : NextResponse.redirect(new URL('/', req.nextUrl))
            } else {
                return matched?.reverse ? NextResponse.redirect(new URL('/', req.nextUrl)) : true
            }
        }


        return true
    }
}

export const authConfig = {
    providers: [],
    callbacks: {
        authorized({ auth, request }) {

            const protectedRoutes = new ProtectedRoutes([
                { path: "/portfolio" },
            ])

            return protectedRoutes.check(auth, request)
        },
    }


}