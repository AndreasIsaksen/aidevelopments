const skills = [
	{
		title: "Programming",
		description: "Experience with a wide range of programming languages and technologies, with focus on backend development, data processing, and machine learning.",
		tags: ["C#", ".NET", "Python", "Java", "SQL", "JavaScript", "PostgreSQL", "C"]
	},
	{
		title: "ML: Training, Tuning, Analysis",
		description: "Practical experience with machine learning model training, hyperparameter tuning, and analysis of results in various projects.",
		tags: ["SVM", "CNN", "ANN", "Decision Trees", "Supervised/Unsupervised Learning", "Clustering", "Ensemble", "ID3", "Data Processing & Analysis", "Cross Validation", "Tuning", "Statistics", "Analysis", "Classification", "Regression", "Algorithms", "Entropy"]
	},
	{
		title: "Computer Vision & Image Analysis",
		description: "Research and development work in computer vision, image processing, and practical applications of these technologies.",
		tags: ["Connected Components", "Canny Edge Detection", "Filtering", "Morphology", "HoG", "PCA", "LBP", "Object Detection", "Gradient Feature Extraction", "Back Propagation", "Attention", "Cross-Entropy", "Processing", "Analysis", "OpenCV", "Keras", "TensorFlow"]
	},
	{
		title: "Systems & Infrastructure",
		description: "Background from IT operations and production environments with focus on reliability and technical flow.",
		tags: ["IT Operations", "Azure", "DevOps", "Git", "Docker", "CI/CD", "Monitoring", "Systems"]
	},
	{
		title: "Software Development",
		description: "Experience with software development projects involving agile methodologies, structured design, and technical implementation.",
		tags: ["Agile", "Kanban", "Waterfall", "Scrum", "Scrumban", "Clean Code", "N-Tier", "Testing", "Development"]
	},
	{
		title: "Web Design",
		description: "Design and development of websites with focus on clean structure, responsive design, and technical implementation.",
		tags: ["HTML", "CSS", "JavaScript", "SEO", "UI/UX", "Responsive Design", "Accessibility", "Performance Optimization"]
	},
	{
		title: "Documentation",
		description: "Strong focus on structured technical documentation, reporting, diagrams, and academic project work, as well as business documentation.",
		tags: ["LaTeX", "Technical Writing", "Analysis", "Architecture", "Reports", "Mapping", "UML", "EER", "Invoice"]
	}
];

const projects = [
	{
		title: "Bachelor Thesis Project",
		description: "A technical solution focused on document handling, comparison, and data extraction in an industrial context.",
		tags: ["C#", "PDF", "Data Extraction", "Architecture"]
	},
	{
		title: "Machine Learning Work",
		description: "Practical experimentation with machine learning concepts, model training, and data-oriented workflows.",
		tags: ["ML", "Python", "Training", "Analysis"]
	},
	{
		title: "Image Analysis & Computer Vision",
		description: "Research and development work in image processing, computer vision algorithms, and practical applications.",
		tags: ["Computer Vision", "Image Processing", "Keras", "OpenCV", "Python", "TensorFlow", "Training", "Tuning"]
	},
	{
		title: "System Development Projects",
		description: "Development work involving backend logic, databases, structured models, and technical implementations.",
		tags: ["Java", "C#", "MySQL", "PostgreSQL"]
	},
	{
		title: "Web Design & Development",
		description: "Design and development of websites with focus on clean structure, responsive design, and technical implementation.",
		tags: ["HTML", "CSS", "JavaScript", "Web Design"]
	}
];

const docs = [
	{
		title: "Grades and Credits",
		description: "Official transcript of grades from my studies.",
		link: "pages/gradeDocs.html"
	},
	{
		title: "Frameworks and .NET",
		grade: "A",
		description: "description",
		link: "pages/Frameworks_and_dotNET.html"
	},
	{
		title: "Big Data: Storage and Processing",
		grade: "B",
		description: "description",
		link: "pages/Big_Data_Storage_and_Processing.html"
	},
	{
		title: "Database Systems",
		grade: "B",
		description: "description",
		link: "pages/Database_Systems.html"
	},
	{
		title: "Introduction to Computer Security",
		grade: "B",
		description: "description",
		link: "pages/Introduction_to_Computer_Security.html"
	},
	{
		title: "Programming 2 (basic Java)",
		grade: "B",
		description: "description",
		link: "pages/Programming_2.html"
	},
	{
		title: "Web Development",
		grade: "B",
		description: "description",
		link: "pages/Web_Development.html"
	},
	{
		title: "Computer Networks",
		grade: "C",
		description: "description",
		link: "pages/Computer_Networks.html"
	},
	{
		title: "Introduction to Operating Systems",
		grade: "C",
		description: "description",
		link: "pages/Introduction_to_Operating_Systems.html"
	},
	{
		title: "Practical Machine Learning",
		grade: "C",
		description: "description",
		link: "pages/Practical_Machine_Learning.html"
	},
	{
		title: "Programming 1 (basic Python)",
		grade: "C",
		description: "description",
		link: "pages/Programming_1.html"
	},
	{
		title: "Software Engineering and Testing",
		grade: "C",
		description: "description",
		link: "pages/Software_Engineering_and_Testing.html"
	},
	{
		title: "Statistics and Statistical Programming",
		grade: "C",
		description: "description",
		link: "pages/Statistics_and_Statistical_Programming.html"
	},
	{
		title: "Algorithms and Data Structures",
		grade: "D",
		description: "description",
		link: "pages/Algorithms_and_Data_Structures.html"
	},
	{
		title: "Introduction to Digital Product Design",
		grade: "Approved",
		description: "description",
		link: "pages/Introduction_to_Digital_Product_Design.html"
	},
	{
		title: "Calculus",
		grade: "E",
		description: "description",
		link: "pages/Calculus.html"
	},
	{
		title: "Discrete Mathematics",
		grade: "E",
		description: "description",
		link: "pages/Discrete_Mathematics.html"
	}
];


function createTag(tagText) {
	const tag = document.createElement("span");
	tag.className = "tag";
	tag.textContent = tagText;
	return tag;
}

function createCard(item) {
	const card = document.createElement("article");
	card.className = "card";

	const title = document.createElement("h3");
	title.textContent = item.title;

	const grade = document.createElement("p");
	grade.textContent = item.grade ? `Grade: ${item.grade}` : "";
	grade.className = "card-grade";

	const description = document.createElement("p");
	description.textContent = item.description;

	const link = document.createElement("a");
	link.href = item.link || "#";
	link.textContent = "View Documents →";
	link.className = "card-link";

	const tagsWrapper = document.createElement("div");
	tagsWrapper.className = "tags";

	if (item.tags) {
	item.tags.forEach(tagText => {
			tagsWrapper.appendChild(createTag(tagText));
		});
	}

	card.appendChild(title);

	
	if (item.grade) {
		card.appendChild(grade);
	}
	if (item.link) {
		card.appendChild(link);
	}
	card.appendChild(description);
	card.appendChild(tagsWrapper);

	return card;
}

function renderCards(items, containerId) {
	const container = document.getElementById(containerId);

	items.forEach(item => {
		const card = createCard(item);
		container.appendChild(card);
	});
}

renderCards(skills, "skills-grid");
renderCards(projects, "projects-grid");
renderCards(docs, "docs-grid");
