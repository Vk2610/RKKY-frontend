import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BRANCHES } from "../../utils/branches";

const ShowForms = () => {
  // All state declarations
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const PAGE_SIZE = 10;
  const navigate = useNavigate();

  // Fetch applications effect
  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/admin/applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (Array.isArray(response.data)) {
          setApplications(response.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Failed to load applications"
        );
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Filter function
  const getFilteredApplications = (items) => {
    return items.filter((item) => {
      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        item.Status?.toLowerCase() === statusFilter.toLowerCase();

      // Branch filter
      const matchesBranch =
        branchFilter === "all" ||
        item.branch?.toLowerCase() === branchFilter.toLowerCase();

      // Search filter
      const searchableFields = [
        "memberNo",
        "name",
        "hrmsNo",
        "branch",
        "designation",
      ];

      const matchesSearch =
        searchTerm === "" ||
        searchableFields.some((field) =>
          item[field]
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

      return matchesStatus && matchesBranch && matchesSearch;
    });
  };

  // Delete handlers
  const handleDeleteClick = (id) => {
    setShowConfirm(true);
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/sub-admin/application-form/${deleteTargetId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Form deleted successfully");
      setApplications((prev) =>
        prev.filter((app) => app.id !== deleteTargetId)
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete form"
      );
    } finally {
      setShowConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setDeleteTargetId(null);
  };

  // Search handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handleBranchFilterChange = (e) => {
    setBranchFilter(e.target.value);
    setPage(1);
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Calculations
  const filteredItems = getFilteredApplications(applications);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const totalPages = Math.ceil((filteredItems?.length || 0) / PAGE_SIZE);
  const currentItems = filteredItems?.slice(startIndex, endIndex) || [];

  // Statistics
  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.Status === "pending").length,
    approved: applications.filter((app) => app.Status === "approved").length,
    rejected: applications.filter((app) => app.Status === "rejected").length,
    totalBranches: [...new Set(applications.map((app) => app.branch))].length,
  };

  // Navigation handler
  const handleViewApplication = (id) => {
    navigate(`/admin/manage-application/${id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Application Forms</h1>

        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Branch Filter */}
          <select
            value={branchFilter}
            onChange={handleBranchFilterChange}
            className="px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-32 text-sm" // Modified width and padding
          >
            <option value="all">All Branches</option>
            {BRANCHES.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Forms</p>
          <p className="text-2xl font-semibold">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-semibold">{stats.pending}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <p className="text-sm text-green-600">Approved</p>
          <p className="text-2xl font-semibold">{stats.approved}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <p className="text-sm text-red-600">Rejected</p>
          <p className="text-2xl font-semibold">{stats.rejected}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <p className="text-sm text-blue-600">Total Branches</p>
          <p className="text-2xl font-semibold">{stats.totalBranches}</p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                HRMS No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Branch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {application.hrmsNo || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {application.memberNo || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {application.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {application.branch || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      application.Status === "approved"
                        ? "bg-green-100 text-green-800"
                        : application.Status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {application.Status?.charAt(0).toUpperCase() +
                      application.Status?.slice(1) || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewApplication(application.id)}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-md transition-colors duration-200"
                      title="View"
                    >
                      <FaEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(application.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-md transition-colors duration-200"
                      title="Delete"
                    >
                      <RiDeleteBin6Line className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg mt-4">
          <p className="text-gray-500">
            {searchTerm
              ? `No applications found matching "${searchTerm}"`
              : `No ${
                  statusFilter !== "all" ? statusFilter : ""
                } applications found${
                  branchFilter !== "all" ? ` in ${branchFilter}` : ""
                }`}
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <div className="flex flex-col items-center">
              <RiDeleteBin6Line className="text-red-600 text-4xl mb-4" />
              <h2 className="text-lg font-semibold mb-2 text-center">
                Delete Form?
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Are you sure you want to delete this form? This action cannot be
                undone.
              </p>
              <div className="flex gap-4 w-full justify-center">
                <button
                  onClick={handleCancelDelete}
                  className="px-6 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowForms;
