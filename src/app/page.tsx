'use client';
import { Canvas, useFrame, useThree, extend, Object3DNode, useLoader } from "@react-three/fiber";
import { useRef, useState, Suspense, useEffect, Ref, use, FC} from "react";
import { Box, Environment, GradientTexture, OrbitControls, Plane, Sphere, useHelper } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { AxesHelper, DirectionalLightHelper, DoubleSide, Euler, SpotLightHelper } from "three";
import { TextGeometry, FontLoader, Font } from "three/examples/jsm/Addons.js";
import { Physics, Triplet, usePlane } from "@react-three/cannon";
import { useMemo } from "react";
import { redirect, useRouter } from "next/navigation";
import * as THREE from 'three'
import { Router } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

extend({ TextGeometry });


function TextRender(props: JSX.IntrinsicElements['mesh'] & {text: string}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const myFont = useLoader(FontLoader, '/fonts/Poppins.json');
  const textRef = useRef<TextGeometry>(null!);
  const [onClick, setOnClick] = useState(false);
  const aniprops = useSpring({
    rotation: onClick ? [(Math.PI*2)*2,0,0] as any : [0,0,0] as any,
    config(key) {
      switch (key) {
        case 'rotation': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
        default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
      }
    },
  })


  // useEffect(() => {
  //       meshRef.current.visible = true
  //       meshRef.current.geometry.computeBoundingBox();
  //       const boundingBox = meshRef.current.geometry.boundingBox;
  //       const center = new THREE.Vector3();
  //       boundingBox!.getCenter(center);
  //       meshRef.current.geometry.translate(-center.x,-center.y,-center.z);
  // })
  
  return (
    <animated.mesh rotation={aniprops.rotation}
    onClick={() => {if (onClick) setOnClick(false); else setOnClick(true);}}
    ref={meshRef} {...props}>
      <textGeometry ref={textRef} args={[props.text, {font: myFont, size:0.5, height: 0.1, curveSegments: 64}]}/>
      <meshLambertMaterial attach='material' color={'white'}/>
    </animated.mesh>
  )
}

function SceneBox(props: JSX.IntrinsicElements['mesh']) {
  const [onHover, setOnHover] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const aniprops = useSpring({
    scale: onHover ? 1.5 : 1,
    rotation: onClick ? [0,0,(Math.PI)] as any : [0,0,0] as any,
    color: onHover ? 'green' : '#44476F',
    config(key) {
      switch (key) {
        case 'scale': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
        case 'rotation': return { mass: 10, tension: 500, friction: 50, precision: 0.0001, velocity: 0.001 };
        case 'color': return { mass: 1, tension: 5000};
        default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
      }
    },
  })
  useEffect(() => {
    if (redirect) {
        router.push('/scene')
    }
  })
  return (
    <animated.mesh {...props}
    scale={aniprops.scale}
    rotation={aniprops.rotation}
    onClick={() => {setOnClick(true), setRedirect(true)}}
    onPointerOver={() => {setOnHover(true)}}
    onPointerOut={() => {setOnHover(false) , setOnClick(false)}}>
      <boxGeometry args={[1,1,1]}/>
      <animated.meshStandardMaterial color={aniprops.color}/>
      <TextRender position={[-2,1,0]} text={'SIMULATION'} scale={1} castShadow receiveShadow/>
    </animated.mesh>
  )
}


function TrialBox(props: JSX.IntrinsicElements['mesh'] & {router: AppRouterInstance}) {
  const [onHover, setOnHover] = useState(false);
  const [onClick, setOnClick] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const aniprops = useSpring({
    scale: onHover ? 1.5 : 1,
    rotation: onClick ? [0,0,(Math.PI)] as any : [0,0,0] as any,
    color: onHover ? 'green' : '#44476F',
    config(key) {
      switch (key) {
        case 'scale': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
        case 'rotation': return { mass: 10, tension: 500, friction: 50, precision: 0.0001, velocity: 0.001 };
        default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
      }
    },
  })
  
  useEffect(() => {
    if (redirect) {
        router.push('/trial')
    }
  })
  return (
      <animated.mesh {...props}
      scale={aniprops.scale}
      rotation={aniprops.rotation}
      onClick={() => {setOnClick(true), setRedirect(true)}}
      onPointerOver={() => {setOnHover(true)}}
      onPointerOut={() => {setOnHover(false), setOnClick(false)}}>
        <boxGeometry args={[1, 1, 1]}/>
        <animated.meshStandardMaterial color={aniprops.color}/>
        <TextRender position={[-1, 1, 0]} text={'TRIAL'} scale={1} castShadow receiveShadow/>
      </animated.mesh>
    )
}


export default function Home() {
  const router = useRouter(); 
  return (
   <Canvas shadows camera={{position: [0,2,5]}}>
    <color attach='background' args={['#0D0D0D']}/>
    <Suspense fallback={null}>
        <ambientLight intensity={1}/>
        <spotLight penumbra={0.1} position={[5, 8, -10]} intensity={10000} color={'#9A9BD3'}  castShadow/>
        <SceneBox position={[-2,0,0]} castShadow receiveShadow/>
        <TrialBox position={[2,0,0]} castShadow receiveShadow router={router}/>
        <OrbitControls />
    </Suspense>
   </Canvas>
  )
}
