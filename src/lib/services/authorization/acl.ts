import { acl } from "./aclAuthorization"

export const defaultAcl: acl = {
    user: ["read"]
}

export const imageAcl: acl = {
    user: ["read"],
    publisher: true,
    admin: true
} 