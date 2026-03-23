import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) =>
        /^\d{4}-\d{2}-\d{2}$/.test(v),
      message: (props) => `${props.value} is not a valid date (YYYY-MM-DD)`
    }
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  }
});

const Calendar = mongoose.model('Calendar', calendarSchema);

export default Calendar;