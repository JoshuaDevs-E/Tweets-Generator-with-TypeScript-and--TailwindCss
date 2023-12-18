// Obteniendo los elementos del DOM
const btnNewTweet: HTMLElement | null = document.getElementById('btnNT');
const tweetsDiv: HTMLElement | null = document.getElementById('tweets');
const tweetInput: HTMLTextAreaElement | null = document.getElementById('tweetInput') as HTMLTextAreaElement;
const counterDiv: HTMLElement | null = document.getElementById('counter');
const btnCreate: HTMLElement | null = document.getElementById('btnCreate');
const tweetContainer: HTMLElement | null = document.getElementById('tweetContainer');

// Agrega un evento de escucha al botón
if (btnNewTweet && tweetInput && counterDiv && btnCreate && tweetContainer) {
    tweetInput.addEventListener('input', () => {
        const charCount = tweetInput.value.length;
        counterDiv.textContent = `${charCount} / 250 caracteres`;
    });

    btnNewTweet.addEventListener('click', () => {
        tweetContainer.classList.remove('hidden');
    });

    btnCreate.addEventListener('click', () => {
        if (tweetsDiv) {
            // Genera un nuevo tweet y lo agrega al div
            const newTweet = tweetInput.value;
            const tweetElement = document.createElement('p');
            tweetElement.textContent = newTweet;
            tweetElement.className = 'text-lg font-bold text-blue-500 m-6 editable inline-block';
    
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-4';
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-4';
    
            const tweetContainer = document.createElement('div');
            tweetContainer.appendChild(tweetElement);
            tweetContainer.appendChild(editButton);
            tweetContainer.appendChild(deleteButton);
            tweetsDiv.appendChild(tweetContainer);
    
            tweetInput.value = '';
            counterDiv.textContent = '0 / 250 caracteres';
    
            // Agrega un evento de escucha de clic al botón de edición
            editButton.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = tweetElement.textContent || '';
                input.className = 'text-lg font-bold text-blue-500 m-6 inline-block';
                tweetElement.replaceWith(input);
    
                // Agrega un evento de escucha de enter al input
                input.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        tweetElement.textContent = input.value;
                        input.replaceWith(tweetElement);
                    }
                });
            });
    
            // Agrega un evento de escucha de clic al botón de eliminar
            deleteButton.addEventListener('click', () => {
                tweetContainer.remove();
            });
        }
    });
}