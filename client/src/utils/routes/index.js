export const ROUTES = {
  home: "/",
  signup: "/cadastro",
  events: "/eventos",
  newEvent: "/novo-evento",
  eventDetails: (id = ":id") => `/eventos/${id}`,
};
