import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PodcastEpisode } from '../../types';

export const EpisodeView: React.FC = () => {
  const { id } = useParams();
  const { currentEpisode } = useAppSelector((state) => state.podcasts);
  const episode = currentEpisode || null;

  if (!episode) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{episode.title}</h1>
      <p>Level {episode.level} • {episode.vocabulary.length} new words</p>

      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Transcript</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{episode.transcript}</pre>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Vocabulary</h2>
        <ul>
          {episode.vocabulary.map((word) => (
            <li key={word.id}>
              <strong>{word.word}</strong> - {word.translation} ({word.partOfSpeech})
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Grammar Tips</h2>
        <ul>
          {episode.grammarTips?.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <Box p={3}>
      {episode ? (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {episode.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Level {episode.level} • {episode.vocabulary.length} new words
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <MockAudioPlayer
              title={episode.title}
              duration={episode.transcript.split('\n').length * 5}
              onPlay={() => console.log('Playing')}
              onPause={() => console.log('Paused')}
              onSeek={(time) => console.log('Seeking to:', time)}
              onVolumeChange={(volume) => console.log('Volume changed to:', volume)}
            />
          </Box>
          </Box>

          <Paper sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Transcript
            </Typography>
            <List>
              {transcriptItems.map((item, index) => (
                <>
                  <ListItem
                    key={index}
                    button
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = item.timestamp;
                        setIsPlaying(true);
                      }
                    }}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              New Vocabulary
            </Typography>
            <List>
              {episode.vocabulary.map((word) => (
                <ListItem key={word.id}>
                  <ListItemText
                    primary={word.word}
                    secondary={`${word.translation} (${word.partOfSpeech})`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
