import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPodcastEpisodes } from '../../store/slices/podcastSlice';
import { PodcastEpisode } from '../../types';

const difficultyOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const lengthOptions = [
  { value: 'short', label: 'Short (5-10 min)' },
  { value: 'medium', label: 'Medium (10-20 min)' },
  { value: 'long', label: 'Long (20+ min)' },
];

export const PodcastList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { episodes, loading, error } = useAppSelector((state) => state.podcasts);

  const [difficulty, setDifficulty] = React.useState('beginner');
  const [length, setLength] = React.useState('short');

  useEffect(() => {
    const fetchEpisodes = async () => {
      await dispatch(
        fetchPodcastEpisodes({
          count: 5,
          difficulty,
          length,
        })
      );
    };
    fetchEpisodes();
  }, [dispatch, difficulty, length]);

  const handleLoadMore = () => {
    dispatch(
      fetchPodcastEpisodes({
        count: 5,
        difficulty,
        length,
      })
    );
  };

  if (loading && episodes.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box mb={4}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            label="Difficulty"
          >
            {difficultyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Length</InputLabel>
          <Select
            value={length}
            onChange={(e) => setLength(e.target.value as any)}
            label="Length"
          >
            {lengthOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {episodes.map((episode) => (
          <Grid item xs={12} sm={6} md={4} key={episode.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={`/assets/level-${episode.level}.jpg`}
                alt={episode.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {episode.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Level {episode.level} • {difficultyOptions.find(d => d.value === episode.difficulty)?.label}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {episode.vocabulary.length} new words
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  href={`/episode/${episode.id}`}
                >
                  Listen Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="outlined" onClick={handleLoadMore}>
          Load More
        </Button>
      </Box>
    </Box>
  );
};
