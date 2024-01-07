export const getSender = (loggedUser, userArray) => {
  if (loggedUser._id === userArray[0]._id) return userArray[1].name;
  else return userArray[0].name;
};

export const getUserForChatBox = (loggedUser, userArray) => {
  if (loggedUser._id === userArray[0]._id) return userArray[1];
  else return userArray[0];
};
