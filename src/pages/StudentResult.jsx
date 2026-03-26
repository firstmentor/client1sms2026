import { useGetMyResultQuery } from "../features/result/resultApi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import ResultChart from "./ResultChart";

const StudentResult = () => {
  const { data, isLoading } = useGetMyResultQuery();
  const resultRef = useRef();

  if (isLoading) {
    return (
      <h2 className="mt-32 text-center text-xl">
        Loading Result...
      </h2>
    );
  }

  const student = data?.student;
  const results = data?.results || [];
  const percentage = data?.percentage || 0;
  const grade = data?.grade || "-";

  const status = percentage >= 33 ? "PASS" : "FAIL";

  const handlePrint = () => window.print();

  // PDF Download
  const downloadPDF = async () => {
    const element = resultRef.current;

    // सभी elements की classes remove करेंगे
    const allElements = element.querySelectorAll("*");
    const originalClasses = [];

    allElements.forEach((el, i) => {
      originalClasses[i] = el.className;
      el.className = "";
    });

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("student-result.pdf");
    } catch (error) {
      console.log(error);
    }

    // classes वापस लगाओ
    allElements.forEach((el, i) => {
      el.className = originalClasses[i];
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-32 px-4">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          🎓 Student Report Card
        </h1>

        <div className="space-x-3">
          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Print
          </button>

          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Result Card */}
      <div
        ref={resultRef}
        className="bg-white rounded-lg shadow-xl p-6"
      >
        {/* Student Info */}
        <div className="grid md:grid-cols-3 gap-4 mb-6 border-b pb-4">
          <p><b>Name:</b> {student?.user?.name}</p>
          <p><b>Roll No:</b> {student?.rollNo}</p>
          <p><b>Class:</b> {student?.class?.name}</p>
          <p><b>Semester:</b> {results[0]?.semester || "-"}</p>
          <p><b>Year:</b> {student?.year}</p>

          <p className="text-blue-600 font-bold text-lg">
            Percentage: {percentage}%
          </p>

          <p className="font-bold text-purple-600">
            Grade: {grade}
          </p>

          <p
            className={`font-bold text-lg ${
              status === "PASS"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            Status: {status}
          </p>
        </div>

        {/* Result Table */}
        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Subject</th>
              <th className="p-3">Code</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Grade</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r) => (
              <tr key={r._id} className="text-center border">
                <td className="p-3">
                  {r.subject?.name}
                </td>
                <td>{r.subject?.code}</td>
                <td>
                  {r.marksObtained}/{r.totalMarks}
                </td>
                <td className="font-bold">
                  {r.grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart (PDF में नहीं आएगा) */}
      <div
        className="mt-10"
        data-html2canvas-ignore="true"
      >
        <ResultChart results={results} />
      </div>

    </div>
  );
};

export default StudentResult;