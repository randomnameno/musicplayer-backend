const User = require('../Models/User');
const { verifyGoogleToken } = require('../Config/verifyToken');
const YoutubeMusicApi = require('youtube-music-api');

const addToLikedSongs = async (req, res) => {
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
      try {
        const data = req.body;

        // Creating new User
        const user = await User.getUserInfo(payload.email);

        // Adding song to user's liked song list.
        await user.addLikedSong(data.songId);
        res.json({ success: true, message: 'Added to Liked Songs' });
      } catch (error) {
        console.error('The error is in addToLikedSongs: ' + error);
        res.json({ success: false, message: error });
      }
    }
  }
};

const removeFormLikedSongs = async (req, res) => {
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
      try {
        const data = req.body;

        // Creating new User
        const user = await User.getUserInfo(payload.email);

        // Removing song from user's liked song list
        await user.removeLikedSong(data.songId);
        res.json({ success: true, message: 'Removed From Liked Songs' });
      } catch (error) {
        console.error('The error is in removeFromLikedSongs: ' + error);
        res.json({ success: false, message: error });
      }
    }
  }
};
const getLikedSongs = async (req, res) => {
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
      try {
        // Getting the user info
        const user = await User.getUserInfo(payload.email);

        // Using Youtube Music API to fetch song data from Youtube.
        const api = new YoutubeMusicApi();
        await api.initalize();

        const likedSongs = await Promise.all(
          user.likedSongs.map(async (item) => {
            let currSong = await api.search(item, 'song');
            currSong = currSong.content[0];
            return {
              song: currSong.name,
              artist: currSong.artist.name,
              thumbnail: currSong.thumbnails[1],
              streamAddress:
                'http://localhost:8000/api/stream/' + currSong.videoId,
              songId: currSong.videoId,
              isLiked: true,
            };
          })
        );

        res.json({ success: true, likedSongs: likedSongs.reverse() });
      } catch (error) {
        console.error('The error is in getLikedSongs: ' + error);
        res.json({ success: false, message: error.toString() });
      }
    }
  }
};

module.exports = {
  addToLikedSongs: addToLikedSongs,
  removeFormLikedSongs: removeFormLikedSongs,
  getLikedSongs: getLikedSongs,
};
