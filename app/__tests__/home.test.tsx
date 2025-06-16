import { render } from "@testing-library/react";
import Page from "@/app/page";
import { services } from "@/lib/data/placeholder-data";

describe("Home page componenet", () => {
  it("Renders the banner", () => {
    const { getByTestId } = render(<Page />);
    const banner = getByTestId("banner");
    expect(banner).toBeInTheDocument();
  });

  it("Renders correct banner text.", () => {
    const { getByText } = render(<Page />);
    const bannerText = getByText("⚡️ Premium Auto Detailng");

    expect(bannerText).toBeInTheDocument();
  });

  it("Renders a link to the booking page", () => {
    const { getByRole } = render(<Page />);
    const bookLink = getByRole("link", { name: "Book now" });

    expect(bookLink).toBeInTheDocument();
    expect(bookLink).toHaveAttribute("href", "/booking");
  });
});

describe("Services lists all service items", () => {
  it("Renders all service properties", () => {
    const { getByText, getAllByRole } = render(<Page />);
    const img = getAllByRole("img");

    services.forEach((service, index) => {
      const title = getByText(service.title);
      const description = getByText(service.description);
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(img[index]).toHaveAttribute("src", service.icon);
    });
  });
});
