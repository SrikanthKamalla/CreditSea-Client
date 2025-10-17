import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReport, clearCurrentReport } from "../toolkit/reportsSlice";
import BasicDetails from "../components/Reports/BasicDetails";
import ReportSummary from "../components/Reports/ReportSummary";
import CreditAccounts from "../components/Reports/CreditAccounts";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ErrorMessage from "../components/Common/ErrorMessage";

const ReportDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentReport, isLoading, error } = useSelector(
    (state) => state.reports
  );
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchReport(id));
    }

    // Clean up when component unmounts
    return () => {
      dispatch(clearCurrentReport());
    };
  }, [dispatch, id]);

  const handleRetry = () => {
    setLocalError("");
    if (id) {
      dispatch(fetchReport(id));
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoadingSpinner text="Loading report details..." />
      </div>
    );
  }

  // Show error state
  if (error || localError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
        <ErrorMessage message={error || localError} onRetry={handleRetry} />
      </div>
    );
  }

  // Show not found state
  if (!currentReport) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-500"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
        <svg
          className="mx-auto h-16 w-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Report not found
        </h3>
        <p className="text-gray-500 mb-4">
          The report you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Credit Report
            </h1>
            <p className="text-gray-600">
              Generated from {currentReport.fileName} • Uploaded on{" "}
              {new Date(currentReport.uploadedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Report Sections */}
      <div className="space-y-6">
        <BasicDetails data={currentReport.basicDetails} />
        <ReportSummary data={currentReport.reportSummary} />
        <CreditAccounts accounts={currentReport.creditAccounts} />
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Report Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Report ID:</span>
            <p className="font-mono">{currentReport.reportId}</p>
          </div>
          <div>
            <span className="text-gray-500">Processing Status:</span>
            <p className="capitalize">{currentReport.processingStatus}</p>
          </div>
          <div>
            <span className="text-gray-500">Total Credit Accounts:</span>
            <p>{currentReport.creditAccounts?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
