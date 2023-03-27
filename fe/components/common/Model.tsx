import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CustomDiv = styled.div`
  position: absolute;
  /* padding: 0 160px; */
  top: 88px;
  left: 0px;
  /* scale: 0.8; */
  width: 100%;
`;

function Model() {
  const refDiv = useRef<HTMLDivElement>(null);
  let rendererPrev: any;
  let cameraPrev: any;
  let scenePrev: any;

  useEffect(() => {
    const group = new THREE.Group();
    const { current: customdiv } = refDiv;

    if (customdiv && !rendererPrev) {
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      customdiv?.appendChild(renderer.domElement);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setPixelRatio(window.devicePixelRatio);
      // renderer.setSize(sizes.width, sizes.height - 120);
<<<<<<< HEAD
      renderer.setSize(sizes.width, sizes.height - 222 - 200 - 32);
      _renderer = renderer;
=======
      renderer.setSize(sizes.width, sizes.height - 222 - 150);
      rendererPrev = renderer;
>>>>>>> a150853849cff3baf26a3565478f8ee0a211592c

      const scene = new THREE.Scene();
      scene.background = null;
      scenePrev = scene;

<<<<<<< HEAD
      const onWindowResize = function (): void {
        width = window.innerWidth;
        height = window.innerHeight;

        _camera.updateProjectionMatrix(); // 변경된 값을 카메라에 적용

        height = sizes.height - 222 - 200 - 32;
        _camera.aspect = width / height; // canvas비율을 카메라에 적용

        _renderer.setSize(width, height, true);
        // _renderer.setSize(sizes.width, sizes.height - 120 - 98);
        controls.reset();
      };
      window.addEventListener('resize', onWindowResize, false);
=======
>>>>>>> a150853849cff3baf26a3565478f8ee0a211592c
      // window.addEventListener('mousedown·mouseup', onWindowReset, false);
      // window.onresize = resize.bind(customdiv);
      // resize();

      // requestAnimationFrame(render.bind(refDiv));

      // 그림자 설정
      const textureLoader = new THREE.TextureLoader();
      const alphaShadow = textureLoader.load(
        'assets/img/common/textures/simpleShadow.jpg',
      );

      const sphereShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.MeshBasicMaterial({
          transparent: true,
          color: 0x000000,
          opacity: 0.9,
          alphaMap: alphaShadow,
        }),
      );

      sphereShadow.rotation.x = -Math.PI * 0.5;
      sphereShadow.position.x = 0;
      sphereShadow.position.y = -0.3;
      sphereShadow.scale.set(0.8, 0.8, 0.8);

      group.add(sphereShadow);

      let width = customdiv ? customdiv.clientWidth : 0;
      let height = customdiv ? customdiv.clientHeight : 0;
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
      const controls = new OrbitControls(camera, customdiv);
      controls.saveState();
      controls.minDistance = 2.2;
      controls.maxDistance = 2.2;
      controls.minPolarAngle = 1.5; // 윗각도 제한
      controls.maxPolarAngle = 1.5; // 아래각도 제한(MATH.PI/2의 경우 바닥까지만 보여줌)
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.screenSpacePanning = false;
      camera.position.x = 0;
      camera.position.y = 0.35;
      camera.position.z = 2.2;
      controls.update();
      cameraPrev = camera;

      const onWindowResize = function (): void {
        width = window.innerWidth;
        height = window.innerHeight;

        cameraPrev.updateProjectionMatrix(); // 변경된 값을 카메라에 적용

        height = sizes.height - 222 - 150;
        cameraPrev.aspect = width / height; // canvas비율을 카메라에 적용

        rendererPrev.setSize(width, height, true);
        // _renderer.setSize(sizes.width, sizes.height - 120 - 98);
        controls.reset();
      };

      window.addEventListener('resize', onWindowResize, false);

      // 빛 설정
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
      group.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(0, 1, 4);
      directionalLight.castShadow = true;
      group.add(directionalLight);

      // 캐릭터 설정
      const glftLoader = new GLTFLoader();
      glftLoader.load('assets/img/gomi/gomi_finish.gltf', el => {
        const temp = el;
        temp.scene.position.x = 0.15;
        temp.scene.position.y = 0;
        temp.scene.position.z = 1;
        // 옆면: -0.7 정면: -0.4
        temp.scene.rotation.y = -0.9;
        temp.scene.rotation.x = 0.3;

        // scene.add(el.scene);
        group.add(el.scene);

        // 부모 요소에는 castShadow가 true이지만 자식요소의 그림자옵션 false -> true로 변경
        el.scene.traverse(function (child) {
          const temp2 = child;
          if (temp2 instanceof THREE.Mesh) {
            temp2.castShadow = true;
          }
        });

        let step = 0;

        const animate = () => {
          if (temp) {
            step += 0.02;
            temp.scene.scale.set(0.5, 0.5, 0.5);
            temp.scene.position.y = 0.5 * Math.abs(Math.sin(step));
            // el.scene.position.y = Math.sin(elapsedTime * .5) * .1 - 0.1
            sphereShadow.material.opacity =
              (1 - Math.abs(el.scene.position.y)) * 0.5;
          }
          // requestAnimationFrame: 애니메이션을 무한 반복 되도록 하는 메서드
          requestAnimationFrame(animate);
          controls.update();

          rendererPrev.render(scenePrev, cameraPrev);
        };
        animate();
      });
      const glftLoaderSub = new GLTFLoader();
      glftLoaderSub.load('assets/img/gomi/bamboo.gltf', ele => {
        const temp3 = ele;
        temp3.scene.position.x = -1.1;
        temp3.scene.position.y = 0.4;
        temp3.scene.position.z = 0.4;
        temp3.scene.rotation.y = 2;
        temp3.scene.rotation.x = 0.3;
        group.add(ele.scene);

        // scene.add(el.scene);
        ele.scene.scale.set(0.1, 0.1, 0.1);
      });

      scenePrev.add(group);
    }
  }, [refDiv]);

  return <CustomDiv ref={refDiv} />;
}
export default Model;
