import { useEffect } from "react"
import { bookService } from "../services/book.service.js"

const { useState } = React

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    console.log("bookToEdit:", bookToEdit)

    const { title, amount } = bookToEdit

    function HandleEdit({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))

    }

    function onSaveBook(ev) {
        ev.preventdefault()
    }

    return (
        <section className="book-edit">

            <h1> Book Edit </h1>

            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input 
                    name="title" 
                    id="title"
                    type="text" 
                    onChange={HandleEdit} 
                    placeholder="Enter book title" />
                    value={title || ''} 

                <label htmlFor="amount">Amount:</label>
                <input 
                    name="amount" 
                    id="amount" 
                    type="number" 
                    onChange={HandleEdit} 
                    placeholder="Enter amount" />
                    value={amount || ''} 

                <button>Save</button>
            </form>

        </section>
    )
}