import { setTimeoutPromise } from "../helpers/setTimeoutPromise"

export function useSound(volume: number, shouldPlaySound: boolean) {
  const tigerSound = new Audio(
    new URL("../assets/sounds/tiger.mp3", import.meta.url).href
  )
  tigerSound.volume = volume
  const wolfSound = new Audio(
    new URL("../assets/sounds/wolf.mp3", import.meta.url).href
  )
  wolfSound.volume = volume
  const dogSound = new Audio(
    new URL("../assets/sounds/dog.mp3", import.meta.url).href
  )
  dogSound.volume = volume
  const catSound = new Audio(
    new URL("../assets/sounds/cat.mp3", import.meta.url).href
  )
  catSound.volume = volume
  const mouseSound = new Audio(
    new URL("../assets/sounds/mouse.mp3", import.meta.url).href
  )
  mouseSound.volume = volume
  const elephantSound = new Audio(
    new URL("../assets/sounds/elephant.mp3", import.meta.url).href
  )
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
