import { StarRating } from "./dynamic-inputs/StarRating.jsx"
import { SelectRating } from "./dynamic-inputs/SelectRating.jsx"
import { NumInputRating } from "./dynamic-inputs/NumInputRating.jsx"
import { reviewService } from "../services/review.service.js"

const { useState, useRef, useEffect } = React

export function AddReview({ onSaveReview, toggleReview }) {

    const [reviewToAdd, setReviewToAdd] = useState(reviewService.getEmptyReview())
    console.log('reviewToAdd:', reviewToAdd)

    const [cmpType, setCmpType] = useState('stars')

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onSubmitForm(ev) {
        ev.preventDefault()

        setReviewToAdd((prevReview) => {
            const updateReview = {
                ...prevReview,
                date: new Date(prevReview.date).getTime()
            }

            console.log('Submitting review', updateReview)
            onSaveReview(updateReview)
            toggleReview()

            console.log('updateReview', updateReview)
            return updateReview
        })
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onChangeCmpType({ target }) {
        const selectedType = target.value
        setCmpType(selectedType)
    }


    const { fullName, date, txt, rating } = reviewToAdd
    return <section className='add-review'>

        <form onSubmit={onSubmitForm} className='review-form'>
            <div className='review-modal'>
                <h1>Add review</h1>
                <button className='btn-toggle-modal'
                    onClick={toggleReview}>X
                </button>

                <label className='bold-txt' htmlFor='fullname'>Full name:</label>
                <input autoFocus ref={inputRef} placeholder='Enter full name' name='fullName' type='text' id='fullname' value={fullName} onChange={handleChange} autoComplete='off' />

                <label className='bold-txt' htmlFor='date'>Date:</label>
                <input type='date' id='date' name='date' value={date} onChange={handleChange} />

                <div className='rate-by-choice'>
                    <p className='bold-txt'>Select rating type:</p>
                    <label htmlFor="select">Select</label>
                    <input name='rating' onChange={onChangeCmpType} id='select' type="radio" value='select' />

                    <label htmlFor="numInput">Number Input</label>
                    <input name='rating' onChange={onChangeCmpType} id='numInput' type="radio" value='numInput' />

                    <label htmlFor="stars">Stars</label>
                    <input name='rating' onChange={onChangeCmpType} id='stars' type="radio" value='stars' />
                </div>

                {cmpType === 'select' && <SelectRating handleChange={handleChange} rating={rating} />}
                {cmpType === 'numInput' && <NumInputRating handleChange={handleChange} rating={rating} />}
                {cmpType === 'stars' && <StarRating handleChange={handleChange} rating={rating} />}

                <textarea name='txt' cols='30' rows='10' value={txt} onChange={handleChange}></textarea>

                <button>Save</button>
            </div>
        </form>

    </section>
}
