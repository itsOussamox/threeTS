import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { animated, useSpring } from '@react-spring/three'
const bigBoxSize = [3, 0.5, 4];
const smallBoxSize = [1, 0.5, 6];
export function BigBox(props: JSX.IntrinsicElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [isHovered, setIsHovered] = useState(false)
    const [boxRotation, setBoxRotation] = useState(0)
    const aniprops = useSpring({
        scale : isHovered ? 1.5 : 1,
        config(key) {
            switch (key) {
                case 'scale': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
                default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
            }
        },
    })
    // useFrame((state, delta) => {
    //     meshRef.current.rotation.x = meshRef.current.rotation.y += boxRotation;
    // })

    return (
        <animated.mesh scale={aniprops.scale} 
        onPointerOver={() => setIsHovered(true)} 
        onPointerOut={() => {setIsHovered(false); setBoxRotation(0)}}
        ref={meshRef} {...props}>
            <boxGeometry args={bigBoxSize as [number,number,number]} />
            <meshStandardMaterial color='#00ffff' />
        </animated.mesh>
    )
}


export function SmallBox(props: JSX.IntrinsicElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [isHovered, setIsHovered] = useState(false)
    const [boxRotation, setBoxRotation] = useState(0)
    const aniprops = useSpring({
        scale : isHovered ? 1.5 : 1,
        config(key) {
            switch (key) {
                case 'scale': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
                default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
            }
        },
    })
    // useFrame((state, delta) => {
    //     meshRef.current.rotation.x = meshRef.current.rotation.y += boxRotation;
    // })

    return (
        <animated.mesh scale={aniprops.scale} 
        onPointerOver={() => setIsHovered(true)} 
        onPointerOut={() => {setIsHovered(false); setBoxRotation(0)}}
        ref={meshRef} {...props}>
            <boxGeometry args={smallBoxSize as [number,number,number]} />
            <meshStandardMaterial color='#9A9BD3' />
        </animated.mesh>
    )
}


export function Ball(props: JSX.IntrinsicElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [isHovered, setIsHovered] = useState(false)
    const [boxRotation, setBoxRotation] = useState(0)
    const aniprops = useSpring({
        scale : isHovered ? 1.5 : 1,
        config(key) {
            switch (key) {
                case 'scale': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
                default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
            }
        },
    })
    return (
        <animated.mesh ref={meshRef} {...props}
            scale={aniprops.scale} 
            onPointerOver={() => setIsHovered(true)} 
            onPointerOut={() => {setIsHovered(false); setBoxRotation(0)}} >
            <sphereGeometry args={[1,64,64]}/>
            <meshPhysicalMaterial color={"#44476F"} />
        </animated.mesh>
    )
}

