'use client';
import { Canvas, useFrame, useThree, extend, Object3DNode, useLoader } from "@react-three/fiber";
import { useRef, useState, Suspense, useEffect, Ref} from "react";
import { Environment, GradientTexture, OrbitControls, Plane, useHelper } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { AxesHelper, DirectionalLightHelper, DoubleSide, Euler, SpotLightHelper } from "three";
import { Ball, BigBox, SmallBox } from "./AniBox";
import { TextGeometry, FontLoader, Font } from "three/examples/jsm/Addons.js";
import { Physics, usePlane } from "@react-three/cannon";
import { useMemo } from "react";
import * as THREE from 'three'

function Box(props: JSX.IntrinsicElements['mesh']) {
    const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), [])
    const material = useMemo(() => new THREE.MeshPhysicalMaterial({ color: 'white' }), [])
    const boxRef = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => {
        // boxRef.current.rotation.x += 0.1 * delta;
        // boxRef.current.rotation.y += 0.1 * delta;
        // boxRef.current.position.y += Math.cos(state.clock.elapsedTime) * (delta * 5);
    })

    return (
        <mesh ref={boxRef} {...props} geometry={geometry} material={material}/>
    )
}

function Boxes () {
    const boxes = useRef<any>([]);
    const numBoxes = 10; // its actually boxes*2 = 
    const surfaceRef = useRef<THREE.Group>(null!);
    useFrame((state, delta) => {

        // surfaceRef.current.rotation.x += delta;
        // surfaceRef.current.rotation.y += delta;
        // surfaceRef.current.rotation.z += delta;
    })
    useEffect(() => {
        console.log('mounting')
        for (let x = -numBoxes; x <= numBoxes; x += 1) {
          for (let y = -numBoxes; y <= numBoxes; y += 1) {
            for (let z = -numBoxes; z <= numBoxes; z += 1) {
              boxes.current.push(<Box key={`${x}-${y}-${z}`} position={[x, y, z]} />);
            }
          }
        }
        return () => {
            console.log('unmounting')
            boxes.current = [];
            }
    })
    return (
        <group ref={surfaceRef}>
            {boxes.current}
        </group>
    )
    
}

// function 

function Surface() {
    
    return (
        <>
            <ambientLight intensity={1} />
            {/* <Sun > */}
                <Boxes />
            {/* </Sun> */}
            <OrbitControls />
        </>
    )
}


export default function CubeSim() {

    return (
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 90 }} frameloop="demand">
            <color attach="background" args={['black']} />
            <Suspense fallback={null}>
                <Surface />
            </Suspense>
        </Canvas>
    )
}