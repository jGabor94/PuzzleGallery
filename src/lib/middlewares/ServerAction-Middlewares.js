import { createServerActionResponse } from '../assets/serverAction'
import { auth } from '../services/authentication/auth'
import validateValues from '../services/validation/validateValues'

export const isLogged = async (next, req) => {
  const session = await auth()
  if (session) {
    req.session = session
    return next()
  } else {
    return { error: "You are not logged in" }
  }
}

export const authorization = (target) => async (req, event, next) => {

  const { roles } = req.session.user
  if (roles.some(role => target.includes(role))) {
    return next()
  }
  else {
    return { error: "You don't have enough permissionsn" }
  }
}

export const formdataToObject = async (next, req) => {
  const obj = {};
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

export const toFileList = async (next, req) => {
  const fileList = []
  const [formData] = req.params.filter(param => param instanceof FormData)

  for (const [key, value] of formData) {
    const [fullKey, name, index, objKey] = key.match(/^(\w+)\[(\d+)\]\[(\w+)\]$/);

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