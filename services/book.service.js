import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { books as defaultBooks } from '../assets/data/books.js'

const BOOK_KEY = 'bookDB'

export const bookService = {
    query,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    let books = utilService.loadFromStorage(BOOK_KEY)

    if (!Array.isArray(books) || !books.length) {
        console.log('Loading books from file...')
        books = [...defaultBooks]
        utilService.saveToStorage(BOOK_KEY, books)
    }

    return Promise.resolve(filterBooks(books, filterBy))
}

function filterBooks(books, filterBy) {
    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regExp.test(book.title))
    }
    if (filterBy.pageCount) {
        books = books.filter(book => book.pageCount >= filterBy.pageCount)
    }
    return books
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', pageCount = 0) {
    return { title, pageCount }
}

function getDefaultFilter() {
    return { title: '', pageCount: 0 }
}

// function _createBooks() {
//     let books = loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         console.log(books)
//         console.log(booksDB)
//         saveToStorage(BOOK_KEY, booksDB)
//     }
// }