import api from "./api";

export const addToCart = async (productId, quantity) => {

  const response = await api.post("/cart", {
    productId,
    quantity
  });

  return response.data;

};
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data.data;
};

export const updateCartQuantity = async (id, quantity) => {
  return await api.put(`/cart/${id}?quantity=${quantity}`);
};

export const removeCartItem = async (id) => {
  await api.delete(`/cart/${id}`);
};