import { ref } from "vue";

export function useBoardDictionary() {
  const dict = ref<Uint16Array>(
    new Uint16Array([
      64, 0, 0, 0, 0, 0, 32, 0, 4, 0, 0, 0, 2, 0, 1, 0, 16, 0, 8, 0, 128, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 384, 0, 264, 0,
      272, 0, 257, 0, 258, 0, 0, 0, 260, 0, 288, 0, 0, 0, 0, 0, 320,
    ])
  );

  return { dict };
}
