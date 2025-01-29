"use client";
import React from "react";
import Home from "./furniture/page";
import Hero from "./components/Hero";
import Touch from "./components/Touch";
import Brand from "./components/Brand";

import Benefit from "./components/Banefit";

export default function page() {
  return (
    <div>
      <Hero />
      <Brand />

      <Home />

      <Benefit />

      <Touch />
    </div>
  );
}
