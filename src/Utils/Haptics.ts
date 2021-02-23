const HapticStrength = {
    light: 'light',
    medium: 'medium',
    heavy: 'heavy'
}

const fireHaptic = ( hapticStrength = HapticStrength.medium ) => {

    const event = new Event("haptic");
    event.detail = hapticStrength;
    if (window)
        window.dispatchEvent(event);

};

export {
    fireHaptic,
    HapticStrength
};