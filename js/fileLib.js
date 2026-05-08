const downloadableFiles = {
	Frameworks_and_dotNET: [
		{
			title: "TaskyFy Source Code",
			description: "ZIP archive containing the TaskyFy .NET project source code.",
			file: "../assets/files/Frameworks_and_.NET/TaskyFy_release2.0.0.zip",
			thumbnail: "../assets/thumbnails/Frameworks_and_dotNET/TaskyFyLogo.png",
			fileType: "ZIP"
		}
	],
	Big_Data_Storage_and_Processing: [
		{
			title: "Final Project Source Code",
			description: "ZIP archive containing the final delivery for the project. This includes all code, dockerfiles, Zeppelin notebooks, data samples, and documentation related to the project.",
			file: "../assets/files/big_data/Gruppe1_milestone3.zip",
			thumbnail: "../assets/thumbnails/big_data/projectIcon.png",
			fileType: "ZIP"
		}
	],
	Basic_Programming_Python: [
		{
			title: "Assignment 1 -- Code",
			description: "",
			file: "../assets/files/Programming_1/1.zip",
			thumbnail: "../assets/thumbnails/programming_1/py.png",
			fileType: "ZIP"
		},
		{
			title: "Assignment 2 -- Code",
			description: "",
			file: "../assets/files/Programming_1/2.zip",
			thumbnail: "../assets/thumbnails/programming_1/py.png",
			fileType: "ZIP"
		},
		{
			title: "Assignment 3 -- Code",
			description: "",
			file: "../assets/files/Programming_1/3.zip",
			thumbnail: "../assets/thumbnails/programming_1/py.png",
			fileType: "ZIP"
		},
		{
			title: "Assignment 4 -- Code",
			description: "",
			file: "../assets/files/Programming_1/4.zip",
			thumbnail: "../assets/thumbnails/programming_1/py.png",
			fileType: "ZIP"
		},
		{
			title: "Assignment 5 -- Code",
			description: "",
			file: "../assets/files/Programming_1/5.zip",
			thumbnail: "../assets/thumbnails/programming_1/py.png",
			fileType: "ZIP"
		}
	],
	Web_Development: [
		{
			title: "Final Project Source Code",
			description: "ZIP archive containing the final delivery for the project. This the source code for the website of the final exam project, and related assets.",
			file: "../assets/files/Web_Development/eksamen.zip",
			thumbnail: "../assets/thumbnails/Web_Development/3.png",
			fileType: "ZIP"
		}
	],
	Computer_Networks: [
		{
			title: "Cisco Packet Tracer Files",
			description: "ZIP archive containing the Cisco Packet Tracer files created during the Computer Networks course.",
			file: "../assets/data/Computer_Networks/CiscoPacketTracerFiles.zip",
			thumbnail: "../assets/thumbnails/Computer_Networks/cptLogo.png",
			fileType: "ZIP"
		}
	],
	Introduction_to_Operating_Systems: [
		{
			title: "C code for Assignments",
			description: "ZIP archive containing the C code for the assignments in the Introduction to Operating Systems course.",
			file: "../assets/data/Introduction_to_Operating_Systems/C_assignments.zip",
			thumbnail: "../assets/thumbnails/Introduction_to_Operating_Systems/c.png",
			fileType: "ZIP"
		}
	],
	Practical_Machine_Learning: [
		{
			title: "Assignment collections and wrokshop materials",
			description: "ZIP archive containing the assignments and workshop materials for the Practical Machine Learning course.",
			file: "../assets/data/Practical_Machine_Learning/Tasks+data.zip",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/zip.png",
			fileType: "ZIP"
		},
		{
			title: "Jupyter Notebooks Collection",
			description: "ZIP archive containing the Jupyter notebooks created during the Practical Machine Learning course.",
			file: "../assets/data/Practical_Machine_Learning/jupyterCollection.zip",
			thumbnail: "../assets/thumbnails/Practical_Machine_Learning/jupyter.png",
			fileType: "ZIP"
		}
	],
	Software_Engineering_and_Testing: [
		{
			title: "Project Documentation and Code",
			description: "ZIP archive containing the project documentation and code for the group project in the Software Engineering and Testing course.",
			file: "../assets/data/Software_Engineering_and_Testing/1.zip",
			thumbnail: "../assets/thumbnails/Software_Engineering_and_Testing/4.png",
			fileType: "ZIP"
		}
	],
	Introduction_to_Digital_Product_Design: [
		{
			title: "Project Documentation and Code",
			description: "ZIP archive containing the project documentation and code for the group project in the Introduction to Digital Product Design course.",
			file: "../assets/data/Introduction_to_Digital_Product_Design/1.zip",
			thumbnail: "../assets/thumbnails/Introduction_to_Digital_Product_Design/zip.png",
			fileType: "ZIP"
		}
	]
};

function createFileCard(fileItem) {
	const card = document.createElement("article");
	card.className = "file-card";

	const preview = document.createElement("img");
	preview.src = fileItem.thumbnail;
	preview.alt = `${fileItem.title} file preview`;
	preview.className = "file-thumbnail";

	const content = document.createElement("div");
	content.className = "file-card-content";

	const title = document.createElement("h3");
	title.textContent = fileItem.title;

	const description = document.createElement("p");
	description.textContent = fileItem.description;

	const fileType = document.createElement("span");
	fileType.className = "file-type";
	fileType.textContent = fileItem.fileType || "FILE";

	const downloadLink = document.createElement("a");
	downloadLink.href = fileItem.file;
	downloadLink.textContent = "Download file ↓";
	downloadLink.className = "file-download-link";
	downloadLink.download = "";

	content.appendChild(fileType);
	content.appendChild(title);

	if (fileItem.description) {
		content.appendChild(description);
	}

	content.appendChild(downloadLink);

	card.appendChild(preview);
	card.appendChild(content);

	return card;
}

function renderFileGrid() {
	const grid = document.getElementById("file-grid");

	if (!grid) {
		return;
	}

	const courseKey = grid.dataset.course;
	const files = downloadableFiles[courseKey] || [];

	if (files.length === 0) {
		grid.innerHTML = "<p>No downloadable files have been added yet.</p>";
		return;
	}

	files.forEach(fileItem => {
		grid.appendChild(createFileCard(fileItem));
	});
}

document.addEventListener("DOMContentLoaded", () => {
	renderFileGrid();
});