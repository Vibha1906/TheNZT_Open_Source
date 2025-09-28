'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain, Zap, Shield, BarChart3, Users, Code, Database, Globe, TrendingUp, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LandingPage = () => {
  const router = useRouter();

  const features = [
    {
      icon: Brain,
      title: 'Multi-Agent LLM Collaboration',
      description: 'Advanced AI agents working together to provide comprehensive financial insights and analysis.',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Market Data',
      description: 'Get up-to-date stock prices, market trends, and financial indicators instantly.',
      color: 'text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Financial Analysis',
      description: 'Deep dive into company financials, ratios, and performance metrics.',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Market Research',
      description: 'Comprehensive market research with sentiment analysis and trend identification.',
      color: 'text-orange-600'
    },
    {
      icon: Zap,
      title: 'Fast & Scalable',
      description: 'High-performance architecture designed for speed and reliability.',
      color: 'text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with robust authentication and data protection.',
      color: 'text-red-600'
    }
  ];

  const agents = [
    {
      name: 'Fast Agent (Lite)',
      description: 'Rapid insights for quick financial queries',
      features: ['Real-time data', 'Quick responses', 'Basic analysis'],
      color: 'bg-green-50 border-green-200'
    },
    {
      name: 'Planner Agent (Core)',
      description: 'Structured multi-step analysis for complex queries',
      features: ['Sequential planning', 'Comprehensive research', 'Detailed reports'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Reasoning Agent (Pro)',
      description: 'Dynamic iterative reasoning for evolving queries',
      features: ['Adaptive analysis', 'Iterative reasoning', 'Flexible responses'],
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const stats = [
    { label: 'AI Agents', value: '15+' },
    { label: 'Data Sources', value: '10+' },
    { label: 'Response Time', value: '<2s' },
    { label: 'Accuracy Rate', value: '95%+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">TheNZT</span>
            </div>
            {/* Nav bar */}
            <nav className="hidden md:flex items-center space-x-6 text-slate-700">
              <button className="text-sm hover:text-slate-900" onClick={() => router.push('/chat')}>AI Chatbot</button>
              <button className="text-sm hover:text-slate-900" onClick={() => router.push('/technical-analysis')}>Technical Analysis</button>
              <button className="text-sm hover:text-slate-900" onClick={() => router.push('/indices')}>Indices</button>
              <button className="text-sm hover:text-slate-900" onClick={() => router.push('/forex-analysis')}>Forex Analysis</button>
              <button className="text-sm hover:text-slate-900" onClick={() => router.push('/subscription')}>Subscription</button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/login')}>
                Sign In
              </Button>
              <Button onClick={() => router.push('/signup')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            🚀 Open Source Multi-Agent Finance System
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6">
            Intelligent Finance
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {' '}Query Processing
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            TheNZT leverages advanced LLM multi-agent collaboration to provide intelligent solutions 
            for finance, company-specific, and market-related queries with unprecedented accuracy and speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push('/signup')} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/docs')}>
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to deliver the most comprehensive financial analysis platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Architecture Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Multi-Agent Architecture</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three specialized AI agents working in harmony to provide comprehensive financial insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <Card key={index} className={`border-2 ${agent.color} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  <CardDescription>{agent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {agent.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built with Modern Technology</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Leveraging the latest in AI, web development, and data processing technologies.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Next.js', description: 'React Framework' },
              { name: 'FastAPI', description: 'Python Backend' },
              { name: 'LangChain', description: 'AI Framework' },
              { name: 'MongoDB', description: 'Database' },
              { name: 'Redis', description: 'Caching' },
              { name: 'Docker', description: 'Containerization' },
              { name: 'Tailwind CSS', description: 'Styling' },
              { name: 'TypeScript', description: 'Type Safety' }
            ].map((tech, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-lg font-semibold text-slate-900 mb-2">{tech.name}</div>
                <div className="text-sm text-slate-600">{tech.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Financial Analysis?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of users who trust TheNZT for their financial insights and market analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => router.push('/signup')}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              View Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TheNZT</span>
              </div>
              <p className="text-slate-400">
                Multi-agent finance query processing system for intelligent financial analysis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/features" className="hover:text-white">Features</a></li>
                <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/demo" className="hover:text-white">Demo</a></li>
                <li><a href="/api" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/docs" className="hover:text-white">Documentation</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/support" className="hover:text-white">Support</a></li>
                <li><a href="/community" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 TheNZT. All rights reserved. Open source under MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
