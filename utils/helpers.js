const moment = require('moment');
module.exports = {
  
  // helper function to generate one of 3 random emojis
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
  // helper function to trim our blog post body for display in blog post aggregate form (homepage)
  trim_string: (stringToTrim)=>{
    let newString = stringToTrim.substring(0,170);
    return newString;
  },
  
  // helper function to format the date.
  format_date: (dateToFormat)=>{
    let newDate = moment(dateToFormat).format('M-D-YYYY');
    return newDate;
  },

  
};
