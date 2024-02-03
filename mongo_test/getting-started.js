const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  const kittySchema = new mongoose.Schema({
    name: String
  });  

  const Kitten = mongoose.model('Kitten', kittySchema);
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  await silence.save();

  const kittens = await Kitten.find();
  console.log(kittens)
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}