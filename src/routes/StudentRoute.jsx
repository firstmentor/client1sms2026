const StudentRoute = ({ children }) => {
  const { data } = useGetProfileQuery();
  return data?.user?.role === "student"
    ? children
    : <Navigate to="/login" />;
};
