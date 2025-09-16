import Link from "next/link";
import { ArrowRight, Code, Coins, Globe, Lock, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EmbeddableDemo from "@/components/embeddable-demo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex-1 w-full">
        <section className="container mx-auto px-4 py-24 md:py-32 space-y-24">
          {/* Hero Section */}
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900">
              DOB INDEX: Your Gateway to Tokenized Infrastructure
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Seamlessly tokenize and finance your infrastructure assets. Built
              on DOB Protocol, verified by TRUFA - the trusted standard for
              infrastructure token validation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="gap-2 bg-[#597CE9] hover:bg-[#4A6CD4] text-white"
                asChild
              >
                <Link href="https://trufa-gateway.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Start Integrating <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-white"
                asChild
              >
                <Link href="https://dobprotocol-1.gitbook.io/dobprotocol-wiki/dob-index/overview" target="_blank" rel="noopener noreferrer">
                  View Documentation
                </Link>
              </Button>
            </div>
          </div>

          {/* Demo Section */}
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Seamless Token Sales
                </h2>
                <p className="text-gray-600">
                  Our embeddable widget enables you to offer your machine tokens
                  directly to your clients. A complete solution for tokenizing
                  your infrastructure and managing sales.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Customizable token display</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Flexible pricing options</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Direct client integration</span>
                  </li>
                </ul>
              </div>
              <div className="border rounded-xl shadow-lg p-6 bg-white">
                <EmbeddableDemo />
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div id="features" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Why Choose Our Solution?
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Transform your infrastructure into tokenized assets and offer
                them directly to your clients
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-gray-200">
                <CardContent className="pt-6 space-y-4">
                  <div className="rounded-full bg-blue-100 p-3 w-fit">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Easy Integration
                  </h3>
                  <p className="text-gray-600">
                    Add our widget to your platform with minimal code. Start
                    selling your machine tokens to clients immediately.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="pt-6 space-y-4">
                  <div className="rounded-full bg-purple-100 p-3 w-fit">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Complete Control
                  </h3>
                  <p className="text-gray-600">
                    Maintain full control over your token sales while providing
                    a seamless experience for your clients.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="pt-6 space-y-4">
                  <div className="rounded-full bg-green-100 p-3 w-fit">
                    <Lock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Verified Assets
                  </h3>
                  <p className="text-gray-600">
                    All machine tokens are verified and secured through the DOB
                    Protocol, ensuring trust and reliability.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How It Works */}
          <div id="how-it-works" className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                How It Works
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                A simple process to tokenize your machines and start selling to
                your clients
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="mx-auto rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Tokenize</h3>
                <p className="text-gray-600">
                  Convert your machines into verified tokens through the DOB
                  Protocol.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="mx-auto rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Integrate</h3>
                <p className="text-gray-600">
                  Add our widget to your platform to display and sell your
                  tokens.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="mx-auto rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Sell</h3>
                <p className="text-gray-600">
                  Start offering your tokens directly to your clients through
                  your platform.
                </p>
              </div>
            </div>
          </div>

          {/* Developer Section */}
          <div id="developers" className="mx-auto max-w-4xl space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                For Platform Owners
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                Start selling your machine tokens to clients with minimal
                integration effort
              </p>
            </div>
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`// Add the DOB Protocol script to your HTML
<script src="https://cdn.dobprotocol.io/embed.js"></script>

// Initialize the payment processor
<div id="dob-payment"></div>
<script>
  DobProtocol.init({
    container: '#dob-payment',
    tokens: ['YOUR_MACHINE_TOKEN'],
    theme: 'light',
    onSuccess: (transaction) => {
      console.log('Token sale successful!', transaction);
    }
  });
</script>`}</code>
              </pre>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mx-auto max-w-4xl text-center space-y-8 bg-gray-50 p-12 rounded-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to Tokenize Your Machines?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Join the future of machine tokenization. Start offering your
              tokens to clients through our seamless integration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="gap-2 bg-[#597CE9] hover:bg-[#4A6CD4] text-white"
                asChild
              >
                <Link href="https://trufa-gateway.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-white"
                asChild
              >
                <Link href="https://dobprotocol-1.gitbook.io/dobprotocol-wiki/dob-index/overview" target="_blank" rel="noopener noreferrer">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
