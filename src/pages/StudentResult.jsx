import { useGetMyResultQuery } from "../features/result/resultApi";

const MyResult = () => {
  const { data, isLoading, isError } = useGetMyResultQuery();
  console.log(data)

  if (isLoading)
    return (
      <div className="mt-32 text-center text-xl font-semibold">
        Loading Result...
      </div>
    );

  if (isError)
    return (
      <div className="mt-32 text-center text-red-500">
        Failed to load result
      </div>
    );

  const student = data?.student;
  const results = data?.results || [];

  const total = results.reduce((sum, r) => sum + r.marksObtained, 0);
  const max = results.reduce((sum, r) => sum + r.totalMarks, 0);
  const percentage = max ? ((total / max) * 100).toFixed(2) : 0;

  const status = percentage >= 33 ? "PASS" : "FAIL";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto mt-32 px-4">

      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎓 Student Result</h1>

        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Print Result
        </button>
      </div>

      {/* Student Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 grid md:grid-cols-3 gap-4 mb-6">

        <p><b>Name:</b> {student?.user?.name}</p>
        <p><b>Roll No:</b> {student?.rollNo}</p>
        <p><b>Class:</b> {student?.class?.name}</p>

        <p><b>Semester:</b> {results[0]?.semester}</p>
        <p><b>Year:</b> {student?.year}</p>

        <p className="text-xl font-bold text-blue-600">
          Percentage: {percentage}%
        </p>

        <p
          className={`font-bold text-lg ${
            status === "PASS" ? "text-green-600" : "text-red-600"
          }`}
        >
          Status: {status}
        </p>
      </div>

      {/* Result Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Subject</th>
              <th className="p-3">Code</th>
              <th className="p-3">Semester</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Grade</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r) => (
              <tr key={r._id} className="text-center border hover:bg-gray-50">

                <td className="p-3">{r.subject?.name}</td>
                <td>{r.subject?.code}</td>
                <td>{r.semester}</td>

                <td>
                  {r.marksObtained}/{r.totalMarks}
                </td>

                <td
                  className={`font-bold ${
                    r.grade === "A"
                      ? "text-green-600"
                      : r.grade === "B"
                      ? "text-blue-600"
                      : r.grade === "C"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {r.grade}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default MyResult;