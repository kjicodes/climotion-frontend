import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./GetWorkoutsButton.css";

export default function GetWorkoutsButton({ recommendation }) {
  const { user } = useAuth();

  return (
    <div className="p-5 w-full h-full text-center flex flex-col justify-evenly align-middle">
      <h1 className="text-3xl font-semibold text-white">Ready to move?</h1>
      <div className="">
        <Link
          to="/workouts"
          className="flex-none button-primary rounded-3xl px-6 py-3.5 text-base font-semibold text-black hover:opacity-90 transition-opacity duration-200"
        >
          Get Workouts
        </Link>
      </div>
    </div>
  );
}
