export const getSender = (loggedUser, userArray) => {
  if (loggedUser?._id === userArray[0]._id) return userArray[1].name;
  else return userArray[0].name;
};

export const getUserForChatBox = (loggedUser, userArray) => {
  if (loggedUser._id === userArray[0]?._id) return userArray[1];
  else return userArray[0];
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1]?.sender._id === m.sender._id;
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    messages[i + 1] &&
    (messages[i + 1]?.sender._id !== m?.sender?._id ||
      messages[i + 1]?.sender._id === undefined) &&
    messages[i]?.sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  // console.log(messages[messages.length - 1]);
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};
