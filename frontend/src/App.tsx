import React from 'react';
import { useMemo, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { getCustomDarkTheme, getCustomLightTheme } from './utils/theme';
import { ThemeProvider } from '@mui/material';
import { AppContext, ThemeModeContext } from './contexts';
import AppClient from './clients';
import { Layout } from './components/Layout';
import { Home } from './components/Pages/Home';
import { Game } from './components/Pages/PlayGame';
import { About } from './components/Pages/About/about';
import { Leaderboard } from './components/Pages/Social/Leaderboard';

function App() {
  const appClient = new AppClient();
  const [mode, setMode] = useState(false); // Create a variable so we can define the mode on being either light or dark
  
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((mode) => (mode ? false : true));
      },
    }),
    []
  );
  const theme = (mode ? getCustomDarkTheme() : getCustomLightTheme());

  return (
    <AppContext.Provider value={appClient}>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={(appClient.user.isLoggedIn ? <Layout children={<Home/>} /> : <Home/>)} />
              <Route path="/home" element={<Layout children={<Home/>} /> } />
              <Route path="/game" element={<Layout children={<Game/>} /> } />
              <Route path="/game/waitingroom" element={<Layout children={<Home/>} /> } />
              <Route path="/game/easy:ID" element={<Layout children={<Home/>} /> } />
              <Route path="/game/medium:ID" element={<Layout children={<Home/>} /> } />
              <Route path="/game/hard:ID" element={<Layout children={<Home/>} /> } />
              <Route path="/game/spectate" element={<Layout children={<Home/>} /> } />  
              <Route path="/social/chat" element={<Layout children={<Home/>} /> } />
              <Route path="/social/leaderboard" element={<Layout children={<Leaderboard/>} /> } />
              <Route path="/user/profile" element={<Layout children={<Home/>} /> } />
              <Route path="/user/settings" element={<Layout children={<Home/>} /> } />
              <Route path="/user/twofactor" element={<Layout children={<Home/>} /> } />
              <Route path="/about" element={<Layout children={<About/>} /> } />
            </Routes>
          </Router>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </AppContext.Provider>
  )
}

export default App;
