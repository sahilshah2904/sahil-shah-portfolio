export const profile = {
  name: 'Sahil Shah',
  email: 'sahilshah2904@gmail.com',
  github: 'https://github.com/sahilshah2904',
  summary: 'Master of Computing (Artificial Intelligence) graduate from Curtin University, with Distinction and two Dean’s Letters of Commendation. Bringing professional SAP development experience and practical deep learning research together.',
};

export const pipeline = [
  { id: 'records', number: '01', title: 'Start with the signal.', label: 'DATA', metric: '63,851', unit: 'ECG records · three datasets', description: 'A multi-dataset foundation for cardiovascular classification. Every record enters a consistent preprocessing pipeline.' },
  { id: 'prepare', number: '02', title: 'Make the data meaningful.', label: 'PREPARATION', metric: '19', unit: 'SNOMED CT classes', description: 'Map diagnoses into a shared label space, prepare train, validation and test splits, and check for data leakage before modelling.' },
  { id: 'ensemble', number: '03', title: 'Let the models collaborate.', label: 'MODELLING', metric: '7', unit: 'model families benchmarked', description: 'Combine a weighted Ribeiro CNN, CE-SSL and HuBERT-ECG ensemble. Select decision thresholds on the validation set.' },
  { id: 'evaluate', number: '04', title: 'Measure what matters.', label: 'EVALUATION', metric: '0.964', unit: 'macro AUROC', description: 'Evaluate on 9,578 held-out ECG records, achieving 0.710 macro AUPRC. Package inference with FastAPI, input checks and versioned artefacts for CardioMobile integration.' },
];

export const projects = [
  { id: 'xray', index: '02', title: 'Looking beyond the image.', name: 'AI-Powered Chest X-ray Disease Detection System', date: 'MAR — MAY 2025', description: 'A chest X-ray analysis pipeline combining CNN classification and object detection with DICOM processing, Grad-CAM visualisations, bounding boxes and structured reports to support clinical review.', tools: ['CNNs', 'DICOM', 'Grad-CAM', 'Object detection'], visual: 'CLASSIFY / LOCALISE / EXPLAIN' },
  { id: 'tb', index: '03', title: 'Many models. One purpose.', name: 'Tuberculosis Detection Using Machine Learning', date: 'JAN — APR 2022', description: 'Random Forest, Support Vector Machine and Logistic Regression models for tuberculosis detection from chest X-rays. Voting and weighted averaging combine predictions, with a Flask application for doctors and patients.', tools: ['Random Forest', 'SVM', 'Ensembles', 'Flask'], visual: 'LEARN / COMBINE / DELIVER' },
];

export const skills = [
  { title: 'Build', items: ['Python', 'SAP ABAP', 'PyTorch'], note: 'From enterprise applications to deep learning experiments.' },
  { title: 'Model', items: ['Deep learning', 'CNNs', 'Multi-label classification', 'Ensemble modelling'], note: 'Methods applied across ECG and chest X-ray projects.' },
  { title: 'Evaluate', items: ['Data preprocessing', 'Class imbalance', 'Model evaluation', 'Threshold tuning'], note: 'Careful preparation and evaluation at every stage.' },
  { title: 'Collaborate', items: ['Teamwork', 'Problem-solving', 'AWS foundations', 'RDBMS concepts'], note: 'Dependable, adaptable and proactive about learning.' },
];

export const experience = [
  { company: 'Accenture', role: 'SAP ABAP Developer', detail: 'Packaged App Development Associate · Accenture Solutions Pvt Ltd', date: 'DEC 2022 — JUL 2024', description: 'Collaborated with developers and clients to design, develop, test and implement custom SAP solutions. Built ABAP reports, function modules and OData services, and performed production data archiving and purging.', tags: ['ABAP', 'OData', 'Enterprise systems'] },
  { company: 'Woolworths', role: 'Store Team Member', detail: 'Online Department · Part-time', date: 'NOV 2025 — PRESENT', description: 'Pick and pack online orders accurately, collaborate to meet deadlines, and assist customers with product enquiries.', tags: ['Teamwork', 'Operations'] },
  { company: 'Optus', role: 'Retail Sales Associate', detail: 'Part-time', date: 'OCT 2024 — JUN 2025', description: 'Handled transactions, payments, upgrades and activations; supported sales targets and resolved customer complaints.', tags: ['Customer experience', 'Problem-solving'] },
];

export const education = [
  { degree: 'Master of Computing', major: 'Artificial Intelligence', school: 'Curtin University · Perth', date: '2024 — 2026', result: 'Distinction · CWA 82.6%' },
  { degree: 'Bachelor of Engineering', major: 'Electronics & Communication', school: 'L.D. College of Engineering · Ahmedabad', date: '2018 — 2022', result: 'Distinction · CGPA 9.11' },
];
