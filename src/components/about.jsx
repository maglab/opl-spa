import React from "react";
import Markdown from "react-markdown";
import about from "../assets/about.md?raw";

export default function About() {
  return <Markdown>{about}</Markdown>;
}
