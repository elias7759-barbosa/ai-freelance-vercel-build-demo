import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '@/app/page';
import DeploymentInfo from '@/app/deployment-info/page';
import NotFound from '@/app/not-found';
import { DiagnosticCard } from '@/components/diagnostic-card';

describe('Application content and contracts', () => {
  it('identifies the application with a single primary heading', () => {
    render(<Home />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Deployment Diagnostics Demo');
  });
  it('provides a route to deployment details', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /Explore deployment info/ })).toHaveAttribute('href', '/deployment-info');
  });
  it('distinguishes local build validation from deployment evidence', () => {
    render(<Home />);
    const pipeline = screen.getByRole('heading', { name: 'Deployment pipeline' }).closest('article')!;
    expect(within(pipeline).getByText(/local build alone is not deployment evidence/)).toBeVisible();
  });
  it('does not present the page as proof of current build success', () => {
    render(<Home />);
    expect(screen.getByText(/Actual build results are recorded by the verification commands/)).toBeVisible();
  });
  it('documents the supported runtime', () => {
    render(<DeploymentInfo />);
    expect(screen.getByText('Target runtime').nextElementSibling).toHaveTextContent('Node.js 24.x');
  });
  it('declares the zero-environment-variable contract', () => {
    render(<DeploymentInfo />);
    expect(screen.getByText('Required environment variables').nextElementSibling).toHaveTextContent('None');
  });
  it('explains how to perform actual validation', () => {
    render(<DeploymentInfo />);
    expect(screen.getByText('npm run verify')).toBeVisible();
    expect(screen.getByText(/not a live infrastructure monitor/)).toBeVisible();
  });
  it('provides recovery navigation for missing pages', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('This page is missing');
    expect(screen.getByRole('link', { name: 'Return to overview' })).toHaveAttribute('href', '/');
  });
  it('renders diagnostic card content in a semantic article', () => {
    render(<DiagnosticCard number="01" title="Validation">Run the checks.</DiagnosticCard>);
    const article = screen.getByRole('article');
    expect(within(article).getByRole('heading', { level: 2, name: 'Validation' })).toBeVisible();
    expect(within(article).getByText('Run the checks.')).toBeVisible();
  });
});
