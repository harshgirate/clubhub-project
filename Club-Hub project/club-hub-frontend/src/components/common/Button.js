export function Button({ variant = 'primary', children, className = '', ...props }) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-300';
  
  const variants = {
    primary: 'bg-[#001f3f] hover:bg-[#002b57] text-white shadow-md hover:shadow-lg',
    secondary: 'bg-white border-2 border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white',
    outline: 'border-2 border-gray-300 hover:border-[#001f3f] text-gray-700 hover:text-[#001f3f]',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 