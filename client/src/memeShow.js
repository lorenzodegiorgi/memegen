import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import MemeDisplay from './memeDisplay';
import { useLocation } from 'react-router-dom';

function MemeShow(props) {
    //const [meme, setMeme] = useState(props.id ? memes.find((element) => element.id == props.memeId):'');
    const location = useLocation();
    const [meme, setMeme] = useState(location.state ? location.state.selectedMeme : '');

    return (
        <Row>
            {meme && (
                <React.Fragment>
                    <Col>
                        <Row>
                            <h3 className="memeProperties">Title</h3>
                            <p className="memeProperties">{meme.title}</p>
                        </Row>
                        <Row>
                            <h3 className="memeProperties">Background</h3>
                            <p className="memeProperties">{meme.background.title}</p>
                        </Row>
                        <Row>
                            <h3 className="memeProperties">Visibility</h3>
                            <p className="memeProperties">{meme.visibility}</p>
                        </Row>
                        <Row>
                            <h3 className="memeProperties">Creator</h3>
                            <p className="memeProperties">{meme.creator}</p>
                        </Row>
                        <Row>
                            <h3 className="memeProperties">Font</h3>
                            <p className="memeProperties">{meme.font.font}</p>
                        </Row>
                        <Row>
                            <h3 className="memeProperties">Color</h3>
                            <p className="memeProperties">{meme.color}</p>
                        </Row>
                        <Row>
                            <h3 className="memeProperties">Date</h3>
                            <p className="memeProperties">{meme.date}</p>
                        </Row>
                    </Col>
                    <Col className="p-0">
                        <div style={{overflow:'scroll'}}>
                            <MemeDisplay background={meme.background} color={meme.color} showBorders={false} font={meme.font} />
                        </div>
                    </Col>
                </React.Fragment>
            )}
        </Row>
    );
}

export default MemeShow;