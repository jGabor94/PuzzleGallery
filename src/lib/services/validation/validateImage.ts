import { validationErrors } from "@/lib/assets/assets"
import { fileTypeFromBuffer } from 'file-type';
import { ImageExtension, imageValidationCfg } from "@/lib/types/types";
import { imageExtensions } from "@/lib/data/data";




/**
 * Kifejezetten kép típusú fájl validálására alkalmas függvény byte szinten.
 * A cfg objektumon keresztül biztosítható a kritérium a fájl kiterjesztásáre és méretére vonatkozóan.
 * Ha nincs cfg objektum akkor nem lesz méretkorlátozás valamint minden kép kiterjesztés elfogadott.
 * @returns egy logikai igazzal tér vissza a függvény vagy egy validációs hiba dobódik
 */

const validateImage = async (buffer: ArrayBuffer, cfg?: imageValidationCfg): Promise<Error | true> => {

    const allowedFileExtensions = cfg?.extensions && cfg.extensions.length > 0 ? cfg.extensions.filter(extension => imageExtensions.includes(extension)) : imageExtensions

    const type = await fileTypeFromBuffer(buffer)
    const size = cfg?.size && Buffer.byteLength(buffer)

    const errors = []

    if (!type) errors.push("Ismeretlen fájlformátum")
    if ((size && cfg?.size) && size > cfg.size) errors.push(`Kép márete túl nagy, maximális fáljméret: ${(cfg?.size / 1024 / 1024).toFixed(2)} MB`)
    if (type && !allowedFileExtensions.includes(type?.ext as ImageExtension)) errors.push("Fájl típusa nem megengedett")

    if (errors.length > 0) throw new validationErrors(errors)

    return true
}


export default validateImage