export type TResponse = {
  status: number;
  message: string;
};
export type Page<T> = {
  page: number;
  limit: number;
  totalPage: number;
  totalItem: number;
  result: T[];
};

export type ResponseSuccess<T> = {
  status: number;
  message: string;
  data: T;
};

export type ResponseError = {
  status: number;
  message: string;
};

type AttributeValueResponse = {
  value: string,
  slug: string
}

export type AttributeResponse = {
  id: number,
  label: string,
  slug: string,
  values: AttributeValueResponse[]
}

export type CategoryBrandResponse = {
  id: number,
  brand: string,
  category: string
}

export type ProductAttributeResponse = {
  attributeId: number,
  slug: string,
  value: string,
  label: string
}

export type BrandResponse = {
  id: number,
  name: string
}

export type CategoryResponse = {
  id: number,
  name: string,
  slug: string,
  image: string,
  active: boolean
}

type ImageResponse = {
  id: number,
  imageUrl: string
}
export type ProductResponse = {
  id: number,
  name: string,
  slug: string,
  thumbnail: string,
  oldPrice: number,
  newPrice: number,
  discount: number,
  viewCount: number,
  images: ImageResponse[],
  note: string,
  description: string,
  quantity: number,
  active: boolean,
  brand: BrandResponse,
  category: CategoryResponse,
  attributes: ProductAttributeResponse[]
}

export type Attribute = {
  id: number,
  label: string,
  slug: string
}

export type CategoryAttribute = {
  id: number,
  category: CategoryResponse,
  attribute: Attribute
}

export type CategoryBrand = {
  id: number,
  category: CategoryResponse,
  brand: BrandResponse
}

export type Article = {
  id: number,
  title: string,
  slug: string,
  thumbnail: string,
  content: string,
  createdAt: Date,
  active: boolean
}