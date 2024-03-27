import { validationErrors } from '@/lib/assets/assets';
import { imageExtensions } from '@/lib/data/data';
import { imageValidationCfg } from '@/lib/types/types';

/**
 * Kifejezetten kép típusú fájl validálására alkalmas függvény File objektum tulajdonságain keresztül.
 * A cfg objektumon keresztül biztosítható a kritérium a fájl kiterjesztásáre és méretére vonatkozóan.
 * Ha nincs cfg objektum akkor nem lesz méretkorlátozás valamint minden kép kiterjesztés elfogadott.
 * @returns egy logikai igazzal tér vissza a függvény vagy egy validációs hiba dobódik
 */

export default function validateImageLite(file: File, cfg: imageValidationCfg): Error | true {

    const allowedFileExtensions = cfg?.extensions && cfg.extensions.length > 0 ? cfg.extensions.filter(extension => imageExtensions.includes(extension)) : imageExtensions
    const imagesMimeRegex = new RegExp("image/(" + allowedFileExtensions.join("|") + ")");

    const errors = []

    if (cfg?.size && file.size > cfg.size) errors.push(`Kép mérete túl nagy, maximális méret: ${(cfg.size / 1024 / 1024).toFixed(0)} MB.`)
    if (!imagesMimeRegex.test(file.type)) errors.push("Fájl típusa nem megengedett")


    if (errors.length > 0) throw new validationErrors(errors)

    return true

}