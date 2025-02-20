

export function NumInputRating({ handleChange, rating }) {

    return (
        <input
            name='rating'
            value={rating}
            onChange={handleChange}
            type="number"
        />
    )
}