'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Book, Code, Database, Brain, Zap, Shield, Users, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DocumentationPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const architectureData = {
    fastAgent: {
      title: 'Fast Agent (Lite)',
      description: 'Rapid insights for quick financial queries',
      workflow: [
        'User Query: Natural language question received',
        'Prompt Formatting: Query formatted with predefined instructions',
        'Routing Logic: Control layer determines appropriate tools',
        'Tool Execution: Chosen tools fetch relevant data',
        'Response Generation: LLM generates clear, cited markdown response',
        'Output to User: Final response delivered with sources'
      ],
      features: ['Real-time data', 'Quick responses', 'Basic analysis', 'Inline citations']
    },
    plannerAgent: {
      title: 'Planner Agent (Core)',
      description: 'Structured multi-step analysis for complex queries',
      workflow: [
        'Query Intake: Query received and validated by Intent Detector',
        'Plan Creation: Planner generates multi-step plan',
        'Plan Review: Executor reviews and finalizes plan',
        'Task Routing: Tasks assigned to specialized agents',
        'Data Processing: Each agent collects and analyzes data',
        'Response Generation: Response Generator compiles final response',
        'Response Delivery: Final response delivered to user'
      ],
      features: ['Sequential planning', 'Comprehensive research', 'Detailed reports', 'Multi-agent coordination']
    },
    reasoningAgent: {
      title: 'Reasoning Agent (Pro)',
      description: 'Dynamic iterative reasoning for evolving queries',
      workflow: [
        'Query Validation: Query validated for relevance',
        'Query Analysis: Manager analyzes query and current state',
        'Task Assignment: Manager assigns single task to appropriate agent',
        'Iterative Reasoning: Manager receives result and reasons about next step',
        'Response Generation: Response Generator crafts final response',
        'Response Delivery: Final response delivered to user'
      ],
      features: ['Adaptive analysis', 'Iterative reasoning', 'Flexible responses', 'Dynamic task assignment']
    }
  };

  const techStack = [
    { category: 'Frontend', technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', technologies: ['FastAPI', 'Python 3.11', 'Uvicorn', 'Pydantic', 'Celery'] },
    { category: 'AI/ML', technologies: ['LangChain', 'LangGraph', 'OpenAI', 'Gemini', 'Tavily'] },
    { category: 'Database', technologies: ['MongoDB', 'Redis', 'Qdrant', 'Beanie ODM'] },
    { category: 'Infrastructure', technologies: ['Docker', 'Docker Compose', 'UV Package Manager'] }
  ];

  const apiEndpoints = [
    { method: 'POST', endpoint: '/api/chat', description: 'Send finance query for processing' },
    { method: 'GET', endpoint: '/api/health', description: 'Health check endpoint' },
    { method: 'GET', endpoint: '/api/status', description: 'System status information' },
    { method: 'POST', endpoint: '/login', description: 'User authentication' },
    { method: 'POST', endpoint: '/registration', description: 'User registration' },
    { method: 'GET', endpoint: '/sessions', description: 'Get user session history' },
    { method: 'POST', endpoint: '/query-stream', description: 'Stream query responses' },
    { method: 'POST', endpoint: '/stock-predict', description: 'Stock prediction endpoint' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/')} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-slate-300" />
              <div className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-slate-600" />
                <span className="text-lg font-semibold text-slate-900">Documentation</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => window.open('https://github.com/IAI-solution/TheNZT_Open_Source', '_blank')}>
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button size="sm" onClick={() => router.push('/login')}>
                Try Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'overview' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'architecture' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Architecture
                </button>
                <button
                  onClick={() => setActiveTab('tech-stack')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'tech-stack' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Tech Stack
                </button>
                <button
                  onClick={() => setActiveTab('api')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'api' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  API Reference
                </button>
                <button
                  onClick={() => setActiveTab('deployment')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'deployment' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Deployment
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">TheNZT Documentation</h1>
                  <p className="text-lg text-slate-600 mb-6">
                    TheNZT is a powerful multi-agent finance query processing system designed to process and respond 
                    to finance-related queries efficiently. Leveraging advanced LLM multi-agent collaboration, it 
                    provides intelligent solutions for Finance, Company-specific, and Market-related queries.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <span>Key Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        '🤖 Multi-agent LLM collaboration for finance queries',
                        '📈 Real-time stock price and market data',
                        '🏢 Company-specific financial analysis',
                        '📊 Market trend summarization',
                        '🔍 Intelligent query processing',
                        '🚀 Fast and scalable architecture',
                        '🎨 Modern React frontend with Next.js',
                        '⚡ High-performance FastAPI backend'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-slate-600">
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <span>Getting Started</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Prerequisites</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                          <li>Python 3.10+</li>
                          <li>Node.js 16+ and npm</li>
                          <li>Git</li>
                          <li>Docker & Docker Compose (optional)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Quick Start</h4>
                        <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                          <div># Clone the repository</div>
                          <div>git clone git@github.com:IAI-solution/TheNZT_Open_Source.git</div>
                          <div>cd TheNZT_Open_Source</div>
                          <div className="mt-2"># Set up environment</div>
                          <div>cp .env.example .env</div>
                          <div className="mt-2"># Install dependencies</div>
                          <div>uv pip install -r requirements.txt</div>
                          <div>cd src/frontend && npm install</div>
                          <div className="mt-2"># Start the application</div>
                          <div>uvicorn src.backend.app:app</div>
                          <div>npm run dev</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">System Architecture</h1>
                  <p className="text-lg text-slate-600 mb-6">
                    TheNZT employs three distinct agent architectures, each optimized for different types of queries 
                    and complexity levels.
                  </p>
                </div>

                {Object.entries(architectureData).map(([key, agent]) => (
                  <Card key={key}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-purple-600" />
                        <span>{agent.title}</span>
                        <Badge variant="outline">{agent.description}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Workflow</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                            {agent.workflow.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {agent.features.map((feature, index) => (
                              <Badge key={index} variant="secondary">{feature}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'tech-stack' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">Technology Stack</h1>
                  <p className="text-lg text-slate-600 mb-6">
                    Built with modern, scalable technologies to ensure high performance and maintainability.
                  </p>
                </div>

                {techStack.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Code className="w-5 h-5 text-blue-600" />
                        <span>{category.category}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">API Reference</h1>
                  <p className="text-lg text-slate-600 mb-6">
                    Complete API documentation for integrating with TheNZT's backend services.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="w-5 h-5 text-green-600" />
                      <span>Available Endpoints</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {apiEndpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono text-slate-900">{endpoint.endpoint}</code>
                          </div>
                          <div className="text-sm text-slate-600">{endpoint.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interactive API Documentation</CardTitle>
                    <CardDescription>
                      Access the full interactive API documentation with Swagger UI
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        onClick={() => window.open('http://localhost:8000/docs', '_blank')}
                        className="flex items-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Swagger UI</span>
                      </Button>
                      <div className="text-sm text-slate-600">
                        <p>Make sure the backend server is running on port 8000 to access the interactive documentation.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'deployment' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">Deployment Guide</h1>
                  <p className="text-lg text-slate-600 mb-6">
                    Deploy TheNZT using Docker for a containerized setup or follow the manual installation guide.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span>Docker Deployment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Quick Start with Docker</h4>
                        <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                          <div># Build and run all services</div>
                          <div>docker compose -f docker/docker-compose.yml up --build</div>
                          <div className="mt-2"># Run in detached mode</div>
                          <div>docker compose -f docker/docker-compose.yml up --build -d</div>
                          <div className="mt-2"># Stop services</div>
                          <div>docker compose -f docker/docker-compose.yml down</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environment Configuration</CardTitle>
                    <CardDescription>
                      Required environment variables for proper deployment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Required API Keys</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                          <li><code>GEMINI_API_KEY</code> - Google Gemini API key</li>
                          <li><code>TAVILY_API_KEY</code> - Tavily search API key</li>
                          <li><code>FMP_API_KEY</code> - Financial Modeling Prep API key</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Database Configuration</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                          <li><code>MONGO_URI</code> - MongoDB connection string</li>
                          <li><code>REDIS_HOST</code> - Redis host address</li>
                          <li><code>REDIS_PORT</code> - Redis port number</li>
                          <li><code>REDIS_PASSWORD</code> - Redis password</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
