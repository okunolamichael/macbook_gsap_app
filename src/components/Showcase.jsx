import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Showcase = () => {

    const isTablet = useMediaQuery({ query: '(max-width: 1024px)'});

    useGSAP(() => {
        if(!isTablet) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#showcase',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                }
            });

            timeline
              .to(".mask img", {
                transform: "scale(1.1)",
              })
              .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
        } 
    }, [isTablet])

  return (
    <section id="showcase">
      <div className="media">
        <video src="/videos/game.mp4" loop muted autoPlay playsInline />

        <div className="mask">
          <img src="/mask-logo.svg" />
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
            <div className="lg:max-w-md">
                <h2>
                    Rocket Chip
                </h2>

                <div className="space-y-5 mt-7 pe-10">
                    <p>
                        Introducing {" "}
                        <span className="text-white">
                            M4, the next generation of Apple silicon
                        </span>
                        . M4 powers
                    </p>

                    <p>
                        It drives intelligence performance and efficiency, enabling a new level of performance for your favorite apps and games. With M4, you can do more than ever before.
                    </p>

                    <p>
                       A brand-new display engine delivers stunning visuals, while advanced machine learning capabilities enable new experiences and workflows. M4 is designed to take your creativity to the next level. 
                    </p>

                    <p className="text-primary">
                        Learn more about Apple Intelligence
                    </p>
                </div>
            </div>

            <div className="max-w-3xs space-y-14">
                <div className="space-y-2">
                    <p>Up to</p>
                    <h3>4x faster</h3>
                    <p>pro rendering performance than M2</p>
                </div>
                <div className="space-y-2">
                    <p>Up to</p>
                    <h3>1.5x faster</h3>
                    <p>CPU performance than M2</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
