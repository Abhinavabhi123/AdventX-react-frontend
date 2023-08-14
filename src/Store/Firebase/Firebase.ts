import { storage } from "./FirebaseConfig";
export const uploadImage = async (file: File) => {
  const storageRef = storage.ref(`/eventImages/`);
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  return await fileRef.getDownloadURL();
};
export const deleteImage = async (image: string) => {
  function getImageNameFromUrl(url: string) {
    const startIndex = url.lastIndexOf("%2F") + 3;  
    const endIndex = url.indexOf("?alt=media&token=");
    const imageName = url.substring(startIndex, endIndex);
    return imageName;
  }
  const imageName = getImageNameFromUrl(image);
  const storageRef = storage.ref(`/eventImages/${imageName}`);
  storageRef.delete();
  return;
};
