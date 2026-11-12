
function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} FarmaFlux. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;