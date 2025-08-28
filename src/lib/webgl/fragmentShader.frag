precision mediump float;

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDisplacement;
uniform float uProgress;
uniform float uIntensity;
uniform vec4 res;

varying vec2 vUv;

const float PI = 3.14159;
const float angle1 = PI * 0.25;
const float angle2 = -PI * 0.75;

mat2 getRotM(float angle){
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float easeOutCubic(float t){
  return 1.0 - pow(1.0 - t, 4.0);
}

void main(){
  float progress = easeOutCubic(uProgress);

  vec4 disp = texture2D(uDisplacement, vUv);
  vec2 dispVec = vec2(disp.r, disp.g);

  mat2 rot1 = getRotM(angle1);
  mat2 rot2 = getRotM(angle2);

  vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;
  vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);

  vec2 distortedPosition1 = myUV + rot1 * dispVec * uIntensity * progress;
  vec2 distortedPosition2 = myUV + rot2 * dispVec * uIntensity * (1.0 - progress);

  vec4 t1 = texture2D(uTexture1, distortedPosition1);
  vec4 t2 = texture2D(uTexture2, distortedPosition2);

  gl_FragColor = mix(t1, t2, progress);
}