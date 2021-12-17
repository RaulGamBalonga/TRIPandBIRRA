import React from "react";
import ReviewItem from "./ReviewItem"

function ReviewList({ reviews }) {


    const displayReviews = () => {
        return reviews.map(review => {

            return <ReviewItem key={review._id} review={review} />
        })
    }

    return (
        <>
            {displayReviews()}
        </>
    )
}

export default ReviewList