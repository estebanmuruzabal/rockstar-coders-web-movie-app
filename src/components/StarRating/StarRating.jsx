import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const setRatingAndFilterValues = (ratingValue) => {
    setRating(ratingValue);
    props.setRatingFilter(ratingValue);
  };

  return (
      <div className="star-rating-container">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRatingAndFilterValues(ratingValue)}
              />
              <FaStar
                className="star-rating-container_star"
                color={ratingValue <= (hover || rating) ? 'yellow' : 'white' }
                size={20}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          )
        })}
      </div>
    );
}

export default StarRating;