function NavbarFooter() {
  const linkStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  };
  return (
    <div>
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="text-center p-3" style={linkStyle}>
          <a
            className="text-dark"
            href="http://127.0.0.1:5500/Teamo_Web/index.html"
          >
            TeamO©
          </a>
        </div>
      </footer>
    </div>
  );
}

export default NavbarFooter;
