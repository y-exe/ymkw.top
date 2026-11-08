import * as THREE from 'three';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';

export function transparentBloom(renderer, scene, camera, options={}) {
 const {motionBlur={value:0},bloomScale=1,bloomStrength=1.5,samples=0,enableMotionBlur=false}=options;
 const base=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,samples});
 // bloom入力はbase (フル解像度のレンダリング結果) を縮小コピーして流用する。
 // 旧実装はRenderPassでシーンを毎フレーム2回描画していたが、出力は同一のため
 // コピー1枚で置き換えても見た目は変わらず、シーン描画コストが半分になる。
 // 注意: ShaderPassはrender()内でtDiffuseをreadBuffer.textureで上書きするため、
 // baseを入力に渡せない。自前のコピーquad + UnrealBloomPass直接呼び出しで構成する。
 const copyMaterial=new THREE.ShaderMaterial({uniforms:{tex:{value:null}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:'varying vec2 vUv;uniform sampler2D tex;void main(){gl_FragColor=texture2D(tex,vUv);}',depthTest:false,depthWrite:false});
 const copyScene=new THREE.Scene();copyScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),copyMaterial));
 const bloomRT=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType});
 const bloomPass=new UnrealBloomPass(new THREE.Vector2(1,1),bloomStrength,.35,1);
 const fragmentShader=enableMotionBlur
  ?`varying vec2 vUv;uniform sampler2D base;uniform sampler2D bloom;uniform float motionBlur;
    void main(){vec4 b=vec4(0.);vec3 bloomColor=vec3(0.);float total=0.;
    for(int i=-3;i<=3;i++){float weight=4.-abs(float(i));vec2 uv=clamp(vUv+vec2(float(i)/3.*motionBlur,0.),vec2(0.),vec2(1.));b+=texture2D(base,uv)*weight;bloomColor+=texture2D(bloom,uv).rgb*weight;total+=weight;}
    b/=total;bloomColor/=total;vec3 delta=max(bloomColor-b.rgb,vec3(0.));float red=max(delta.r-max(delta.g,delta.b)*1.25,0.);vec3 glow=vec3(red,red*.025,red*.01);float a=max(b.a,clamp(max(glow.r,max(glow.g,glow.b)),0.,1.));gl_FragColor=vec4((b.rgb+glow)/max(a,.00001),a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    }`
  :`varying vec2 vUv;uniform sampler2D base;uniform sampler2D bloom;
    void main(){vec4 b=texture2D(base,vUv);vec3 bloomColor=texture2D(bloom,vUv).rgb;vec3 delta=max(bloomColor-b.rgb,vec3(0.));float red=max(delta.r-max(delta.g,delta.b)*1.25,0.);vec3 glow=vec3(red,red*.025,red*.01);float a=max(b.a,clamp(max(glow.r,max(glow.g,glow.b)),0.,1.));gl_FragColor=vec4((b.rgb+glow)/max(a,.00001),a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    }`;
 const material=new THREE.ShaderMaterial({
  uniforms:{base:{value:base.texture},bloom:{value:null},motionBlur},
  vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',
  fragmentShader,depthTest:false,depthWrite:false,
 });
 const output=new THREE.Scene();output.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
 const ortho=new THREE.Camera();
 function resize(){const size=renderer.getDrawingBufferSize(new THREE.Vector2());base.setSize(size.x,size.y);const bw=Math.max(1,Math.ceil(innerWidth*bloomScale)),bh=Math.max(1,Math.ceil(innerHeight*bloomScale));bloomRT.setSize(bw,bh);bloomPass.setSize(bw,bh);}
 resize();addEventListener('resize',resize);
 return {
  render(){
   renderer.setRenderTarget(base);renderer.clear();renderer.render(scene,camera);renderer.setRenderTarget(null);
   // bloom入力 = baseの縮小コピー (UnrealBloomPassはreadBufferに加算書き込みする (needsSwap=false))
   copyMaterial.uniforms.tex.value=base.texture;
   renderer.setRenderTarget(bloomRT);renderer.clear();renderer.render(copyScene,ortho);
   bloomPass.render(renderer,bloomRT,bloomRT);
   material.uniforms.bloom.value=bloomRT.texture;
   renderer.setRenderTarget(null);renderer.render(output,ortho);
  },
  dispose(){removeEventListener('resize',resize);base.dispose();bloomRT.dispose();bloomPass.dispose();copyMaterial.dispose();material.dispose();},
 };
}
