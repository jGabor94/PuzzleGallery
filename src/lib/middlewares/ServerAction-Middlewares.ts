import { Session } from 'next-auth'
import { ImageList } from '../assets/imagePreparation'
import { Next } from '../assets/serverAction'
import { createServerActionResponse } from '../assets/serverAction/response'
import { auth } from '../services/authentication/auth'
import validateValues from '../services/validation/validateValues'
import { AnyObject } from '../types/types'

export const isLogged = async (next: Next, req: { session: Session }) => {
  const session = await auth()
  if (session) {
    req.session = session
    return next()
  } else {
    return createServerActionResponse({ status: 401, error: "You are not logged in" })
  }

}

export const formdataToObject = async (next: Next, req: { params: [formData: FormData], data: AnyObject }) => {

  const obj: AnyObject = {};
  const [formData] = req.params.filter(param => param instanceof FormData)

  for (const [key, value] of formData) {
    const normalizedKey = key.replace(/\[\]$/, '');
    if (normalizedKey === 'images') {
      if (!obj[normalizedKey]) {
        obj[normalizedKey] = [];
      }
      obj[normalizedKey].push(value);
    } else if (normalizedKey.includes('[')) {
      const nestedKeys = normalizedKey.split(/\[|\]/).filter(Boolean);
      let nestedObj = obj;
      for (let i = 0; i < nestedKeys.length; i++) {
        const currentKey = nestedKeys[i];
        if (!nestedObj[currentKey]) {
          nestedObj[currentKey] = {};
        }
        if (i === nestedKeys.length - 1) {
          nestedObj[currentKey] = value;
        } else {
          nestedObj = nestedObj[currentKey];
        }
      }
    } else {
      obj[normalizedKey] = value;
    }
  }


  req.data = obj
  return next()
}



export const toFileList = async (next: Next, req: { params: [formData: FormData], formData: ImageList }) => {

  type Key = "file" | "name" | "width" | "height"

  const fileList: any[] = []
  const [formData] = req.params.filter(param => param instanceof FormData)

  for (const [key, value] of formData) {


    const [fullKey, name, index, objKey] = key.match(/^(\w+)\[(\d+)\]\[(\w+)\]$/) as [string, "images", string, Key];


    if (fileList[Number(index)]) {
      fileList[Number(index)] = { ...fileList[Number(index)], [objKey]: value }
    } else {
      fileList.push({ [objKey]: value })
    }

  }

  req.formData = fileList
  return next()
}

export const validation = (schema) => async (next, req) => {

  const errors = validateValues(schema, req.data || req.params[0], {
    abortEarly: false,
    allowUnknown: true,
  })



  if (errors) {
    return createServerActionResponse({ status: 400, error: errors })
  } else {
    return next()
  }
}