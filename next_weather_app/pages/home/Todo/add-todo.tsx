import type { NextPage } from 'next'
import Head from "next/head";
import { useState } from 'react';

import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection
import { firestore } from '../../../firebase/clientApp'

const AddTodo: NextPage = () => {
    const [title, setTitle] = useState<string>(""); // title
    const [description, setDescription] = useState<string>("");// description
    const [error, setError] = useState<string>("");// error
    const [message, setMessage] = useState<string>("");// message
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // avoid default behaviour

        if (!title || !description) { // check for any null value
            return setError("All fields are required");
        }

        addTodo()
    }

    const addTodo = async () => {
        // get the current timestamp
        const timestamp: string = Date.now().toString();
        // create a pointer to our Document
        const _todo = doc(firestore, `todos/${timestamp}`);
        // structure the todo data
        const todoData = {
            title,
            description,
            done: false
        };
        try {
            //add the Document
            await setDoc(_todo, todoData);
            //show a success message
            setMessage("Todo added successfully");
            //reset fields
            setTitle("");
            setDescription("");
        } catch (error) {
            //show an error message
            setError("An error occurred while adding todo");
        }
    };

    return (
        <div>
            <Head>
                <title>Add todo</title>
                <meta name="description" content="Next.js firebase todos app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>
                    Add todo
                </h1>
                <form onSubmit={handleSubmit}>
                    {
                        error ? (
                            <div>
                                <p>{error}</p>
                            </div>
                        ) : null
                    }
                    {
                        message ? (
                            <div>
                                <p>
                                    {message}. Proceed to <a href="/">Home</a>
                                </p>
                            </div>
                        ) : null
                    }
                    <div>
                        <label>Title</label>
                        <input type="text"
                            placeholder="Todo title"
                            onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            placeholder="Todo description"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddTodo;