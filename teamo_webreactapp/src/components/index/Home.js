import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="hero bg-primary text-white text-center mt-5 py-5">
        <div className="container">
          <h1 className="display-5">Welcome to TeamO</h1>
          <p className="text-light display-6">360° Excellence Awaits</p>
          <Link to="/projectlayout" className="btn btn-lg btn-success btn-animation-orange">
            Go to Admin Demo Panel
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="features py-lg-5 text-center mt-3 mb-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div>
                <i className="fas fa-tasks fa-4x"></i>
              </div>
              <h3>Task Management</h3>
              <p>Efficiently manage tasks and projects with TeamO.</p>
            </div>
            <div className="col-lg-3">
              <div className="feature-icon">
                <i className="fa-solid fa-bars-progress fa-4x"></i>
              </div>
              <h3>Progress</h3>
              <p>Render your advancements through TeamO.</p>
            </div>
            <div className="col-lg-3">
              <div>
                <i className="fas fa-calendar-check fa-4x"></i>
              </div>
              <h3>Sync</h3>
              <p>Schedule and track your tasks on the calendar.</p>
            </div>
            <div className="col-lg-3">
              <div>
                <i className="fa-solid fa-users-gear fa-4x"></i>
              </div>
              <h3>Collaborate</h3>
              <p>Work together seamlessly with your team.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5 text-center">
        <div className="container">
          <h2>Ready to boost your productivity?</h2>
          <p>Join TeamO today and take control of your tasks.</p>
          <a href="contact.html" className="btn btn-primary btn-lg btn-animation-orange">Pre-Register</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
