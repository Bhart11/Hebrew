import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';

// Components (to be created)
import Layout from './components/Layout';
import PodcastList from './features/podcasts/PodcastList';
import EpisodeView from './features/podcasts/EpisodeView';
import Vocabulary from './features/vocabulary/Vocabulary';
import Chat from './features/chat/Chat';
import Progress from './features/progress/Progress';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<PodcastList />} />
              <Route path="/episode/:id" element={<EpisodeView />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
