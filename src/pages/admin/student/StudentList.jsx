import {
  useGetStudentsQuery,
  useDeleteStudentMutation
} from "../../../features/student/studentApi";

const StudentList = ({ onEdit }) => {
  const { data: students = [], isLoading } = useGetStudentsQuery();
  console.log(students)
  const [deleteStudent] = useDeleteStudentMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">📋 Student List</h2>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Roll</th>
            <th className="p-2">Class</th>
            <th className="p-2">Year</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-2">{s.user.name}</td>
              <td className="p-2">{s.rollNo}</td>
              <td className="p-2">{s?.class?.course}</td>
              <td className="p-2">{s.year}</td>
              <td className="p-2 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(s)}
                  className="px-3 py-1 bg-yellow-400 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(s._id)}
                  className="px-3 py-1 bg-red-500 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;