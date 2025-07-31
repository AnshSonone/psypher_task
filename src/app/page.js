"use client"

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  const { isSignedIn } = useUser()

  if (!isSignedIn){
    router.push('/auth')
  }

  return (
    <div className="bg-amber-400">
      Hello World
    </div>
    );
}
