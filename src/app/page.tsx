import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QrypticLogo } from "@/components/qryptic-logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-2xl text-center">
        <div className="scale-150 mb-4">
          <QrypticLogo />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          The Architecture of <br /> Connection.
        </h1>

        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Create dynamic, trackable, and beautiful QR codes that last forever. 
          Engineered for the modern web.
        </p>

        <div className="flex gap-4">
          <Link href="/login">
            <Button className="px-8 h-12 text-base rounded-full bg-white text-black hover:bg-zinc-200 font-bold transition-all hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}