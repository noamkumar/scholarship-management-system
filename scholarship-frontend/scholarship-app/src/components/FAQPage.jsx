import Header from "./Header";
import Footer from "./Footer";

function FAQPage() {
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
        <h1>Frequently Asked Questions</h1>

        <hr />

        <h3>How do I apply for a scholarship?</h3>

        <p>Login to your account, choose a scholarship, and click Apply.</p>

        <hr />

        <h3>How can I check my application status?</h3>

        <p>Open My Applications to view the latest status.</p>

        <hr />

        <h3>Can I apply for multiple scholarships?</h3>

        <p>
          Yes, you can apply for multiple scholarships if you meet the
          eligibility.
        </p>

        <hr />

        <h3>Who can create scholarships?</h3>

        <p>Only administrators can create, edit, or delete scholarships.</p>

        <hr />

        <h3>What do application statuses mean?</h3>

        <p>
          Under Review: Waiting for review.
          <br />
          <br />
          Approved: Scholarship accepted.
          <br />
          <br />
          Rejected: Application not selected.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default FAQPage;
