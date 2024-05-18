import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Error page</h1>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default NotFound;
