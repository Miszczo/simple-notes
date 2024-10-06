export function dispatchCustomEvent(element, eventName, detail = null, options = { bubbles: true, composed: true }) {
    const event = new CustomEvent(eventName, {
        detail,
        ...options
    });
    element.dispatchEvent(event);
}
