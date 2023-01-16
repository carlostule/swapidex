import { getDocs, collection, setDoc, doc } from 'firebase/firestore'
import { getDb } from './db.mjs'

const collection_name = 'Characters'

export const findAll = async () => { // obtiene los registros de la base de datos
  const doc_refs = await getDocs(collection(getDb(), collection_name))

  const res = []

  doc_refs.forEach((character) => {
    res.push({
      ...character.data(),
    })
  })

  return res
}

export const updateCharacter = (args) => {
  const { name, ...params } = args
  return setDoc(doc(getDb(), collection_name, name), params)
}
