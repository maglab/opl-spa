function ContactFooterComponent() {
  return (
    <div className="contact-footer px-6 py-6 text-white">
      <h1 className="px-6 py-2 text-lg font-bold underline md:text-2xl">
        Contact Us
      </h1>
      <div className="contact-text flex flex-row justify-between px-6">
        <div className="address py-2">
          <p>Institute of Inflammation and Ageing</p>
          <p>University of Birmingham Research laboratories, Office 4</p>
          <p>Queen Elizabeth Hospital</p>
          <p>Mindelsohn Way</p>
          <p>Birmingham, B15 2WB</p>
        </div>
        <div className="contact-info">
          <div className="contact-pedro pb-2">
            <p className="font-semibold">João Pedro de Magalhães</p>
            <a
              href="mailto:j.p.magalhaes@bham.ac.uk"
              className="text-sm md:text-base hover:text-theme-blue underline"
            >
              j.p.magalhaes@bham.ac.uk{" "}
            </a>
          </div>
          <div className="contact-angelo">
            <p className="font-semibold">Angelo Talay</p>
            <a
              href="mailto:a.g.talay@bham.ac.uk"
              className="text:sm md:text-base hover:text-theme-blue underline"
            >
              a.g.talay@bham.ac.uk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactFooterComponent;
