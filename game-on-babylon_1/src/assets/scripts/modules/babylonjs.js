import * as BABYLON from 'babylonjs';

export const start = () => {
    const canvas = window.document.querySelector('#render-canvas');
    // создание движка
    const engine = new BABYLON.Engine(canvas);
    // создание сцены  и присоединение ее к движку
    const scene = new BABYLON.Scene(engine);
    // задать цвет сцене, rgb
    scene.clearColor = new BABYLON.Color3(255, 0, 0);
    // создание камеры
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
    // создание света
    const light = new BABYLON.PointLight('light', new BABYLON.Vector3(10, 10, 0), scene);
    // создаем куб
    let sphere = new BABYLON.MeshBuilder.CreateSphere('sphere', {diameter: 2, segments: 32}, scene);  // устаревший метод Mesh
    sphere.position.y = 1;
    // box.rotation.x = -0.2;
    // box.rotation.y = -0.4;
    // создание материала
    const sphereMaterial = new BABYLON.StandardMaterial('material', scene);
    sphereMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
    sphere.material = sphereMaterial;

    return scene.render()
}
