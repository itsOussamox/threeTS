import React, { Ref, useRef, useState } from 'react'
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { animated, useSpring } from '@react-spring/three'
import {GradientTexture} from '@react-three/drei'
import { BoxProps, SphereProps, Triplet, useBox, useSphere } from '@react-three/cannon'
const bigBoxSize = [3, 0.5, 4];
const smallBoxSize = [1, 0.5, 6,3,3,3];
export function BigBox(props: JSX.IntrinsicElements['mesh']) {
    const [meshRef, api]  = useBox(() => ({ mass: 1, position: props.position as Triplet,
        args: bigBoxSize as Triplet, rotation: props.rotation as Triplet }))
    const [isHovered, setIsHovered] = useState(false)
    const aniprops = useSpring({
        scale : isHovered ? 1.5 : 1,
        config(key) {
            switch (key) {
                case 'scale': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
                default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
            }
        },
    })
    console.log(api)
    return (
        <animated.mesh scale={aniprops.scale} 
        onPointerOver={() => setIsHovered(true)} 
        onPointerOut={() => {setIsHovered(false)}}
        ref={meshRef as Ref<THREE.Mesh>} {...props}>
            <boxGeometry args={bigBoxSize as []} />
            <meshPhysicalMaterial color={'#44476F'}/>
        </animated.mesh>
    )
}


export function SmallBox(props: JSX.IntrinsicElements['mesh']) {
    const [meshRef, api] = useBox(() => ({ mass: 1, position: props.position as any,
        args: smallBoxSize as any, rotation: props.rotation as any}))
    const [isHovered, setIsHovered] = useState(false)
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
        <animated.mesh scale={aniprops.scale} 
        onPointerOver={() => setIsHovered(true)} 
        onPointerOut={() => {setIsHovered(false)}}
        ref={meshRef as Ref<THREE.Mesh>} {...props}>
            <boxGeometry args={smallBoxSize as []} />
            <meshPhysicalMaterial color='#9A9BD3' />
        </animated.mesh>
    )
}


export function Ball(props: JSX.IntrinsicElements['mesh']) {
    const [meshRef, api] = useSphere(() => ({ mass: 1,
        position: props.position as Triplet}))
    const [isHovered, setIsHovered] = useState(false)
    const aniprops = useSpring({
        scale : isHovered ? 1.5 : 1,
        config(key) {
            switch (key) {
                case 'scale': return { mass: 1, tension: 1000, friction: 300, precision: 0.0001, velocity: 0 };
                default: return { mass: 1, tension: 500, friction: 50, precision: 0.0001, velocity: 0 };
            }
        },
    })

    const applyBallEffect = (e: ThreeEvent<MouseEvent>) => {
        const [x,y,z] = e.intersections[0].point.toArray();
        api.
        api.applyForce([0, 1000, 0], [x,y,z])
    }

    return (
        <animated.mesh ref={meshRef as Ref<THREE.Mesh>} {...props}
            scale={aniprops.scale}
            onClick={(e) => {applyBallEffect(e)}}>
            <sphereGeometry args={[1,64,64]}/>
            <meshPhysicalMaterial color={"#44476F"} />
        </animated.mesh>
    )
}

