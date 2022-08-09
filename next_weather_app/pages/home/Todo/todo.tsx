import { NextPage } from "next";
import { firestore } from '../../../firebase/clientApp'
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useEffect } from 'react'
import { useState } from 'react';
import {updateDoc} from "@firebase/firestore";
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import {deleteDoc} from "@firebase/firestore";

const Todo: NextPage = () => {
    const todosCollection = collection(firestore, 'todos')

    const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getTodos = async () => {
        // construct a query to get up to 10 undone todos 
        const todosQuery = query(todosCollection, where('done', '==', false), limit(10));
        // get the todos
        const querySnapshot = await getDocs(todosCollection);

        // map through todos adding them to an array
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot);
        });
        // set it to state
        setTodos(result);
    };

    const updateTodo = async (documentId: string) => {   
        // create a pointer to the Document id
        const _todo = doc(firestore,`todos/${documentId}`);
        // update the doc by setting done to true
        await updateDoc(_todo,{
        "done":true
        });
        // retrieve todos
        getTodos();
     }

     const deleteTodo = async (documentId:string) => {
        // create a pointer to the Document id
        const _todo = doc(firestore,`todos/${documentId}`);
        // delete the doc
        await deleteDoc(_todo);
        // retrieve todos
        getTodos();
     }

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
                                    <div key={todo.id}>
                                        <h2>{todo.data().title}</h2>
                                        <p>{todo.data().description}</p>
                                        <div>
                                            <button type="button" onClick={() => updateTodo(todo.id)}>Mark as done</button>
                                            <button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            })
                        )
                }
            </div>
        </>
    )
}

export default Todo