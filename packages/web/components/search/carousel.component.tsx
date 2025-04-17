import React, { useContext, useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';

import {
  CarouselProvider,
  Slide,
  Slider,
  ButtonNext,
  CarouselContext,
  ButtonBack,
} from 'pure-react-carousel';

import {
  TmdbSearchResult,
  useGetLibraryMoviesQuery,
  useGetLibraryTvShowsQuery,
} from '../../utils/graphql';

import { TMDBCardComponent } from '../tmdb-card/tmdb-card.component';

export function CarouselComponent({
  results,
  type,
}: {
  results: TmdbSearchResult[];
  type: 'movie' | 'tvshow';
}) {
  const theme = useTheme();
  const { data: moviesLibrary } = useGetLibraryMoviesQuery();
  const { data: tvShowsLibrary } = useGetLibraryTvShowsQuery();
  const [visibleSlides, setVisibleSlides] = useState(5);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (windowWidth < 480) {
      setVisibleSlides(1);
    } else if (windowWidth < 768) {
      setVisibleSlides(2);
    } else if (windowWidth < 992) {
      setVisibleSlides(3);
    } else if (windowWidth < 1200) {
      setVisibleSlides(4);
    } else {
      setVisibleSlides(5);
    }
  }, [windowWidth]);

  const tmdbIds = [
    ...(moviesLibrary?.movies?.map(({ tmdbId }) => tmdbId) || []),
    ...(tvShowsLibrary?.tvShows?.map(({ tmdbId }) => tmdbId) || []),
  ];

  return (
    <div className="carrousel--container">
      <CarouselProvider
        naturalSlideHeight={windowWidth < 480 ? 255 : theme.tmdbCardHeight}
        naturalSlideWidth={windowWidth < 480 ? 170 : 220}
        totalSlides={results.length}
        dragEnabled={true}
        touchEnabled={true}
        visibleSlides={visibleSlides}
        step={visibleSlides}
      >
        <ResetCarouselSlideAndGoBack watch={results} />
        <Slider>
          {results.map((result, index) => (
            <Slide
              key={result.id}
              index={index}
              innerClassName="carrousel--slide"
            >
              <TMDBCardComponent
                key={result.id}
                type={type}
                result={result}
                inLibrary={tmdbIds.includes(result.tmdbId)}
              />
            </Slide>
          ))}
        </Slider>
        {results.length > visibleSlides && (
          <>
            <ButtonBack className="arrow-left">
              <FaChevronCircleLeft size={16} />
            </ButtonBack>
            <ButtonNext className="arrow-right">
              <FaChevronCircleRight size={16} />
            </ButtonNext>
          </>
        )}
      </CarouselProvider>
    </div>
  );
}

function ResetCarouselSlideAndGoBack({ watch }: { watch: any }) {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  useEffect(() => {
    if (carouselContext.state.currentSlide !== 0) {
      carouselContext.setStoreState({ currentSlide: 0 });
    }
  }, [carouselContext, watch]);

  if (currentSlide === 0) {
    return <noscript />;
  }

  return null;
}
