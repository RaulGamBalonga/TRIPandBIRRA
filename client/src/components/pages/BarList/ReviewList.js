import React from "react";
import ReviewItem from "./ReviewItem"

// 1. en bar details quieres que se muestre la lista de reviews de ese bar
// 2. has creado un componente para que muestre todas esas reviews
// 3. las reviews las tenemos en bar details
// 4. tenemos que importar el componente reviewslist en bar details, ponerlo donde lo queramos y pasarle las reviews como props
// 5. en review list recibimos las reviews como props e iteramos sobre ellas para mostrar o bien un review item 
// que seria crear otro componente y por cada iteracion del review list crear un review item y pasarle la review sobre la 
// que iteramos o bien simplemente por cada iteracion poner que renderice todo lo que queramos mostrar de esa review
// es más fácil lo segundo pero esta mejor hecho lo primero, puedes hacer lo segundo y cuando lo pilles pasarlo a lo primero sin problemo

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