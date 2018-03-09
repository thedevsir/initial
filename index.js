'use strict';

const initial = (options) => {

    const unicode_charAt = (string, index) => {
        const first = string.charCodeAt(index);
        let second;
        if (first >= 0xD800 && first <= 0xDBFF && string.length > index + 1) {
            second = string.charCodeAt(index + 1);
            if (second >= 0xDC00 && second <= 0xDFFF) {
                return string.substring(index, index + 2);
            }
        }
        return string[index];
    };

    const unicode_slice = (string, start, end) => {
        let accumulator = "";
        let character;
        let stringIndex = 0;
        let unicodeIndex = 0;
        const length = string.length;

        while (stringIndex < length) {
            character = unicode_charAt(string, stringIndex);
            if (unicodeIndex >= start && unicodeIndex < end) {
                accumulator += character;
            }
            stringIndex += character.length;
            unicodeIndex += 1;
        }
        return accumulator;
    };

    // Defining Colors
    const colors = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#f69785", "#9ba37e", "#b49255", "#b49255", "#a94136"];
    let finalColor;

    let settings = Object.assign({
        // Default settings
        name: 'Name',
        color: null,
        seed: 0,
        charCount: 1,
        textColor: '#ffffff',
        height: 100,
        width: 100,
        fontSize: 60,
        fontWeight: 300,
        fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
        radius: 0
    }, options);

    // making the text object
    const c = unicode_slice(settings.name, 0, settings.charCount).toUpperCase();

    let cobj = document.createElement('text');
    cobj.setAttribute('text-anchor', 'middle');
    cobj.setAttribute('x', '50%');
    cobj.setAttribute('y', '50%');
    cobj.setAttribute('dy', '0.35em');
    cobj.setAttribute('pointer-events', 'auto');
    cobj.setAttribute('fill', settings.textColor);
    cobj.setAttribute('font-family', settings.fontFamily);
    cobj.innerHTML = c;
    cobj.style.fontWeight = settings.fontWeight;
    cobj.style.fontSize = `${settings.fontSize}px`;

    if (settings.color == null) {
        const colorIndex = Math.floor((c.charCodeAt(0) + settings.seed) % colors.length);
        finalColor = colors[colorIndex]
    } else {
        finalColor = settings.color
    }

    let svg = document.createElement('svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('pointer-events', 'none');
    svg.setAttribute('width', settings.width);
    svg.setAttribute('height', settings.height);
    svg.style.backgroundColor = finalColor;
    svg.style.width = `${settings.width}px`;
    svg.style.height = `${settings.height}px`;
    svg.style.borderRadius = `${settings.radius}px`;
    svg.style.webkitBorderRadius = `${settings.radius}px`;

    svg.appendChild(cobj);

    let doc = document.createElement('div');
    doc.appendChild(svg);

    const svgHtml = window.btoa(unescape(encodeURIComponent(doc.innerHTML)));

    return `data:image/svg+xml;base64,${svgHtml}`;
};