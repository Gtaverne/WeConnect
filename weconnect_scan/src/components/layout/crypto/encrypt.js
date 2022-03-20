export default async (text, derivedKey) => {
	const encodedText = new TextEncoder().encode(text);

	const iv = new Uint8Array(1);
	iv[0] = 0;

	const encryptedData = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, derivedKey, encodedText);

	const uintArray = new Uint8Array(encryptedData);

	const string = String.fromCharCode.apply(null, uintArray);

	const base64Data = btoa(string);

	return base64Data;
};
