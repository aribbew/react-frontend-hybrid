import React from "react";
import { Navigations } from "./routes";
import { AuthProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      <Navigations />
    </AuthProvider>
  );
}

export default App;
