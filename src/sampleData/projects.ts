import { Project } from '@/types/Project'

export const sampleProjects: Project[] = [
  // German Projects
  {
    id: '10001',
    name: 'Neubau Bürogebäude',
    description: 'Ein Projekt zum Bau eines modernen Bürogebäudes.',
    accounting_number: 'ACC-10001',
    project_number: 'PRJ-10001',
    created_at: new Date('2025-01-01'),
    company: {
      id: 'comp-20001',
      name: 'BauFirma Müller GmbH',
    },
    completed: false,
  },
  {
    id: '10002',
    name: 'Sanierung eines Wohnhauses',
    description: 'Komplette Renovierung eines 3-stöckigen Wohnhauses.',
    accounting_number: 'ACC-10002',
    project_number: 'PRJ-10002',
    created_at: new Date('2025-01-05'),
    company: {
      id: 'comp-20002',
      name: 'Weber Bauunternehmen AG',
    },
    completed: true,
  },
  {
    id: '10003',
    name: 'Erweiterung eines Krankenhauses',
    description: 'Bau eines neuen Flügels für das örtliche Krankenhaus.',
    accounting_number: 'ACC-10003',
    project_number: 'PRJ-10003',
    created_at: new Date('2025-01-10'),
    company: {
      id: 'comp-20003',
      name: 'Schmidt & Partner Bau GmbH',
    },
    completed: false,
  },

  // English Projects
  {
    id: '10004',
    name: 'Bridge Construction Project',
    description: 'Design and construction of a new bridge over the river.',
    accounting_number: 'ACC-10004',
    project_number: 'PRJ-10004',
    created_at: new Date('2025-01-03'),
    company: {
      id: 'comp-20004',
      name: 'RiverBuild Co.',
    },
    completed: true,
  },
  {
    id: '10005',
    name: 'High-Rise Apartment Development',
    description: 'Construction of a 30-story residential apartment building.',
    accounting_number: 'ACC-10005',
    project_number: 'PRJ-10005',
    created_at: new Date('2025-01-07'),
    company: {
      id: 'comp-20005',
      name: 'Skyline Constructors Inc.',
    },
    completed: false,
  },
]
