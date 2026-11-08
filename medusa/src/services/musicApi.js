// src/services/musicApi.js

// Fetch global top charts from Deezer
export const fetchTopCharts = async () => {
  try {
    const response = await fetch('https://api.deezer.com/chart/0/tracks');
    const data = await response.json();
    
    if (!data.data) return [];

    return data.data.map((track) => ({
      id: track.id.toString(),
      title: track.title,
      artist: track.artist.name,
      albumCover: track.album?.cover_medium || track.artist.picture_medium,
      audioUrl: track.preview, // 30-second preview URL
      duration: track.duration || 30,
    }));
  } catch (error) {
    console.error('Error fetching Deezer top charts:', error);
    return [];
  }
};

// Fetch music by genre/search query from Deezer
export const fetchMusicByGenre = async (query) => {
  try {
    const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.data) return [];

    return data.data.map((track) => ({
      id: track.id.toString(),
      title: track.title,
      artist: track.artist.name,
      albumCover: track.album?.cover_medium || track.artist.picture_medium,
      audioUrl: track.preview,
      duration: track.duration || 30,
    }));
  } catch (error) {
    console.error(`Error fetching Deezer genre ${query}:`, error);
    return [];
  }
};

// Fetch top artists stats for ListeningStatsScreen
export const fetchTopArtistsStats = async () => {
  try {
    const response = await fetch('https://api.deezer.com/chart/0/artists');
    const data = await response.json();

    if (!data.data) return [];

    return data.data.slice(0, 4).map((artist, index) => ({
      id: artist.id.toString(),
      name: artist.name,
      plays: `${Math.floor(Math.random() * 200) + 150} plays`,
      subtitle: `Top Artist • 2026`,
      image: artist.picture_medium || artist.picture_big,
    }));
  } catch (error) {
    console.error('Error fetching top artists stats:', error);
    return [];
  }
};