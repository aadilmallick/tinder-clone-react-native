import { useEffect, useState, useRef } from "react";
import {
  collection,
  where,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/config";

/**
 *
 * @param {string} collection
 * @param {Array} _query
 * @param {Array} _orderBy
 * @returns
 */
export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  // make sure to always do this pattern when putting reference types in a useEffect
  const queryFirebase = useRef(_query).current;
  const orderByFirebase = useRef(_orderBy).current;

  useEffect(() => {
    setLoading(true);
    let colRef = collection(db, collectionName);

    if (queryFirebase) {
      colRef = query(colRef, where(...queryFirebase));
    }
    if (orderByFirebase) {
      colRef = query(colRef, orderBy(...orderByFirebase));
    }

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collectionName, queryFirebase, orderByFirebase]);

  return { documents, error, loading };
};
