function About() {
  return (
    <div>
      {/* About Us div */}
      <div id="about" className="py-5 d-flex flex-column align-items-center">
        <div className="container text-center">
          <h2 className="display-4">About TeamO</h2>
          <p>
            We are passionate about helping teams and individuals stay organized and productive.<br />
            At TeamO, we believe that effective task management is the key to success in any project.<br />
            Whether you're managing a small team or working on personal projects, TeamO has got you covered.
          </p>
        </div>
        <div className="container text-center">
          <img
            src="https://media.istockphoto.com/id/911963834/photo/team-of-nerdy-entrepreneurs-reading-confusing-reports-in-the-office.jpg?s=612x612&w=0&k=20&c=3KV5-BI5nanbaT8xm6oo5fFBea6zNnrgo82APn-yLng="
            alt="About TeamO"
            className="rounded-5"
            style={{ width: "40%" }}
          />
        </div>
      </div>

      {/* Our Mission div */}
      <div id="mission" className="bg-light py-5 flex-column align-items-center">
        <div className="container text-center">
          <h2 className="display-5">Aim</h2>
          <p className="lead">
            Our aim is to simplify task management and empower teams to achieve their goals efficiently. <br />
            We strive to provide the best tools and resources to enhance productivity and collaboration.
          </p>
        </div>
      </div>
      
      {/* Team division */}
      <div id="team" className="py-5 flex flex-column align-items-center">
        <div className="container text-center">
          <h2 className="display-4">Meet Our Team</h2>
        </div>
        <div className="container d-flex justify-content-center gap-4">
          {/* Team Member */}
          <div className="card mx-3" style={{ width: "90%" }}>
            <img
              src="https://st3.depositphotos.com/1017228/18878/i/450/depositphotos_188781580-stock-photo-handsome-cheerful-young-man-standing.jpg"
              alt="TM-1"
              className="card-img"
              style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Max Maverick</h5>
              <p className="card-text">Designer</p>
            </div>
          </div>
          <div className="card mx-3" style={{ width: "90%" }}>
            <img
              src="https://media.istockphoto.com/id/1280113805/photo/smiling-young-woman-beauty-close-up-portrait.jpg?s=612x612&w=0&k=20&c=11GhfzV2ZdNaikNwncxvGQARw4MoT22DDfzqs4UpqL0="
              alt="TM-2"
              className="card-img"
              style={{ maxWidth: "100%", height: "90%", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Isabella Sterling</h5>
              <p className="card-text">CTO</p>
            </div>
          </div>
          <div className="card mx-3" style={{ width: "90%" }}>
            <img
              src="https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=g_ZmKDpK9VEEzWw4vJ6O577ENGLTOcrvYeiLxi8mVuo="
              alt="TM-3"
              className="card-img"
              style={{ maxWidth: "100%", height: "90%", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Finnley Sinclair</h5>
              <p className="card-text">CEO</p>
            </div>
          </div>
          <div className="card mx-3" style={{ width: "90%" }}>
            <img
              src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
              alt="TM-4"
              className="card-img"
              style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Leo Whitman</h5>
              <p className="card-text">Trotter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
