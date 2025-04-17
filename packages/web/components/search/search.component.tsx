import React, { useState, useEffect, useRef } from 'react';
import { Skeleton, Empty } from 'antd';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { debounce, throttle } from 'throttle-debounce';

import { useGetPopularQuery, useSearchLazyQuery, TmdbSearchResult } from '../../utils/graphql';

import { TMDBCardComponent } from '../tmdb-card/tmdb-card.component';
import { SearchStyles, Wrapper, UnifiedResultsGrid } from './search.styles';

export function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const resultsEndRef = useRef<HTMLDivElement>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const popularQuery = useGetPopularQuery();
  const [search, { data, loading }] = useSearchLazyQuery();

  const { current: debouncedSearch } = useRef(debounce(500, search));
  const { current: throttledSearch } = useRef(throttle(500, search));

  const displaySearchResults = searchQuery && searchQuery.trim();
  const moviesSearchResults = data?.results?.movies || [];
  const tvShowSearchResults = data?.results?.tvShows || [];
  const hasNoSearchResults =
    moviesSearchResults.length === 0 && tvShowSearchResults.length === 0;

  // Combine and sort results by popularity/rating for unified display
  const getUnifiedResults = () => {
    if (displaySearchResults) {
      // Combine search results and sort by vote average
      const combined = [
        ...moviesSearchResults.map(item => ({ ...item, mediaType: 'movie' })),
        ...tvShowSearchResults.map(item => ({ ...item, mediaType: 'tvshow' }))
      ].sort((a, b) => b.voteAverage - a.voteAverage);
      return combined;
    } else {
      // Interleave popular movies and shows for better diversity in results
      const movies = popularQuery.data?.results?.movies || [];
      const tvShows = popularQuery.data?.results?.tvShows || [];
      const combined = [];
      const maxLength = Math.max(movies.length, tvShows.length);

      for (let i = 0; i < maxLength; i++) {
        if (movies[i]) combined.push({ ...movies[i], mediaType: 'movie' });
        if (tvShows[i]) combined.push({ ...tvShows[i], mediaType: 'tvshow' });
      }

      return combined;
    }
  };

  const unifiedResults = getUnifiedResults();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search({ variables: { query: searchQuery } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);

    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Only trigger search if there's actual input
    if (newValue && newValue.trim()) {
      // Add a delay before searching to wait until user finishes typing
      const newTimeout = setTimeout(() => {
        if (newValue.length < 5) {
          throttledSearch({ variables: { query: newValue } });
        } else {
          debouncedSearch({ variables: { query: newValue } });
        }
        // Reset scroll position when searching
        window.scrollTo(0, 0);
        setPage(1);
      }, 700); // 700ms delay

      setSearchTimeout(newTimeout);
    }
  };

  // Simple infinite scroll implementation
  useEffect(() => {
    function handleScroll() {
      if (resultsEndRef.current) {
        const rect = resultsEndRef.current.getBoundingClientRect();
        if (rect.bottom <= window.innerHeight + 100 && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Load popular items when no search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      popularQuery.refetch();
    }
  }, [searchQuery, popularQuery]);

  return (
    <SearchStyles>
      <div className="search-bar--container">
        <Wrapper>
          <div className="search-bar--title">What are we watching next?</div>
          <div className="search-bar--subtitle">Search for movies and TV shows...</div>
          <form onSubmit={handleSearch}>
            <div className="search-bar--input-container">
              <input
                type="text"
                className="search-bar--input"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search titles, genres, actors..."
              />
              <button type="submit" className="search-bar--input-submit" aria-label="Search">
                {loading ? <LoadingOutlined /> : <SearchOutlined />}
              </button>
            </div>
          </form>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="search-results--container">
          <Skeleton
            active={true}
            loading={popularQuery.loading || (hasNoSearchResults && loading)}
          >
            {displaySearchResults && hasNoSearchResults ? (
              <Empty description="No results... 😔" />
            ) : (
              <>
                <div className="search-results--category">
                  {displaySearchResults ? 'Search Results' : 'Popular Titles'}
                </div>

                <UnifiedResultsGrid>
                  {unifiedResults.slice(0, page * 20).map((result: any) => (
                    <div key={`${result.mediaType}-${result.id}`} className="result-item">
                      <TMDBCardComponent
                        type={result.mediaType}
                        result={result}
                        inLibrary={false}
                      />
                    </div>
                  ))}
                </UnifiedResultsGrid>

                <div ref={resultsEndRef} className="results-end-marker"></div>

                {loading && (
                  <div className="loading-more">
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                    <span>Loading more results...</span>
                  </div>
                )}
              </>
            )}
          </Skeleton>
        </div>
      </Wrapper>
    </SearchStyles>
  );
}
