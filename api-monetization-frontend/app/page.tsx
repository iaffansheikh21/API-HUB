import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { FloatingNavbar } from "@/components/ui/floating-navbar"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Sparkles } from "@/components/ui/sparkles"
import { Meteors } from "@/components/ui/meteors"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { ArrowRight, Code, DollarSign, Shield, BarChart3, Zap, Globe, Lock, TrendingUp } from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Features", link: "#features" },
  { name: "Pricing", link: "#pricing" },
  { name: "Docs", link: "#docs" },
]

const bentoItems = [
  {
    title: "Secure API Management",
    description: "Enterprise-grade security with JWT authentication, rate limiting, and access control.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="h-12 w-12 text-blue-600" />
        </div>
      </div>
    ),
    icon: <Shield className="h-4 w-4 text-blue-600" />,
    className: "md:col-span-2",
  },
  {
    title: "Real-time Analytics",
    description: "Track API usage, monitor performance, and analyze revenue with detailed insights.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BarChart3 className="h-12 w-12 text-purple-600" />
        </div>
      </div>
    ),
    icon: <BarChart3 className="h-4 w-4 text-purple-600" />,
  },
  {
    title: "Global Distribution",
    description: "Deploy your APIs worldwide with our edge network for optimal performance.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe className="h-12 w-12 text-green-600" />
        </div>
      </div>
    ),
    icon: <Globe className="h-4 w-4 text-green-600" />,
  },
  {
    title: "Flexible Monetization",
    description: "Multiple pricing models: subscription, usage-based, tiered, and freemium options.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <DollarSign className="h-12 w-12 text-yellow-600" />
        </div>
      </div>
    ),
    icon: <DollarSign className="h-4 w-4 text-yellow-600" />,
    className: "md:col-span-2",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <BackgroundBeams />
      <FloatingNavbar navItems={navItems} />

      {/* Hero Section */}
      <section className="relative py-32 px-4">
        <Meteors number={15} />
        <div className="container mx-auto text-center relative z-10">
          <Sparkles>
            <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" variant="secondary">
              🚀 Launch your APIs to the world
            </Badge>
          </Sparkles>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Monetize Your APIs
            <br />
            <AnimatedGradientText className="text-6xl md:text-7xl font-bold">Effortlessly</AnimatedGradientText>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            The complete platform for developers to publish, secure, and monetize their APIs. Get paid for your code
            while providing value to other developers worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Publishing APIs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                Browse APIs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section with Bento Grid */}
      <section id="features" className="py-24 px-4 bg-white/50 backdrop-blur-sm relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Everything you need to <AnimatedGradientText className="text-5xl font-bold">succeed</AnimatedGradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From API management to payment processing, we've got you covered with enterprise-grade tools
            </p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto">
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">APIs Published</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">$2M+</div>
              <div className="text-blue-100">Revenue Generated</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Developers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Enterprise Security</CardTitle>
                <CardDescription className="text-gray-600">
                  Bank-grade security with OAuth 2.0, JWT tokens, and comprehensive audit logs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Smart Analytics</CardTitle>
                <CardDescription className="text-gray-600">
                  AI-powered insights, predictive analytics, and automated optimization recommendations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
                <CardDescription className="text-gray-600">
                  Global CDN, Redis caching, and optimized routing for sub-100ms response times
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <Meteors number={10} />
        <div className="container mx-auto text-center relative z-10">
          <Sparkles>
            <h2 className="text-5xl font-bold text-white mb-6">Ready to monetize your APIs?</h2>
          </Sparkles>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who are already earning from their code. Start your journey today.
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Code className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">APIHub</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The platform for API monetization and developer success. Built by developers, for developers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-lg">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 APIHub. All rights reserved. Made with ❤️ for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
