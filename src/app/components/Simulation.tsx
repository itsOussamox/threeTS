'use client';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, Suspense, useEffect} from "react";
import { Environment, GradientTexture, OrbitControls, Plane, useHelper } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { AxesHelper, DirectionalLightHelper } from "three";
import { Ball, BigBox, SmallBox } from "./AniBox";




function Ground() {
    return (
      <>
        <Plane args={[100, 100]} rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0]} >
          <meshPhysicalMaterial color="#050A27" />
        </Plane>
      </>
    )
}

function Scene() {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(lightRef, DirectionalLightHelper, 1, 'white')
  return (
    <>
       <ambientLight intensity={0.2}/>
        <directionalLight ref={lightRef}  position={[10, 10, 10]} intensity={1} castShadow/>
        <Ground />
        <BigBox  position={[-5, 0.5, -9.5]} rotation={[0,3*Math.PI/3,0]} castShadow/>
        <SmallBox position={[5, 0.5, -10]} rotation={[0, Math.PI+0.5,0]}/>
        <Ball position={[5,1,0]} castShadow/>
        <Environment preset="dawn"/>
        <OrbitControls />
        <axesHelper />
    </>
  )
}


export default function Simulation() {
    return (
        <Canvas camera={{position: [0,2,5]}} shadows>
           <Scene />
        </Canvas>
    )

}