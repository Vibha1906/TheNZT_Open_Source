'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Github, GitBranch, Bug, Lightbulb, Code, Users, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ContributingPage = () => {
  const router = useRouter();

  const contributionTypes = [
    {
      icon: Bug,
      title: 'Bug Reports',
      description: 'Help us identify and fix issues',
      steps: [
        'Check existing issues first',
        'Use the bug report template',
        'Provide detailed reproduction steps',
        'Include system information'
      ],
      color: 'bg-red-50 border-red-200'
    },
    {
      icon: Lightbulb,
      title: 'Feature Requests',
      description: 'Suggest new features and improvements',
      steps: [
        'Check existing feature requests',
        'Describe the use case clearly',
        'Explain the expected behavior',
        'Consider implementation complexity'
      ],
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      icon: Code,
      title: 'Code Contributions',
      description: 'Submit code improvements and new features',
      steps: [
        'Fork the repository',
        'Create a feature branch',
        'Follow coding standards',
        'Write tests for new code',
        'Submit a pull request'
      ],
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: Users,
      title: 'Documentation',
      description: 'Improve documentation and guides',
      steps: [
        'Identify unclear documentation',
        'Write clear explanations',
        'Add code examples',
        'Update API references'
      ],
      color: 'bg-blue-50 border-blue-200'
    }
  ];

  const developmentSetup = [
    {
      step: 1,
      title: 'Fork the Repository',
      description: 'Create your own fork of TheNZT on GitHub',
      code: 'git clone https://github.com/YOUR_USERNAME/TheNZT_Open_Source.git'
    },
    {
      step: 2,
      title: 'Set Up Development Environment',
      description: 'Install dependencies and configure your environment',
      code: `# Backend setup
uv venv --python 3.11
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
uv pip install -r requirements.txt

# Frontend setup
cd src/frontend
npm install --legacy-peer-deps`
    },
    {
      step: 3,
      title: 'Create a Feature Branch',
      description: 'Create a new branch for your changes',
      code: `git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix`
    },
    {
      step: 4,
      title: 'Make Your Changes',
      description: 'Implement your changes following our coding standards',
      code: `# Make your changes
# Write tests
# Update documentation`
    },
    {
      step: 5,
      title: 'Test Your Changes',
      description: 'Run tests to ensure everything works correctly',
      code: `# Backend tests
pytest

# Frontend tests
npm run test

# Linting
npm run lint`
    },
    {
      step: 6,
      title: 'Submit a Pull Request',
      description: 'Create a pull request with a clear description',
      code: `git push origin feature/your-feature-name
# Then create a PR on GitHub`
    }
  ];

  const codingStandards = [
    {
      category: 'Python (Backend)',
      standards: [
        'Follow PEP 8 style guidelines',
        'Use type hints for function parameters and return values',
        'Write docstrings for all public functions and classes',
        'Use meaningful variable and function names',
        'Keep functions small and focused on a single responsibility'
      ]
    },
    {
      category: 'TypeScript/React (Frontend)',
      standards: [
        'Use TypeScript for all new components',
        'Follow React best practices and hooks patterns',
        'Use functional components over class components',
        'Implement proper error boundaries',
        'Write unit tests for components'
      ]
    },
    {
      category: 'General',
      standards: [
        'Write clear, descriptive commit messages',
        'Keep commits atomic and focused',
        'Update documentation for any API changes',
        'Add comments for complex logic',
        'Follow the existing code structure and patterns'
      ]
    }
  ];

  const pullRequestTemplate = `## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested the changes locally

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Additional Notes
Any additional information that reviewers should know.`;

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
                <Github className="w-5 h-5 text-slate-600" />
                <span className="text-lg font-semibold text-slate-900">Contributing</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.open('https://github.com/IAI-solution/TheNZT_Open_Source', '_blank')}>
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
              <Button onClick={() => router.push('/signup')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Contribute to TheNZT
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Help us build the future of AI-powered financial analysis. Whether you're fixing bugs, 
            adding features, or improving documentation, every contribution makes a difference.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-500" />
              <span>Open Source</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-blue-500" />
              <span>Community Driven</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <Code className="w-3 h-3 text-green-500" />
              <span>MIT License</span>
            </Badge>
          </div>
        </div>

        {/* Ways to Contribute */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Ways to Contribute</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributionTypes.map((type, index) => (
              <Card key={index} className={`${type.color} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Development Setup */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Development Setup</h2>
          <div className="space-y-6">
            {developmentSetup.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                    <pre className="whitespace-pre-wrap">{step.code}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coding Standards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Coding Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {codingStandards.map((standard, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{standard.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {standard.standards.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pull Request Template */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5 text-blue-600" />
              <span>Pull Request Template</span>
            </CardTitle>
            <CardDescription>
              Use this template when creating pull requests to ensure consistency and completeness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
              <pre className="whitespace-pre-wrap">{pullRequestTemplate}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Community Guidelines */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Community Guidelines</span>
            </CardTitle>
            <CardDescription>
              Help us maintain a welcoming and productive community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Do's
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Be respectful and inclusive</li>
                    <li>• Provide constructive feedback</li>
                    <li>• Help others learn and grow</li>
                    <li>• Follow the code of conduct</li>
                    <li>• Ask questions when unsure</li>
                    <li>• Celebrate others' contributions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                    Don'ts
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Don't be rude or dismissive</li>
                    <li>• Don't spam or off-topic posts</li>
                    <li>• Don't submit incomplete work</li>
                    <li>• Don't ignore feedback</li>
                    <li>• Don't make personal attacks</li>
                    <li>• Don't violate the license terms</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Help */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              We're here to help you get started and answer any questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Github className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-900 mb-2">GitHub Issues</h4>
                <p className="text-sm text-slate-600 mb-3">Report bugs and request features</p>
                <Button variant="outline" size="sm" onClick={() => window.open('https://github.com/IAI-solution/TheNZT_Open_Source/issues', '_blank')}>
                  View Issues
                </Button>
              </div>
              <div className="text-center p-4">
                <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-900 mb-2">Discussions</h4>
                <p className="text-sm text-slate-600 mb-3">Ask questions and share ideas</p>
                <Button variant="outline" size="sm" onClick={() => window.open('https://github.com/IAI-solution/TheNZT_Open_Source/discussions', '_blank')}>
                  Join Discussion
                </Button>
              </div>
              <div className="text-center p-4">
                <Code className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-900 mb-2">Documentation</h4>
                <p className="text-sm text-slate-600 mb-3">Read our comprehensive guides</p>
                <Button variant="outline" size="sm" onClick={() => router.push('/docs')}>
                  View Docs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Contribute?</h2>
            <p className="text-xl text-green-100 mb-8">
              Join our community and help build the future of AI-powered financial analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => window.open('https://github.com/IAI-solution/TheNZT_Open_Source', '_blank')}>
                <Github className="w-4 h-4 mr-2" />
                Start Contributing
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Read Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContributingPage;