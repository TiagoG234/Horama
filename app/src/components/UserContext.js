import { createContext } from "react";

export const UserContext = createContext({
  firstName: null,
  lastName: null,
});
