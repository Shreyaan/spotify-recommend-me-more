import { nanoid } from 'nanoid'

 const dummyData: SpotifyApi.TrackObjectFull[] = []

for (let i = 0; i < 49; i++) {
  
    dummyData.push({
        album: {
            album_type: "album",
            artists: [
                {
                    external_urls: {
                        spotify: "https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d",
                    },
                    href: "https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d",
                    id: "1dfeR4HaWDbWqFHLkxsg1d",
                    name: "Queen",
                    type: "artist",
                    uri: "spotify:artist:1dfeR4HaWDbWqFHLkxsg1d",
                },
            ],

            href: "https://api.spotify.com/v1/albums/6i6folBtxKV28WX3msQ4FE",
            id: "6i6folBtxKV28WX3msQ4FE",
            images: [
                {
                    height: 640,
                    url: "https://i.scdn.co/image/ab67616d0000b273e3b5b6b5b2b9b6b5b2b9b6b5",
                    width: 640,
                },
                {
                    height: 300,
                    url: "https://i.scdn.co/image/ab67616d00001e02e3b5b6b5b2b9b6b5b2b9b6b5",
                    width: 300,
                },
            ],
            name: "",
            release_date: "",
            release_date_precision: "month",
            type: "album",
            total_tracks: 0,
            external_urls: {    
                spotify: "https://open.spotify.com/album/6i6folBtxKV28WX3msQ4FE",
            },
            uri: ""
        },
        artists: [],
        available_markets: [],
        disc_number: 1,
        duration_ms: 185733,
        explicit: false,
        external_ids: {
            isrc: "GBUM71029604",
        },
        external_urls: {
            spotify: "https://open.spotify.com/track/3Z02hBLubJxuFJfhacLSDc",
        },
        href: "https://api.spotify.com/v1/tracks/3Z02hBLubJxuFJfhacLSDc",
        id: nanoid(),
        is_local: false,
        name: "loading",
        popularity: 0,
        preview_url: null,
        track_number: 7,
        type: "track",
        uri: "spotify:track:3Z02hBLubJxuFJfhacLSDc",
    })

}
const likedSongDummy :SpotifyApi.SavedTrackObject[] = []

for (let i = 0; i < 49; i++) {

    likedSongDummy.push({
        added_at: "2021-05-05T16:00:00Z",
        track: dummyData[i]
    })
}
export  { dummyData, likedSongDummy }