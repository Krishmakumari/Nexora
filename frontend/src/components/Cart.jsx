export default function Cart({ cart, total, onRemove, onCheckout, onContinueShopping }) {
  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-8xl mb-6">🛍️</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 text-lg mb-8">Discover amazing products and start shopping!</p>
        <button
          onClick={onContinueShopping}
          className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-lg">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        <button
          onClick={onContinueShopping}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
        >
          Continue Shopping
        </button>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center text-2xl">
                  {getProductEmoji(item.productId?.name)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{item.productId?.name || 'Unknown Product'}</h3>
                  <p className="text-gray-600">₹{(item.productId?.price || 0).toLocaleString()} each</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm font-medium">
                      Qty: {item.qty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600 mb-2">
                    ₹{((item.productId?.price || 0) * item.qty).toLocaleString()}
                  </div>
                  <button
                    onClick={() => onRemove(item._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1" style={{display: 'flex', justifyContent: 'flex-end', marginLeft: '50px'}}>
          <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-4 border border-gray-100" style={{width: '100%', maxWidth: '500px',height:'300px'}}>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <hr />
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-teal-600">₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                color: 'white',
                border: 'none',
                padding: '14px 20px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(20, 184, 166, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(20, 184, 166, 0.3)';
              }}
            >
              <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getProductEmoji(name) {
  const emojiMap = {
    'Laptop': '💻',
    'Headphones': '🎧',
    'Keyboard': '⌨️',
    'Mouse': '🖱️',
    'Smartwatch': '⌚'
  };
  return emojiMap[name] || '📦';
}