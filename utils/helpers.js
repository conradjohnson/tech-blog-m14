module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let emoj = "💾";

    if (randomNum > 0.7) {
      emoj = "🖨";
    } else if (randomNum > 0.4) {
      emoj = "📱";
    }

    return `<span for="img">${emoj}</span>`;
  },
  trim_string: (stringToTrim)=>{
    let newString = stringToTrim.substring(0,170);
    return newString;
  },

  
};
