import { AnyObject } from "@/lib/types/types"
import Joi from "joi"

/**
 * Validátciós függvény ami joi könyvtárral működik
 * @returns hiba nélkül nincs visszatérési érték hiba esetén egy hibaobjektum aminek a kulcsai az érték kulcsa az értékei pedig maga a hibaüzenet
 */

const validateValues = (schema: Joi.ObjectSchema<any>, values: AnyObject, options: Joi.ValidationOptions): AnyObject | void => {
    const errors: AnyObject = {}

    const { error } = schema.validate(values, options)


    //console.log(result)

    if (error) {
        error.details.forEach((error, index) => {
            if (error.context && error.context.key) {
                errors[error.context.key] = error.message
            } else {
                errors[`unknown${index}`] = error.message
            }
        })
        return errors
    }

}

export default validateValues