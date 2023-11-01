// CastMember.test.tsx
import { render, screen } from "@testing-library/react";
import CastMember from "./CastMember";
import { ICastMember } from "../../types";
import React from "react";

describe("CastMember", () => {
  const mockActor: ICastMember = {
    person: {
      id: 1,
      name: "John Doe",
      image: { medium: "john_doe_img.jpg" },
    },
    character: { name: "Character One" },
  };

  it("displays the actor information", () => {
    render(<CastMember actor={mockActor} />);

    expect(screen.getByText(mockActor.person.name)).toBeInTheDocument();

    const image = screen.getByAltText(`Image of ${mockActor.person.name}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockActor.person.image.medium);
  });

  it("displays a default image when the actor does not have an image", () => {
    const actorWithoutImage = {
      ...mockActor,
      person: { ...mockActor.person, image: undefined },
    };

    render(<CastMember actor={actorWithoutImage} />);

    const image = screen.getByAltText(
      `Image of ${actorWithoutImage.person.name}`
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/unknown_actor.png");
  });
});
