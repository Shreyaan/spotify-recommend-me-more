/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from "next-auth/react";
import { SessionData } from "..";
import Navbar from "@/components/navbar";
import { AuthLoading } from "../components/AuthLoading";
import { Unathenticated } from "../components/Unathenticated";
import { useRouter } from "next/router";
import { Top50 } from "../components/Top50";
import { LikedSongs } from "@/components/likedSongs";

export default function Home() {
  const router = useRouter();

  const { data, status } = useSession();
  let session: SessionData = data as SessionData;

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
        <div className="hero py-8">
          <div className="hero-content text-center">
            <div className="">
              <h1 className="text-5xl font-bold mt-4">Recommend me more</h1>
              <p className="py-6">
                See your top tracks and get recommendations based on them. You
                can also choose between your current top tracks and all time top
                tracks .
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:flex-row mt-16">
          <Top50 session={session} />
          <div className="divider lg:divider-horizontal"></div>

          <LikedSongs session={session} />
        </div>
      </main>
    </>
  );
}
