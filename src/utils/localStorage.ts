import type { IUser } from "../types/IUser";
import type { Product } from "../types/Product";

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

export const saveCart = (cart: Product[]) => {
  localStorage.setItem("cartData", JSON.stringify(cart));
};

export const getCart = (): Product[] =>{
  const cart = localStorage.getItem("cartData");
  return cart ? JSON.parse(cart) : [];
};

export const removeCart = () => {
  localStorage.removeItem("cartData");
}