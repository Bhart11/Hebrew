import React from 'react';
import {
  Box,
  Typography,
  Slider,
  IconButton,
  CircularProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';

interface MockAudioPlayerProps {
  title: string;
  duration: number;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

export const MockAudioPlayer: React.FC<MockAudioPlayerProps> = ({
  title,
  duration,
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [volume, setVolume] = React.useState(1);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleTimeUpdate = (event: any, newValue: number | number[]) => {
    setCurrentTime(newValue as number);
    onSeek(newValue as number);
  };

  const handleVolumeChange = (event: any, newValue: number | number[]) => {
    setVolume(newValue as number);
    onVolumeChange(newValue as number);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Slider
          value={currentTime}
          onChange={handleTimeUpdate}
          min={0}
          max={duration}
          step={0.1}
          sx={{ width: '100%', ml: 2 }}
        />
        <Typography variant="body2" sx={{ ml: 2 }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton>
          <SkipNextIcon />
        </IconButton>
        <Box sx={{ ml: 2 }}>
          <Typography variant="body2">Speed:</Typography>
          <Slider
            value={1.0}
            min={0.5}
            max={2.0}
            step={0.1}
            sx={{ width: 100 }}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography variant="body2">Volume:</Typography>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.1}
            sx={{ width: 100 }}
          />
        </Box>
      </Box>
    </Box>
  );
};
