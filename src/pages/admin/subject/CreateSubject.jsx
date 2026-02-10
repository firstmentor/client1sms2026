import { useState } from "react";
import { useGetClassesQuery } from "../../../features/class/classApi";
import { useAddSubjectMutation } from "../../../features/subject/subjectApi";
import { toast } from "react-toastify";

const CreateSubject = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [classId, setClassId] = useState("");

  const {
    data: classes,
    isLoading: classLoading,
    isError,
  } = useGetClassesQuery();

  const [addSubject, { isLoading }] = useAddSubjectMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Frontend validation
    if (!name || !code || !classId) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addSubject({
        name: name.trim(),
        code: code.trim().toUpperCase(),
        classId,
      }).unwrap();

      toast.success("Subject added successfully 🎉");

      // reset form
      setName("");
      setCode("");
      setClassId("");

    } catch (error) {
      // 🔥 Show exact backend error
      toast.error(error?.data?.message || "Error adding subject");
    }
  };

  // 🔴 Classes loading
  if (classLoading) {
    return <p>Loading classes...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load classes</p>;
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Subject</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Subject Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select Class</option>
          {classes?.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.course} - Sem {cls.semester}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Add Subject"}
        </button>
      </form>
    </div>
  );
};

export default CreateSubject;