export default function CertificateGenerator() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Certificate Information
        </h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="studentName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              placeholder="Enter student name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="courseName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              placeholder="Enter course name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="completionDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Completion Date
            </label>
            <input
              type="date"
              id="completionDate"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="instructorName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Instructor Name
            </label>
            <input
              type="text"
              id="instructorName"
              placeholder="Enter instructor name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Certificate
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Certificate Preview
        </h3>

        <div className="mb-4 aspect-[1.414/1] overflow-hidden rounded border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-white p-8">
          <div className="flex h-full flex-col items-center justify-center space-y-4 border-4 border-double border-gray-400 p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Certificate of Completion
            </h1>

            <p className="text-sm text-gray-600">This is to certify that</p>

            <p className="text-2xl font-semibold text-gray-900">Student Name</p>

            <p className="text-sm text-gray-600">has successfully completed</p>

            <p className="text-xl font-medium text-gray-800">Course Name</p>

            <p className="text-sm text-gray-600">on</p>

            <p className="text-base text-gray-700">Date</p>

            <div className="mt-8 w-full pt-8">
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="mb-2 h-px w-48 bg-gray-400"></div>
                  <p className="text-xs text-gray-600">Instructor Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download Certificate
        </button>
      </div>
    </div>
  )
}
