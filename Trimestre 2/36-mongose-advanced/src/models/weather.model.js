import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema(
  {
    st: String,
    ts: Date,
    temp: Number,
    pressure: Number,
    visibility: Number
  },
  {
    strict: false
  }
);

const Weather = mongoose.model(
  'Weather',
  weatherSchema,
  'data'
);

export default Weather;
