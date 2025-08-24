const MEME_FOLDER = 'meme/'

export const FONT = [
    {
        id: 0,
        font: 'Times New Roman',
        size: 30,
    },
    {
        id: 1,
        font: 'Arial',
        size: 30,
    },
    {
        id: 2,
        font: 'Impact',
        size: 30,
    },
]

export const COLOR = [
    'red',
    'black',
    'white',
    'blue',
    'green',
]

export const VISIBILITY = [
    'public',
]

export const DATE_FORMAT = "dd DD MMM YYYY";

export const BACKGROUND = [
    {
        title: 'Giovanni',
        path: "/" + MEME_FOLDER + 'giovanni.jpeg',
        sentences: [
            { id: 0, x: 30, y: 20, width: 400, height:150, border: 'red', text: 'Text1' },
            { id: 1, x: 30, y: 270, width: 600, height:150, border: 'blue', text: 'Text2' },
        ]

    },
    {
        title: 'BADUM',
        path: "/" + MEME_FOLDER + 'badum.jpeg',
        sentences: [
            { id: 0, x: 10, y: 30, width: 400, height:150, border: 'red', text: 'Text1' },
            { id: 1, x: 10, y: 500, width: 400, height:150,  border: 'blue', text: 'Text2' },
        ]

    },
    {
        title: 'DistractedBoy',
        path: "/" + MEME_FOLDER + 'distracted.jpeg',
        sentences: [
            { id: 0, x: 360, y: 160, width: 400, height:150, border: 'red', text: 'Text1' },
            { id: 1, x: 460, y: 290, width: 400, height:150, border: 'blue', text: 'Text2' },
            { id: 2, x: 130, y: 290, width: 400, height:150, border: 'green', text: 'Text3' },

        ]

    },
    {
        title: 'Brain',
        path: "/" + MEME_FOLDER + 'brain.jpg',
        sentences: [
            { id: 0, x: 10, y: 10, width: 240, height:150, border: 'red', text: 'Text1' },
            { id: 1, x: 10, y: 180, width: 240, height:150, border: 'blue', text: 'Text2' },
            { id: 2, x: 10, y: 340, width: 240, height:150, border: 'green', text: 'Text3' },

        ]

    },
    {
        title: 'Fine',
        path: "/" + MEME_FOLDER + 'fine.png',
        sentences: [
            { id: 0, x: 10, y: 10, width: 400, height:200, border: 'red', text: 'Text1' },
        ]

    },
    {
        title: 'Euro2020',
        path: "/" + MEME_FOLDER + 'euro2020.jpg',
        sentences: [
            { id: 0, x: 10, y: 170, width: 450, height:150, border: 'red', text: 'Text1' },
        ]

    },

]

export const DEFAULTMEME = {
    title: 'prova',
    background: BACKGROUND[0],
    visibility: 'public',
    creator: '',
    font: FONT[0],
    color: COLOR[2],
    date: '',
    status: '',
}

