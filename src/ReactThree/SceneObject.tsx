import * as THREE from 'three';

/* tslint:disable */
export class SceneObject {
    constructor(
        material: THREE.Material | THREE.Material[],
        geometry: THREE.Geometry | THREE.BufferGeometry
    ) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    material: THREE.Material | THREE.Material[];
    geometry: THREE.Geometry | THREE.BufferGeometry;
    mesh: THREE.Mesh;
    children: SceneObject[] = [];

    private _update: IUpdateFunction = (a: SceneObject, b: number) => { };
    set updateFunction(fn: IUpdateFunction) {
        this._update = fn;
    }

    delta: number = 1;
    update(timestep: number) {
        this.delta = timestep || 1;
        this._update(this, timestep);
        this.children.map((child: SceneObject) => child.update(this.delta));
    }

    populate(scene: THREE.Scene) {
        scene.add(this.mesh);
    }

    addChild(child: SceneObject) {
        this.children.push(child);
        this.mesh.add(child.mesh);
    }

    findChildren(filter: (obj: SceneObject) => boolean) {
        return this.children.map((child) => filter(child));
    }

    removeChildren(filter: (obj: SceneObject) => boolean) {
        this.children.map((child) => {
            if (filter(child)) this.children.splice(this.children.indexOf(child));
        });
    }

}

interface IUpdateFunction {
    (self: SceneObject, timestep: number): void
};
