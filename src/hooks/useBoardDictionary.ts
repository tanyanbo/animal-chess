import { ref } from "vue"

export function useBoardDictionary() {
  const dict = ref<
    Record<
      string,
      {
        piece: boolean
        color: "black" | "red"
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
    0: { piece: true, color: "black", animal: "lion" },
    1: { piece: false, color: "black", animal: null },
    2: { piece: false, color: "black", animal: null },
    3: { piece: false, color: "black", animal: null },
    4: { piece: false, color: "black", animal: null },
    5: { piece: false, color: "black", animal: null },
    6: { piece: true, color: "black", animal: "tiger" },
    7: { piece: false, color: "black", animal: null },
    8: { piece: true, color: "black", animal: "dog" },
    9: { piece: false, color: "black", animal: null },
    10: { piece: false, color: "black", animal: null },
    11: { piece: false, color: "black", animal: null },
    12: { piece: true, color: "black", animal: "cat" },
    13: { piece: false, color: "black", animal: null },
    14: { piece: true, color: "black", animal: "mouse" },
    15: { piece: false, color: "black", animal: null },
    16: { piece: true, color: "black", animal: "cheetah" },
    17: { piece: false, color: "black", animal: null },
    18: { piece: true, color: "black", animal: "wolf" },
    19: { piece: false, color: "black", animal: null },
    20: { piece: true, color: "black", animal: "elephant" },
    21: { piece: false, color: "black", animal: null },
    22: { piece: false, color: "black", animal: null },
    23: { piece: false, color: "black", animal: null },
    24: { piece: false, color: "black", animal: null },
    25: { piece: false, color: "black", animal: null },
    26: { piece: false, color: "black", animal: null },
    27: { piece: false, color: "black", animal: null },
    28: { piece: false, color: "black", animal: null },
    29: { piece: false, color: "black", animal: null },
    30: { piece: false, color: "black", animal: null },
    31: { piece: false, color: "black", animal: null },
    32: { piece: false, color: "black", animal: null },
    33: { piece: false, color: "black", animal: null },
    34: { piece: false, color: "black", animal: null },
    35: { piece: false, color: "black", animal: null },
    36: { piece: false, color: "black", animal: null },
    37: { piece: false, color: "black", animal: null },
    38: { piece: false, color: "black", animal: null },
    39: { piece: false, color: "black", animal: null },
    40: { piece: false, color: "black", animal: null },
    41: { piece: false, color: "black", animal: null },
    42: { piece: true, color: "red", animal: "elephant" },
    43: { piece: false, color: "black", animal: null },
    44: { piece: true, color: "red", animal: "wolf" },
    45: { piece: false, color: "black", animal: null },
    46: { piece: true, color: "red", animal: "cheetah" },
    47: { piece: false, color: "black", animal: null },
    48: { piece: true, color: "red", animal: "mouse" },
    49: { piece: false, color: "black", animal: null },
    50: { piece: true, color: "red", animal: "cat" },
    51: { piece: false, color: "black", animal: null },
    52: { piece: false, color: "black", animal: null },
    53: { piece: false, color: "black", animal: null },
    54: { piece: true, color: "red", animal: "dog" },
    55: { piece: false, color: "black", animal: null },
    56: { piece: true, color: "red", animal: "tiger" },
    57: { piece: false, color: "black", animal: null },
    58: { piece: false, color: "black", animal: null },
    59: { piece: false, color: "black", animal: null },
    60: { piece: false, color: "black", animal: null },
    61: { piece: false, color: "black", animal: null },
    62: { piece: true, color: "red", animal: "lion" },
  })

  return { dict }
}
