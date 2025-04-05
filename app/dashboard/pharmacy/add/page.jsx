'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Alert from '@/app/components/Alert';

export default function AddMedicationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    generic_name: '',
    category: '',
    description: '',
    price: '',
    stock_quantity: '',
    manufacturer: '',
    expiry_date: '',
    requires_prescription: false,
    status: 'active'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data before sending
    const validationErrors = [];
    
    if (!formData.name || formData.name.length > 255) {
      validationErrors.push('اسم الدواء مطلوب ويجب أن لا يتجاوز 255 حرف');
    }
    
    if (!formData.generic_name || formData.generic_name.length > 255) {
      validationErrors.push('الاسم العلمي مطلوب ويجب أن لا يتجاوز 255 حرف');
    }

    if (!formData.category) {
      validationErrors.push('الفئة مطلوبة');
    }

    if (formData.price < 0 || isNaN(formData.price)) {
      validationErrors.push('السعر يجب أن يكون رقماً موجباً');
    }

    if (formData.stock_quantity < 0 || !Number.isInteger(Number(formData.stock_quantity))) {
      validationErrors.push('الكمية يجب أن تكون رقماً صحيحاً موجباً');
    }

    if (!formData.manufacturer) {
      validationErrors.push('الشركة المصنعة مطلوبة');
    }

    const today = new Date();
    const expiryDate = new Date(formData.expiry_date);
    if (!formData.expiry_date || expiryDate <= today) {
      validationErrors.push('تاريخ انتهاء الصلاحية يجب أن يكون بعد تاريخ اليوم');
    }

    if (validationErrors.length > 0) {
      setNotification({
        message: validationErrors.join('\n'),
        type: 'error'
      });
      setLoading(false);
      return;
    }

    // Convert data types to match backend requirements
    const formattedData = {
      ...formData,
      price: Number(formData.price),
      stock_quantity: parseInt(formData.stock_quantity),
      requires_prescription: Boolean(formData.requires_prescription),
      status: formData.status || 'active'
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/pharmacy', formattedData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      setNotification({
        message: 'تم إضافة الدواء بنجاح',
        type: 'success'
      });
      
      setTimeout(() => {
        router.push('/dashboard/pharmacy');
      }, 2000);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'فشل في إضافة الدواء',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {notification && (
        <Alert
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">إضافة دواء جديد</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الدواء</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الاسم العلمي</label>
              <input
                type="text"
                value={formData.generic_name}
                onChange={(e) => setFormData({ ...formData, generic_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">السعر</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الكمية المتوفرة</label>
              <input
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الشركة المصنعة</label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ انتهاء الصلاحية</label>
              <input
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={formData.requires_prescription}
              onChange={(e) => setFormData({ ...formData, requires_prescription: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="mr-2 block text-sm text-gray-700">يتطلب وصفة طبية</label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard/pharmacy')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'جاري الحفظ...' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}