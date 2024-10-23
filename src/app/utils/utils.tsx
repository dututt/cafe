import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";

export function getURL() {
  // const pathname = usePathname()
  // const searchParams = useSearchParams();
  // const hash = typeof window !== 'undefined' ? window.location.hash : '';
  // const fullUrl = `${window.location.origin}${pathname}${searchParams && searchParams.toString() ? '?' + searchParams.toString() : ''}${hash}`;
  // let tableNum = fullUrl.split("#")[1]
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}

export function isOrder(user: UserResource | User) {
  return user.publicMetadata?.role === "order";
}

export function isManager(user: UserResource | User) {
  return user.publicMetadata?.role === "manager";
}

export const playBeepSound = () => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext ||
    AudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency in Hz
  gainNode.gain.setValueAtTime(1, audioContext.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5); // Beep duration in seconds
};
