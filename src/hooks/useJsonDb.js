import { useReducer, useEffect, useState } from "react";
import { useFetch } from './useFetch';

let initialState = {
  document:  null,
  isPending: false,
  error: null,
  success: null
}

const jsonDbReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export const useJsonDb = () => {
  const [response, dispatch] = useReducer(jsonDbReducer, initialState)

  // add a document 
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (err) {
      dispatchIfNotCancelled( { type: 'ERROR', payload: err.message })
    }
  }

  return ( { addDocument } )
}