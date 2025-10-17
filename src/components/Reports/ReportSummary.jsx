import React from "react";

const ReportSummary = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Report Summary</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600">
                {data.totalAccounts || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Accounts</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">
                {data.activeAccounts || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Active Accounts</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-red-600">
                {data.closedAccounts || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Closed Accounts</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-purple-600">
                {data.last7DaysEnquiries || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Last 7 Days Enquiries
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Current Balance
            </label>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(data.currentBalance)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Secured Amount
            </label>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(data.securedAmount)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Unsecured Amount
            </label>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(data.unsecuredAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
