'use client';
import { Canvas, useFrame, useThree, extend, Object3DNode, useLoader } from "@react-three/fiber";
import { useRef, useState, Suspense, useEffect, Ref} from "react";
import { Environment, GradientTexture, OrbitControls, PerspectiveCamera, Plane, useHelper } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { AxesHelper, DirectionalLightHelper, DoubleSide, Euler, SpotLightHelper } from "three";
import { Ball, BigBox, SmallBox } from "./AniBox";
import { TextGeometry, FontLoader, Font } from "three/examples/jsm/Addons.js";
import { Physics, usePlane } from "@react-three/cannon";
extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
extend({ TextGeometry });

function Ground(props: any) {
   const [ref] : any = usePlane(() => ({rotation: [-Math.PI / 2, 0, 0], ...props }))
   return (
     <mesh ref={ref} receiveShadow>
       <planeGeometry args={[100,100]}/>
       <meshPhysicalMaterial color={'#44476F'} side={DoubleSide}/>
     </mesh>
   )
}



function TextRender(props: JSX.IntrinsicElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const myFont = useLoader(FontLoader, '/fonts/Poppins.json');
  const [onClick, setOnClick] = useState(false);
  const aniprops = useSpring({
    rotation: onClick ? [3*Math.PI / 2,0,(Math.PI*2)*2] as any : [3*Math.PI / 2,0,0] as any,
    config(key) {
      switch (key) {
        case 'rotation': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
        default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
      }
    },
  })
  return (
    <animated.mesh rotation={aniprops.rotation}
      onClick={() => {if (onClick) setOnClick(false); else setOnClick(true); console.log('clicked')}}
      ref={meshRef} {...props}>
      <textGeometry args={['PONG', {font: myFont, size:1.5, height: 0.1, curveSegments: 64}]}/>
      <meshLambertMaterial attach='material' color={'white'}/>
    </animated.mesh>
  )
}

function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const spotlightRef = useRef<THREE.SpotLight>(null!);
  useHelper(spotlightRef, SpotLightHelper, 'white')
  useEffect(() => {
  }, [])
  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 15]} fov={45}/>
       <ambientLight intensity={1}/>
        <spotLight ref={spotlightRef} penumbra={0.1} position={[15, 8, -10]} intensity={10000} color={'#9A9BD3'}  castShadow/>
        {/* <directionalLight ref={lightRef} position={[15, 8, -10]} intensity={100} color={'#9A9BD3'} castShadow/> */}
        {/* <StarsSet/> */}
        <Ground />
        <BigBox  position={[-5, 10, -9.5]}  castShadow/>
        <TextRender position={[-2,0,-6]} scale={1} castShadow />
        <SmallBox position={[5, 0.1, -10]} rotation={[0, Math.PI+0.5,0]} castShadow/>
        <Ball position={[5,1,0]} castShadow/>
        <Environment preset="night"/>
        <OrbitControls />
        <axesHelper />
    </>
  )
}


export default function Simulation() {
    return (
        <Canvas shadows>
          <color attach='background' args={['#44476F']} />
          <Physics gravity={[0, -9.8, 0]} >
           <Scene />
          </Physics>
        </Canvas>
    )

}