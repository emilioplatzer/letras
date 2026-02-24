const fontBox = {
    height: 20,
    width: 10,
    horizontalLines: [0, 10, 20],
    verticalLines: [0, 10],
    margin: 3,
}

const paper = {
    columns: 10,
    rows: 3,
}

const knownAttributes = {
    x1: {anim:true},
    y1: {anim:true},
    x2: {anim:true},
    y2: {anim:true},
    strokeWidth: {sufix:'px', css:true},
    stroke: {css:true},
    d: {attr:true},
    transform: {attr:true},
}

/** 
 * @param {string} tag
 * @param {Partial<Record<keyof typeof knownAttributes, any>>} attrs
 * 
 */
function svgCreate(tag, attrs) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag)
    Object.keys(attrs).map(k =>{ 
        var def = knownAttributes[k]
        const value = def.sufix ? attrs[k] + def.sufix : attrs[k];
        /** @type {Record<string, any>} */
        var target = element
        var kTarget = k
        if (def.css) {
            target = target.style
        }
        if (def.anim) {
            target = target[k].baseVal
            kTarget = 'value'
        }
        if (def.attr) {
            element.setAttribute(k, value);
        } else {
            target[kTarget] = value
        }
    })
    return element;
}

const paths = {
    U: {dx: 5, dy: 5, path:'M -5 -5 l 0 5 a 5 5 0 10 10 0 l 0 -5'},
    I: {path:'M 0 0 l 0 10'},
    C: {dx: 5, dy: 10, path:'M 5 -10 a 10 10 0 0 0 0 20'},
    "-": {path:'M 0 0 l 7 0'},
    "/": {path:'M 0 0 l -10 20'},
}

/**
 * 
 * @param {keyof typeof paths} part
 * @param {number} x 
 * @param {number} y 
 * @param {number} rotate
 */

function svgPart(part, x, y, rotate){
    // return svgCreate('path', {d:`M ${x} ${y} ${parts[part]}`, stroke:'black', strokeWidth:1})
    const path = paths[part]
    const g = svgCreate('g', {transform:`translate(${x + (path.dx ?? 0) }, ${y + (path.dy ?? 0)}) rotate(${rotate ?? 0})`})
    g.appendChild(svgCreate('path', {d:path.path, stroke:'black', strokeWidth:1}))
    return g
}

/**
 * @satisfies {Record<string, {parts:{part:keyof typeof paths, rotate?: number, x: number, y: number}[]}>}
 */

