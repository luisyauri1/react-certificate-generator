export default function CertificateGenerator() {
  return (
    <div className="certificate-generator">
      <h2>Certificate Generator</h2>

      <div className="form-section">
        <h3>Certificate Information</h3>

        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input
            type="text"
            id="studentName"
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input type="text" id="courseName" placeholder="Enter course name" />
        </div>

        <div className="form-group">
          <label htmlFor="completionDate">Completion Date</label>
          <input type="date" id="completionDate" />
        </div>

        <div className="form-group">
          <label htmlFor="instructorName">Instructor Name</label>
          <input
            type="text"
            id="instructorName"
            placeholder="Enter instructor name"
          />
        </div>

        <button type="button">Generate Certificate</button>
      </div>

      <div className="preview-section">
        <h3>Certificate Preview</h3>

        <div className="certificate-preview">
          <div className="certificate-border">
            <div className="certificate-content">
              <h1>Certificate of Completion</h1>

              <p className="certificate-text">This is to certify that</p>

              <p className="student-name">Student Name</p>

              <p className="certificate-text">has successfully completed</p>

              <p className="course-name">Course Name</p>

              <p className="certificate-text">on</p>

              <p className="completion-date">Date</p>

              <div className="signature-section">
                <div className="signature">
                  <p className="signature-line"></p>
                  <p>Instructor Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="button">Download Certificate</button>
      </div>
    </div>
  )
}
