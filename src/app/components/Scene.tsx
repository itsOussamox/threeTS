'use client';
// import three js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


const resizeScene = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
    console.log ('resize')
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

const handleInput = (e: KeyboardEvent, camera: THREE.PerspectiveCamera, scene: THREE.Scene) => {
    const cube = scene.getObjectByName('cube')!;
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


const drawLine = (scene: THREE.Scene) => {
    const material = new THREE.LineDashedMaterial({ color: 0x0000ff });
    const points = [];
    points.push( new THREE.Vector3( - 5, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 5, 0 ) );
    points.push( new THREE.Vector3( 5, 0, 0 ) );
    points.push( new THREE.Vector3( 0, -5, 0 ) );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    line.name = 'line';
    scene.add( line );
};

const drawCube = (scene: THREE.Scene) => {
    const geometry = new THREE.BoxGeometry( 1, 2, 1 );
    const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    // const material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
    // var textureLoader = new THREE.TextureLoader();
    // var texture = textureLoader.load( 'https://cdn.intra.42.fr/users/10bfa1872a64ee0e27a5949463bb83da/obouadel.jpg');
    // texture
    const cube = new THREE.Mesh( geometry, material );
    cube.name = 'cube';
    cube.position.set(0, 0, 0)
    scene.add( cube );
};

const drawLight = (scene: THREE.Scene) => {
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 0, 10, 10 );
    light.name = 'light';
    scene.add( light );
};

export default function Scene() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const animationId = useRef<number | null>(null);
    useEffect(() => {
        if (!WebGL.isWebGLAvailable())
            useRouter().push('/');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (sceneRef.current)
            sceneRef.current.appendChild(renderer.domElement);
        drawCube(scene);
        drawLight(scene);
        camera.position.z = 5;
        window.addEventListener("resize", () => {resizeScene(renderer, camera)});
        document.addEventListener('keydown', (e) => {handleInput(e, camera, scene)});
        function animate() {
            scene.getObjectByName('cube')!.rotation.x += 0.01;
            renderer.render( scene, camera );
            animationId.current = requestAnimationFrame( animate );
        }
        animate();
        return () => {
            window.removeEventListener('resize', () => resizeScene(renderer, camera));
            document.removeEventListener('keydown', (e) => {handleInput(e, camera, scene)});
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
