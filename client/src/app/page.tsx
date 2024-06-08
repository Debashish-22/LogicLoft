"use client";

import React from "react";

import GoogleOneTapLogin from "@/components/GoogleOneTapLogin";
import HeroPage from "@/components/home/HeroPage";
import Features from "@/components/home/Features";
import Technologies from "@/components/home/Technologies";
import Footer from "@/components/home/Footer";

const Home = () => {

  console.log(process.env.SERVER_API)

  return(
    <React.Fragment>
      <HeroPage/>
      <Technologies />
      <Features/>
      <Footer />
      <GoogleOneTapLogin />
    </React.Fragment>
  )
}

export default Home;