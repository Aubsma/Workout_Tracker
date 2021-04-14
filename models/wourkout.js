const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercises: {
    type: String,
    trim: true,
    required: "Enter a type of workout"
  },
  name: {
    type: String,
    trim: true,
    required: "Enter name"
  },
  duration: {
    type: Number,
    required: "How long was it preformed"
  },
  weight: {
    type: Number,
    required: "weight"
  },
  reps: {
    type: Number,
    required: "How many reps"
  },
  sets: {
    type: Number,
    required: "How many sets"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;