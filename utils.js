import notifier from "node-notifier";

export const sleep = async (sec) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve();
    }, 1000 * sec)
  );
};

export const notify = (text = 'Robot Check Popup') => {
  notifier.notify({
    title: text,
    message: "A popup was found in the loop!",
    sound: true, // This will play the default notification sound
  });
};

export const getRandomTikTokComment = () => {
  const comments = [
    "This is amazing! 🔥",
    "I can't stop watching this! 😍",
    "How did you do that? 🤯",
    "This made my day! 😊",
    "So relatable! 😂",
    "You're so talented! 👏",
    "Keep up the great work! 💪",
    "Love this! 😍",
    "This is pure gold! 🏆",
    "I need to try this! 😅",
  ];
  const randomIndex = Math.floor(Math.random() * comments.length);
  return comments[randomIndex];
};
