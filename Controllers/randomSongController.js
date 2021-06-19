const ytdl = require('ytdl-core');
const YoutubeMusicApi = require('youtube-music-api');

const getRandomSongData = (req, res) => {
  // TODO: Create a JWT and send it to client with all the info to verify the request while streaming the randomly generated song.

  // Song List: To be repaced by a random song name generator code.
  const songs = [
    'real slim shady eminem',
    'Pray For Me weeknd',
    'everybody dies jcole',
    'In the End Linkin Park',
    'The Next Episode dre',
    'What Ive Done Linkin Park',
    'Lucid Dreams juiceWRLD',
    'Till I Collapse',
    'smack that ass akon',
    'my mistake witt lowry',
  ];

  function getRandomItem(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }

  const song = getRandomItem(songs);

  // Using Youtube Music API to fetch song data from Youtube.
  const api = new YoutubeMusicApi();
  api.initalize().then((info) => {
    // Searching the song and filtering the results to obtain only songs and fetching the first song.
    api.search(song, 'song').then((result) => {
      const currSong = result.content[0];

      res.json({
        song: currSong.name,
        artist: currSong.artist.name,
        thumbnail: currSong.thumbnails[1],
        streamAddress: 'http://localhost:8000/api/random/' + currSong.videoId,
      });

      // res.json(currSong);
    });
  });
};

const streamRandomSong = (req, res) => {
  // TODO: Receive a JWT and get the data (videoID) from that token and verify it before sending stream.

  // Streaming the randomly generated song using the YTDL API by receiving the videoID in link.
  const link = `https://www.youtube.com/watch?v=${req.params.videoId}`;

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
    console.error(
      'This error is in streamRandonSong function. Error: ' + error
    );
  }
};

module.exports = {
  getRandomSongData: getRandomSongData,
  streamRandomSong: streamRandomSong,
};
