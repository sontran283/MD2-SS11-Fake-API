/**
 * ham format tien te viet nam
 * @param {*} money  // tham so truyen vao la chuoi tien te can format
 * @returns  // chuoi tien te da duoc format
 * Author : SONTRAN
 */
export const formatMoney = (money) => {
  return money.toLocaleString("vi", { style: "currency", currency: "VND" });
};

export const formatDate = () => {};

export const formatEmail = () => {};
