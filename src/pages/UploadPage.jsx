import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  uploadXMLFile,
  checkUploadStatus,
  resetUploadState,
} from "../toolkit/uploadSlice";
import FileUpload from "../components/Upload/FileUpload";
import UploadProgress from "../components/Upload/UploadProgress";
import ErrorMessage from "../components/Common/ErrorMessage";

const UploadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUploading, uploadStatus, currentUpload, error } = useSelector(
    (state) => state.upload
  );
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    // Clean up upload state when component unmounts
    return () => {
      dispatch(resetUploadState());
    };
  }, [dispatch]);

  useEffect(() => {
    // Check upload status periodically if processing
    let interval;
    if (currentUpload && uploadStatus === "processing") {
      interval = setInterval(() => {
        dispatch(checkUploadStatus(currentUpload.reportId));
      }, 2000);
    }

    // Redirect when upload is successful
    if (uploadStatus === "success" && currentUpload) {
      setTimeout(() => {
        navigate(`/reports/${currentUpload.reportId}`);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [uploadStatus, currentUpload, dispatch, navigate]);

  const handleFileUpload = async (file) => {
    setLocalError("");
    try {
      const result = await dispatch(uploadXMLFile(file)).unwrap();
      console.log("Upload successful:", result);
    } catch (err) {
      setLocalError(err);
    }
  };

  const displayError = error || localError;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upload Experian XML File
        </h1>
        <p className="text-gray-600">
          Upload your soft credit pull XML file to generate a comprehensive
          credit report.
        </p>
      </div>

      {displayError && (
        <div className="mb-6">
          <ErrorMessage
            message={displayError}
            onRetry={() => {
              dispatch(resetUploadState());
              setLocalError("");
            }}
          />
        </div>
      )}

      {isUploading || uploadStatus === "processing" ? (
        <UploadProgress
          progress={uploadStatus === "uploading" ? 50 : 90}
          status={
            uploadStatus === "uploading"
              ? "Uploading file..."
              : "Processing XML data..."
          }
        />
      ) : (
        <FileUpload onFileUpload={handleFileUpload} isLoading={isUploading} />
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-3">
          File Requirements
        </h3>
        <ul className="text-blue-800 space-y-2">
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            File format must be XML (.xml)
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Maximum file size: 10MB
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            File should contain valid Experian soft credit pull data
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UploadPage;
