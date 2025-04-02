export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">جاري التحميل...</h2>
        <p className="mt-2 text-gray-500">يرجى الانتظار</p>
      </div>
    </div>
  );
}