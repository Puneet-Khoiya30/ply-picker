// seedProducts.js
import mongoose from 'mongoose';
import connectToDatabase from './lib/mongodb';
import Product from './models/Product';

async function seedProducts() {
  await connectToDatabase();

  const products = [
    {
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 29.99,
      imageUrl: 'https://th.bing.com/th/id/R.a0760745374f03ae86b8c610eb2f047b?rik=k%2bUU8PdKTZmM2g&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f04%2fGoogle-images-chrome-wallpapers-HD.png&ehk=zijvq7BHuXGgVQE07TR%2bSyi8%2fmDeOrBlDW73nqrJ4es%3d&risl=1&pid=ImgRaw&r=0',
    },
    {
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 49.99,
      imageUrl: 'https://www.bing.com/images/search?view=detailV2&ccid=NR9MV7uA&id=1F35882191FAFC36C6B0B238DEF76DD679B50CC4&thid=OIP.NR9MV7uAIX9B1f16mQVe7wHaEG&mediaurl=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F90977.jpg&exph=3087&expw=5576&q=google+images+free&simid=608040475146142713&form=IRPRST&ck=7B1983FA31617695C450E36D36A96C1A&selectedindex=25&itb=0&cw=531&ch=542&ajaxhist=0&ajaxserp=0&vt=0&sim=11',
    },
    // Add more products as needed
  ];

  try {
    await Product.insertMany(products);
    console.log('Products inserted successfully!');
  } catch (error) {
    console.error('Error inserting products:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedProducts();
