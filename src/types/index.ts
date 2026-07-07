export interface Product {
  id: string
  name: string
  subtitle: string
  badge: string
  tagline: string
  features: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export interface HowItWorksStep {
  step: number
  title: string
  description: string
}
