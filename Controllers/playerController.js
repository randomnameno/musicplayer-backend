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

    // const suggestions = await Promise.all(
    //   related.map(async (item) => {
    //     let currSong = await api.search(item.title, 'song');
    //     currSong = currSong.content[0];
    //     return {
    //       song: currSong.name,
    //       artist: currSong.artist.name,
    //       thumbnail: currSong.thumbnails[1],
    //       streamAddress: 'http://localhost:8000/api/stream/' + currSong.videoId,
    //       songId: currSong.videoId,
    //     };
    //   })
    // );

    const tempVideoList = [
      {
        song: 'One More Light',
        artist: 'Linkin Park',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/VqiFkN_mFSYwv8sYWgLkBSOeZvVy8LJ2ceznhgTUJW8EsQ79wq1WElPsXQWYoagNSaB5Aus99FBABJ9d=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/H1LdQntDnFY',
        songId: 'H1LdQntDnFY',
      },
      {
        song: 'One More Light',
        artist: 'Linkin Park',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/khRDQQ3e1bY0rIvK2eLq4z2pkAh2NSgHoaPcactxpNsIA8GyH4KkqUIL_SPtzMifu0ZYzSYUbWp8a_g=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/bscuycf0zig',
        songId: 'bscuycf0zig',
      },
      {
        song: 'One More Light',
        artist: 'Dave Winkler',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/PJP2BFAbDG-CvNaL52uuw5z4l1b6-MM6mm9DS-ajCot8za-BPH2-mHx6kxwtADXyRsYDkI9rfqFGMx06=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/UWLq9ywKHn0',
        songId: 'UWLq9ywKHn0',
      },
      {
        song: 'One More Light',
        artist: "One Voice Children's Choir",
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/pgCnAIZTo17NPAwMx9xWrJ0XHQMbd95ZRJtkrv3hR3fzzPdBZghk55Uq65vJQKoIZK7soOzksap8UFFT=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/-GkXYzk5RLo',
        songId: '-GkXYzk5RLo',
      },
      {
        song: 'One More Light',
        artist: 'Iker Plan',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/lI8aRKRDTX99Gr6X7DVME2CiJXbypldRjeR9VjKfpSCukD_kIzhyZbKKV07wOjLWYV5JYw2jclO0uKL3=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/LqoWP_atbrA',
        songId: 'LqoWP_atbrA',
      },
      {
        song: 'One More Light (Steve Aoki Chester Forever Remix)',
        artist: 'Linkin Park',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/nzmU3KQQF__H888hXvVPR9Yj_fav-OucxM8_afbZyv-uEAc1kgSvNh83n9JPA8BiKI2M7X4t3gvG958=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/5WEWnAzbKm0',
        songId: '5WEWnAzbKm0',
      },
      {
        song: 'One More Light',
        artist: 'Jada Facer',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/45sxbzqSZ7X7BIWNZtiP9zv9BlBS_gtNhDzkLDBVyNOaE32v1yvMs8oQCwjmhzQqJe_7p5-H4L7wvg_b=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/nDKE3IdkJaM',
        songId: 'nDKE3IdkJaM',
      },
      {
        song: 'One More Light (Live)',
        artist: 'Linkin Park',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/oP0hnPNeYYFlcK4dr0L-FE3Gpf7aGhdM7Ik_Qt_nHtI4Q29gDyZB7mGZ46FLiNHEyO8wpov2j-e4GDo=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/0U2RtnQF_u8',
        songId: '0U2RtnQF_u8',
      },
      {
        song: 'The Room of Mine',
        artist: 'TN29',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/TBlXHvbQ1HDOuNc2m8m4T2HOnPs9ExcSojxl0hKNhbTCfAD_oTjV0Aoj5bI4DKUKM7Fgk6ksfpr6piz0=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/z7Zj9Fhgyvs',
        songId: 'z7Zj9Fhgyvs',
      },
      {
        song: 'One More Light',
        artist: 'Adina E',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/jl4E7cqrCTqDyxG19Yyb2XcCcSejr-iSsNsE8Zg_GPItZZYUx5Lv3ONf9wk1c2a5iXMC2_HWDuetyP6s=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/bKoF-MepzNY',
        songId: 'bKoF-MepzNY',
      },
      {
        song: 'One More Light',
        artist: 'Gwendal Le Teurnier',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/Q2Ob_h1_SL8W9aeXMn0EADy0oKe0FQETWrVE-_-RO7ODGL7CAYgKMnrlKw15QJLqvouTDmnvY101fr4=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/eRm2kgOmNN8',
        songId: 'eRm2kgOmNN8',
      },
      {
        song: 'One More Light',
        artist: 'Cutflower',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/rsIPMZOSAKJju1_B1aGAfrKjV3fLQqS5OvnpDM6cWQylUIkU0dHzAfOLufg1Ljn2sgbA1xy7lhJPBS8lYA=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/AWWnpCihwTo',
        songId: 'AWWnpCihwTo',
      },
      {
        song: 'one more light (tribute)',
        artist: 'Andy Rebel',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/jzZyI3VLnoygcGgXYm4-MmUjQbcf2JPKqdl0oQFyTWucu47_5NvzFxyGLpRMDOc9U9wlyN4wZVuXBjk=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/Gxmeu0Snr9g',
        songId: 'Gxmeu0Snr9g',
      },
      {
        song: 'One More Light (Originally Performed By Linkin Park)',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/tz_wEG7CoPlNGkhtuLAgNJW-NjXJyswq5GNsbOaZ0XADcuG7aHKYHBw23e3TFzCRIXFch4zXf_XoYQ87wA=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/HDZJN0PhTBA',
        songId: 'HDZJN0PhTBA',
      },
      {
        song: 'One More Light',
        artist: 'Julia Westlin',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/tAvhKaqDTw_LFuZ575R4-y0k5eki1o8qXe3VxyAJrMcccL0Ahr39ur-UCL5XdwePQCSYRz1_eEi5cj7_=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/39v3gBWa4UA',
        songId: '39v3gBWa4UA',
      },
      {
        song: 'One More Light',
        artist: 'DPSM',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/cT4Woo0AZdL_nX2px8Q_LflThttJdXheOZQrjNxynfx8S7dqNQmVMaEHIX8cE97cI9hgMEKDR4DftZro=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/Keb_7QMig7Y',
        songId: 'Keb_7QMig7Y',
      },
      {
        song: 'One More',
        artist: 'Isaiah Mathew',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/BAP7jdWhjBEWJwlVNm_7qmrUwkNxRuW2lYFAwoaVtDZJ5EO-m5J8HnMzgd71Vwrqw4qKfdlXfpTlIFfp=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/bwr1HJkNdmw',
        songId: 'bwr1HJkNdmw',
      },
      {
        song: 'One More Light',
        artist: 'Quantum Hearts',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/ZukiKlEwBG2Z8BWTgi9aY0ZVNiqmeNUW5AJGDGFcJ0JaDUFt4ymdgea45PdgPYtyRvz2IzNjLIQtlaGy=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/Yy8ndbm0smk',
        songId: 'Yy8ndbm0smk',
      },
      {
        song: 'One More Light',
        artist: 'Khalei',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/UBIMW_s4g29_5Hh-atuuWT-H8v0rS_RfImh67MYRHlxVVGGfkaJkxd9_vG3ymhEgXHJtUnlFp0uBP9fD3g=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/d37SRJ6f2Us',
        songId: 'd37SRJ6f2Us',
      },
      {
        song: 'The Room of Mine (Harmony Version)',
        artist: 'TN29',
        thumbnail: {
          url: 'https://lh3.googleusercontent.com/TBlXHvbQ1HDOuNc2m8m4T2HOnPs9ExcSojxl0hKNhbTCfAD_oTjV0Aoj5bI4DKUKM7Fgk6ksfpr6piz0=w120-h120-l90-rj',
          width: 120,
          height: 120,
        },
        streamAddress: 'http://localhost:8000/api/stream/Cl8Aa1hhp1A',
        songId: 'Cl8Aa1hhp1A',
      },
    ];

    res.json({ success: true, suggestions: tempVideoList });
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
