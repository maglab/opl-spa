import ContactFooterComponent from "./ContactFooterComponent";
import ImagesFooterComponent from "./ImagesFooterComponent";

function Footer() {
  return (
    <div className="footer h-full w-full p-6 py-4 bg-gray-600 flex flex-col">
      <ContactFooterComponent />
      <ImagesFooterComponent />
    </div>
  );
}

export default Footer;
