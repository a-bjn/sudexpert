import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Separator from "./components/Separator";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Separator />
      <About />
      <Separator />
    </div>
  );
}
