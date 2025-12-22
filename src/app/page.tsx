import { QrypticLogo } from "@/components/qryptic-logo";
import { QrGenerator } from "@/components/qr-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background relative overflow-hidden">
      
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="z-10 flex flex-col items-center gap-8 w-full max-w-md">
        
        {/* The Dynamic Logo */}
        <div className="scale-125 mb-4">
          <QrypticLogo />
        </div>

        {/* The Generator Engine */}
        <QrGenerator />

        <p className="text-center text-muted-foreground font-mono text-xs opacity-50">
          SYSTEM STATUS: <span className="text-green-500">ONLINE</span>
        </p>

      </div>
    </main>
  );
}