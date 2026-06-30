import Logo from "./Logo";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white">
      {/* Navbar (solid dark — not covered by the background) */}
      <header className="flex h-[68px] flex-shrink-0 items-center bg-[#0F0F0F] px-6 md:px-10 lg:px-14">
        <Logo />
      </header>

      {/* Body with background.svg as the cover (desktop only — removed on mobile) */}
      <div className="flex min-h-0 flex-1 bg-[#0F0F0F] bg-top bg-no-repeat bg-cover lg:bg-[url('/background.svg')]">
        {/* Left panel: side image anchored bottom + #292929 divider line */}
        <aside className="relative hidden overflow-hidden border-r border-[#292929] lg:block lg:w-[42%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sideimage.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-[685px] w-[819px] max-w-none"
          />
        </aside>

        {/* Right content */}
        <main className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-[611px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
