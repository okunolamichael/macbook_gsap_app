import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


// Helper functions that allows us to fade different meshes and move to different groups(presentationControls) based on the scale of the macbook.
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 10; //this is how far a model will move offscreen when its hidden.

//utility function to fade a mesh in or out based on the scale of the macbook.
const fadeMesh = (group, opacity) => {
    // check if a group doesn't exists we don't want to do anything, we exist out of the function.
    if(!group) return;


    // if a group is there, we want to loop through all the children of the group and set their material opacity to the value passed in.
    group.traverse((child) => {
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, {opacity, duration: ANIMATION_DURATION});
        }
})
}


// this allows us to animates the horizontal movement of a group based on the scale of the macbook. If the scale is 0.08, we want to move the group offscreen to the right, if its 0.06 we want to move it offscreen to the left.
const moveGroup = (group, x) => {
    if(!group) return;

    gsap.to(group.position, {x, duration: ANIMATION_DURATION});
}

const ModelSwitcher = ({scale, isMobile}) => {

    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_SMALL_DESKTOP = 0.05;

    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_SMALL_DESKTOP;


    // Run this whenever the scale changes, we want to fade in the large macbook and fade out the small macbook if the scale is 0.08 or 0.05, otherwise we want to fade in the small macbook and fade out the large macbook.

    useGSAP(() => {
        if(showLargeMacbook) {
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);

            fadeMesh(smallMacbookRef.current, 0);
            fadeMesh(largeMacbookRef.current, 1);
        } else {
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

            fadeMesh(smallMacbookRef.current, 1);
            fadeMesh(largeMacbookRef.current, 0);
        }
    }, [scale]);

    const controlsConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        // polar: [-Math.PI, Math.PI],
        azimuth: [-Infinity, Infinity],
        config: { mass: 1, tension: 0, friction: 26 },
    }

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
}

export default ModelSwitcher
