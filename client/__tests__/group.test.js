import jest from "jest";
import ReactDOM from "react-dom";
import React from "react";
import GroupCard from "../components/shared/GroupCard";
import { act } from "react-dom/test-utils";
import { GroupCriteria } from "../components/shared/GroupCriteria";
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
    criteria: {
      school: "HK",
      gradeGoal: "A",
      workFrequency: "W2",
      language: "Norsk",
      maxSize: 8,
      location: "Oslo",
      subject: ["PGSomething"],
      workType: "HYBRID",
    },
  },
];

// Mock http-kall https://github.com/mswjs/msw

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

  // it("Should render group criteria", () => {
  //   act(() => {
  //     ReactDOM.render(<GroupCriteria )
  //   })
  // });
});
