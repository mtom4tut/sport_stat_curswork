import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getToken() {
  const token = await FingerprintJS.load()
    .then(fp => fp.get())
    .then(result => {
      return result.visitorId;
    });

  return token;
}
