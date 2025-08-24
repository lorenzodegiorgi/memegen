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
    'blue',
    'green',
]

export const VISIBILITY = [
    'public',
]

export const DATE_FORMAT = "dd DD MMM YYYY";

export const BACKGROUND = [
    {
        title: 'BADUM',
        path: "/" + MEME_FOLDER + 'badum.jpeg',
        sentences: [
            { id: 0, x: 10, y: 30, width: 400, height:150, border: 'red', text: 'Text1' },
            { id: 1, x: 10, y: 500, width: 400, height:150,  border: 'blue', text: 'Text2' },
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

