import jest from "jest";
import ReactDOM from "react-dom";
import React from "react";
import GroupCard from "../components/shared/GroupCard";
import { act } from "react-dom/test-utils";
const groups = [
  {
    name: "Group 8",
    groupMember: [
      {
        firstName: "Navn",
        lastName: "navnesen",
        userName: "username",
        email: "email",
      },
    ],
  },
];

describe("", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });
  it("Should render group card", () => {
    act(() => {
      ReactDOM.render(
        <GroupCard
          group={groups[0]}
          key={1}
          onClick={() => console.log("Click!")}
        />,
        container
      );
    });
    expect(container.querySelector("h3").innerHTML).toContain("Group 8");
  });
});
