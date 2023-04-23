export interface ProductsPayloadType {
    success: boolean
    products: Product[]
    productsCount: number
    resultPerPage: number
    filteredProductsCount: number
}

export interface Product {
    ratings: number
    Stock: number
    numOfReviews: number
    _id: string
    name: string
    desc?: string
    price: number
    stock?: number
    image?: string
    brand?: string
    category: string
    sellerId?: string
    __v: number
    images: Image[]
    reviews: any[]
    createdAt: string
    description?: string
    user?: string
}

export interface Image {
    _id: string
    public_id: string
    url: string
}
