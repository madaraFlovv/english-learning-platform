import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/AppLayout/AppLayout";

import LandingPage from "../pages/LandingPage/LandingPage";
import LessonPage from "../pages/LessonPage/LessonPage";
import ExercisePage from "../pages/ExercisePage/ExercisePage";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

import PlaceholderPage from "../pages/PlaceholderPage/PlaceholderPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/lesson/:lessonId",
        element: <LessonPage />,
      },
      {
        path: "/exercise/:lessonId",
        element: <ExercisePage />,
      },
      {
        path: "/ai",
        element: (
          <PlaceholderPage
            title="AI tutor"
            description="Your personal English tutor. Practice conversations, ask questions and improve your skills."
          />
        ),
      },
      {
        path: "/account",
        element: (
          <PlaceholderPage
            title="Account"
            description="Your profile, learning statistics and personal settings will be available here."
          />
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
