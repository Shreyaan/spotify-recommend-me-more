import { SessionData } from "..";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import { TrackCard } from "./TrackCard";
import { useLocalStorage } from "usehooks-ts";
import { AllTimeVsCurrent } from "./AllTimeVsCurrentToggle";
import {dummyData} from "@/lib/dummyData";
import { toast } from "react-toastify";

export function Top50({ session }: { session: SessionData }) {
  const [topTracks, setTopTracks] =
    useState<SpotifyApi.TrackObjectFull[]>(dummyData);

  const [checked, setChecked] = useLocalStorage("time-period", true);

  useEffect(() => {
    if (!session) return;
    const spotifyApi = new SpotifyWebApi({
      accessToken: session.user.accessToken,
    });
    spotifyApi
      .getMyTopTracks({
        limit: 50,
        time_range: checked ? "short_term" : "long_term",
      })
      .then(function (data) {
        return setTopTracks(data.body.items);
      }).catch((err) => {
       toast.error("Error fetching top tracks. Please try again later.")
      })
  }, [checked, session]);

  return (
    <div className="">
      <h1 className="text-center mb-6 text-lg font-semibold  lg:text-xl sm:px-16 xl:px-48">
        {checked ? "Your Top 50 Tracks (Last 4 Weeks)" : "Your Top 50 Tracks"}
      </h1>
      <AllTimeVsCurrent
        checked={checked}
        setChecked={setChecked}
      ></AllTimeVsCurrent>
      <div className="flex flex-wrap justify-center gap-7">
        {topTracks.map((track: SpotifyApi.TrackObjectFull, index) => {
          return <TrackCard key={track.id} track={track}></TrackCard>;
        })}
      </div>
    </div>
  );
}
