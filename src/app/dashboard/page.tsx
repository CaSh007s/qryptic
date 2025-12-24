import { QrGenerator } from "@/components/qr-generator";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background relative overflow-hidden">
      {/* Reuse the grid background for consistency */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="z-10 w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold tracking-tight text-center">CREATE_NEW_QR</h1>
        <QrGenerator />
      </div>
    </main>
  );
}