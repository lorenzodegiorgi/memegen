import { BACKGROUND, FONT, DATE_FORMAT } from './constants';
const URL = '/api';

const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const convertMemeFromDB = (meme) => {
    /* Find the corresponding font in constants.js */
    meme.font = { ...FONT.find(font => font.id === meme.font) };

    /* Find the corresponding background in constants.js and 
    customize it with the right sentences */
    //Find the background and add it to the meme
    meme.background = { ...BACKGROUND.find(element => element.title === meme.background) };

    //Associate each textbox in the background with the right text
    meme.background.sentences = meme.background.sentences.map(sentence => {
        let newSentence = { ...sentence };
        switch (sentence.id) {
            case 0:
                newSentence.text = meme.text1;
                break;
            case 1:
                newSentence.text = meme.text2;
                break;
            case 2:
                newSentence.text = meme.text3;
                break;
            default:
                newSentence.text = '';
        }
        return newSentence;
    });

    //Adjust date format
    meme.date = dayjs(meme.date, 'DD-MM-YYYY').format(DATE_FORMAT).toString();
    //Delete this field of the object
    delete meme.text1;
    delete meme.text2;
    delete meme.text3;

    meme.status = '';

    return meme;
}

async function loadAllMemes() {
    const response = await fetch(URL + '/memes');
    const memes = await response.json();
    if (response.ok) {
        return memes.map(meme => convertMemeFromDB(meme));
    } else {
        //Something go wrong into the server
        throw { ...memes, descr: 'Impossible to load memes. Try again!' };
    }
}

async function addMeme(meme, selectedMeme) {
    let body = {
        meme: {
            id: meme.id,
            title: meme.title,
            visibility: meme.visibility,
            creator: meme.creator,
            color: meme.color,
            font: meme.font.id,
            background: meme.background.title,
            text1: meme.background.sentences.find((element) => element.id === 0) ? meme.background.sentences.find((element) => element.id === 0).text : '',
            text2: meme.background.sentences.find((element) => element.id === 1) ? meme.background.sentences.find((element) => element.id === 1).text : '',
            text3: meme.background.sentences.find((element) => element.id === 2) ? meme.background.sentences.find((element) => element.id === 2).text : '',
            date: meme.date,
        }
    };

    if (selectedMeme)
        body = {
            ...body,
            selectedMeme: {
                id: selectedMeme.id,
                title: selectedMeme.title,
                visibility: selectedMeme.visibility,
                creator: selectedMeme.creator,
                color: selectedMeme.color,
                font: selectedMeme.font.id,
                background: selectedMeme.background.title,
                date: selectedMeme.date,
            }

        };

    const response = await fetch(URL + '/meme/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (response.ok) {
        return null;
    } else {
        //Something go wrong into the server
        const err = await response.json();
        throw ({ ...err, descr: 'Impossible to add meme, try it again!' });
    }
}

async function deleteMeme(memeId) {
    const response = await fetch(URL + '/meme/delete/' + memeId, {
        method: 'DELETE',
    });
    if (response.ok) {
        return null;
    } else {
        const err = await response.json();
        throw ({ ...err, descr: 'Impossible to delete meme, try it again!' });
    }

}

/* Login/Logout API */
async function logIn(credentials) {
    let response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        const user = await response.json();
        return user.username;
    }
    else {
        const errDetail = await response.json();
        throw { descr: errDetail.message };
    }

}

async function getUserInfo() {
    const response = await fetch(URL + '/sessions/current');
    const userInfo = await response.json();
    if (response.ok) {
        return userInfo;
    } else {
        throw userInfo;
    }
}

async function logOut() {
    await fetch('/api/sessions/current', { method: 'DELETE' });
}

const API = { loadAllMemes, addMeme, deleteMeme, logIn, getUserInfo, logOut };
export default API;