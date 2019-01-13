import * as THREE from 'three';
import OrbitControls from '../OrbitControls/OrbitControls';
import { SceneObject } from './SceneObject';

/* tslint:disable */
export class SceneManager {

    private canvas: any;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private clock: THREE.Clock;
    private camera: THREE.PerspectiveCamera;
    private lights: THREE.Light[] = [
        new THREE.AmbientLight("white")
    ];
    private sceneObjects: SceneObject[] = [];
    public controls: any;

    constructor(canvas: any) {
        this.canvas = canvas;
        this.camera = this.buildCamera();
        this.camera.position.setZ(100);
        this.scene = this.buildScene();
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
        this.clock = new THREE.Clock();
        this.sceneDidLoad();
    }

    private buildScene() {
        return new THREE.Scene();
    }

    private buildCamera() {
        return new THREE.PerspectiveCamera(60, 2, 1, 100000);
    }

    private resizeCanvasToDisplaySize() {
        const canvas = this.renderer.domElement;
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // adjust displayBuffer size to match
        if (canvas.width !== width || canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            // update any render target sizes here
        }
    }

    public sceneDidLoad() {
        this.clock.start();
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.lights.map((light) => this.scene.add(light));
    }

    public dispose() {
        this.renderer.dispose();
    }

    public update() {
        const delta = this.clock.getDelta();
        this.sceneObjects.map((obj) => obj.update(delta));

        this.resizeCanvasToDisplaySize();
        this.renderer.render(this.scene, this.camera);
    }

    public handleClick(x: number, y: number) {
        console.log('Click!', x, y);
    }

    public addSceneObject(obj: SceneObject) {
        this.sceneObjects.push(obj);
        this.scene.add(obj.mesh);
    }

}
