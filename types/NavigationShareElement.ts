import { ImageItem } from "../data/images";
export type RootStackParamList = {
  ImageGallery: undefined;
  ImageDetails: { item: ImageItem };
};