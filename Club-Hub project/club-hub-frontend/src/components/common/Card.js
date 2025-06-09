export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
} 