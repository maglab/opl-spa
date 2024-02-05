import { HashLink } from "react-router-hash-link";
import React from "react";
// import faqIcon from "../../../assets/svg/question-circle-svgrepo-com .svg?react";
import faqIcon from "../../../assets/svg/question-circle-svgrepo-com.svg?react";
import uploadIcon from "../../../assets/svg/upload-svgrepo-com.svg?react";
import linkIcon from "../../../assets/svg/link-svgrepo-com.svg?react";
import withSVG from "../../../utils/hoc/withSVG";

const defaultProps = { width: "80px", height: "80px" };
const QuestionMark = withSVG(faqIcon, defaultProps);
const Submit = withSVG(uploadIcon, defaultProps);
const Link = withSVG(linkIcon, defaultProps);

const aboutLinks = [
  { title: "About Us", link: "/about" },
  { title: "Our members", link: "..." },
  { title: "Database schema", link: "..." },
];

const submitLinks = [
  { title: "Open Problem", link: "/submit" },
  { title: "Feature request", link: "/feature-request" },
];

const usefulLinks = [{ title: "Rejuvenomics Lab", link: "..." }];

/**
 * Helper component used by Resources component. Renders SVG and links beneath.
 * @param {React.Component} children - Imported SVG component
 * @param {[Object]} links - Array of link objects containing titles and url route compatibe with react-router-dom HashLink component
 * @param {Boolean} external - A boolean to determine whether the link is used for internal or external navigation
 * @returns {React.Component}
 */
function Column({ children, links, external }) {
  return (
    <div className="flex flex-col text-white font-general text-base md:text-xl items-center text-center h-full">
      {children}
      <ul className="links gap-y-2 text-base md:text-xl">
        {external
          ? links.map((link) => (
              <li>
                {" "}
                <a href={link.link} className="hover:underline">
                  {link.title}
                </a>
              </li>
            ))
          : links.map((link) => (
              <li>
                <HashLink className="hover:underline">{link.title}</HashLink>
              </li>
            ))}{" "}
      </ul>
    </div>
  );
}

function Resources() {
  return (
    <div className="w-full flex flex-row justify-center py-10 mt-6 text-white font-general gap-x-20">
      <Column links={aboutLinks}>
        <QuestionMark />
        <h1 className="font-general font-semibold"> Learn </h1>
      </Column>
      <Column links={submitLinks}>
        <Submit />
        <h1 className="font-general font-semibold"> Submit </h1>
      </Column>
      <Column links={usefulLinks}>
        <Link />
        <h1 className="font-general font-semibold"> Useful Links</h1>
      </Column>
    </div>
  );
}

export default Resources;
