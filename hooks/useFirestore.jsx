import { useReducer, useEffect, useState } from "react";
import {
  serverTimestamp,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/config";
let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const colRef = collection(db, collectionName);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (data) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
      });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (docId) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const docRef = await doc(db, collectionName, docId);
      await deleteDoc(docRef);
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
    }
  };

  // update document
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const docRef = await doc(db, collectionName, id);
      const updatedDocument = await updateDoc(docRef, updates);
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error });
      return null;
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response, updateDocument };
};
