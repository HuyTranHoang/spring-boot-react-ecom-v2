const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 100
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300
  }
]

function App() {
  return (
    <div className='h-screen bg-stone-100'>
      {products.map((product) => (
        <div key={product.id} className='rounded-md bg-white p-4 shadow-md'>
          <h2 className='text-lg font-semibold'>{product.name}</h2>
          <p className='text-gray-500'>${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default App
