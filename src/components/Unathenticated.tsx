/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect } from "react";

export function Unathenticated() {
  //router.push("/login");
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
          alt="Next.js Logo"
          width={180}
          height={37}
        />
      </div>
    </main>
  );
}
