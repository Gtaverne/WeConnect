import {decode as atob, encode as btoa} from 'base-64'

const encrypt = async (text, derivedKey) => {
  const encodedText = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) {
    encodedText[i] = text.charCodeAt(i);
  }

  //IV can be null as each key pair is unique to a message
  const iv = new Uint8Array(1);
  iv[0] = 0;

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    derivedKey,
    encodedText
  );

  const uintArray = new Uint8Array(encryptedData);

  const string = String.fromCharCode.apply(null, uintArray);

  const base64Data = btoa(string);

  return base64Data;
};

const decrypt = async (text, derivedKey) => {
  try {
    const iv = new Uint8Array(1);
    iv[0] = 0;

    const string = atob(text);
    const uintArray = new Uint8Array(
      [...string].map((char) => char.charCodeAt(0))
    );
    const algorithm = {
      name: "AES-GCM",
      iv: iv,
    };
    const decryptedData = await window.crypto.subtle.decrypt(
      algorithm,
      derivedKey,
      uintArray
    );

    const view = new Int8Array(decryptedData);


    let decryptedString = "";
    for (let i = 0; i < decryptedData.byteLength; i++) {
      console.log(decryptedData);
      decryptedString += String.fromCharCode(view[i]);
    }

    return decryptedString;
  } catch (e) {
    return `error decrypting message: ${e}`;
  }
};

export default {encrypt, decrypt};
