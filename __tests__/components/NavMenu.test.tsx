import {
    NavMenu,
    NavMenuLink,
    NavMenuTrigger,
    NavMenuWrap,
} from "@/components/NavMenu";
import { NAvMenuContext } from "@/components/NavMenuContext";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/components/Icon", () => {
  const MockIcon = ({ icon }: { icon: "Close" | "Menu" }) => (
    <span data-testid={icon}></span>
  );
  MockIcon.displayName = "MockIcon";
  return MockIcon;
});

const mockControls = {
  start: jest.fn(() => Promise.resolve()),
  stop: jest.fn(),
  set: jest.fn(),
  subscribe: jest.fn(() => jest.fn()),
  mount: jest.fn(),
};

const baseContextValue = {
  show: false,
  openMethod: jest.fn(),
  closeMethod: jest.fn(),
  matches: false,
  menuControls: mockControls,
  navWrapControls: mockControls,
  setMaskStyle: jest.fn(),
  maskStyle: {},
};

describe("NavMenu Components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  // -------------------------
  // NavMenu
  // -------------------------
  it("renders children inside NavMenu", () => {
    render(
      <NavMenu>
        <p>Child</p>
      </NavMenu>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  // -------------------------
  // NavMenuTrigger
  // -------------------------
  describe("NavMenuTrigger", () => {
    it("calls openMethod when menu is closed", () => {
      const ctx = { ...baseContextValue, show: false };
      render(
        <NAvMenuContext.Provider value={ctx}>
          <NavMenuTrigger />
        </NAvMenuContext.Provider>
      );
      const btn = screen.getByRole("button", { name: /open menu/i });
      fireEvent.click(btn);
      expect(ctx.openMethod).toHaveBeenCalled();
      expect(screen.getByTestId("Menu")).toBeInTheDocument();
    });

    it("calls closeMethod when menu is open", () => {
      const ctx = { ...baseContextValue, show: true };
      render(
        <NAvMenuContext.Provider value={ctx}>
          <NavMenuTrigger />
        </NAvMenuContext.Provider>
      );
      const btn = screen.getByRole("button", { name: /close menu/i });
      fireEvent.click(btn);
      expect(ctx.closeMethod).toHaveBeenCalled();
      expect(screen.getByTestId("Close")).toBeInTheDocument();
    });
  });

  // -------------------------
  // NavMenuWrap
  // -------------------------
  describe("NavMenuWrap", () => {
    it("renders children correctly", () => {
      render(
        <NAvMenuContext.Provider value={baseContextValue}>
          <NavMenuWrap>
            <div>Menu Content</div>
          </NavMenuWrap>
        </NAvMenuContext.Provider>
      );
      expect(screen.getByText("Menu Content")).toBeInTheDocument();
    });

    it("closes menu on route change", () => {
      const closeMethod = jest.fn();
      (usePathname as jest.Mock).mockReturnValue("/home");

      const { rerender } = render(
        <NAvMenuContext.Provider
          value={{ ...baseContextValue, closeMethod, show: true }}
        >
          <NavMenuWrap>
            <div>Menu Content</div>
          </NavMenuWrap>
        </NAvMenuContext.Provider>
      );

      (usePathname as jest.Mock).mockReturnValue("/about");
      rerender(
        <NAvMenuContext.Provider
          value={{ ...baseContextValue, closeMethod, show: true }}
        >
          <NavMenuWrap>
            <div>Menu Content</div>
          </NavMenuWrap>
        </NAvMenuContext.Provider>
      );

      expect(closeMethod).toHaveBeenCalled();
    });

    it("closes menu on outside click", () => {
      const closeMethod = jest.fn();
      render(
        <NAvMenuContext.Provider
          value={{ ...baseContextValue, closeMethod, show: true }}
        >
          <NavMenuWrap>
            <div>Inside Menu</div>
          </NavMenuWrap>
        </NAvMenuContext.Provider>
      );

      fireEvent.click(document.body);
      expect(closeMethod).toHaveBeenCalled();
    });

    it("sets paddingTop style based on header height", () => {
      const header = document.createElement("header");
      Object.defineProperty(header, "getBoundingClientRect", {
        value: () => ({ height: 50 }),
      });
      document.body.appendChild(header);

      render(
        <NAvMenuContext.Provider value={baseContextValue}>
          <NavMenuWrap>
            <div>Menu Content</div>
          </NavMenuWrap>
        </NAvMenuContext.Provider>
      );

      const navWrap = document.querySelector(".nav-wrap");
      expect(navWrap).toHaveStyle("padding-top: 70px");

      document.body.removeChild(header);
    });

    it("keeps default paddingTop when header not found", () => {
      render(
        <NAvMenuContext.Provider value={baseContextValue}>
          <NavMenuWrap>
            <div>Menu Content</div>
          </NavMenuWrap>
        </NAvMenuContext.Provider>
      );

      const navWrap = document.querySelector(".nav-wrap");
      expect(navWrap).toHaveStyle("padding-top: 0");
    });

    it("renders inside portal when matches=false", () => {
      render(
        <NAvMenuContext.Provider
          value={{ ...baseContextValue, matches: false }}
        >
          <NavMenuWrap>
            <div>Portal Content</div>
          </NavMenuWrap>
        </NAvMenuContext.Provider>
      );

      expect(document.body).toHaveTextContent("Portal Content");
    });
  });

  // -------------------------
  // NavMenuLink
  // -------------------------
  describe("NavMenuLink", () => {
    it("applies nav-active when path matches", () => {
      (usePathname as jest.Mock).mockReturnValue("/about");
      render(
        <NAvMenuContext.Provider value={baseContextValue}>
          <NavMenuLink href="/about">About</NavMenuLink>
        </NAvMenuContext.Provider>
      );
      const link = screen.getByRole("link", { name: /about/i });
      expect(link).toHaveClass("nav-active");
    });

    it("does not apply nav-active when path does not match", () => {
      (usePathname as jest.Mock).mockReturnValue("/home");
      render(
        <NAvMenuContext.Provider value={baseContextValue}>
          <NavMenuLink href="/about">About</NavMenuLink>
        </NAvMenuContext.Provider>
      );
      const link = screen.getByRole("link", { name: /about/i });
      expect(link).not.toHaveClass("nav-active");
    });

    it("calls setMaskStyle when matches=true and path matches", async () => {
      (usePathname as jest.Mock).mockReturnValue("/about");
      const setMaskStyle = jest.fn();
      render(
        <NAvMenuContext.Provider
          value={{ ...baseContextValue, matches: true, setMaskStyle }}
        >
          <NavMenuLink href="/about">About</NavMenuLink>
        </NAvMenuContext.Provider>
      );
      await waitFor(() => expect(setMaskStyle).toHaveBeenCalled());
    });

    it("does not call setMaskStyle when matches=false", async () => {
      (usePathname as jest.Mock).mockReturnValue("/about");
      const setMaskStyle = jest.fn();
      render(
        <NAvMenuContext.Provider
          value={{ ...baseContextValue, matches: false, setMaskStyle }}
        >
          <NavMenuLink href="/about">About</NavMenuLink>
        </NAvMenuContext.Provider>
      );
      await new Promise((r) => setTimeout(r, 0));
      expect(setMaskStyle).not.toHaveBeenCalled();
    });
  });

  describe("NavMenuWrap additional cases", () => {
    it("renders inside component when matches=true", () => {
      render(
        <NAvMenuContext.Provider value={{ ...baseContextValue, matches: true }}>
          <NavMenuWrap>
            <div>Inline Content</div>
          </NavMenuWrap>
        </NAvMenuContext.Provider>
      );

      expect(screen.getByText("Inline Content")).toBeInTheDocument();
    });
  });

  describe("NavMenuLink additional cases", () => {
    it("does not call setMaskStyle when matches=true but path does not match", async () => {
      (usePathname as jest.Mock).mockReturnValue("/home");
      const setMaskStyle = jest.fn();

      await act(async () => {
        render(
          <NAvMenuContext.Provider
            value={{ ...baseContextValue, matches: true, setMaskStyle }}
          >
            <NavMenuLink href="/about">About</NavMenuLink>
          </NAvMenuContext.Provider>
        );

        await new Promise((r) => setTimeout(r, 0));
      });
      expect(setMaskStyle).not.toHaveBeenCalled();
    });

    it("does not call setMaskStyle when matches=true but path does not match", async () => {
      (usePathname as jest.Mock).mockReturnValue("/home");
      const setMaskStyle = jest.fn();

      await act(async () => {
        render(
          <NAvMenuContext.Provider
            value={{ ...baseContextValue, matches: true, setMaskStyle }}
          >
            <NavMenuLink href="/about">About</NavMenuLink>
          </NAvMenuContext.Provider>
        );

        await new Promise((r) => setTimeout(r, 0));
      });
      expect(setMaskStyle).not.toHaveBeenCalled();
    });
  });
});
