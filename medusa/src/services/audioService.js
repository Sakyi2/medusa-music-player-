// src/services/audioService.js

export async function playTrack(uri) {
  console.log('[MOCK AUDIO] Playing track:', uri || 'No URI provided');
  return true;
}

export async function stopTrack() {
  console.log('[MOCK AUDIO] Track stopped.');
  return true;
}