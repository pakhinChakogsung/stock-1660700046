// src/pages/Dashboard.tsx
import type { Product } from '../types';

interface Props {
  products: Product[];
}

export const Dashboard = ({ products }: Props) => {
  const totalItems = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const outOfStock = products.filter(p => p.quantity === 0).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4">แดชบอร์ดสรุปข้อมูล</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: จำนวนรายการ */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
          <div className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">ชนิดสินค้าทั้งหมด</div>
          <div className="text-5xl font-black text-gray-900">{totalItems} <span className="text-xl font-normal text-gray-400 text-sm">รายการ</span></div>
        </div>

        {/* Card 2: มูลค่ารวม */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
          <div className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2">มูลค่ารวมในสต๊อก</div>
          <div className="text-4xl font-black text-gray-900">฿{totalValue.toLocaleString()}</div>
        </div>

        {/* Card 3: สินค้าหมด (Conditional Color) */}
        <div className={`p-8 rounded-2xl shadow-sm border transition-all ${outOfStock > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
          <div className={`${outOfStock > 0 ? 'text-red-600' : 'text-gray-500'} font-bold uppercase tracking-wider text-sm mb-2`}>สินค้าที่ของหมด</div>
          <div className={`text-5xl font-black ${outOfStock > 0 ? 'text-red-700' : 'text-gray-900'}`}>{outOfStock}</div>
        </div>
      </div>
    </div>
  );
};