import { setTimeoutPromise } from "../helpers/setTimeoutPromise"

export function useSound(volume: number, shouldPlaySound: boolean) {
  const tigerSound = new Audio("/src/assets/sounds/tiger.mp3")
  tigerSound.volume = volume
  const wolfSound = new Audio("/src/assets/sounds/wolf.mp3")
  wolfSound.volume = volume
  const dogSound = new Audio("/src/assets/sounds/dog.mp3")
  dogSound.volume = volume
  const catSound = new Audio("/src/assets/sounds/cat.mp3")
  catSound.volume = volume
  const mouseSound = new Audio("/src/assets/sounds/mouse.mp3")
  mouseSound.volume = volume
  const elephantSound = new Audio("/src/assets/sounds/elephant.mp3")
  elephantSound.volume = volume

  const SOUND_DICT: Record<Animal, HTMLAudioElement> = {
    lion: tigerSound,
    tiger: tigerSound,
    cheetah: tigerSound,
    wolf: wolfSound,
    elephant: elephantSound,
    dog: dogSound,
    cat: catSound,
    mouse: mouseSound,
  }

  async function playSound(animal: Animal) {
    SOUND_DICT[animal].play()
    const duration = Math.ceil(SOUND_DICT[animal].duration * 1000)
    if (shouldPlaySound) {
      await setTimeoutPromise(duration)
    }
  }

  return {
    playSound,
  }
}
