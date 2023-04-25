export interface LoginPayload {
  success: boolean;
  user: User;
  token: string;
}

export interface User {
  avatar: Avatar;
  role: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  __v: number;
  resetPasswordExpire: string;
  resetPasswordToken: string;
}

export interface UserType {
  avatar: Avatar;
  role: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  __v: number;
  resetPasswordExpire: string;
  resetPasswordToken: string;
}

export interface Avatar {
  public_id: string;
  url: string;
}

export interface ProductType {
  ratings: number;
  Stock: number;
  numOfReviews: number;
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: Image[];
  user: string;
  reviews: any[];
  createdAt: string;
  __v: number;
}

export interface Image {
  _id: string;
  public_id: string;
  url: string;
}

export interface Cart {
  _id: string;
  user: string;
  product: string;
  name: string;
  price: string;
  quantity: string;
  description: string;
  image: string;
  __v: number;
}
