import React from 'react';

import { RatingStyles } from './rating.styles';

interface RatingProps {
  rating: number;
}

export function RatingComponent({ rating }: RatingProps) {
  // Round to nearest whole number for cleaner display
  const roundedRating = Math.round(rating);

  return (
    <RatingStyles className="vote--container" rating={rating}>
      <div className="vote" />
      <div className="percent">{roundedRating}%</div>
    </RatingStyles>
  );
}
