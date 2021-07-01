const ytdl = require('ytdl-core');
const YoutubeMusicApi = require('youtube-music-api');
const User = require('../Models/User');
const { verifyGoogleToken } = require('../Config/verifyToken');

// Using Youtube Music API to fetch song data from Youtube.
const api = new YoutubeMusicApi();
api.initalize();

const getSongSuggestions = async (req, res) => {
  // Getting the token.
  if (!req.headers['authorization']) {
    // If Authorization header is not found then sending back the response.
    res.json({
      success: false,
      message: 'Authorization header is not present.',
    });
  } else {
    const token = req.headers['authorization'].split(' ')[1];

    // Verifying the token.
    const payload = await verifyGoogleToken(token);

    if (payload.email_verified) {
      // TODO: Validate the songId.

      const songId = req.params.songId;
      const link = `https://www.youtube.com/watch?v=${songId}`;

      try {
        const songInfo = await ytdl.getInfo(link);
        const related = songInfo.related_videos;

        const user = await User.getUserInfo(payload.email);

        let suggestions = await Promise.all(
          related.map(async (item) => {
            let currSong = await api.search(item.title, 'song');
            currSong = currSong.content[0];
            return {
              song: currSong.name,
              artist: currSong.artist.name,
              thumbnail: currSong.thumbnails[1],
              streamAddress:
                'http://localhost:8000/api/stream/' + currSong.videoId,
              songId: currSong.videoId,
              isLiked: user.likedSongs.includes(item.videoId),
            };
          })
        );

        const recommendedSongs = new Map();
        for (const song of suggestions) {
          // console.log(song);
          recommendedSongs.set(song.songId, song);
        }

        res.json({
          success: true,
          suggestions: [...recommendedSongs.values()],
        });
      } catch (error) {
        console.error('This error is in getSongSuggestion. Error:  ' + error);
        res.json({ success: false, message: error });
      }
    } else {
      res.json({ success: false, message: 'Token not verified.' });
    }
  }
};

const streamSong = async (req, res) => {
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
  // Getting the token.
  if (!req.headers['authorization']) {
    // If Authorization header is not found then sending back the response.
    res.json({
      success: false,
      message: 'Authorization header is not present.',
    });
  } else {
    const token = req.headers['authorization'].split(' ')[1];

    // Verifying the token.
    const payload = await verifyGoogleToken(token);

    if (payload.email_verified) {
      const searchString = req.query.q;

      if (!searchString) {
        res.json({
          success: false,
          message: 'Search string is not available.',
        });
      }

      const user = await User.getUserInfo(payload.email);
      console.log(user.email);

      try {
        const result = await api.search(searchString, 'song');
        const searchResults = result.content.map((item) => {
          return {
            song: item.name,
            artist: item.artist.name,
            thumbnail: item.thumbnails[0],
            streamAddress: 'http://localhost:8000/api/stream/' + item.videoId,
            songId: item.videoId,
            isLiked: user.likedSongs.includes(item.videoId),
          };
        });

        res.json({ success: true, searchResults: searchResults });
      } catch (error) {
        console.error('This error is in getSearchResults. Error: ' + error);
        res.json({ success: false });
      }
    }
  }
};

module.exports = {
  getSongSuggestions: getSongSuggestions,
  streamSong: streamSong,
  getSearchResults: getSearchResults,
};
