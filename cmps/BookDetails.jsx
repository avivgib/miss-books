const { useState, useEffect } = React
// const {  } = ReactRouter
const { useParams, useNavigate, Link } = ReactRouterDOM

import { booksService } from "../services/books.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "./ReviewList.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"
import { reviewService } from "../services/review.service.js"
import { Loader } from "./Loader.jsx"

export function BookDetails() {
    const [book, setBook] = useState(null)
    console.log('book', book)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)

    const params = useParams()
    console.log("params:", params)
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        booksService.get(params.bookId)
            .then(setBook)
            .catch(() => {
                showErrorMsg('Couldn\'t get book...')
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const getBookLifeStatus = (publishedDate) => {
        const currentYear = new Date().getFullYear()
        const publicationYear = new Date(publishedDate).getFullYear()
        const yearsOnAir = currentYear - publicationYear

        return yearsOnAir > 10 ? 'Vintage' : 'New'
    }

    const getReadingCategory = (pageCount) => {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        if (pageCount < 100) return 'Light Reading'
        return 'Standard Reading'
    }

    function onToggleReviewModal() {
        setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }

    function onSaveReview(reviewToAdd) {
        console.log('🔥 onSaveReview called with:', reviewToAdd) // האם זה מופיע?
        
        setIsLoadingReview(true)
    
        reviewService.saveReview(book.id, reviewToAdd)
            .then((review => {
                console.log('✅ Review saved:', review) // האם זה מופיע?
                
                setBook(prevBook => {
                    const updatedReviews = [review, ...prevBook.reviews]
                    console.log('Previous Book:', prevBook) // האם זה מופיע?
                    console.log('Updated Reviews:', updatedReviews)
                    return { ...prevBook, reviews: updatedReviews }
                })
            }))
            .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
            .finally(() => setIsLoadingReview(false))
    }
    

    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        reviewService.removeReview(book.id, reviewId)
            .then(() => {
                setBook(prevBook => {
                    const filteredReviews = prevBook.reviews.filter(review => review.id !== reviewId)
                    return { ...prevBook, reviews: filteredReviews }
                })
            })
            .finally(() => setIsLoadingReview(false))
    }

    if (isLoading || !book) return <Loader />

    function getBookLng(lng) {
        switch (lng) {
            case 'he':
                return 'Hebrew'
            case 'sp':
                return 'Spanish'
            default:
                return 'English'
        }
    }

    const getBookPriceStatus = (amount) => {
        if (amount > 150) return 'expensive-price'
        if (amount < 20) return 'cheap-price'
        return ''
    }

    const {
        title,
        subtitle,
        thumbnail,
        pageCount,
        publishedDate,
        authors,
        description,
        language,
        categories,
        listPrice
    } = book

    return (
        <section className="book-details">

            <button className="back-btn">
                <Link to="/book"><i className="fas fa-arrow-left"></i>Back</Link>
            </button>

            <div className="details-card">
                <div className="image-container">
                    <img src={thumbnail || "../assets/img/default.png"} alt={title} className="book-img" />
                    {listPrice.isOnSale && <div className="sale-badge">🔥 On Sale!</div>}
                </div>

                <div className="book-info">
                    <h1 className="book-title">{title}</h1>
                    <h3 className="book-subtitle">{subtitle}</h3>

                    <div><strong>Authors: </strong>
                        {authors && authors.length > 0 ? authors.join(", ") : "Unknown"}
                    </div>

                    <div><strong>Published: </strong>
                        {publishedDate ? `${publishedDate} - ${getBookLifeStatus(publishedDate)}` : 'Unknown Date'}
                    </div>

                    <div><strong>Page Count: </strong>
                        {pageCount ? `${pageCount} - ${getReadingCategory(pageCount)}` : 'Unknown Page Count'}
                    </div>

                    <div><strong>Categories: </strong>
                        {categories && categories.length > 0 ? categories.join(', ') : 'None'}
                    </div>

                    <div><strong>Language: </strong>
                        {language ? getBookLng(language.toLowerCase()) : 'Unknown Language'}
                    </div>

                    <div><strong>Price: </strong>
                        <span className={`price ${getBookPriceStatus(listPrice.amount)}`}>
                            {listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: listPrice.currencyCode })}
                        </span>
                    </div>

                    {listPrice.isOnSale && <p className="sale-price">🔥 On Sale!</p>}

                    <div className="book-description">
                        <span><strong>Description: </strong></span>
                        <LongTxt text={description || 'No description available'} />
                    </div>
                </div>
            </div>

            <button>
                <Link to={`/book/${book.prevBookId}`}>
                    <i className="fas fa-arrow-left"></i>
                    Prev Book
                </Link>
            </button>
            <button>
                <Link to={`/book/${book.nextBookId}`}>
                    Next Book
                    <i className="fas fa-arrow-right"></i>
                </Link>
            </button>

            <hr />
            <button onClick={onToggleReviewModal}>Add Review</button>
            {isShowReviewModal && (
                <AddReview
                    toggleReview={onToggleReviewModal}
                    onSaveReview={onSaveReview}
                />
            )}

            <div className='review-container'>
                {!isLoadingReview
                    ? <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
                    : <Loader />
                }
            </div>

        </section>
    )
}