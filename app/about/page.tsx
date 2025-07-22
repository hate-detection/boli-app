import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <main className="flex flex-col h-screen w-screen items-center justify-center p-10 overflow-y-hidden">
        <h1 className="text-4xl font-bold">About</h1>
      </main>
    </>
  );
}
