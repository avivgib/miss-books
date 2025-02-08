import { bookService } from "../services/book.service.jsx"

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [editFilterBy, setEditFilterBy] = useState({ ...filterBy })
    console.log("editFilterBy", editFilterBy)

    useEffect(() => {
        onSetFilterBy(editFilterBy)
    }, [editFilterBy])

    function onHandleChange(ev) {
        let { value, type, name: field } = ev.target

        if (type === 'number') value = +value
        setEditFilterBy(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()

        onSetFilterBy(editFilterBy)
    }

    return (
        <section className="book-filter">
            <h2>Filter Your Books</h2>

            <form onSubmit={onSubmitForm} className="filter-form">
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input name="title" value={editFilterBy.title || ''} onChange={onHandleChange} type="text" id="title" placeholder="Enter book title" />
                </div>


                <div className="input-group">
                    <label htmlFor="amount">Amount</label>
                    <input name="amount" value={editFilterBy.amount || ''} onChange={onHandleChange} type="number" id="amount" placeholder="Enter amount" />
                </div>

                <button type="submit" className="filter-btn">Apply Filter</button>
            </form>
        </section>
    )
}
