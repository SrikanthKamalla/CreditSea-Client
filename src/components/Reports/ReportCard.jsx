import React from "react";
import { Link } from "react-router-dom";

const ReportCard = ({ report }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getScoreColor = (score) => {
    if (score >= 800) return "text-green-600 bg-green-100";
    if (score >= 700) return "text-blue-600 bg-blue-100";
    if (score >= 600) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {report.basicDetails.name || "N/A"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              PAN: {report.basicDetails.pan || "N/A"}
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(report.basicDetails.creditScore)}`}
          >
            Score: {report.basicDetails.creditScore || "N/A"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="text-gray-500">Mobile:</span>
            <p className="font-medium">
              {report.basicDetails.mobilePhone || "N/A"}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Uploaded:</span>
            <p className="font-medium">{formatDate(report.uploadDate)}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {report.reportSummary.totalAccounts}
              </p>
              <p className="text-xs text-gray-500">Total Accounts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {report.reportSummary.activeAccounts}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {report.reportSummary.closedAccounts}
              </p>
              <p className="text-xs text-gray-500">Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Link
            to={`/reports/${report._id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
