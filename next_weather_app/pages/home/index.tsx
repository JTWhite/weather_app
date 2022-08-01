import React from 'react'
import { NextPage } from "next"
import { firestore } from '../../firebase/clientApp'
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useEffect } from 'react'
import { useState } from 'react';


const Home: NextPage = () => {

  const todosCollection = collection(firestore, 'todos')

  const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getTodos = async () => {
    // construct a query to get up to 10 undone todos 
    const todosQuery = query(todosCollection, where('done', '==', false), limit(10));
    // get the todos
    const querySnapshot = await getDocs(todosQuery);

    // map through todos adding them to an array
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    // set it to state
    setTodos(result);
  };

  useEffect(() => {
    // get the todos
    getTodos();
    // reset loading
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  return (
    <>
      <div>
        <h1>Weather Application Home</h1>
        <p>just getting started...</p>
        <div>
          {
            loading ? (
              <div>
                <h2>Loading</h2>
              </div>
            ) :
              todos.length === 0 ? (
                <div>
                  <h2>No undone todos</h2>
                  <p>Consider adding a todo from <a href="/add-todo">here</a></p>
                </div>
              ) : (
                todos.map((todo) => {
                  return (
                    <div>
                      <h2>{todo.data.arguments['title']}</h2>
                      <p>{todo.data.arguments['description']}</p>
                      <div>
                        <button type="button">Mark as done</button>
                        <button type="button">Delete</button>
                      </div>
                    </div>
                  )
                })
              )
          }
        </div>
      </div>
    </>
  )
}

export default Home
