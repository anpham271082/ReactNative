import { ImageItem } from "../app/data/images";
export type RootStackParamList = {
  ImageGallery: undefined;
  ImageDetails: { item: ImageItem };
};