import Hero from "../components/Hero";
import { cn } from "@/lib/utils";
import React from "react";

export default function Home() {
  return (
    <>
      <main className="flex flex-col h-screen w-screen items-center justify-center p-10 overflow-y-hidden">
        <Hero />
      </main>
    </>
  );
}
