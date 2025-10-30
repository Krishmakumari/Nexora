export default function Receipt({ receipt, onNewOrder }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 text-center border border-gray-100 relative overflow-hidden">
        {/* Celebration Animation */}

        
        <div className="relative z-10">
          <p className="text-gray-600 mb-8">Thank you for your purchase!</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Customer</span>
              <span className="font-semibold">{receipt.customerInfo.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-sm">{receipt.customerInfo.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-xl text-green-600">₹{receipt.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order Date</span>
              <span className="font-semibold text-sm">{new Date(receipt.timestamp).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order Time</span>
              <span className="font-semibold text-sm">{new Date(receipt.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>

          <button
            onClick={onNewOrder}
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
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
}