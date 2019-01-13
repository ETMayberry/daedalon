import * as React from 'react';
import * as THREE from 'three';
import './ReactThree.css';
import { SceneManager } from './SceneManager';
import { SceneObject } from './SceneObject';
import UIManager from './UI/UIManager';

/* tslint:disable */
/**
 * React component which is also the root for a Three.js application or component
 */
export class ReactThree extends React.Component<{}, {}> {

    public canvasRef!: HTMLCanvasElement | null;
    public scene: SceneManager | undefined;

    constructor(props: any) {
        super(props);
        this.doThing = this.doThing.bind(this);
    }

    /**
     * React's lifecycle event. We use this to contain our Three.js root element, and what happens
     * in there is essentially hidden from React.
     */
    public render() {
        return (
            <div className="react-three-container">
                <button className="btn btn-primary position-absolute" onClick={this.doThing}>Do the Thing</button>
                <UIManager />
                <canvas className="react-three-canvas"
                    ref={el => this.canvasRef = el} />
            </div>
        );
    };

    /**
     * Called when React finishes creating this object. We wait for this time to do anything
     * involving DOM elements in order to prevent race conditions during setup.
     */
    public componentDidMount() {
        if (!this.canvasRef) {
            // tslint:disable-next-line:no-console
            console.warn('there is no canvas!');
            return;
        }
        this.scene = new SceneManager(this.canvasRef);
        // kick off the animation cycle
        this.animate();
    };

    /**
     * Called when React is destroying this object. We will use this to clean up Three.js 
     * objects since they are not managed by the React engine.
     */
    public componentWillUnmount() {
        // tslint:disable-next-line:no-console
        console.log('Canvas unloaded!!');
        this.scene!.dispose();
    };

    /**
     * Allows us to decide whether to update this element as part of the React lifecycle.
     * @param nextProps New props being set by React
     * @param nextState New state being set by React
     */
    public shouldComponentUpdate(nextProps: any, nextState: any) {
        // tslint:disable-next-line:no-console
        console.log('shouldComponentUpdate');
        // We usually want to prevent updates because it's costly to rebuild the Three.js scene.
        // Alternatively, we can simply push updates into the SceneManager and let it update 
        // it's own objects as needed.
        return false;
    }

    /**
     * Called every Animation Frame by the browser. Here is where we control the tempo for
     * updating our SceneManager, which in turn handles the animation cycle within Three.js
     */
    public animate() {
        this.scene!.update();
        requestAnimationFrame(this.animate.bind(this));
    }

    // vvvvvvvvvvvvvvvv TEST TEST TEST vvvvvvvvvvvvvvvv
    i = 0;
    public doThing() {
        console.log("doing a thing...");
        // const obj = new SceneObject(
        //     new THREE.MeshNormalMaterial(),
        //     new THREE.SphereGeometry(10, 100, 10)
        // );
        // obj.updateFunction = (object: SceneObject, delta: number) => {
        //     object.mesh.rotation.x += 0.01;
        //     object.mesh.rotation.y += 0.01;
        // };
        // this.scene!.addSceneObject(obj);

        // const obj2 = new SceneObject(
        //     new THREE.MeshNormalMaterial(),
        //     new THREE.CubeGeometry(10, 15, 5, 1, 1, 1)
        // );
        // obj2.updateFunction = (object: SceneObject, delta: number) => {
        //     object.mesh.rotation.x += 0.01;
        //     object.mesh.rotation.y += 0.01;
        // };
        // obj2.mesh.position.setX(-15 - this.i++);
        // obj.addChild(obj2);

        const textureLoader = new THREE.TextureLoader();
        const skyboxMat = new THREE.MeshBasicMaterial();
        textureLoader.setCrossOrigin('anonymous');
        textureLoader.load("/images/Space-Nebula-Texture.png",
            (t) => {
                skyboxMat.map = t;
            },
            undefined,
            (err) => {
                console.error('error', err);
            });

        skyboxMat.side = THREE.BackSide;
        let skyboxGeo = new THREE.SphereGeometry(1024, 128, 128);
        let skyboxMesh = new THREE.Mesh(skyboxGeo, skyboxMat);
        skyboxMesh.rotation.y = Math.PI;
        const skybox = new SceneObject(
            skyboxMat,
            skyboxGeo
        );
        this.scene!.addSceneObject(skybox);
    }

}
