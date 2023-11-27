const e = require('express');
const sqlite = require('sqlite3');
const db = require('./database');

exports.listMemes = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, title, visibility, creatorID, color, font, background, date, text1, text2, text3 FROM meme';
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const memes = rows.map((meme) => {
                return {
                    id: meme.id,
                    title: meme.title,
                    visibility: meme.visibility,
                    creator: meme.creatorID,
                    font: meme.font,
                    color: meme.color,
                    background: meme.background,
                    date: meme.date,
                    text1: meme.text1,
                    text2: meme.text2,
                    text3: meme.text3,
                }
            });
            resolve(memes);
        })
    })
};

exports.listPublicMemes = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, title, visibility, creatorID, color, font, background, date, text1, text2, text3 FROM meme WHERE visibility="public"';
        db.all(query, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const memes = rows.map((meme) => {
                return {
                    id: meme.id,
                    title: meme.title,
                    visibility: meme.visibility,
                    creator: meme.creatorID,
                    font: meme.font,
                    color: meme.color,
                    background: meme.background,
                    date: meme.date,
                    text1: meme.text1,
                    text2: meme.text2,
                    text3: meme.text3,
                }
            });
            resolve(memes);
        })
    })
};

exports.getMemeById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, title, visibility, creatorID, color, font, background, date, text1, text2, text3 FROM meme WHERE id=?';
        db.get(query, [id], (err, row) => {
            if(err){
                reject(err);
                return;
            }else if(row === undefined) {resolve(false);}
            else{
                const meme = {
                    id: row.id,
                    title: row.title,
                    visibility: row.visibility,
                    creator: row.creatorID,
                    font: row.font,
                    color: row.color,
                    background: row.background,
                    date: row.date,
                    text1: row.text1,
                    text2: row.text2,
                    text3: row.text3,
                }
                resolve(meme);
            }
        }
    )})
}

exports.addMeme = (meme) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO meme(title, creatorID, color, font, text1, text2, text3, visibility, date, background) VALUES(?,?,?,?,?,?,?,?,?,?)';
        db.run(query, [
            meme.title,
            meme.creator,
            meme.color,
            meme.font,
            meme.text1,
            meme.text2,
            meme.text3,
            meme.visibility,
            meme.date,
            meme.background,
        ], (err) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(this.lastID);
        })
    })
}


exports.deleteMeme = (idMeme) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM meme WHERE id=?';
        db.run(query, [idMeme], function (err) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(idMeme);
        })
    })
}