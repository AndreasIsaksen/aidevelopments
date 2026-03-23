const skills = [
	{
		title: "Programming",
		description: "Experience with C#, Python, Java, SQL, and related problem-solving in software projects.",
		tags: ["C#", "Python", "Java", "SQL"]
	},
	{
		title: "Data & ML",
		description: "Interest in machine learning, data pipelines, analysis, and practical use of technical data.",
		tags: ["Machine Learning", "Data", "Statistics", "Python"]
	},
	{
		title: "Systems & Infrastructure",
		description: "Background from IT operations and production environments with focus on reliability and technical flow.",
		tags: ["IT Operations", "Azure", "Monitoring", "Systems"]
	},
	{
		title: "Documentation",
		description: "Strong focus on structured technical documentation, reporting, diagrams, and academic project work.",
		tags: ["LaTeX", "Technical Writing", "Architecture", "Reports"]
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
		title: "System Development Projects",
		description: "Development work involving backend logic, databases, structured models, and technical implementations.",
		tags: ["Java", "C#", "MySQL", "PostgreSQL"]
	}
];

const docs = [
	{
		title: "Technical Reports",
		description: "Academic and technical reports written to explain architecture, analysis, and implementation choices.",
		tags: ["Report Writing", "LaTeX", "Analysis"]
	},
	{
		title: "Architecture Notes",
		description: "Documentation of systems, structure, data flow, and design decisions from technical projects.",
		tags: ["Architecture", "Design", "Systems"]
	},
	{
		title: "Project Documentation",
		description: "Structured supporting documentation for development work, planning, and technical delivery.",
		tags: ["Documentation", "Planning", "Technical Work"]
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

	const description = document.createElement("p");
	description.textContent = item.description;

	const tagsWrapper = document.createElement("div");
	tagsWrapper.className = "tags";

	item.tags.forEach(tagText => {
		tagsWrapper.appendChild(createTag(tagText));
	});

	card.appendChild(title);
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