import './App.css';

const products = [
  {
    name: 'Apple AirPods Pro (2nd Gen)',
    price: '$249',
    image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1660803972361',
  },
  {
    name: 'Stanley Quencher Tumbler',
    price: '$45',
    image: 'https://cdn.shopify.com/s/files/1/0273/5387/8215/products/QuencherH2.0FlowStateTumbler40oz-Charcoal_1200x1200.jpg',
  },
  {
    name: 'Nintendo Switch OLED',
    price: '$349',
    image: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/switch/site-design-update/oled-model-white-set',
  },
  {
    name: 'Dyson Airwrap Styler',
    price: '$599',
    image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/400714-01.png',
  },
  {
    name: 'Lululemon Everywhere Belt Bag',
    price: '$38',
    image: 'https://images.lululemon.com/is/image/lululemon/LU9B78S_0001_1',
  },
  {
    name: 'Kindle Paperwhite',
    price: '$139',
    image: 'https://m.media-amazon.com/images/I/61n5mGkKJ2L._AC_SL1000_.jpg',
  },
  {
    name: 'Owala FreeSip Water Bottle',
    price: '$28',
    image: 'https://cdn.shopify.com/s/files/1/0550/9246/5842/products/owala-freesip-24oz-shy-marshmallow-1_1200x1200.jpg',
  },
  {
    name: 'UGG Tasman Slippers',
    price: '$110',
    image: 'https://images.ugg.com/is/image/ugg/1122553-CHE_1',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 drop-shadow-lg">Trending Best Sellers</h1>
      <div className="w-full max-w-md flex flex-col gap-8">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-xl flex flex-col items-center p-6 hover:scale-105 transition-transform border border-gray-100"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-2xl mb-4 shadow-md border"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">{product.name}</h2>
            <p className="text-lg font-bold text-pink-600 mb-4">{product.price}</p>
            <button className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-semibold shadow hover:from-pink-500 hover:to-purple-500 transition-colors">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
