# Code Stash

## Timeout Promise

from: stackoverflow.com/q/37704344/9448010

```typescript
https: function timeoutPromise(ms: number, promise: Promise<any>) {
  return new Promise<Response>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("promise timeout"));
    }, ms);

    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
        return res;
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}
```

## Unsplash collections

```typescript
const unsplashProfilePhotosCollectionId = 11514333;
const unsplashHotelPhotosCollectionId = 3466704;
```

MANUAL TEST: https://source.unsplash.com/collection/3466704/400x500`
