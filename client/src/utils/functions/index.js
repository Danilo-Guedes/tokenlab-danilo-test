export function prepareGuestDataForSelect(users) {
  return users.map((user) => {
    return {
      value: user._id,
      label: `${user.name} - ${user.email}`,
    };
  });
}
