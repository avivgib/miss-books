import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews = [], onRemoveReview }) {
    return (
        <div>
            <h3>Users recommend:</h3>
            {reviews.length > 0 ? (reviews.map(review =>
                <ReviewPreview
                    key={review.id}
                    review={review}
                    onRemoveReview={onRemoveReview}
                />
            )
            ) : (
                <p>No Reviews Yet.</p>
            )}
        </div>
    )
}