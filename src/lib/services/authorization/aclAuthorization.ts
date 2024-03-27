import { createServerActionResponse } from "@/lib/assets/serverAction";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server"






type permission = ("create" | "read" | "update" | "delete" | "all")
type crud = Array<permission>

type acl = Record<string, crud | boolean>;



/**
 *Logikai igaz értéket ad vissza ha a megadott acl-re illeszkedik a megadott engedélykészlet és szerepkörök ellenkeő esetben hamis értékkel tér vissza
 */

export const aclCheck = (acl: acl, permission: permission, roles: Array<string>) => {


    if (roles.some((role: string) => {

        if (acl[role]) {
            if (typeof acl[role] === "boolean") {
                return acl[role] === true
            }
            if (Array.isArray(acl[role])) {
                return (acl[role] as crud).includes(permission)
            }
            return false
        }
        return false
    })) {
        return true
    } else {
        return false
    }
}



const aclMiddlewareCustom = (src: acl | (() => Promise<acl>), permission: permission) => async (next: any, helper: any) => {

    const targetAcl = src instanceof Function ? await src() : src

    if (!targetAcl) redirect("/market")
    if (aclCheck(targetAcl, permission, helper.session.user.roles)) return next()
    redirect("/market")

}

/**
 * Ez a függvény egy server action köztes szoftvert ad vissza amely megadott acl (access controll list) és crud művelet alapján ellőnrzi a session-ben eltárolt szerepköröket és eldönti hogy a felhasználó jogosult-e a későbbi műveletre.
 * Az acl megadás lehetséges direkt módon valamint egy aszinkron visszahívással aminek a visszatérési értéke egy acl
 */

const aclMiddlewareServerAction = (src: acl | ((params: Array<any>) => Promise<acl>), permission: permission = "all") => async (next: any, helper: any) => {

    const targetAcl = src instanceof Function ? await src(helper.params) : src

    if (!targetAcl) return createServerActionResponse({ status: 403, payload: { error: "ACL not found" } })
    if (aclCheck(targetAcl, permission, helper.session.user.roles)) return next()
    return createServerActionResponse({ status: 403, payload: { error: "You hvae not enough permission to this operation" } })
}


export const aclMiddlewares = {
    custom: aclMiddlewareCustom,
    serverAction: aclMiddlewareServerAction
}



