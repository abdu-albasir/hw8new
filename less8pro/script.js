const name = document.getElementById('name');
const add = document.getElementById('add');
const root = document.getElementById('root');

let nameList = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];

const render = () =>{
    root.innerHTML = '';
    nameList.forEach(item =>{
        root.innerHTML += `
            <div>
                <h1>${item.name}</h1>
                <div id="edit-${item.id}">
                    <button onclick="showEditInput(${item.id})">Edit</button>
                </div>
                <button class="delete" onclick="deleteName(${item.id})">Delete</button>
            </div>`;
    });
}

render();

add.onclick = () =>{
    if (name.value.trim()) {
        nameList = [
            {
                id: nameList.length == 0 ? 1 : nameList[0].id + 1,
                name: name.value.trim()
            },
            ...nameList
        ];
        
        localStorage.setItem('name', JSON.stringify(nameList));
        render();
    }
}

const deleteName = (id) =>{
    nameList = nameList.filter(item => item.id != id);
    localStorage.setItem('name', JSON.stringify(nameList));
    render();
}

const showEditInput = (id) => {
    const editDiv = document.getElementById(`edit-${id}`);
    const index = nameList.findIndex(item => item.id === id);
    if (index !== -1) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = nameList[index].name;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.onclick = () => saveName(id, input.value);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = () => render();

        editDiv.innerHTML = '';
        editDiv.appendChild(input);
        editDiv.appendChild(saveButton);
        editDiv.appendChild(cancelButton);
    } else {
        alert("Name not found!");
    }
}

const saveName = (id, newName) => {
    const index = nameList.findIndex(item => item.id === id);
    if (index !== -1) {
        nameList[index].name = newName;
        localStorage.setItem('name', JSON.stringify(nameList));
        render();
    } else {
        alert("Name not found!");
    }
}
