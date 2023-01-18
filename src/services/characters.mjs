import { getDocs, collection, setDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { getDb } from './db.mjs'

const collection_name = 'Characters'

export const findAll = async () => { // obtiene los registros de la base de datos
  const doc_refs = await getDocs(collection(getDb(), collection_name))

  const res = []

  doc_refs.forEach((character) => {
    res.push({
      id: character.id,
      ...character.data(),
    })
  })

  return res
}

export const addCharacter = async (args) => {
  try {
    return await addDoc(collection(getDb(), collection_name), args)
  } catch(error) {
    console.error("Error adding document: ", e)
    return error
  }
}

export const updateCharacter = async (id, args) => {
  try {
    return await setDoc(doc(getDb(), collection_name, id), args)
  } catch (error) {
    console.log(error)
    return error
  }
}

export const deleteCharacter = async (characterId) => {
  try {
    return await deleteDoc(doc(getDb(), collection_name, characterId))
  } catch(error) {
    console.error("Error deleting document: ", error)
    return error
  }
} 
