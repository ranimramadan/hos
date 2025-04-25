'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Alert from '@/app/dashboard/components/Alert';
import Loading from '../components/loading';
export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const { t } = useLanguage();
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/patients', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.data) {
        setPatients(response.data.data);
        setNotification({
          message: t('patients.loadSuccess'),
          type: 'success'
        });
      }
    } catch (error) {
      setError('Failed to load patient data');
      setNotification({
        message: t('patients.loadError'),
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (patientId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المريض؟')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/patients/${patientId}`);
        setPatients(patients.filter(patient => patient.id !== patientId));
        setNotification({
          message: 'تم حذف المريض بنجاح',
          type: 'success'
        });
      } catch (error) {
        setNotification({
          message: 'فشل في حذف المريض',
          type: 'error'
        });
      }
    }
  };

  // Add the filtering function
  const getFilteredPatients = () => {
    return patients.filter(patient =>
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) {
    return <Loading />;
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
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
            <span className="text-blue-600 text-3xl">👥</span>
            {t('patients.title')}
          </h1>
          <p className="text-gray-500">{t('patients.subtitle')}</p>
        </div>
        <Link
          href="/dashboard/patients/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('patients.addNew')}
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={t('patients.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('patients.name')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('patients.email')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('patients.phone')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('patients.address')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('patients.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getFilteredPatients().map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => router.push(`/dashboard/patients/show/${patient.id}`)}
                    className="text-blue-600 hover:text-blue-900 ml-2"
                  >
                    {t('patients.view')}
                  </button>
                  <button
                    onClick={() => router.push(`/dashboard/patients/edit/${patient.id}`)}
                    className="text-green-600 hover:text-green-900 ml-2"
                  >
                    {t('patients.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {t('patients.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}