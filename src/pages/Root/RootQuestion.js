import "./RootQuestion.css";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { Container } from "@mui/material";

import { Nav2 } from "../../components/UI/Nav/Nav";

function RootQuestion() {
  return (
    <Fragment>
      <Nav2 />
      <section>
        <Container className="root-container">
          <h1 className="py-2 text-center text-3xl md:text-5xl">
            {" "}
            Open Problems in Longevity{" "}
          </h1>
        </Container>
      </section>
      <main className="w-full p-8">
        <Container>
          <Outlet />
        </Container>
      </main>
    </Fragment>
  );
}

export default RootQuestion;
