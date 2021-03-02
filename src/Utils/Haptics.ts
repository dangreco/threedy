enum HapticStrength {
    Light = "light",
    Medium = "medium",
    Heavy = "heavy"
}

interface HapticEvent extends Event {
    detail: HapticStrength
}

const fireHaptic = ( hapticStrength: HapticStrength = HapticStrength.Medium ) => {

    const event: HapticEvent = (new Event("haptic")) as HapticEvent;
    event.detail = hapticStrength;

    if (window)
        window.dispatchEvent(event);

};

export {
    fireHaptic,
    HapticStrength
};
