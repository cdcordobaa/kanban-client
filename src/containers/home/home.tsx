import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/employees">View Employees</Link>
    </div>
  );
}

export default HomePage;
