const ytdl = require('ytdl-core');
const YoutubeMusicApi = require('youtube-music-api');

// Using Youtube Music API to fetch song data from Youtube.
const api = new YoutubeMusicApi();
api.initalize();

const getSongSuggestions = async (req, res) => {
  // TODO: Receive and validate the token using Authorization header.
  // TODO: Validate the songId.

  const songId = req.params.songId;
  const link = `https://www.youtube.com/watch?v=${songId}`;

  try {
    const songInfo = await ytdl.getInfo(link);
    const related = songInfo.related_videos;

    const suggestions = await Promise.all(
      related.map(async (item) => {
        let currSong = await api.search(item.title, 'song');
        currSong = currSong.content[0];
        return {
          song: currSong.name,
          artist: currSong.artist.name,
          thumbnail: currSong.thumbnails[1],
          streamAddress: 'http://localhost:8000/api/stream/' + currSong.videoId,
          songId: currSong.videoId,
        };
      })
    );
    res.json({ success: true, suggestions: songInfo });
  } catch (error) {
    console.error('This error is in getSongSuggestion. Error:  ' + error);
    res.json({ success: false });
  }
};

const streamSong = (req, res) => {
  // TODO: Receive and validate the token using Authorization header.
  // TODO: Validate the songId.

  const songId = req.params.songId;
  const link = `https://www.youtube.com/watch?v=${songId}`;

  try {
    // Setting Headers
    res.set({
      Connection: 'keep-alive',
      'Accept-Ranges': 'bytes',
      'Content-Type': 'audio/mpeg',
    });

    // Getting ReadableStream using the video link from Youtube.
    const stream = ytdl(link, {
      filter: 'audioonly',
      quality: 'highest',
    });

    // Setting Content-Lenght header on response event of the ReadableStream object. This header is required to send partial data.
    stream.on('response', (response) => {
      res.setHeader('Content-length', response.headers['content-length']);
    });

    // Sending the stream.
    stream.pipe(res);
  } catch (error) {
    console.error('This error is in streamSong function. Error : ' + error);
  }
};

const getSearchResults = async (req, res) => {
  // TODO: Receive and validate the token using Authorization header.
  const searchString = req.query.q;

  if (!searchString) {
    res.json({ success: false, message: 'Search string is not available.' });
  }

  try {
    const result = await api.search(searchString, 'song');
    const searchResults = result.content.map((item) => {
      return {
        song: item.name,
        artist: item.artist.name,
        thumbnail: item.thumbnails[1],
        streamAddress: 'http://localhost:8000/api/stream/' + item.videoId,
        songId: item.videoId,
      };
    });

    res.json({ success: true, searchResults: searchResults });
  } catch (error) {
    console.error('This error is in getSearchResults. Error: ' + error);
    res.json({ success: false });
  }
};

module.exports = {
  getSongSuggestions: getSongSuggestions,
  streamSong: streamSong,
  getSearchResults: getSearchResults,
};
