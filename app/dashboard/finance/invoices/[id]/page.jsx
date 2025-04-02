'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ShowInvoicePage({ params }) {
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/invoices/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.data) {
          setInvoice(response.data.data);
        }
      } catch (error) {
        setError('فشل في تحميل بيانات الفاتورة');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchInvoice();
    }
  }, [params.id]);

  const getStatusInArabic = (status) => {
    const statusMap = {
      'pending': 'قيد الانتظار',
      'paid': 'مدفوع',
      'overdue': 'متأخر',
      'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">تفاصيل الفاتورة #{invoice?.id}</h1>
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

        {invoice && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">معلومات المريض</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">الاسم</p>
                    <p className="text-lg text-gray-900">{invoice.patient?.name}</p>
                    <p className="text-sm font-medium text-gray-600 mt-2">رقم الهاتف</p>
                    <p className="text-gray-900">{invoice.patient?.phone}</p>
                    <p className="text-sm font-medium text-gray-600 mt-2">البريد الإلكتروني</p>
                    <p className="text-gray-900">{invoice.patient?.email}</p>
                    <p className="text-sm font-medium text-gray-600 mt-2">العنوان</p>
                    <p className="text-gray-900">{invoice.patient?.address}</p>
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">تفاصيل الفاتورة</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">المبلغ</p>
                        <p className="text-xl font-bold text-green-600">₪{invoice.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">الحالة</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                            invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {getStatusInArabic(invoice.status)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">تاريخ الاستحقاق</p>
                        <p className="text-gray-900">{invoice.due_date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">طريقة الدفع</p>
                        <p className="text-gray-900">{invoice.payment_method}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600">الوصف</p>
                      <p className="text-gray-900">{invoice.description}</p>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900">تفاصيل الموعد</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">رقم الموعد</p>
                        <p className="text-gray-900">#{invoice.appointment?.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">التاريخ</p>
                        <p className="text-gray-900">{invoice.appointment?.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">الوقت</p>
                        <p className="text-gray-900">{invoice.appointment?.time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">حالة الموعد</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${invoice.appointment?.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            invoice.appointment?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {getStatusInArabic(invoice.appointment?.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}