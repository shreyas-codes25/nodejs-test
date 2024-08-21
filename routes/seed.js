const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number
}));

const seedProducts = async () => {
    await Product.deleteMany({});
    for (let i = 1; i <= 50; i++) {
        await Product.create({ name: `Product ${i}`, price: i * 10 });
    }
    mongoose.connection.close();
};

seedProducts();