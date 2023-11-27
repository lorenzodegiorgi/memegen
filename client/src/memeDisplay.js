function MemeDisplay(props) {

    const drawSentences = props.background.sentences.map(sentence => 
        <div key={sentence.x + "-" + sentence.y} className='phrase' style={{
            top: sentence.y,
            left: sentence.x,
            maxWidth: sentence.width,
            maxHeight: sentence.height,
            overflow: 'hidden',
            fontFamily: props.font.font,
            fontSize: props.font.size,
            color: props.color,
            border: props.showBorders ? '1px solid ' + sentence.border : '',
            whiteSpace: 'pre-line',
            textAlign: 'center',
        }}
        >
            <p>{sentence.text}</p>
        </div>
    );

    return (
        <div className='memeGeneration'>
            <img alt="meme" style={{overflow:'scroll'}} src={props.background.path} />
            {drawSentences}
        </div>
    );
}

export default MemeDisplay;