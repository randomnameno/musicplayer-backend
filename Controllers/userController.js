const User = require('../Models/User');

const addToLikedSongs = async (req, res) => {
  try {
    const data = req.body;

    // Creating new User
    const user = await User.getUserInfo(data.email);

    // Adding song to user's liked song list.
    await user.addLikedSong({ songId: data.songId, songName: data.songName });
    res.json({ success: true, message: 'Added to Liked Songs' });
  } catch (error) {
    console.error('The error is in addToLikedSongs: ' + error);
    res.json({ success: false, message: error });
  }
};

const removeFormLikedSongs = async (req, res) => {
  try {
    const data = req.body;

    // Creating new User
    const user = await User.getUserInfo(data.email);

    // Removing song from user's liked song list
    await user.removeLikedSong({
      sondId: data.songId,
      songName: data.songName,
    });
    res.json({ success: true, message: 'Removed From Liked Songs' });
  } catch (error) {
    console.error('The error is in removeFromLikedSongs: ' + error);
    res.json({ success: false, message: error });
  }
};

module.exports = {
  addToLikedSongs: addToLikedSongs,
  removeFormLikedSongs: removeFormLikedSongs,
};
