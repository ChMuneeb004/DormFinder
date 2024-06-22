export function bufferToBase64(buffer) {
    const binary = Array.from(new Uint8Array(buffer)).map(byte => String.fromCharCode(byte)).join('');
    return window.btoa(binary);
}