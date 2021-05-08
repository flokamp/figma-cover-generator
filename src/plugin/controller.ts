figma.showUI(__html__);
figma.ui.resize(460, 350);

//declare variables to use later
let data = figma.root;
let cover: PageNode;
let frame: FrameNode;
let title: TextNode;

let bgHex = '#CFE2E3';
let collabHands = [];

let spots = [
    [162, 38],
    [162, 328],
    [162, 359],
    [162, 12],
    [162, -13],
    [162, 396],
];

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    //if new page button was pushed
    if (msg.type === 'setTitleAndGo') {
        //capture selections
        title = msg.input;
    }

    if (msg.type === 'addHand') {
        collabHands.push(msg.image);
    }

    if (msg.type === 'setBgAndFinish') {
        bgHex = msg.color;
        createPageAndFrame();

        if (collabHands) {
            collabHands.map((collabHand, ind) => addCollabHand(collabHand, ind));
        }
        figma.closePlugin();
    }
};

function createPageAndFrame() {
    //creating page
    cover = figma.createPage();
    cover.name = 'Thumbnail';
    //setting background to bgHex variable
    cover.backgrounds = [
        {
            type: 'SOLID',
            color: {
                r: hexToRgb(bgHex).r,
                g: hexToRgb(bgHex).g,
                b: hexToRgb(bgHex).b,
            },
        },
    ];
    //setting current page to this new page
    figma.currentPage = cover;

    //insert new page at the top of the root (second page)
    figma.root.insertChild(0, cover);

    //creating frame
    frame = figma.createFrame();
    frame.name = 'Thumbnail';
    frame.resize(480, 250);
    frame.fills = [
        {
            type: 'SOLID',
            color: {
                r: hexToRgb(bgHex).r,
                g: hexToRgb(bgHex).g,
                b: hexToRgb(bgHex).b,
            },
        },
    ];

    //zoom into frame
    const nodes = [];
    nodes.push(frame);
    figma.viewport.scrollAndZoomIntoView(nodes);
}

async function addCollabHand(handImg, ind: number) {
    let img = figma.createImage(handImg);
    const rect = figma.createRectangle();
    const spot = spots[ind];

    rect.x = spot[1];
    rect.y = spot[0] + Math.floor(Math.random() * 30) - 5;
    rect.fills = [
        {
            blendMode: 'NORMAL',
            imageHash: img.hash,
            opacity: 1,
            scaleMode: 'FILL',
            scalingFactor: 1.0,
            type: 'IMAGE',
            visible: true,
        },
    ];
    frame.appendChild(rect);
}

// function addCustomHand(customHand) {
//     let img = figma.createImage(customHand);
//     const rect = figma.createRectangle();
//     rect.x = 328;
//     rect.y = 162;
//     rect.fills = [
//         {
//             blendMode: 'NORMAL',
//             imageHash: img.hash,
//             opacity: 1,
//             scaleMode: 'FILL',
//             scalingFactor: 1.0,
//             type: 'IMAGE',
//             visible: true,
//         },
//     ];
//     frame.appendChild(rect);
// }

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16) / 255,
              g: parseInt(result[2], 16) / 255,
              b: parseInt(result[3], 16) / 255,
          }
        : null;
}
