function splitEssay() {
    const input = document.getElementById('essayInput').value;
    const output = document.getElementById('output');
    const words = input.split(/\s+/); // Split input into words
    const chunkSize = 450; // Words per chunk

    output.innerHTML = ''; // Clear previous output

    for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize).join(' ');
        const chunkElement = document.createElement('div');
        chunkElement.className = 'chunk';

        const text = document.createElement('p');
        text.textContent = chunk;

        const partNumber = Math.floor(i / chunkSize) + 1; // Calculate part number
        const partLabel = document.createElement('p');
        partLabel.textContent = `Part ${partNumber}`;
        partLabel.className = 'part-number';

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-btn';
        copyButton.onclick = () => {
            const textToCopy = `${chunk}\nPart ${partNumber}`; // Combine text and part number
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('Text and part number copied to clipboard!');
            });
        };

        chunkElement.appendChild(text);
        chunkElement.appendChild(partLabel);
        chunkElement.appendChild(copyButton);
        output.appendChild(chunkElement);
    }
}
