// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 px-4 py-2 text-white">
      {/* Container for centering footer content */}
      <div className="container mx-auto flex items-center justify-center">
        {/* Footer text */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} E-Commerce Store. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
