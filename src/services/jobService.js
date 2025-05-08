import { processJobData, filterJobs, sortJobs, calculateMatchScore, generateRecommendationExplanation } from '../utils/jobData';

class JobService {
  constructor() {
    this.jobs = [];
    this.isInitialized = false;
  }

  generateSampleData() {
    const companies = [
      'Tech Corp', 'Innovation Labs', 'Digital Solutions', 'Future Systems', 'Smart Tech',
      'Global Software', 'Cloud Computing Inc', 'AI Solutions', 'Data Analytics Co',
      'Web Services', 'Mobile Apps Co', 'Security Systems', 'Network Solutions',
      'Enterprise Software', 'Startup Hub', 'Tech Innovators', 'Digital Creations',
      'Software Giants', 'Tech Pioneers', 'Future Tech'
    ];

    const locations = [
      'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
      'Chicago, IL', 'Denver, CO', 'Los Angeles, CA', 'Portland, OR', 'Washington, DC',
      'Atlanta, GA', 'Dallas, TX', 'Miami, FL', 'Phoenix, AZ', 'San Diego, CA'
    ];

    const jobTitles = [
      'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
      'Software Engineer', 'DevOps Engineer', 'Data Scientist', 'Machine Learning Engineer',
      'Mobile Developer', 'Cloud Architect', 'Security Engineer', 'QA Engineer',
      'Product Manager', 'Technical Lead', 'Solutions Architect', 'System Administrator'
    ];

    const skills = [
      'React', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Node.js', 'AWS',
      'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'GraphQL', 'REST', 'CI/CD', 'Git',
      'Angular', 'Vue.js', 'PHP', 'Ruby', 'Go', 'C#', '.NET', 'Spring Boot',
      'TensorFlow', 'PyTorch', 'Data Analysis', 'Machine Learning', 'Deep Learning',
      'Cloud Computing', 'Microservices', 'System Design', 'Agile', 'Scrum'
    ];

    const descriptions = [
      'Looking for an experienced developer to join our growing team.',
      'Seeking a talented professional to help build innovative solutions.',
      'Join our dynamic team to create cutting-edge applications.',
      'Help us transform the industry with your technical expertise.',
      'Be part of our mission to revolutionize technology.',
      'Work with the latest technologies in a collaborative environment.',
      'Join a fast-paced team working on exciting projects.',
      'Help shape the future of our technology platform.',
      'Be part of our innovative and forward-thinking team.',
      'Work on challenging projects that make a real impact.'
    ];

    const sampleJobs = [];
    for (let i = 1; i <= 1000; i++) {
      const numSkills = Math.floor(Math.random() * 5) + 3; // 3-7 skills per job
      const jobSkills = [];
      for (let j = 0; j < numSkills; j++) {
        const randomSkill = skills[Math.floor(Math.random() * skills.length)];
        if (!jobSkills.includes(randomSkill)) {
          jobSkills.push(randomSkill);
        }
      }

      const baseSalary = Math.floor(Math.random() * 100000) + 50000; // $50k-$150k base
      const salaryRange = Math.floor(Math.random() * 30000) + 10000; // $10k-$40k range
      const salary = `$${baseSalary.toLocaleString()} - $${(baseSalary + salaryRange).toLocaleString()} per year`;

      const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0 rating

      sampleJobs.push({
        id: i,
        title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        salary: salary,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        skills: jobSkills,
        rating: parseFloat(rating)
      });
    }

    return sampleJobs;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      // In a real application, this would be an API call
      // For now, we'll use the generated sample data
      this.jobs = this.generateSampleData();
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing job service:', error);
      this.jobs = this.generateSampleData();
      this.isInitialized = true;
    }
  }

  async getJobs(filters = {}, sortBy = 'relevance') {
    await this.initialize();
    let filteredJobs = filterJobs(this.jobs, filters);
    return sortJobs(filteredJobs, sortBy);
  }

  async getJobById(id) {
    await this.initialize();
    return this.jobs.find(job => job.id === id);
  }

  async getRecommendedJobs(userProfile) {
    await this.initialize();
    
    // Calculate match scores and explanations for all jobs
    const jobsWithScores = this.jobs.map(job => ({
      ...job,
      matchScore: calculateMatchScore(job, userProfile),
      explanations: generateRecommendationExplanation(job, userProfile)
    }));

    // Sort jobs by match score
    const sortedJobs = jobsWithScores.sort((a, b) => b.matchScore - a.matchScore);

    // Return top 10 recommendations
    return sortedJobs.slice(0, 10);
  }
}

export const jobService = new JobService(); 