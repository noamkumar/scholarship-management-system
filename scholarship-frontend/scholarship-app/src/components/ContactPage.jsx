import Header from "./Header";
import Footer from "./Footer";

function ContactPage() {
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
        <h1>Contact Us</h1>

        <p>
          We are here to help students and administrators with any questions
          related to the Scholarship Management System.
        </p>

        <h2>Support Information</h2>

        <p>📧 Email: kumarnoam00@gmail.com</p>

        <p>📞 Phone: +91 9000368435</p>

        <p>🌐 Website: www.scholarshipsystem.com</p>

        <h2>Working Hours</h2>

        <p>Monday - Friday</p>

        <p>9:00 AM - 6:00 PM</p>

        <h2>Support Services</h2>

        <ul>
          <li>Scholarship Assistance</li>

          <li>Application Support</li>

          <li>Technical Help</li>

          <li>Account Management</li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;
