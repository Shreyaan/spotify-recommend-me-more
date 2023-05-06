import { SessionData } from "..";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import { TrackCard } from "./TrackCard";
import { useLocalStorage } from "usehooks-ts";
import { AllTimeVsCurrent } from "./AllTimeVsCurrentToggle";
import { likedSongDummy } from "@/lib/dummyData";
import { toast } from "react-toastify";

export function LikedSongs({ session }: { session: SessionData }) {
  const [LikedSongs, setLikedSongs] =
    useState<SpotifyApi.SavedTrackObject[]>(likedSongDummy);
  const [checked, setChecked] = useLocalStorage("time-period", true);

  useEffect(() => {
    if (!session) return;
    const spotifyApi = new SpotifyWebApi({
      accessToken: session.user.accessToken,
    });
    spotifyApi
      .getMySavedTracks({
        limit: 50,
      })
      .then(function (data) {
        return setLikedSongs(data.body.items);
      }).catch((err) => {
        toast.error("Error fetching liked songs. Please try again later.")
      })
  }, [checked, session]);

  return (
    <div className="">
      <h1 className="text-center mb-6 text-lg font-semibold  lg:text-xl sm:px-16 xl:px-48">
        Your Liked Songs
      </h1>
      <div className="opacity-0">
        <AllTimeVsCurrent
          checked={checked}
          setChecked={setChecked}
        ></AllTimeVsCurrent>
      </div>
      <div className="flex flex-wrap justify-center gap-7">
        {LikedSongs.map((track, index) => {
          return <TrackCard key={track.track.id} track={track.track}></TrackCard>;
        })}
      </div>
    </div>
  );
}
