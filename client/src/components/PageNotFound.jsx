import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl">Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist</p>
      <p className="font-bold text-5xl">404</p>

      <button
        onClick={handleClick}
        className="mt-6 px-4 py-2 rounded-md bg-amber-400"
      >
        Go to App Page
      </button>
    </div>
  );
}

export default PageNotFound;
