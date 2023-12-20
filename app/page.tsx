'use client'
import Hero from "@/Components/Hero";
import Banner from "@/Components/Banner"
import Avatar from "@/Components/Avatar"
import Blockquote from "@/Components/Blockquote";
import Slider from "@/Components/Slider";
import Service from "@/Components/Service";
export default function Home() {
  return (
    <>
      <Banner/>
      <Avatar/>
      <Hero/>      
      <Service />
      <Slider />
      <Blockquote />
    </>
  );
}
