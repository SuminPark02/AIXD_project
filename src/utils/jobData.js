// Utility functions for processing job data from the Kaggle dataset

export const processJobData = (rawData) => {
  // This function will process the raw data from the Kaggle dataset
  // and transform it into the format our application expects
  return rawData.map(job => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary,
    description: job.description,
    skills: job.skills,
    rating: job.rating,
  }));
};

const formatSalary = (salary) => {
  // Format salary based on the dataset's format
  if (!salary) return 'Salary not specified';
  return `$${salary.toLocaleString()} per year`;
};

const extractSkills = (description) => {
  // Extract skills from job description using NLP or keyword matching
  // This is a placeholder implementation
  const commonSkills = [
    'React', 'TypeScript', 'JavaScript', 'Python', 'Java',
    'Node.js', 'AWS', 'Docker', 'Kubernetes', 'SQL',
    'MongoDB', 'GraphQL', 'REST', 'CI/CD', 'Git'
  ];
  
  return commonSkills.filter(skill => 
    description.toLowerCase().includes(skill.toLowerCase())
  );
};

const calculateJobRating = (job) => {
  // Calculate a job rating based on various factors
  // This is a placeholder implementation
  const factors = {
    salary: job.salary ? 1 : 0,
    description: job.description ? 1 : 0,
    location: job.location ? 1 : 0,
    company: job.company ? 1 : 0,
  };
  
  const totalFactors = Object.values(factors).reduce((a, b) => a + b, 0);
  return (totalFactors / Object.keys(factors).length) * 5;
};

export const filterJobs = (jobs, filters) => {
  // Filter jobs based on user preferences and requirements
  return jobs.filter(job => {
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.skills && filters.skills.length > 0) {
      const hasRequiredSkills = filters.skills.every(skill =>
        job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
      );
      if (!hasRequiredSkills) return false;
    }
    if (filters.minSalary && job.salary) {
      const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
      if (jobSalary < filters.minSalary) return false;
    }
    return true;
  });
};

export const sortJobs = (jobs, sortBy) => {
  // Sort jobs based on different criteria
  return [...jobs].sort((a, b) => {
    switch (sortBy) {
      case 'salary':
        const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
        const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
        return salaryB - salaryA;
      case 'rating':
        return b.rating - a.rating;
      case 'relevance':
        return b.matchScore - a.matchScore;
      default:
        return 0;
    }
  });
};

// Calculate similarity score between user skills and job skills
export const calculateSkillSimilarity = (userSkills, jobSkills) => {
  if (!userSkills || !jobSkills) return 0;
  const commonSkills = userSkills.filter(skill => jobSkills.includes(skill));
  return commonSkills.length / Math.max(userSkills.length, jobSkills.length);
};

// Calculate location match score
export const calculateLocationMatch = (userLocation, jobLocation) => {
  if (!userLocation || !jobLocation) return 0;
  return userLocation.toLowerCase() === jobLocation.toLowerCase() ? 1 : 0;
};

// Calculate salary match score
export const calculateSalaryMatch = (userMinSalary, jobSalary) => {
  if (!userMinSalary || !jobSalary) return 0;
  const minSalary = parseInt(jobSalary.replace(/[^0-9]/g, ''));
  return minSalary >= userMinSalary ? 1 : 0;
};

// Generate explanation for job recommendation
export const generateRecommendationExplanation = (job, userProfile) => {
  const explanations = [];
  
  // Skill match explanation
  const commonSkills = job.skills.filter(skill => userProfile.skills.includes(skill));
  if (commonSkills.length > 0) {
    explanations.push({
      type: 'skills',
      title: 'Skills Match',
      description: `This job matches ${commonSkills.length} of your skills: ${commonSkills.join(', ')}`,
      score: calculateSkillSimilarity(userProfile.skills, job.skills)
    });
  }

  // Location match explanation
  if (userProfile.preferredLocation && job.location) {
    const locationMatch = calculateLocationMatch(userProfile.preferredLocation, job.location);
    if (locationMatch > 0) {
      explanations.push({
        type: 'location',
        title: 'Location Match',
        description: `This job is in your preferred location: ${job.location}`,
        score: locationMatch
      });
    }
  }

  // Salary match explanation
  if (userProfile.minSalary && job.salary) {
    const salaryMatch = calculateSalaryMatch(userProfile.minSalary, job.salary);
    if (salaryMatch > 0) {
      explanations.push({
        type: 'salary',
        title: 'Salary Match',
        description: `This job meets your minimum salary requirement`,
        score: salaryMatch
      });
    }
  }

  // Company rating explanation
  if (job.rating >= 4.0) {
    explanations.push({
      type: 'rating',
      title: 'High Company Rating',
      description: `This company has a high rating of ${job.rating}`,
      score: job.rating / 5
    });
  }

  return explanations;
};

// Calculate overall match score
export const calculateMatchScore = (job, userProfile) => {
  const skillScore = calculateSkillSimilarity(userProfile.skills, job.skills) * 0.5;
  const locationScore = calculateLocationMatch(userProfile.preferredLocation, job.location) * 0.2;
  const salaryScore = calculateSalaryMatch(userProfile.minSalary, job.salary) * 0.2;
  const ratingScore = (job.rating / 5) * 0.1;

  return skillScore + locationScore + salaryScore + ratingScore;
}; 