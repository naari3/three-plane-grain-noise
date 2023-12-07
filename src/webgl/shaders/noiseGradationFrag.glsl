uniform float u_aspect;
uniform vec3 u_color;
uniform float u_grainSize;
uniform float u_offset;
uniform float u_length;

varying vec2 v_uv;

float rand(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}


void main() {
  float ps = 1.0 / pow(2.0, u_grainSize);
  vec2 ps2 = vec2(ps, ps * u_aspect);
  vec2 pixelated = vec2(
    floor(v_uv.x / ps2.x) * ps2.x,
    floor(v_uv.y / ps2.y) * ps2.y
  );
  float r = rand(pixelated * 100.0);
  if (r > (v_uv.x * u_length) - u_offset) {
    gl_FragColor = vec4(u_color, 1.0);
  } else {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);
  }
  // gl_FragColor = vec4(pixelated.x, pixelated.y, 1.0, 1.0);
}
