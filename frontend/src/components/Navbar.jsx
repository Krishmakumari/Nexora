export default function Navbar({ cart, onCartClick, onLogoClick }) {
  return (
    <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', width: '100%'}}>
      {/* Logo - Left Side */}
      <div 
        onClick={onLogoClick}
        style={{display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer'}}
      >
        <span style={{fontSize: '65px'}}>🛒</span>
        <span style={{color: '#374151', fontFamily: 'Dancing Script, cursive', fontSize: '65px'}}>Vibe Commerce</span>
      </div>

      {/* Cart - Right Side */}
      <button 
        onClick={onCartClick}
        style={{
          position: 'relative',
          backgroundColor: '#14b8a6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '16px',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <span style={{fontSize: '14px', fontWeight: '500'}}>Cart</span>
        {cart.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: '12px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {cart.length}
          </span>
        )}
      </button>
    </nav>
  );
}