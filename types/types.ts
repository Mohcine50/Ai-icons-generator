export type TStyle = { name: string; image: string };

export type TPromptProperties = {
  char: string;
  style: string;
  color: string;
  quantity: number;
};

export type image = {
  id: string;
  promptId: string;
  imageUrl: string;
};
export type collectionType = {
  id: string;
  images: image[];
  promptProperties: {
    id: string;
    character: string;
    color: string;
    style: string;
    quantity: number;
  };
};
