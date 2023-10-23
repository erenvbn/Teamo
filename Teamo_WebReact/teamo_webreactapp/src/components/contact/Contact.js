function About() {
  return (
    <div>
      <div className="col-12 m-3 row justify-content-between">
        {/* COMPANY INFO LEFT COLUMN */}
        <div className="py-5 flex col-4 text-center bottom-100">
          <h2 className="display-4">TeamO App</h2>
          <p className="mt-lg-5">
            Address: 123 Main Street<br />
            Phone: (111) 4334-7890<br />
            Email: info@teamoapp.com
          </p>
          <p>
            <span style={{ color: "teal", textDecoration: "underline" }}>
              TeamO
            </span>{" "}
            is a leading task management solution provider,<br />
            dedicated to helping teams and individuals <br />
            stay organized and productive.
          </p>
        </div>

        {/* CONTACT RIGHT COLUMN */}
        <div id="contact" className="py-5 flex col-7">
          <div className="container text-center">
            <h2 className="display-4" style={{ color: "gray" }}>
              Contact Us
            </h2>
            <p>Have questions or feedback? Feel free to get in touch with us!</p>
          </div>
          <div className="container">
            <form action="" method="post">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
