'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Alert from '@/app/dashboard/components/Alert';

export default function AddInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const [invoice, setInvoice] = useState({
    patient_id: '',
    amount: '',
    status: 'pending',
    due_date: '',
    payment_method: 'cash',
    description: '',
    appointment_id: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/invoices', invoice, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        setNotification({
          message: 'تم إضافة الفاتورة بنجاح',
          type: 'success'
        });
        setTimeout(() => router.push('/dashboard/finance'), 2000);
      }
    } catch (error) {
      setError('فشل في إضافة الفاتورة');
      setNotification({
        message: 'فشل في إضافة الفاتورة',
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">إضافة فاتورة جديدة</h1>
          <button
            onClick={() => router.push('/dashboard/finance')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            العودة للقائمة
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                رقم المريض
              </label>
              <input
                type="text"
                name="patient_id"
                value={invoice.patient_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                المبلغ
              </label>
              <input
                type="number"
                name="amount"
                value={invoice.amount}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                الحالة
              </label>
              <select
                name="status"
                value={invoice.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="pending">قيد الانتظار</option>
                <option value="paid">مدفوع</option>
                <option value="overdue">متأخر</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                تاريخ الاستحقاق
              </label>
              <input
                type="date"
                name="due_date"
                value={invoice.due_date}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                طريقة الدفع
              </label>
              <select
                name="payment_method"
                value={invoice.payment_method}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="cash">نقدي</option>
                <option value="card">بطاقة ائتمان</option>
                <option value="bank_transfer">تحويل بنكي</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                رقم الموعد
              </label>
              <input
                type="text"
                name="appointment_id"
                value={invoice.appointment_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                الوصف
              </label>
              <textarea
                name="description"
                value={invoice.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                rows="3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'جاري الإضافة...' : 'إضافة الفاتورة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}