const firestoreClient = require('../firestoreClient');

exports.storeLikedSongs = (req,res) => {
    const data = req.body;
    console.log(data);
    firestoreClient.addLiked(
        'users',
        {
           songName: data.songName
        },
        data.email
    );
    res.send('updated');
}