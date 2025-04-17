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
        
        <div
          className="poster"
          style={{
            backgroundImage: posterPath ? 
              `url(${getImageURL(`w500_and_h750_face${posterPath}`)})` : 
              'none'
          }}
        />
        <div className="overlay">
          <>
            <FolderOpenOutlined />
            <div className="action-label">View Details</div>
          </>
        </div>
        
        <RatingComponent rating={result.voteAverage * 10} />
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
