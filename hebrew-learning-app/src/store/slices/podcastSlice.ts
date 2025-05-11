import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PodcastEpisode } from '../../../types';
import ContentGenerator from '../../../services/contentGenerator';
import TextToSpeech from '../../../services/textToSpeech';

import { mockEpisodes } from '../../data/mockEpisodes';

export const fetchPodcastEpisodes = createAsyncThunk(
  'podcasts/fetchEpisodes',
  async (options: {
    count: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topic?: string;
    length: 'short' | 'medium' | 'long';
  }) => {
    // Filter mock episodes based on difficulty
    const filteredEpisodes = mockEpisodes.filter(episode => 
      episode.difficulty === options.difficulty
    );

    // Return first 'count' episodes
    return filteredEpisodes.slice(0, options.count);
  }
);

const initialState = {
  episodes: [] as PodcastEpisode[],
  loading: false,
  error: null as string | null,
  currentEpisode: null as PodcastEpisode | null,
  playbackSpeed: 1.0,
};

const podcastSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setCurrentEpisode: (state, action) => {
      state.currentEpisode = action.payload;
    },
    setPlaybackSpeed: (state, action) => {
      state.playbackSpeed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcastEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPodcastEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload;
      })
      .addCase(fetchPodcastEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch episodes';
      });
  },
});

export const { setCurrentEpisode, setPlaybackSpeed } = podcastSlice.actions;
export default podcastSlice.reducer;
