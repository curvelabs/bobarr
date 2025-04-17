import React, { useState } from 'react';
import { FolderOpenOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import {
  TmdbSearchResult,
  EnrichedMovie,
  EnrichedTvShow,
} from '../../utils/graphql';

import { getImageURL } from '../../utils/get-cached-image-url';

import { TVShowSeasonsModalComponent } from '../tvshow-details/tvshow-details.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { RatingComponent } from '../rating/rating.component';

import { TMDBCardStyles } from './tmdb-card.styles';

interface TMDBCardComponentProps {
  type: 'tvshow' | 'movie';
  result: TmdbSearchResult | EnrichedMovie | EnrichedTvShow;
  inLibrary?: boolean;
}

export function TMDBCardComponent(props: TMDBCardComponentProps) {
  const { result, type, inLibrary } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const posterPath = result.posterPath || '';
  const hasHighRating = result.voteAverage >= 7.5;
  const hasLowRating = result.voteAverage <= 4.5;
  const showRating = hasHighRating || hasLowRating;

  return (
    <TMDBCardStyles>
      {/* display season picker modal when it's tvshow */}
      {type === 'tvshow' && isModalOpen && (
        <TVShowSeasonsModalComponent
          tvShow={result as TmdbSearchResult}
          visible={isModalOpen}
          inLibrary={inLibrary}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}

      {/* display movie details */}
      {type === 'movie' && isModalOpen && (
        <MovieDetailsComponent
          movie={result as TmdbSearchResult}
          visible={isModalOpen}
          inLibrary={inLibrary}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="poster--container" onClick={() => setIsModalOpen(true)}>
        {/* Media type badge */}
        <div className="media-type-badge">
          {type === 'movie' ? 'Movie' : 'TV'}
        </div>

        {/* Use actual img instead of background-image for better compatibility */}
        <img
          src={posterPath ? getImageURL(`w500_and_h750_face${posterPath}`) : '/assets/poster-placeholder.png'}
          alt={result.title}
          className="poster-img"
        />

        <div className="overlay">
          <FolderOpenOutlined />
          <div className="action-label">View Details</div>
        </div>

        {/* Only show rating badge for exceptional ratings */}
        {showRating && (
          <div className={`rating-badge ${hasHighRating ? 'high-rating' : 'low-rating'}`}>
            {Math.round(result.voteAverage * 10)}%
          </div>
        )}
      </div>

      <div className="name">{result.title}</div>
      {result.releaseDate && (
        <div className="date">
          {dayjs(result.releaseDate).format('DD MMM YYYY')}
        </div>
      )}
    </TMDBCardStyles>
  );
}
