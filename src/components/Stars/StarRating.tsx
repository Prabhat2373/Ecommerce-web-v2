import { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const StarRating = ({
  initialRating = 0,
  onChange,
  readonly = false,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);
  const handleMouseOver = (index: number) => {
    if (!readonly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readonly) {
      setRating(index);
      if (onChange) {
        onChange(index);
      }
    }
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const starsArray = Array.from({ length: 5 }, (_, index) => {
    const starIndex = index + 1;
    const isHovered = starIndex <= hoverRating;
    const isSelected = starIndex <= rating;

    let icon = <FaStar />;
    if (hasHalfStar && starIndex === Math.ceil(rating)) {
      icon = <FaStarHalfAlt />;
    }

    return (
      <span
        key={index}
        onMouseOver={() => handleMouseOver(starIndex)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(starIndex)}
        style={{ cursor: readonly ? 'default' : 'pointer' }}
      >
        {isSelected || isHovered ? icon : <FaStar style={{ opacity: 0.4 }} />}
      </span>
    );
  });

  return <div className="flex">{starsArray}</div>;
};

export default StarRating;
