"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "~/utils/auth-client";
import { Button } from "~/components/ui/button";
import { Loader } from "lucide-react";

export default function ButtonLogout() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    try {
      setPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button onClick={handleSignOut}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
}
