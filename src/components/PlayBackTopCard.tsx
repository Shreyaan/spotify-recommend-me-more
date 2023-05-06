import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { SessionData } from "..";
import { motion } from "framer-motion";
import { CiShare2 } from "react-icons/ci";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "react-toastify";

export function PlayBackCard(props: { track: SpotifyApi.TrackObjectFull }) {
  const [LikedSongs, setLikedSongs] = useState<SpotifyApi.SavedTrackObject[]>(
    []
  );

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { data, status } = useSession();
  let session: SessionData = data as SessionData;

  const [value, copy] = useCopyToClipboard();
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
        setLoading(false);
        return setLikedSongs(data.body.items);
      }).catch((err) => {
        toast.error("Error loading Liked Songs");
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [session]);

  useEffect(() => {
    //if track is in LikedSongs, set isLiked to true

    if (LikedSongs.length > 0) {
      for (let i = 0; i < LikedSongs.length; i++) {
        if (LikedSongs[i].track.id === props.track.id) {
          setIsLiked(true);

          break;
        }
      }
    } else {
      setIsLiked(false);
    }
  }, [LikedSongs, props.track]);

  if (props.track.name == "loading") {
    return (
      <motion.div
        className="card lg:card-side bg-base-100 shadow-xl animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <figure className="rounded-none">
          <div>
            <div className="h-[320px] w-[320px] bg-slate-300  rounded-none"></div>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title h-6 bg-slate-300 rounded w-72"> </h2>
          <p className="h-2 bg-slate-300 rounded  "> </p>

          <div className="card-actions justify-end">
            <p className="h-2 bg-slate-300 rounded"></p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="card lg:card-side bg-base-100 shadow-xl  rounded-s-none ">
      <figure className="rounded-none">
        {props.track?.album.images[0]?.url && (
          <Image
            src={props.track?.album.images[0]?.url}
            alt={props.track?.name}
            width={200}
            height={200}
            className="rounded-none h-[320px] w-[320px] bg-slate-400"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.track?.name}</h2>
        <p>{props.track?.artists[0].name}</p>

        <p>
          {props.track?.preview_url && (
            <>
              <audio controls key={props.track.id}>
                <source
                  src={props.track.preview_url}
                  key={props.track.preview_url}
                  type="audio/mp3"
                />
                Your browser does not support the audio tag.
                {props.track.preview_url}
              </audio>
            </>
          )}
        </p>

        <div className="card-actions justify-end">
          <div>
            {isLiked ? (
              <button
                className="btn btn-ghost "
                onClick={() => {
                  if (loading) return;
                  const spotifyApi = new SpotifyWebApi({
                    accessToken: session.user.accessToken,
                  });
                  spotifyApi
                    .removeFromMySavedTracks([props.track.id])
                    .then(() => {
                      setIsLiked(false);
                    });
                }}
              >
                <Image src={"/like/1.png"} alt={""} width={40} height={40} />
              </button>
            ) : (
              <button
                className={`btn btn-ghost ${
                  loading ? "animate-ping disabled opacity-20" : ""
                }`}
                onClick={() => {
                  if (loading) return;
                  const spotifyApi = new SpotifyWebApi({
                    accessToken: session.user.accessToken,
                  });
                  spotifyApi.addToMySavedTracks([props.track.id]).then(() => {
                    setIsLiked(true);
                  }).catch((err) => {
                    toast.error("Error liking song");
                  });
                }}
              >
                <Image src={"/like/2.png"} alt={""} width={40} height={40} />
              </button>
            )}
          </div>
          <div className="">
            {" "}
            <button
              className="btn btn-ghost"
              onClick={() => {
                copy(props.track.external_urls.spotify);
                toast.info("Copied to clipboard");
              }}
            >
              <CiShare2 fontSize={28} />
            </button>
          </div>
          
          <a href={props.track.external_urls.spotify} className="btn btn-primary" target="_blank">
            Listen on spotify
          </a>
        </div>
      </div>
    </motion.div>
  );
}
