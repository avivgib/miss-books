import { booksService } from "../services/books.service.js"
import { utilService } from "../services/util.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { GoogleBooksList } from "./GoogleBooksList.jsx"
import { Loader } from "./Loader.jsx"

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouter

export function AddGoogleBook() {
    const [search, setSearch] = useState('')
    const [googleBookList, setGoogleBookList] = useState([])
    // console.log('googleBookList', googleBookList)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const searchBooksDebounce = useRef(utilService.debounce((searchTerm) => {
        if (!searchTerm) return

        setIsLoading(true)
        booksService.getGoogleBooks(searchTerm)
            .then(books => setGoogleBookList(books))
            .catch(() => showErrorMsg('Failed to fetch books'))
            .finally(() => setIsLoading(false))
    }, 2000))

    useEffect(() => {
        // searchBooks(query)
        if (!search) return
        searchBooksDebounce.current(search)
    }, [search])

    function handleSearch({ target }) {
        setSearch(target.value)
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        searchBooksDebounce.current(search)
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
                    <label htmlFor="add-book">Google Search Book: </label>
                    <input value={search} onChange={handleSearch} type="text" name='title' placeholder='Insert book name' id="add-book" />
                </form>
            </div>
            {isLoading && <Loader />}
            {!isLoading && googleBookList.length > 0 && <GoogleBooksList bookList={googleBookList} onSave={onSave} />}
        </div>
    )
}