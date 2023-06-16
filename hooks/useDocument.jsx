import { doc, onSnapshot } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../utils/config";

/**
 *
 * @param {string} collectionName
 * @param {string} documentId
 * @returns {{document: Object | null, error: Error | null}}
 */
export const useDocument = (collectionName, documentId) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docRef = doc(db, collectionName, documentId);
    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        }
      },
      (err) => {
        console.log(err);
        setError("failed to fetch document");
      }
    );

    return () => unsub();
  }, [collectionName, documentId]);

  return { document, error };
};
