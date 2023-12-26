'use client';
// import three js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


const handleInput = (e: KeyboardEvent, camera: THREE.PerspectiveCamera, cube: THREE.Mesh) => {
    if (e.key === 'w') camera.position.z -= 0.1;
    if (e.key === 's') camera.position.z += 0.1;
    if (e.key === 'a') camera.position.x -= 0.1;
    if (e.key === 'd') camera.position.x += 0.1;
    if (e.key === 'q') camera.position.y -= 0.1;
    if (e.key === 'e') camera.position.y += 0.1;
    if (e.key === 'ArrowUp') cube.rotation.x += 0.1;
    if (e.key === 'ArrowDown') cube.rotation.x -= 0.1;
    if (e.key === 'ArrowLeft') cube.rotation.y += 0.1;
    if (e.key === 'ArrowRight') cube.rotation.y -= 0.1;
}

export default function Scene() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const animationId = useRef<number | null>(null);
    useEffect(() => {
        if (!WebGL.isWebGLAvailable()) {
            const warning = WebGL.getWebGLErrorMessage();
	        document.getElementById('scene-container')!.appendChild( warning );
        }
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (sceneRef.current)
            sceneRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
        document.addEventListener('keydown', (e) => {handleInput(e, camera, cube)});
        function animate() {
            animationId.current = requestAnimationFrame( animate );
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            cube.rotation.x += 0.01;
            renderer.render( scene, camera );
        }
        animate();
        return () => {
            if (sceneRef.current)
                sceneRef.current.removeChild(renderer.domElement);
            if (animationId.current)
                cancelAnimationFrame(animationId.current);
        }
    }, [sceneRef]);

    return (
        <div id='scene-container' ref={sceneRef} className='w-full h-full' />
    )
}
