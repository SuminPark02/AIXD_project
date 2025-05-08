import * as tf from '@tensorflow/tfjs';

// Initialize the model
let model;

// Function to load the pre-trained model from server
export const loadModel = async () => {
  try {
    // Load the model from your server
    model = await tf.loadLayersModel('/api/model/model.json');
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
};

// Function to preprocess job and profile data
const preprocessData = (job, profile) => {
  // Convert skills to one-hot encoding
  const allSkills = [
    'React', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Node.js', 'AWS',
    'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'GraphQL', 'REST', 'CI/CD', 'Git',
    'Angular', 'Vue.js', 'PHP', 'Ruby', 'Go', 'C#', '.NET', 'Spring Boot',
    'TensorFlow', 'PyTorch', 'Data Analysis', 'Machine Learning', 'Deep Learning',
    'Cloud Computing', 'Microservices', 'System Design', 'Agile', 'Scrum'
  ];

  // Create feature vector
  const features = [
    // Skill match score (0-1)
    profile.skills?.filter(skill => 
      job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    ).length / Math.max(profile.skills?.length || 1, 1),

    // Experience level match (0-1)
    profile.experience === job.requirements.find(req => 
      req.toLowerCase().includes(profile.experience.toLowerCase())
    ) ? 1 : 0,

    // Location match (0-1)
    profile.preferredLocation && job.location.toLowerCase().includes(profile.preferredLocation.toLowerCase()) ? 1 : 0,

    // Salary match (0-1)
    Math.min(1, (parseInt(job.salary.replace(/[^0-9]/g, '')) / profile.minSalary)),

    // Normalized job requirements count
    job.requirements.length / 10,

    // Normalized benefits count
    job.benefits.length / 10,

    // Company size indicator (placeholder)
    0.5,

    // Job type indicator (placeholder)
    0.5,

    // Industry match (placeholder)
    0.5,

    // Remote work indicator
    job.benefits.some(benefit => 
      benefit.toLowerCase().includes('remote') || 
      benefit.toLowerCase().includes('work from home')
    ) ? 1 : 0
  ];

  return features;
};

// Function to predict job match score
export const predictJobMatch = async (job, profile) => {
  if (!model) {
    await loadModel();
  }

  try {
    // Preprocess the data
    const features = preprocessData(job, profile);
    
    // Convert to tensor
    const inputTensor = tf.tensor2d([features]);
    
    // Make prediction
    const prediction = model.predict(inputTensor);
    const score = await prediction.data();
    
    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();
    
    // Return score as percentage
    return Math.round(score[0] * 100);
  } catch (error) {
    console.error('Error making prediction:', error);
    // Fallback to simple matching if model fails
    return calculateSimpleMatch(job, profile);
  }
};

// Fallback function for simple matching if model fails
const calculateSimpleMatch = (job, profile) => {
  let score = 0;
  const maxScore = 100;

  // Skill matching (40 points)
  if (profile.skills?.length > 0) {
    const skillMatches = job.requirements.filter(req =>
      profile.skills.some(skill => 
        req.toLowerCase().includes(skill.toLowerCase())
      )
    ).length;
    score += (skillMatches / job.requirements.length) * 40;
  }

  // Location matching (20 points)
  if (profile.preferredLocation) {
    if (job.location.toLowerCase().includes(profile.preferredLocation.toLowerCase())) {
      score += 20;
    }
  }

  // Experience level matching (20 points)
  const experienceLevels = {
    'Entry Level': 0,
    'Junior': 1,
    'Mid Level': 2,
    'Senior': 3,
    'Lead': 4,
    'Manager': 5,
    'Director': 6,
    'Executive': 7
  };

  const jobLevel = job.requirements.find(req => 
    Object.keys(experienceLevels).some(level => 
      req.toLowerCase().includes(level.toLowerCase())
    )
  );

  if (jobLevel) {
    const jobLevelValue = experienceLevels[
      Object.keys(experienceLevels).find(level => 
        jobLevel.toLowerCase().includes(level.toLowerCase())
      )
    ];
    const profileLevelValue = experienceLevels[profile.experience];
    
    if (jobLevelValue <= profileLevelValue) {
      score += 20;
    } else {
      score += Math.max(0, 20 - (jobLevelValue - profileLevelValue) * 5);
    }
  }

  // Salary matching (20 points)
  const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
  if (jobSalary >= profile.minSalary) {
    score += 20;
  } else {
    score += Math.max(0, 20 - (profile.minSalary - jobSalary) / 10000);
  }

  return Math.min(maxScore, Math.round(score));
};

// Function to train the model with sample data
export const trainModel = async (trainingData) => {
  if (!model) {
    await initializeModel();
  }

  // Convert training data to tensors
  const xs = tf.tensor2d(trainingData.map(data => data.features));
  const ys = tf.tensor2d(trainingData.map(data => [data.label]));

  // Train the model
  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
      }
    }
  });

  // Clean up tensors
  xs.dispose();
  ys.dispose();
}; 