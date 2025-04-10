const Footer = () => {
  return (
    <footer className="bg-red-950 text-center py-4 border-t border-red-900">
      <p className="text-white text-sm">
        © {new Date().getFullYear()} MovieApp
      </p>
    </footer>
  );
};

export default Footer;