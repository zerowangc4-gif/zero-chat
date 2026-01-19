import { useCallback } from "react";
import { Platform, PermissionsAndroid } from "react-native";

export function useAndroidPermission() {
  const requestPermission = useCallback(async () => {
    if (Platform.OS !== "android") return true;

    const sdkVersion = parseInt(Platform.Version.toString(), 10);

    const permission =
      sdkVersion >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const granted = await PermissionsAndroid.request(permission);

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }, []);

  return { requestPermission };
}
