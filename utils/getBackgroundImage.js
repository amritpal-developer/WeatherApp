
export const getBackgroundImage = (condition, hour) => {
    const lowerCondition = condition.toLowerCase();
  
    if (lowerCondition.includes("rain") || lowerCondition.includes("storm")) {
      return require("../assets/images/jpg/rain.jpg");
    } else if (hour >= 6 && hour < 12) {
      return require("../assets/images/jpg/day.jpg");
    } else if (hour >= 12 && hour < 18) {
      return require("../assets/images/jpg/evening.jpg");
    } else {
      return require("../assets/images/jpg/night.jpg");
    }
  };
  