import { ref } from "vue"

export function useBoardDictionary() {
  const dict = ref<
    Record<
      string,
      {
        piece: boolean
        color: "blue" | "red"
        animal:
          | null
          | "mouse"
          | "cat"
          | "dog"
          | "wolf"
          | "cheetah"
          | "tiger"
          | "lion"
          | "elephant"
      }
    >
  >({
    0: { piece: true, color: "blue", animal: "lion" },
    1: { piece: false, color: "blue", animal: null },
    2: { piece: false, color: "blue", animal: null },
    3: { piece: false, color: "blue", animal: null },
    4: { piece: false, color: "blue", animal: null },
    5: { piece: false, color: "blue", animal: null },
    6: { piece: true, color: "blue", animal: "tiger" },
    7: { piece: false, color: "blue", animal: null },
    8: { piece: true, color: "blue", animal: "dog" },
    9: { piece: false, color: "blue", animal: null },
    10: { piece: false, color: "blue", animal: null },
    11: { piece: false, color: "blue", animal: null },
    12: { piece: true, color: "blue", animal: "cat" },
    13: { piece: false, color: "blue", animal: null },
    14: { piece: true, color: "blue", animal: "mouse" },
    15: { piece: false, color: "blue", animal: null },
    16: { piece: true, color: "blue", animal: "cheetah" },
    17: { piece: false, color: "blue", animal: null },
    18: { piece: true, color: "blue", animal: "wolf" },
    19: { piece: false, color: "blue", animal: null },
    20: { piece: true, color: "blue", animal: "elephant" },
    21: { piece: false, color: "blue", animal: null },
    22: { piece: false, color: "blue", animal: null },
    23: { piece: false, color: "blue", animal: null },
    24: { piece: false, color: "blue", animal: null },
    25: { piece: false, color: "blue", animal: null },
    26: { piece: false, color: "blue", animal: null },
    27: { piece: false, color: "blue", animal: null },
    28: { piece: false, color: "blue", animal: null },
    29: { piece: false, color: "blue", animal: null },
    30: { piece: false, color: "blue", animal: null },
    31: { piece: false, color: "blue", animal: null },
    32: { piece: false, color: "blue", animal: null },
    33: { piece: false, color: "blue", animal: null },
    34: { piece: false, color: "blue", animal: null },
    35: { piece: false, color: "blue", animal: null },
    36: { piece: false, color: "blue", animal: null },
    37: { piece: false, color: "blue", animal: null },
    38: { piece: false, color: "blue", animal: null },
    39: { piece: false, color: "blue", animal: null },
    40: { piece: false, color: "blue", animal: null },
    41: { piece: false, color: "blue", animal: null },
    42: { piece: true, color: "red", animal: "elephant" },
    43: { piece: false, color: "blue", animal: null },
    44: { piece: true, color: "red", animal: "wolf" },
    45: { piece: false, color: "blue", animal: null },
    46: { piece: true, color: "red", animal: "cheetah" },
    47: { piece: false, color: "blue", animal: null },
    48: { piece: true, color: "red", animal: "mouse" },
    49: { piece: false, color: "blue", animal: null },
    50: { piece: true, color: "red", animal: "cat" },
    51: { piece: false, color: "blue", animal: null },
    52: { piece: false, color: "blue", animal: null },
    53: { piece: false, color: "blue", animal: null },
    54: { piece: true, color: "red", animal: "dog" },
    55: { piece: false, color: "blue", animal: null },
    56: { piece: true, color: "red", animal: "tiger" },
    57: { piece: false, color: "blue", animal: null },
    58: { piece: false, color: "blue", animal: null },
    59: { piece: false, color: "blue", animal: null },
    60: { piece: false, color: "blue", animal: null },
    61: { piece: false, color: "blue", animal: null },
    62: { piece: true, color: "red", animal: "lion" },
  })

  return { dict }
}
