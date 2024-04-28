import angeloPhoto from "./photos/angelo.png";
import paulPhoto from "./photos/paul.jpg";
import pedroPhoto from "./photos/pedro.jpg";

const people = [
  {
    photoSrc: pedroPhoto,
    name: "João Pedro de Magalhães",
    position: "Principal Investigator",
    introduction:
      "The scientific side of this platform, his personal connection with many big names in the field makes this platform possible",
    email: "j.p.magalhaes@bham.ac.uk",
  },
  {
    photoSrc: angeloPhoto,
    name: "Angelo Talay",
    position: "Bioinformatician",
    introduction: "Bioinformatician and project lead.",
    email: "a.g.talay@bham.ac.uk",
  },
  {
    photoSrc: paulPhoto,
    name: "Paul TO",
    position: "Software Architecture Lead",
    introduction:
      "The engineering side of this platform, a true software engineer volunteering his time, unpaid, just to help pushing the ageing research a bit further",
    email: "kptoemail@gmail.com",
  },
];

export default people;
