import { booksService } from "../services/books.service.js"
import { utilService } from "../services/util.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { GoogleBooksList } from "./GoogleBooksList.jsx"

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouter

export function AddGoogleBook() {
    const [search, setSearch] = useState('')
    const [googleBookList, setGoogleBookList] = useState([])
    console.log('googleBookList', googleBookList)
    const navigate = useNavigate()
    const searchBooksDebounce = useRef(utilService.debounce(searchBooks, 2000))

    useEffect(() => {
        // searchBooks(query)
        searchBooksDebounce.current(search)
    }, [search])

    function handleSearch({ target }) {
        setSearch(target.value)
    }

    function searchBooks(search) {
        booksService.getGoogleBooks(search)
            .then(books => setGoogleBookList(books))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        searchBooks(search)
    }

    function onSave(book) {
        booksService.addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/book'))
    }

    return (
        <div className='book-search'>
            <div className='add-book-title'>
                <form onSubmit={onSubmitForm}>
                    <label htmlFor="add-book" className='bold-txt'>Google Search: </label>
                    <input value={search} onChange={handleSearch} type="text" name='title' placeholder='Insert book name' id="add-book" />
                    {/* <button>Search</button> */}
                </form>
            </div>
            {googleBookList && googleBookList.length > 0 && <GoogleBooksList bookList={googleBookList} onSave={onSave} />}
        </div>
    )

}