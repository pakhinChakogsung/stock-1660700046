// src/pages/Products.tsx
import { useState } from 'react';
import type { Product } from '../types';

interface Props {
  products: Product[];
  addProduct: (name: string, price: number, qty: number) => void;
  updateQuantity: (id: number, amt: number) => void;
  deleteProduct: (id: number) => void;
}

export const Products = ({ products, addProduct, updateQuantity, deleteProduct }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price !== '' && qty !== '') {
      addProduct(name, Number(price), Number(qty));
      setName(''); setPrice(''); setQty('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Form Section */}
      <section className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
           <span className="p-2 bg-blue-100 rounded-lg text-blue-600 text-sm">➕</span> เพิ่มสินค้าใหม่
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ชื่อสินค้า" value={name} onChange={e => setName(e.target.value)} required />
          <input className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" type="number" placeholder="ราคา" value={price} onChange={e => setPrice(e.target.value)} required />
          <input className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" type="number" placeholder="จำนวนเริ่มต้น" value={qty} onChange={e => setQty(e.target.value)} required />
          <button className="bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">เพิ่มสินค้าเข้าคลัง</button>
        </form>
      </section>

      {/* Search & List Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">รายการสต๊อกปัจจุบัน</h2>
          <div className="relative">
            <input className="bg-white border border-gray-200 px-5 py-2 pl-10 rounded-full w-full md:w-80 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ค้นหาชื่อสินค้า..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <span className="absolute left-3 top-2.5 opacity-40">🔍</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const isOutOfStock = product.quantity === 0;
            return (
              <div key={product.id} className={`p-6 rounded-3xl border transition-all flex flex-col justify-between hover:shadow-xl ${isOutOfStock ? 'bg-red-50 border-red-200 ring-1 ring-red-100' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold text-lg truncate ${isOutOfStock ? 'text-red-900' : 'text-gray-900'}`}>{product.name}</h3>
                    {isOutOfStock && <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">หมด</span>}
                  </div>
                  <div className="text-gray-500 text-sm">ราคาต่อหน่วย</div>
                  <div className="text-2xl font-black text-gray-950">฿{product.price.toLocaleString()}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(product.id, -1)} className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full font-bold transition-colors disabled:opacity-20" disabled={isOutOfStock}>-</button>
                    <span className={`text-xl font-bold w-8 text-center ${isOutOfStock ? 'text-red-600' : ''}`}>{product.quantity}</span>
                    <button onClick={() => updateQuantity(product.id, 1)} className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full font-bold transition-colors">+</button>
                  </div>
                  <button onClick={() => { if(window.confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) deleteProduct(product.id) }} className="text-gray-400 hover:text-red-600 p-2 transition-colors" title="ลบสินค้า">🗑️</button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400 font-medium">
            ไม่พบข้อมูลสินค้าที่ค้นหา...
          </div>
        )}
      </div>
    </div>
  );
};