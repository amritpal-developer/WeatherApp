
export const getInfoCards = (today) => [
    {
      iconName: "thermometer",
      title: "Feels Like",
      value: Math.round(today.feelslike),
      unit: "°",
      description: "Feels hotter than actual",
    },
    {
      iconName: "weather-sunny-alert",
      title: "UV Index",
      value: today.uvindex,
      unit: "",
      description: "Sun risk level",
    },
    {
      iconName: "weather-windy",
      title: "Wind",
      value: Math.round(today.windspeed),
      unit: " kph",
      description: `Gusts ${Math.round(today.windgust)} kph`,
    },
    {
      iconName: "compass",
      title: "Direction",
      value: `${today.winddir}°`,
      unit: "",
      description: "Wind direction",
    },
    {
      iconName: "weather-sunset-down",
      title: "Sunset",
      value: today.sunset,
      unit: "",
      description: `Sunrise: ${today.sunrise}`,
    },
    {
      iconName: "water-percent",
      title: "Humidity",
      value: today.humidity,
      unit: "%",
      description: "Moisture in air",
    },
    {
      iconName: "weather-pouring",
      title: "Precip",
      value: today.precip,
      unit: " mm",
      description: "Rain chance",
    },
    {
      iconName: "eye",
      title: "Visibility",
      value: today.visibility,
      unit: " km",
      description: "Outdoor visibility",
    },
  ];
  