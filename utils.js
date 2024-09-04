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
    "Mind-blowing! 🤯",
    "You never disappoint! 💯",
    "This is perfection! ✨",
    "Absolutely brilliant! 🌟",
    "I’m in awe! 😱",
    "This just made my day! 😄",
    "Wow, just wow! 😲",
    "Can’t get enough of this! 😍",
    "You’re a genius! 🧠",
    "So creative! 🎨",
    "You’ve got skills! 💥",
    "This is next level! 🚀",
    "I’m obsessed with this! 😍",
    "Such good vibes! ✌️",
    "You nailed it! 🔨",
    "Pure talent! 💫",
    "This deserves to go viral! 🌐",
    "I could watch this all day! 😄",
    "This is the best thing I've seen today! 🎉",
    "Simply amazing! 🙌",
    "You always deliver! 🎯",
    "This made me smile! 😊",
    "Unbelievable! 😳",
    "You’re on fire! 🔥",
    "I can’t believe how good this is! 😍",
    "This is art! 🎨",
    "So impressive! 👏",
    "You’ve got it all! 🌟",
    "Total legend! 🏅",
    "I’m loving this! ❤️",
    "How do you come up with this? 🤔",
    "You're unstoppable! 🚀",
    "Just incredible! 😍",
    "This should be in a museum! 🖼️",
    "Wow, you’re amazing! 🌟",
    "Can’t wait to see more! 👀",
    "This is top-tier content! 🏆",
    "You’ve outdone yourself! 👏",
    "So inspiring! ✨",
    "This is everything! 💯",
    "I'm speechless! 😶",
  ];
  const randomIndex = Math.floor(Math.random() * comments.length);
  return comments[randomIndex];
};
