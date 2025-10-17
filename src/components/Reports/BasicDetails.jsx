import React from "react";

const BasicDetails = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Basic Details</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Full Name
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {data.name || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Mobile Phone
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {data.mobilePhone || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              PAN Number
            </label>
            <p className="text-lg font-semibold text-gray-900">
              {data.pan || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Credit Score
            </label>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-900 mr-2">
                {data.creditScore || "N/A"}
              </span>
              {data.creditScore && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    data.creditScore >= 800
                      ? "bg-green-100 text-green-800"
                      : data.creditScore >= 700
                        ? "bg-blue-100 text-blue-800"
                        : data.creditScore >= 600
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.creditScore >= 800
                    ? "Excellent"
                    : data.creditScore >= 700
                      ? "Good"
                      : data.creditScore >= 600
                        ? "Fair"
                        : "Poor"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
