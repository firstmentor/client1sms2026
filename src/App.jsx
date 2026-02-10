import { Routes, Route } from "react-router-dom";
import StudentLayout from "./component/StudentLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLayout from "./component/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./routes/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateClass from "./pages/admin/class/CreateClass";
import ManageClasses from "./pages/admin/class/ManageClasses";
import CreateSubject from "./pages/admin/subject/CreateSubject";
import ManageSubject from "./pages/admin/subject/ManageSubject";
import AddStudent from "./pages/admin/student/AddStudent";
import StudentList from "./pages/admin/student/StudentList";

function App() {
  return (
    <>
      <Routes>

        {/* ===== STUDENT ROUTES ===== */}
        <Route
          path="/"
          element={
            <StudentLayout>
              <Home />
            </StudentLayout>
          }
        />

        <Route
          path="/login"
          element={
            <StudentLayout>
              <Login />
            </StudentLayout>
          }
        />

        <Route
          path="/admin-login"
          element={
            <StudentLayout>
              <AdminLogin />
            </StudentLayout>
          }
        />

        {/* ===== ADMIN PROTECTED ROUTES ===== */}



        <Route element={<ProtectedRoute role="admin" />}>
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/classes/add"
            element={
              <AdminLayout>
                <CreateClass />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/classes/manage"
            element={
              <AdminLayout>
                <ManageClasses />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/subjects/create"
            element={
              <AdminLayout>
                <CreateSubject />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/subjects/manage"
            element={
              <AdminLayout>
                <ManageSubject />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/student/create"
            element={
              <AdminLayout>
                <AddStudent />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/student/manage"
            element={
              <AdminLayout>
                <StudentList />
              </AdminLayout>
            }
          />





        </Route>













      </Routes>

      {/* 🔔 Toast Alerts */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        theme="colored"
      />
    </>
  );
}

export default App;
