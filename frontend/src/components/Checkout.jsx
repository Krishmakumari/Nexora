import { useState } from 'react';

export default function Checkout({ cart, total, onSubmit, onBack }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) {
      alert('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    await onSubmit(customerInfo);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>←</span> Back to Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-6 max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📦</span> Order Summary
            </h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-lg">
                      {getProductEmoji(item.productId?.name)}
                    </div>
                    <div>
                      <span className="font-medium">{item.productId?.name}</span>
                      <span className="text-gray-500 text-sm block">Qty: {item.qty}</span>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600">₹{((item.productId?.price || 0) * item.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-3 border-t-2 border-gray-200">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-green-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📝</span> Customer Information
            </h3>
            
            <div className="space-y-">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full p-4 border-2 border-gray-400 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="w-full p-4 border-2 border-gray-400 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
<br></br>
            <button
              type="submit"
              disabled={isSubmitting}
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
                gap: '8px',
                opacity: isSubmitting ? 0.5 : 1
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(20, 184, 166, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(20, 184, 166, 0.3)';
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>💳</span>
                  Complete Order - ₹{total.toLocaleString()}
                </span>
              )}
            </button>
          </form>
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