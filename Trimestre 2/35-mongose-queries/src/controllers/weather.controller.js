import Weather from '../models/weather.model.js';

export const paginateWeather = async (offset, limit) => {
  return Weather.find()
    .skip(offset)
    .limit(limit);
};
