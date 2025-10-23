import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";
import LoginForm from "./Pages/LoginForm";

function App() {
  const { userStore } = useStore();

  useEffect(() => {
    if (userStore.token) {
      userStore.getCurrentUser();
    }
  }, [userStore]);

  if (!userStore.isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold">
        Welcome, {userStore.user?.email || "User"}!
      </h1>
      <button
        onClick={userStore.logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default observer(App);