const chars = {
    A: { parts: [{part:'U', rotate:180, x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 10}, {part:'I', x: 10, y: 10, rotate: 90}] },
    B: { parts: [{part:'U', rotate:-90, x: 0, y: 20}, {part:'U', rotate:-90, x: 0, y: 10}, {part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}] },
    C: { parts: [{part:'C', rotate:0, x: 0, y: 20}] },
    D: { parts: [{part:'C', rotate:180, x: 0, y: 20}, {part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}] },
    E: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 20, rotate: 90}, {part:'-', x: 0, y: 10}, {part:'I', x: 10, y: 0, rotate: 90}] },
    F: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 20, rotate: 90}, {part:'-', x: 0, y: 10}] },
    G: { parts: [{part:'C', rotate:0, x: 0, y: 20}, {part:'I', x: 10, y: 10}, {part:'-', x: 10, y: 10, rotate:180}] },
    H: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 20}, {part:'I', x: 10, y: 10}, {part:'I', x: 10, y: 10, rotate: 90}] },
    I: { parts: [{part:'I', x: 5, y: 20}, {part:'I', x: 5, y: 10}, {part:'I', x: 10, y: 0, rotate: 90}, {part:'I', x: 10, y: 20, rotate: 90} ] },
    J: { parts: [{part:'U', x: 0, y: 10}, {part:'I', x: 10, y: 20}] },
    K: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'-', x: 0, y: 10}, {part:'I', x: 10, y: 20, rotate: 12}, {part:'I', x: 10, y: 0, rotate: 180 -12}] },
    L: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 0, rotate: 90}] },
    M: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 20}, {part:'I', x: 10, y: 10}, {part:'I', x: 0, y: 20, rotate: -30}, {part:'I', x: 10, y: 20, rotate: 30}] },
    N: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 20}, {part:'I', x: 10, y: 10}, {part:'/', x: 0, y: 20, rotate: -54}] },
    O: { parts: [{part:'U', rotate:180, x: 0, y: 20}, {part:'U', x: 0, y: 10}] },
    P: { parts: [{part:'U', rotate:-90, x: 0, y: 20}, {part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}] },
    Q: { parts: [{part:'U', rotate:180, x: 0, y: 20}, {part:'U', x: 0, y: 10}, {part:'-', x: 10, y: 0, rotate:210}] },
    R: { parts: [{part:'U', rotate:-90, x: 0, y: 20}, {part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 0, rotate: 180 -12}] },
    S: { parts: [{part:'U', rotate:90, x: 0, y: 20}, {part:'U', x: 0, y: 10, rotate:-90}] },
    T: { parts: [{part:'I', x: 5, y: 20}, {part:'I', x: 5, y: 10}, {part:'I', x: 10, y: 20, rotate: 90} ] },
    U: { parts: [{part:'U', x: 0, y: 10}, {part:'I', x: 0, y: 20}, {part:'I', x: 10, y: 20}] },
    V: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'/', x: 10, y: 20}] },
    W: { parts: [{part:'I', x: 0, y: 20}, {part:'I', x: 0, y: 10}, {part:'I', x: 10, y: 20}, {part:'I', x: 10, y: 10}, {part:'I', x: 10, y: 0, rotate: 180-30}, {part:'I', x: 0, y: 0, rotate: 180+30}] },
    X: { parts: [{part:'/', x: 10, y: 20}, {part:'/', x: 0, y: 20, rotate: -54}] },
    Y: { parts: [{part:'U', x: 0, y: 20}, {part:'I', x: 5, y: 10}] },
    Z: { parts: [{part:'I', x: 0, y: 20, rotate: -90}, {part:'I', x: 0, y: 0, rotate: -90}, {part:'/', x: 10, y: 20}] },
}

/**
 * 
 * @param {keyof typeof chars} char 
 * @param {number} x 
 * @param {number} y 
 */

function svgChar(char, x, y){
    const g = svgCreate('g',{});
    chars[char].parts.forEach(def => {
        const path = svgPart(def.part, x+def.x, y + fontBox.height - def.y, def.rotate);
        g.appendChild(path);
    })
    return g;
}

function createGrid() {
    var grid = document.getElementById('grid');
    var paperWidth = fontBox.width * paper.columns + fontBox.margin * (paper.columns + 1)
    var paperHeight = fontBox.height * paper.rows + fontBox.margin * (paper.rows + 1)
    for (var y = 1; y <= paper.rows; y++) {
        for (var line of fontBox.horizontalLines) {       
            var yy = y * (fontBox.height + fontBox.margin) - line 
            grid.appendChild(svgCreate('line', {x1: 0, y1: yy, x2: paperWidth, y2: yy, stroke:'black', strokeWidth:0.1}));
        }
        for (var x = 0; x < paper.columns; x++) {
        }
    }
    for (var x = 0; x < paper.columns; x++) {
        for (var line of fontBox.verticalLines) {       
            var xx = x * (fontBox.width + fontBox.margin) - line
            grid.appendChild(svgCreate('line', {x1: xx, y1:0, x2:xx, y2: paperHeight, stroke:'black', strokeWidth:0.1}));
        }
    }
    var x = fontBox.margin;
    var y = fontBox.margin;
    /**
     * @param {keyof typeof chars} char 
     */
    function placeChar(char){
        grid.appendChild(svgChar(char, x, y ));
        x += fontBox.width + fontBox.margin;
        if (x >= paperWidth - fontBox.width * 2 ) {
            x = fontBox.margin
            y += fontBox.height + fontBox.margin;
        }
    }
    Object.keys(chars).forEach(placeChar);
}

window.addEventListener('load' , () => {
    createGrid()
});