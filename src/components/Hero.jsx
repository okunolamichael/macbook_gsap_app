import { useEffect, useRef } from "react";

const Hero = () => {
    // create a ref for the video element
    const videoRef = useRef();

    useEffect(() => {
        //if videoRef has been attached to the video element, set the playback rate to 2.5
        if (videoRef.current) videoRef.current.playbackRate = 2.5;
    }, []);

  return (
    <section id="hero">
      <div>
        <h1>MacBook Pro</h1>
        <img src="/title.png" alt="MacBook Title" />
      </div>

      <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />

      <button>Buy</button>

      <p>From $1,599 or $133.25/mo. for 12 months</p>
      
    </section>
  )
}

export default Hero
