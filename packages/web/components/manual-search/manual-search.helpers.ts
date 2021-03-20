import dayjs from 'dayjs';

import { formatNumber } from '../../utils/format-number';

import {
  MissingTvEpisodesFragment,
  MissingMoviesFragment,
  EnrichedMovie,
  EnrichedTvEpisode,
  TmdbFormattedTvSeason,
  TmdbSearchResult,
} from '../../utils/graphql';

export type Media =
  | MissingTvEpisodesFragment
  | MissingMoviesFragment
  | EnrichedMovie
  | EnrichedTvEpisode
  | (TmdbFormattedTvSeason & { tvShowTitle: string; tvShowTMDBId: number })
  | (TmdbSearchResult & { movieTitle: string; movieTMDBId: number });

export function getDefaultSearchQuery(media: Media) {
  if (media.__typename === 'EnrichedTVEpisode') {
    const seasonNb = formatNumber(media.seasonNumber!);
    const episodeNb = formatNumber(media.episodeNumber!);
    return `${media.tvShow?.title} S${seasonNb}E${episodeNb}`;
  }

  if (media.__typename === 'EnrichedMovie') {
    const year = dayjs(media.releaseDate).format('YYYY');
    return `${media.title} ${year}`;
  }

  if (media.__typename === 'TMDBFormattedTVSeason') {
    const seasonNb = formatNumber(media.seasonNumber!);
    return `${media.tvShowTitle} S${seasonNb}`;
  }

  if (media.__typename === 'TMDBSearchResult') {
    if (media.releaseDate) {
      const year = dayjs(media.releaseDate).format('YYYY');
      return `${media.title} ${year}`;
    }
    return media.title;
  }

  return '';
}
