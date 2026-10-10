import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  performanceImages,
  performanceImgPositions,
} from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

const toPositionStyles = (position) => ({
  left: typeof position.left === "number" ? `${position.left}%` : "auto",
  right: typeof position.right === "number" ? `${position.right}%` : "auto",
  bottom: `${position.bottom}%`,
  ...(position.transform ? { transform: position.transform } : {}),
});

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isIpad = useMediaQuery({
    query: "(min-width: 641px) and (max-width: 1024px)",
  });
  const isDesktop = !isMobile && !isIpad;
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      // Text Animation
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      if (!isDesktop) return;

      // Image Positioning Timeline
      const tl = gsap.timeline({
        defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Position Each Performance Image
      performanceImgPositions.forEach((item) => {

        if(item.id === "p5") return;

        const selector = `.${item.id}`;
        const vars = {};

        if (typeof item.desktop.left === "number") {
          vars.left = `${item.desktop.left}%`;
        }
        if (typeof item.desktop.right === "number") {
          vars.right = `${item.desktop.right}%`;
        }
        if (typeof item.desktop.bottom === "number") {
          vars.bottom = `${item.desktop.bottom}%`;
        }

        if (item.desktop.transform) vars.transform = item.desktop.transform;

        tl.to(selector, vars, 0);
      });
    },
    { scope: sectionRef, dependencies: [isDesktop] },
  );

  const positionKey = isMobile ? "mobile" : isIpad ? "ipad" : null;
  const positionsById = new Map(
    performanceImgPositions.map((item) => [item.id, item]),
  );

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => {
          const position = positionsById.get(item.id)?.[positionKey];

          return (
            <img
              key={item.id}
              src={item.src}
              className={item.id}
              alt={item.alt || `Performance Image #${index + 1}`}
              style={position ? toPositionStyles(position) : undefined}
            />
          );
        })}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};
export default Performance;
