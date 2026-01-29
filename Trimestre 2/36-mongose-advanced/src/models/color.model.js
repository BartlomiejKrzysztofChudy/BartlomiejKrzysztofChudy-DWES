import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  selectedColor: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.colorList.includes(value);
      },
      message: 'El color seleccionado no está en la lista de colores'
    }
  },
  colorList: {
    type: [String],
    required: true
  }
});

const Color = mongoose.model('Color', colorSchema);

export default Color;
