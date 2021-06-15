const ytdl = require('ytdl-core');
const YoutubeMusicApi = require('youtube-music-api');

exports.getMusicHandler = (musicRouter) => {
  const getMusic = (req, res) => {
    const songs = [
      'real slim shady eminem',
      'Pray For Me weeknd',
      'everybody dies jcole',
      'a lot 21savage',
      'The Next Episode dre',
      'Namastute seedhe maut',
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

    const api = new YoutubeMusicApi();
    api.initalize().then((info) => {
      // api.getSearchSuggestions(song).then((result) => {
      //   console.log(result);
      // });

      api.search(song).then((result) => {
        const currSong = result.content.filter(
          (song) => song.type === 'song'
        )[0];

        const link = 'https://www.youtube.com/watch?v=' + currSong.videoId;

        musicRouter.route(`/${currSong.videoId}`).get((req, res) => {
          ytdl(link, { filter: 'audioonly', quality: 'lowest' }).pipe(res);
        });
        res.json({
          song: currSong.name,
          artist: currSong.artist.name,
          thumbnail: currSong.thumbnails[1],
          streamAddress: 'http://localhost:8000/music/' + currSong.videoId,
        });
      });
    });
  };

  return getMusic;
};

// https://www.youtube.com/watch?v=-5slZHLSnow
// https://www.youtube.com/watch?v=eJO5HU_7_1w
// https://www.youtube.com/watch?v=XR7Ev14vUh8

// Pray For Me  kendrik lamar The Weeknd

// everybody dies jcole
