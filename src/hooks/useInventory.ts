// src/hooks/useInventory.ts
import { useState, useEffect } from 'react';
import type { Product } from '../types'; // เติม .ts เข้าไปตรงๆ

export const useInventory = () => {
  // ดึงข้อมูลจาก LocalStorage ถ้ามี (Optional) หรือเริ่มด้วย Array ว่าง
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (name: string, price: number, quantity: number) => {
    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      quantity,
    };
    setProducts([...products, newProduct]);
  };

  const updateQuantity = (id: number, amount: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, quantity: Math.max(0, p.quantity + amount) } : p
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return { products, addProduct, updateQuantity, deleteProduct };
};