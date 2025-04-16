import { useLocation } from "react-router";
import "./App.css";
import useRouteElement from "./routes/useRouteElement";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { setNavigate } from "@/services/axios";

function App() {
  const element = useRouteElement();
  const navigate = useNavigate();

  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return element;
}

export default App;
