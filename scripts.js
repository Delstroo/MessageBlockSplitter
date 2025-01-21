let conversionType = 'ipv4';

function setConversionType(type) {
    conversionType = type;

    document.querySelectorAll('.toggle-button').forEach(button => button.classList.remove('active'));
    document.getElementById(`toggle-${type}`).classList.add('active');
    document.getElementById('result').textContent = '';
    document.getElementById('binary-input').value = '';
}

function convertBinary() {
    const input = document.getElementById('binary-input').value;
    const resultElement = document.getElementById('result');

    try {
        if (conversionType === 'ipv4') {
            resultElement.textContent = binaryToIPv4(input);
        } else if (conversionType === 'ipv6') {
            resultElement.textContent = binaryToIPv6(input);
        } else if (conversionType === 'binary-ip') {
            resultElement.textContent = ipToBinary(input);
        } else if (conversionType === 'text') {
            resultElement.textContent = binaryToText(input);
        }
    } catch (error) {
        resultElement.textContent = error.message;
    }
}

function binaryToIPv4(binaryInput) {
    const binaryGroups = binaryInput.split('.');
    if (binaryGroups.length !== 4 || binaryGroups.some(group => group.length !== 8)) {
        throw new Error('Invalid binary string. Must be in the form of 8-bit groups separated by periods.');
    }
    const octets = binaryGroups.map(bin => parseInt(bin, 2));
    return octets.join('.');
}

function binaryToIPv6(binaryInput) {
    const binaryGroups = binaryInput.match(/.{1,16}/g);
    if (!binaryGroups || binaryGroups.length > 8) {
        throw new Error('Invalid binary string. Must be in the form of 16-bit groups for IPv6.');
    }
    const hextets = binaryGroups.map(bin => parseInt(bin, 2).toString(16));
    return hextets.join(':');
}

function ipToBinary(ipInput) {
    if (ipInput.includes('.')) {
        // IPv4 to Binary
        const octets = ipInput.split('.');
        if (octets.length !== 4 || octets.some(octet => isNaN(octet) || octet < 0 || octet > 255)) {
            throw new Error('Invalid IPv4 address.');
        }
        return octets.map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('.');
    } else if (ipInput.includes(':')) {
        // IPv6 to Binary
        const hextets = ipInput.split(':');
        if (hextets.length > 8) {
            throw new Error('Invalid IPv6 address.');
        }
        return hextets
            .map(hextet => parseInt(hextet || '0', 16).toString(2).padStart(16, '0'))
            .join('');
    } else {
        throw new Error('Invalid IP address.');
    }
}

function binaryToText(binaryString) {
    const cleanedBinary = binaryString.replace(/\s+/g, '');
    if (cleanedBinary.length % 8 !== 0) {
        throw new Error('Invalid binary string. Must be divisible by 8.');
    }
    return cleanedBinary.match(/.{8}/g).map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}
