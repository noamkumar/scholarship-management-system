import Header from "./Header";
import Footer from "./Footer";

function PrivacyPolicyPage() {
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
        <h1>Privacy Policy</h1>

        <p>
          The Scholarship Management System values your privacy and is committed
          to protecting your personal information.
        </p>

        <h2>Information We Collect</h2>

        <ul>
          <li>Username</li>

          <li>Application Details</li>

          <li>Scholarship Preferences</li>
        </ul>

        <h2>How We Use Information</h2>

        <p>
          Information is used to process scholarship applications, manage
          accounts, and improve system functionality.
        </p>

        <h2>Data Protection</h2>

        <p>
          We implement appropriate security measures to protect user data from
          unauthorized access.
        </p>

        <h2>User Rights</h2>

        <p>
          Users can access and review their profile information through their
          account dashboard.
        </p>

        <h2>Updates</h2>

        <p>
          This privacy policy may be updated periodically to reflect changes in
          system functionality.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
