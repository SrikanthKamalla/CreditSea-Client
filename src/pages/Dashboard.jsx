import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchReports,
  searchReports,
  deleteReport,
} from "../toolkit/reportsSlice";
import ReportCard from "../components/Reports/ReportCard";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ErrorMessage from "../components/Common/ErrorMessage";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { reports, searchResults, searchTerm, pagination, isLoading, error } =
    useSelector((state) => state.reports);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      dispatch(searchReports({ query: localSearchTerm.trim() }));
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await dispatch(deleteReport(reportId)).unwrap();
      } catch (error) {
        console.error("Failed to delete report:", error);
      }
    }
  };

  const displayReports = searchTerm ? searchResults : reports;
  const displaySearchTerm = searchTerm || localSearchTerm;

  if (isLoading && reports.length === 0) {
    return <LoadingSpinner text="Loading credit reports..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Credit Reports
            </h1>
            <p className="text-gray-600">
              Manage and view all processed credit reports
            </p>
          </div>
          <Link
            to="/upload"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Upload New Report
          </Link>
        </div>

        {error && (
          <div className="mb-4">
            <ErrorMessage
              message={error}
              onRetry={() => dispatch(fetchReports())}
            />
          </div>
        )}

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, PAN, or phone..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Reports Grid */}
      {displayReports.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
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
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No reports found
          </h3>
          <p className="mt-2 text-gray-500">
            {displaySearchTerm
              ? "Try adjusting your search terms"
              : "Get started by uploading your first XML file"}
          </p>
          {!displaySearchTerm && (
            <Link
              to="/upload"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Upload XML File
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {displayReports.length} of {pagination.total} reports
              {searchTerm && ` for "${searchTerm}"`}
            </p>
            {searchTerm && (
              <button
                onClick={() => {
                  setLocalSearchTerm("");
                  dispatch(fetchReports());
                }}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Clear search
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReports.map((report) => (
              <ReportCard
                key={report._id}
                report={report}
                onDelete={handleDeleteReport}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
