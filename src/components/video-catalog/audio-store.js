class AudioStore {
  constructor() {
    this.activeVideoId = null;
    this.soundUnlocked = false;
    this.visibility = new Map();
    this.focusedId = null;
    this.listeners = new Set();
  }

  getState() {
    return {
      activeVideoId: this.activeVideoId,
      soundUnlocked: this.soundUnlocked,
      focusedId: this.focusedId,
    };
  }

  emit() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  setActiveVideo(id) {
    this.activeVideoId = id;
    this.emit();
  }

  getActiveVideo() {
    return this.activeVideoId;
  }

  unlockSound(id) {
    this.soundUnlocked = true;
    this.activeVideoId = id ?? this.focusedId;
    if (id) this.focusedId = id;
    this.emit();
  }

  lockSound() {
    this.soundUnlocked = false;
    this.activeVideoId = null;
    this.emit();
  }

  reportVisibility(id, ratio) {
    if (ratio > 0) this.visibility.set(id, ratio);
    else this.visibility.delete(id);
    this.recomputeFocus();
    this.emit();
  }

  recomputeFocus() {
    const currentRatio = this.focusedId ? this.visibility.get(this.focusedId) || 0 : 0;
    if (this.focusedId && currentRatio >= 0.4) {
      if (this.soundUnlocked) this.activeVideoId = this.focusedId;
      return;
    }

    let bestId = null;
    let best = 0.4;
    for (const [entryId, ratio] of this.visibility) {
      if (ratio >= best) {
        best = ratio;
        bestId = entryId;
      }
    }

    this.focusedId = bestId;

    if (this.soundUnlocked && bestId) {
      this.activeVideoId = bestId;
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const audioStore = new AudioStore();
