'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Alert from '@/app/components/Alert';
import Loading from '@/app/dashboard/loading';

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [financialSummary, setFinancialSummary] = useState({
    revenue: {
      total: 0
    },
    expenses: {
      total: 0
    }
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, [selectedPeriod]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/invoices', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.data) {
        setInvoices(response.data.data);
        calculateFinancialSummary(response.data.data);
        setNotification({
          message: 'تم تحميل البيانات المالية بنجاح',
          type: 'success'
        });
      }
    } catch (error) {
      setError('فشل في تحميل البيانات المالية');
      setNotification({
        message: 'فشل في تحميل البيانات المالية',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateFinancialSummary = (invoicesData) => {
    const summary = invoicesData.reduce((acc, invoice) => {
      const amount = parseFloat(invoice.amount);
      if (invoice.status === 'paid') {
        acc.revenue.total += amount;
      }
      acc.totalAmount += amount;
      acc.invoiceCounts.total += 1;
      acc.invoiceCounts[invoice.status] = (acc.invoiceCounts[invoice.status] || 0) + 1;
      
      return acc;
    }, {
      revenue: { total: 0 },
      expenses: { total: 0 },
      totalAmount: 0,
      invoiceCounts: {
        total: 0,
        paid: 0,
        pending: 0,
        overdue: 0
      }
    });
  
    setFinancialSummary(summary);
  };
  
  const getStatusInArabic = (status) => {
    const statusMap = {
      'pending': 'قيد الانتظار',
      'paid': 'مدفوع',
      'overdue': 'متأخر',
      'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (selectedCategory === 'all') return true;
    return invoice.status === selectedCategory;
  });

  if (loading) {
    return (
<Loading />
    );
  }

  return (
    <div className="p-6">
      {notification && (
        <Alert
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
            <span className="text-blue-600 text-3xl">💰</span>
            الإدارة المالية
          </h1>
          <p className="text-gray-500">إدارة الفواتير والمعاملات المالية</p>
        </div>
        <div className="flex gap-4 mt-6">
          {/* ... existing period selector buttons ... */}
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-600">الإيرادات المحصلة</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">الإجمالي</span>
            <span className="text-2xl font-bold text-green-600">₪{financialSummary.revenue.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Total Amount Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">إجمالي المستحقات</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">الإجمالي</span>
            <span className="text-2xl font-bold text-blue-600">₪{financialSummary.totalAmount?.toFixed(2) || '0.00'}</span>
          </div>
        </div>

        {/* Continue with all other cards... */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-600">المستحقات المعلقة</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">الإجمالي</span>
            <span className="text-2xl font-bold text-yellow-600">
              ₪{((financialSummary.totalAmount || 0) - (financialSummary.revenue.total || 0)).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-600">إجمالي الفواتير</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">العدد</span>
            <span className="text-2xl font-bold text-purple-600">{financialSummary.invoiceCounts?.total || 0}</span>
          </div>
        </div>
  
        {/* Paid Invoices */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-600">الفواتير المدفوعة</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">العدد</span>
            <span className="text-2xl font-bold text-green-600">{financialSummary.invoiceCounts.paid || 0}</span>
          </div>
        </div>
  
        {/* Pending Invoices */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-600">الفواتير المعلقة</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">العدد</span>
            <span className="text-2xl font-bold text-yellow-600">{financialSummary.invoiceCounts.pending || 0}</span>
          </div>
        </div>
  
        {/* Overdue Invoices */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-600">الفواتير المتأخرة</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">العدد</span>
            <span className="text-2xl font-bold text-red-600">{financialSummary.invoiceCounts.overdue || 0}</span>
          </div>
        </div>
  
        {/* Collection Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-600">معدل التحصيل</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">النسبة</span>
            <span className="text-2xl font-bold text-indigo-600">
              {((financialSummary.revenue.total / financialSummary.totalAmount) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
  
        {/* Average Invoice Amount */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-teal-600">متوسط قيمة الفاتورة</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">المتوسط</span>
            <span className="text-2xl font-bold text-teal-600">
              ₪{(financialSummary.totalAmount / financialSummary.invoiceCounts.total).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">الفواتير</h3>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              الكل
            </button>
            <button
              onClick={() => setSelectedCategory('paid')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'paid' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              مدفوع
            </button>
            <button
              onClick={() => setSelectedCategory('pending')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            >
              قيد الانتظار
            </button>
            <button
              onClick={() => setSelectedCategory('overdue')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'overdue' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              متأخر
            </button>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الفاتورة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المريض</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الاستحقاق</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوصف</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{invoice.patient?.name}</div>
                  <div className="text-sm text-gray-500">{invoice.patient?.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.due_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  ₪{invoice.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                      invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {getStatusInArabic(invoice.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/dashboard/finance/invoices/${invoice.id}`}
                    className="text-blue-600 hover:text-blue-900 ml-4"
                  >
                    عرض
                  </Link>
                  <Link 
                    href={`/dashboard/finance/invoices/edit/${invoice.id}`}
                    className="text-green-600 hover:text-green-900 ml-4"
                  >
                    تعديل
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link 
          href="/dashboard/finance/invoices/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          إضافة فاتورة
        </Link>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          تصدير التقرير
        </button>
      </div>
    </div>
  );
}