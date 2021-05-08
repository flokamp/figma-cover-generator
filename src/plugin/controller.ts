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

let iphoneX_bottom =
    '<svg width="421" height="812" viewBox="0 0 421 812" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M51.7066 0C24.7663 0 2.92679 21.066 2.92679 47.0523V97.8689C1.84914 97.8689 0.975595 98.7111 0.975595 99.751V127.041C0.975595 128.081 1.84914 128.923 2.92679 128.923V160.919C1.31032 160.919 0 162.183 0 163.742V217.382C0 218.941 1.31032 220.205 2.92679 220.205V235.262C1.31032 235.262 0 236.526 0 238.085V291.725C0 293.284 1.31032 294.548 2.92679 294.548V764.13C2.92679 790.116 24.7663 811.182 51.7066 811.182H368.775C395.715 811.182 417.555 790.116 417.555 764.13V274.786C419.171 274.786 420.482 273.522 420.482 271.963V183.504C420.482 181.945 419.171 180.681 417.555 180.681V47.0523C417.555 21.0661 395.715 0 368.775 0H51.7066Z" fill="white"/> <path d="M365.849 4.70508H54.6338C28.771 4.70508 7.80518 24.9285 7.80518 49.8753V761.307C7.80518 786.254 28.771 806.477 54.6338 806.477H365.849C391.711 806.477 412.677 786.254 412.677 761.307V49.8753C412.677 24.9285 391.711 4.70508 365.849 4.70508Z" fill="#E9EEF1"/> <path d="M362.922 7.5282H57.5607C31.698 7.5282 10.7322 27.7516 10.7322 52.6984V758.484C10.7322 783.43 31.698 803.654 57.5607 803.654H362.922C388.785 803.654 409.751 783.43 409.751 758.484V52.6984C409.751 27.7516 388.785 7.5282 362.922 7.5282Z" fill="white"/> </svg> ';

let iphoneX_top =
    '<svg width="219" height="29" viewBox="0 0 219 29" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.26741 0.526367H0.462646C5.1455 0.526367 8.26741 1.93794 8.26741 6.17265V11.8189C8.26741 21.174 16.1297 28.7578 25.8281 28.7578H193.631C203.329 28.7578 211.191 21.174 211.191 11.8189V6.17265C211.191 1.93794 214.313 0.526367 218.996 0.526367H211.191H8.26741Z" fill="white"/> <path d="M151.68 16.524C155.452 16.524 158.509 13.5748 158.509 9.93669C158.509 6.29861 155.452 3.34937 151.68 3.34937C147.908 3.34937 144.851 6.29861 144.851 9.93669C144.851 13.5748 147.908 16.524 151.68 16.524Z" fill="#E9EEF1"/> <path d="M151.679 13.7009C153.835 13.7009 155.582 12.0156 155.582 9.93667C155.582 7.85777 153.835 6.17249 151.679 6.17249C149.524 6.17249 147.777 7.85777 147.777 9.93667C147.777 12.0156 149.524 13.7009 151.679 13.7009Z" fill="white"/> <path d="M129.241 6.17249H89.2415C87.0863 6.17249 85.3391 7.85777 85.3391 9.93668C85.3391 12.0156 87.0863 13.7009 89.2415 13.7009H129.241C131.396 13.7009 133.143 12.0156 133.143 9.93668C133.143 7.85777 131.396 6.17249 129.241 6.17249Z" fill="#E9EEF1"/> </svg> ';
