/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { getProviders, signIn } from "next-auth/react";
import { Button, Image, VStack } from "@chakra-ui/react";
import Head from "next/head";

function Login({ providers }: { providers: any[] }) {
  return (
    <>
      <Head>
        <title>Login to Spotify</title>
        <meta
          name="description"
          content="Spotify Loging page : Authentification with NextAuth , nextjs Middleware "
        />
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
            width={180}
            height={37}
          />
          {Object.values(providers).map((provider) => (
            <>
              <p className="mt-8 text-center">
              You are not signed in.{" "}
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className="text-blue-500 hover:underline dark:text-blue-400 "
                >
                 Login
                </button>
              </p>
            </>
          ))}
        </div>
      </main>
    </>
  );
}
export default Login;
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
