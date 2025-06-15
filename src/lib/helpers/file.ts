import { states } from "$lib/state.svelte";

export function createFile(fileName: string, contents: string) {
	const file = new File([contents], fileName);
	const a = document.createElement('a');
	const url = URL.createObjectURL(file);
	a.href = url;
	a.download = fileName;
	a.style = 'display: none;';
	document.body.appendChild(a);
  	a.click();

  	document.body.removeChild(a);
  	window.URL.revokeObjectURL(url)
}

export function loadFile() {
	const input = document.createElement('input');
	input.type = 'file';
	document.body.appendChild(input);
	
	input.onchange = () => {
		if (!input.files) return;
		const file = input.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const data = JSON.parse(reader.result as string);
				if (data === undefined || data.nodes === undefined) {
					throw new Error('The file not correct.');
				}
				states.nodes = data.nodes;
				states.edges = data.edges;
			} catch (e) {
				alert(e);
			}
		}
		reader.readAsText(file);
	}
	input.click();
}