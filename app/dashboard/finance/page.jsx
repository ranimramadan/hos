'use client';
import { useState } from 'react';

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const financialData = {
    revenue: {
      total: 250000,
      treatments: 150000,
      medications: 60000,
      laboratory: 40000
    },
    expenses: {
      total: 180000,
      salaries: 100000,
      supplies: 50000,
      maintenance: 30000
    },
    transactions: [
      {
        id: 1,
        date: '2024-01-15',
        type: 'دخل',
        category: 'علاج',
        amount: 1500,
        description: 'كشف طبي - د. محمد أحمد',
        patient: 'أحمد خالد'
      },
      {
        id: 2,
        date: '2024-01-15',
        type: 'مصروف',
        category: 'مستلزمات',
        amount: 5000,
        description: 'شراء معدات طبية',
        department: 'قسم الطوارئ'
      }
    ]
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">الإدارة المالية</h1>

        {/* Period Selector */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedPeriod('daily')}
            className={`px-4 py-2 rounded-lg ${selectedPeriod === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            يومي
          </button>
          <button
            onClick={() => setSelectedPeriod('weekly')}
            className={`px-4 py-2 rounded-lg ${selectedPeriod === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            أسبوعي
          </button>
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-4 py-2 rounded-lg ${selectedPeriod === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            شهري
          </button>
          <button
            onClick={() => setSelectedPeriod('yearly')}
            className={`px-4 py-2 rounded-lg ${selectedPeriod === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            سنوي
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-600">الإيرادات</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">الإجمالي</span>
              <span className="text-2xl font-bold text-green-600">₪{financialData.revenue.total}</span>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">العلاجات</span>
                <span>₪{financialData.revenue.treatments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الأدوية</span>
                <span>₪{financialData.revenue.medications}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المختبر</span>
                <span>₪{financialData.revenue.laboratory}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-600">المصروفات</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">الإجمالي</span>
              <span className="text-2xl font-bold text-red-600">₪{financialData.expenses.total}</span>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">الرواتب</span>
                <span>₪{financialData.expenses.salaries}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المستلزمات</span>
                <span>₪{financialData.expenses.supplies}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الصيانة</span>
                <span>₪{financialData.expenses.maintenance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Profit Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">صافي الربح</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">الإجمالي</span>
            <span className="text-2xl font-bold text-blue-600">
              ₪{financialData.revenue.total - financialData.expenses.total}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">المعاملات الأخيرة</h3>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              الكل
            </button>
            <button
              onClick={() => setSelectedCategory('income')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              الدخل
            </button>
            <button
              onClick={() => setSelectedCategory('expense')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              المصروفات
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التصنيف</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوصف</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {financialData.transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${transaction.type === 'دخل' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={transaction.type === 'دخل' ? 'text-green-600' : 'text-red-600'}>
                    ₪{transaction.amount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          إضافة معاملة
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          تصدير التقرير
        </button>
      </div>
    </div>
  );
}