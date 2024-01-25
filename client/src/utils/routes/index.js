export const ROUTES = {
  home: "/",
  signup: "/cadastro",
  events: "/eventos",
  newEvent: "/novo-evento",
  me: "/profile",
  eventDetails: (id = ":id") => `/eventos/${id}`,
};
