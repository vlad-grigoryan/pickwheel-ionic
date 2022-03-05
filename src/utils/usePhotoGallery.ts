import { Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem'
import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';

export async function savePicture(photo: Photo, filename: string): Promise<any> {
  const IMAGE_DIR = 'stored-images';
  const base64Data = await base64FromPath(photo.webPath!);
  const savedFile = await Filesystem.writeFile({
    path: filename,
    data: base64Data,
    directory: Directory.Documents,
  })
  if (isPlatform('hybrid')) {
    // Display the new image by rewriting the 'file://' path to HTTP
    // Details: https://ionicframework.com/docs/building/webview#file-protocol
    return {
      filepath: `${IMAGE_DIR}/${filename}`,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  } else {
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory      
    return {
      filepath: filename,
      webviewPath: photo.webPath,
    };
  }
};

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
};