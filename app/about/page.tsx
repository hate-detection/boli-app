import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <main className="flex flex-col h-screen w-screen items-center justify-center p-10 overflow-y-hidden">
        <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#FCDD81_1px,transparent_1px)]",
          "-z-10"
        )}
      />
        <h1 className="text-4xl">About</h1>
      </main>
    </>
  );
}
