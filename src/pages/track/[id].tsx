/* eslint-disable @next/next/no-img-element */
import { AuthLoading } from "@/components/AuthLoading";
import { TrackCard } from "@/components/TrackCard";
import { Unathenticated } from "@/components/Unathenticated";
import Navbar from "@/components/navbar";
import { SessionData } from "@/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { PlayBackCard } from "../../components/PlayBackTopCard";
import { useLocalStorage } from "usehooks-ts";
import { AllTimeVsCurrent } from "@/components/AllTimeVsCurrentToggle";
import { motion } from "framer-motion";
import { dummyData } from "@/lib/dummyData";

const Track = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, status } = useSession();
  let session: SessionData = data as SessionData;
  const [recommendedTracks, setRecommendedTracks] = useState<
    SpotifyApi.RecommendationTrackObject[]
  >(dummyData as unknown as SpotifyApi.RecommendationTrackObject[]);

  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull>(dummyData[0]);

  const [checked, setChecked] = useLocalStorage(
    "Personalized Recommended",
    true
  );

  const [isShort_term, setIsShort_term] = useLocalStorage("time-period", true);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (!session) return;
    const spotifyApi = new SpotifyWebApi({
      accessToken: session.user.accessToken,
    });

    spotifyApi.getTrack(id as string).then((data) => {
      setTrack(data.body);
    });

    spotifyApi
      .getMyTopTracks({
        limit: checked ? 4 : 0,
        time_range: isShort_term ? "short_term" : "long_term",
      })
      .then(function (data) {
        let topTracks = data.body.items;
        let trackIds = topTracks.map((track) => {
          return track.id;
        });
        trackIds.unshift(id as string);
        spotifyApi
          .getRecommendations({
            limit: 50,
            seed_tracks: trackIds.join(","),
          })
          .then(function (data) {
            console.log(data.body.tracks);

            return setRecommendedTracks(data.body.tracks);
          });
      });
  }, [id, session, checked, isShort_term]);

  useEffect(() => {
    setRecommendedTracks(
      dummyData as unknown as SpotifyApi.RecommendationTrackObject[]
    );
  }, [checked, isShort_term]);

  if (status === "loading") {
    return <AuthLoading></AuthLoading>;
  }

  if (status === "unauthenticated") {
    return <Unathenticated></Unathenticated>;
  }

  if (
    status === "authenticated" &&
    session.user.accessTokenExpires < Date.now()
  ) {
    return <Unathenticated></Unathenticated>;
  }

  return (
    <>
      <Navbar imgSrc={session.user.image} />

      <main className="flex min-h-screen items-center justify-center flex-col">
        {track?.id && <PlayBackCard track={track}></PlayBackCard>}
        <motion.div>
          {track?.id && (
            <motion.div className="mt-4">
              <div className="form-control ">
                <label className="cursor-pointer label">
                  <span className="label-text">
                    <span className="text-lg mr-2">
                      Personalized Recommended
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={checked}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
            </motion.div>
          )}
          {checked && track?.id && (
            <AllTimeVsCurrent
              checked={isShort_term}
              setChecked={setIsShort_term}
            ></AllTimeVsCurrent>
          )}
        </motion.div>
        <div className="mb-16"></div>

        <div className="flex flex-wrap justify-center gap-7">
          {" "}
          {recommendedTracks.map((track, index) => {
            return (
              <TrackCard
                key={track.id}
                track={track as unknown as SpotifyApi.TrackObjectFull}
              ></TrackCard>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Track;
