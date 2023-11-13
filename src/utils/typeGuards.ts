import { AssetData } from "../types/AssetFactory";

export const isMesh = (mesh?: unknown): mesh is THREE.Mesh => {
  return !!mesh && (mesh as THREE.Mesh).type === "Mesh";
};

export const isAssetData = (data?: unknown): data is AssetData => {
  return (
    !!data &&
    (data as AssetData).x !== undefined &&
    (data as AssetData).y !== undefined
  );
};
