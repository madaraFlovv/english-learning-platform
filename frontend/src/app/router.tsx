import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/AppLayout/AppLayout";

import LandingPage from "../pages/LandingPage/LandingPage";
import TopicPage from "../pages/TopicPage/TopicPage";
import LessonPage from "../pages/LessonPage/LessonPage";
import ExercisePage from "../pages/ExercisePage/ExercisePage";
import PlacementTestPage from "../pages/PlacementTestPage/PlacementTestPage";
import AccountPage from "../pages/AccountPage/AccountPage";

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
        path: "/placement-test",
        element: <PlacementTestPage />,
      },
      {
        path: "/topic/:topicId",
        element: <TopicPage />,
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
        element: <AccountPage />,
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
