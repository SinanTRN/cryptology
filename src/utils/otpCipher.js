export const generatePad = (length) => {
  let pad = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  for (let i = 0; i < length; i++) {
    pad += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return pad;
};

export const otpEncryptDecrypt = (text, key) => {
  if (text.length !== key.length) {
    throw new Error('Metin ve anahtar uzunlukları eşit olmalıdır (One Time Pad kuralı).');
  }

  let result = '';
  for (let i = 0; i < text.length; i++) {
    // karakterlerin ascii değerlerini aldım.
    const xorValue = text.charCodeAt(i) ^ key.charCodeAt(i);
    // tekrardan karaktere dönüştürdüm.
    result += String.fromCharCode(xorValue);
  }
  return result;
};

export const toHex = (str) => {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    hex += '' + str.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return hex;
};
