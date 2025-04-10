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
  name: string,
  label: string,
  slug: string,
  values: AttributeValueResponse[]
}

export type CategoryBrandResponse = {
  id: number,
  brand: string,
  category: string
}

type ProductAttributeResponse = {
  attribute: string,
  value: string,
  lable: string
}

export type BrandResponse = {
  id: number,
  name: string
}

export type CategoryResponse = {
  id: number,
  name: string,
  slug: string,
  icon: string,
  active: boolean
}

export type ProductResponse = {
  id: string,
  name: string,
  slug: string,
  thumbnail: string,
  oldPrice: number,
  newPrice: number,
  discount: number,
  viewCount: number,
  note: string,
  description: string,
  quantity: number,
  active: boolean,
  brand: BrandResponse,
  category: CategoryResponse,
  attributes: ProductAttributeResponse[]
}