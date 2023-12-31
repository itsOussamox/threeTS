'use client';
import { Canvas, useFrame, useThree, extend, Object3DNode, useLoader } from "@react-three/fiber";
import { useRef, useState, Suspense, useEffect, Ref} from "react";
import { Environment, GradientTexture, OrbitControls, Plane, Sphere, useHelper } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { AxesHelper, DirectionalLightHelper, DoubleSide, Euler, SpotLightHelper } from "three";
import { Ball, BigBox, SmallBox } from "./AniBox";
import { TextGeometry, FontLoader, Font } from "three/examples/jsm/Addons.js";
import { Physics, Triplet, usePlane } from "@react-three/cannon";
import { useMemo } from "react";
import * as THREE from 'three'

function Box(props: JSX.IntrinsicElements['mesh']) {
    const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
    const material = useMemo(() => new THREE.MeshPhysicalMaterial({ color: THREE.MathUtils.randInt(0, 0xffffff) }), [])
    // const meshBox = useMemo(() => new THREE.Mesh(geometry, material), [])
    const boxRef = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => {
        // boxRef.current.position.y += Math.tan(state.clock.elapsedTime) * (delta * 5);
        // boxRef.current.position.x += Math.tan(state.clock.elapsedTime) * (delta * 5);
        // boxRef.current.position.z += Math.tan(state.clock.elapsedTime) * (delta * 5);
    })

    return (
        <mesh ref={boxRef} {...props} geometry={geometry} material={material}/>
    )
}

function Boxes ( {position} : {position: Triplet}) {
    const boxes = useRef<any>([]);
    const spaceBetween = 5;
    const numBoxes = 10; // its actually boxes*2 = 
    const surfaceRef = useRef<THREE.Group>(null!);
    // const position = positiona as any;

    // if (boxes.current.length > 0) return null;
    for (let x = -10; x <= 10; x += spaceBetween) {
        for (let y = -10; y <= 10; y += spaceBetween) {
            for (let z = -10; z <= 10; z += spaceBetween) {
                boxes.current.push(<Box key={`${x}-${y}-${z} ${Math.random()}`} position={[position[0] + x, position[1] + y, position[2] + z]} />);
            }
        }
    }
    return (
        <group ref={surfaceRef}>
            {boxes.current}
        </group>
    )
    
}

function Sun(props: JSX.IntrinsicElements['mesh']) {
    const sunRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        sunRef.current.rotation.z += delta * 0.5;
        sunRef.current.rotation.y += delta * 0.25;
    })

    return (
        <mesh ref={sunRef} {...props} >
            <pointLight intensity={10} color={'yellow'} />
            <sphereGeometry args={[100, 64, 64]} attach={'geometry'}/>
            <meshPhysicalMaterial emissive={10} emissiveIntensity={10} color={'yellow'} attach={'material'} />
            {props.children}
        </mesh>
    )
}

function Surface() {
    
    return (
        <>
            <ambientLight intensity={1} />
            <Sun position={[100,0,0]} >
                <Boxes position={[-200,3,3] as Triplet}  />
            </ Sun>
            <OrbitControls />
        </>
    )
}


export default function CubeSim() {

    return (
        <Canvas shadows dpr={[1, 2]} camera={{ position: [50, 0, 200], fov: 90 }}>
            <color attach="background" args={['black']} />
            <Suspense fallback={<></>}>
                <Surface />
            </Suspense>
        </Canvas>
    )
}