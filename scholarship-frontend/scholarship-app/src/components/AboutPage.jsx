import Header from "./Header";
import Footer from "./Footer";

function AboutPage() {
  return (
    <div>
      <Header />

      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1>About Us</h1>

        <p>
          The Scholarship Management System is a web-based platform designed to
          simplify scholarship management for students and administrators.
        </p>

        <p>
          Students can browse available scholarships, review eligibility
          criteria, submit applications, and track their application status in
          one place.
        </p>

        <p>
          Administrators can create new scholarships, manage applications,
          approve or reject requests, and monitor platform activity through an
          interactive dashboard.
        </p>

        <h2>Our Mission</h2>

        <p>
          Our mission is to make scholarship opportunities more accessible and
          transparent for students while reducing administrative effort.
        </p>

        <h2>Key Features</h2>

        <ul>
          <li>Scholarship Discovery</li>

          <li>Online Applications</li>

          <li>Application Tracking</li>

          <li>User Profile Management</li>

          <li>Admin Dashboard</li>

          <li>Approval & Rejection Workflow</li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
