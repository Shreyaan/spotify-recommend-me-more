/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export function TrackCard({ track }: { track: SpotifyApi.TrackObjectFull }) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  if (track.name === "loading") {
    return (
      <motion.a
        className="card card-compact w-72 bg-base-100 shadow-xl cursor-pointer animate-pulse"
        href={`/track/${track.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
      >
        <figure className="rounded-none">
          <div className="h-72 w-72 bg-slate-300  rounded-none"></div>
        </figure>
        <div className="card-body">
          <h2 className="card-title h-2 bg-slate-300 rounded"> </h2>
          <p className="h-2 bg-slate-300 rounded"></p>
        </div>
      </motion.a>
    );
  }

  let imageURL;
  if (track.album.images[1]?.url) {
    imageURL = track.album.images[1]?.url;
  } else if (track.album.images[0]?.url) {
    imageURL = track.album.images[0]?.url;
  } else {
    imageURL = "/no-image.png";
  }

  return (
    <motion.a
      className="card card-compact w-72 bg-base-100 shadow-xl cursor-pointer"
      href={`/track/${track.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ ease: "easeIn", duration: 0.5 }}
    >
      <figure className="rounded-none relative">
        {track.album.images[2]?.url && !imageLoaded && (
          <img
            src={track.album.images[2]?.url }
            alt={track.name}
            className="rounded-none h-72 w-72 bg-slate-300 absolute top-0 right-0 blur-md"
            width={300}
            height={300}
            loading="lazy"
          ></img>
        )}
        <img
          src={imageURL}
          alt={track.name}
          className="rounded-none h-72 w-72 bg-slate-300"
          width={300}
          height={300}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"> {track.name}</h2>
        <p>{track.artists[0].name}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </motion.a>
  );
}
