import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TimePortal from "@/components/TimePortal";
import Login from "@/components/Login";

export default function Home({ appMode, authEnabled }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (appMode === "database") {
      // Database mode - use NextAuth
      if (status === "unauthenticated") {
        router.push("/auth/signin");
      } else if (status === "authenticated") {
        setLoading(false);
      }
    } else {
      // Local mode - use legacy authentication
      if (!authEnabled) {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      // Check if user is already authenticated
      const authenticated = localStorage.getItem("authenticated");
      if (authenticated === "true") {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }
  }, [appMode, authEnabled, status, router]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    if (appMode === "database") {
      await signOut({ callbackUrl: "/auth/signin" });
    } else {
      localStorage.removeItem("authenticated");
      setIsAuthenticated(false);
    }
  };

  if (loading || (appMode === "database" && status === "loading")) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-slate-600">Loading...</div>
      </div>
    );
  }

  if (appMode === "database" && status === "unauthenticated") {
    return null; // Will redirect to signin
  }

  return (
    <>
      <Head>
        <title>Time Portal App</title>
        <meta name="description" content="Time tracking application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {appMode === "local" && authEnabled && !isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TimePortal 
          onLogout={authEnabled || appMode === "database" ? handleLogout : null} 
          user={appMode === "database" ? session?.user : null}
          appMode={appMode}
        />
      )}
    </>
  );
}

export async function getServerSideProps() {
  const appMode = process.env.APP_MODE || "local";
  const authEnabled = process.env.ENABLE_AUTH === "true";
  
  return {
    props: {
      appMode,
      authEnabled,
    },
  };
}
