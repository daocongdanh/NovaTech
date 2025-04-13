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
  price: number,
  discount: number,
  note: string,
  description: string,
  quantity: number,
  active: boolean,
  categorySlug: string,
  brandId: number,
  attributes: AttributeForProductRequest[]
}

export type ArticleRequest = {

}

export type AttributeForProductRequest = {
  attributeId: number,
  value: string
}