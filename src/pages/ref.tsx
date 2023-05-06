import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { SessionData } from "..";
import SpotifyWebApi from 'spotify-web-api-node'



export default function Home() {
  const { data, status } = useSession();
  let session: SessionData = data as SessionData;

  

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <p className="mt-8 text-center text-gray-500 dark:text-gray-400">
            You are not signed in.{" "}
            <a
              href={`/login`}
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Sign in
            </a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <p className="mt-8 text-center text-gray-500 dark:text-gray-400">
          Signed in as {session.user.email} <br />
          <button
            className="text-blue-500 hover:underline dark:text-blue-400"
            onClick={() => signOut()}
          >
            Sign out
          </button>

        </p>
      </div>
    </main>
  );
}
