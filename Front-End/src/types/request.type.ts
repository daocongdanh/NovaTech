export type CategoryRequest = {
  name: string,
  image: string,
  active: boolean
}

export type BrandRequest = {
  name: string
}

export type AttributeRequest = {
  label: string
}

export type ProductRequest = {
  name: string,
  thumbnail: string,
  images?: string[],
  oldPrice: number,
  newPrice: number,
  note: string,
  description: string,
  quantity: number,
  active: boolean,
  categorySlug: string,
  brandId: number,
  attributes: AttributeForProductRequest[]
}

export type ArticleRequest = {
  title: string,
  thumbnail: string,
  content: string,
  active: boolean
}

export type AttributeForProductRequest = {
  attributeId: number,
  value: string
}

export type CategoryAttributeRequest = {
  categoryId: number,
  attributeId: number
}


export type CategoryBrandRequest = {
  categoryId: number,
  brandId: number
}
