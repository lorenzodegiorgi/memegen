import { BACKGROUND, FONT, COLOR, VISIBILITY, DEFAULTMEME } from './constants';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import MemeDisplay from './memeDisplay';
import { useLocation, Redirect } from 'react-router-dom';
import UserContext from './userContexts';

const dayjs = require('dayjs');

function MemeGeneration(props) {
    const location = useLocation();
    const [background, setBackground] = useState(location.state ? location.state.selectedMeme.background : DEFAULTMEME.background);
    const [showBorders, setShowBorders] = useState(false);
    const [color, setColor] = useState(location.state ? location.state.selectedMeme.color : DEFAULTMEME.color);
    const [font, setFont] = useState(location.state ? location.state.selectedMeme.font : DEFAULTMEME.font);
    const [title, setTitle] = useState(location.state ? location.state.selectedMeme.title : DEFAULTMEME.title);
    const [warningMessages, setWarningMessages] = useState([]);
    const [visibility, setVisibility] = useState(location.state ? location.state.selectedMeme.visibility : DEFAULTMEME.visibility);
    const [date, setDate] = useState(dayjs().format('DD-MM-YYYY'));
    const [submitted, setSubmitted] = useState(false);
    const [creator, setCreator] = useState('');
    const userInfo = useContext(UserContext);


    const handleSentenceChange = (event) => {
        setBackground(oldBackground => {
            const newBackground = { ...oldBackground };
            newBackground.sentences = oldBackground.sentences.map(sentence => {
                if (event.target.name === sentence.x + "-" + sentence.y) {
                    let newSentence = { ...sentence };
                    newSentence.text = event.target.value;
                    return newSentence;
                } else {
                    return sentence;
                }
            });
            return newBackground;
        });
    }

    const handleBackgroundChange = (event) => {
        setBackground(BACKGROUND.find((element) => element.title === event.target.value));

    }

    const handleFontChange = (event) => {
        setFont(FONT.find((element) => element.font === event.target.value));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;

        //Validation: at least one sentences filed must be filled
        const filledSentences = background.sentences.filter(sentence => sentence.text !== '');
        if (filledSentences.length < 1) {
            valid = false;
            setWarningMessages('You must fill at least one textbox');
        }
        
        //Validation: title can not be empty
        if(title === ''){
            valid = false;
            setWarningMessages('Title can not be empty');
        }

        let meme = {
            id: '',
            title: title,
            background: background,
            visibility: visibility,
            creator: creator,
            font: font,
            color: color,
            date: date,
            status: '',
        }
        if (valid) {
            props.addOrCopy(meme, location.state !== undefined ? location.state.selectedMeme : undefined);
            setSubmitted(true);
        }
    }

    const drawTextArea = background.sentences.map(sentence =>
        <React.Fragment key={sentence.x + "-" + sentence.y}>
            <Form.Label>Description <span className="colored-box" style={{ backgroundColor: sentence.border }}></span></Form.Label>
            <Form.Control name={sentence.x + "-" + sentence.y} size="sm" as="textarea" rows={4} value={sentence.text} placeholder="Add you text" onChange={handleSentenceChange} /><br />
        </React.Fragment>
    )

    const drawAvailableFont = FONT.map(font => <option key={font.font}>{font.font}</option>);

    const drawAvailableColor = COLOR.map(color => <option key={color}>{color}</option>);

    const drawAvailableBackground = BACKGROUND.map(background => <option key={background.title}>{background.title}</option>);

    const drawAvailableVisibility = VISIBILITY.filter(element => {
        if (location.state && location.state.selectedMeme.creator !== userInfo.username && visibility === 'protected' && element === 'public') {
            return false;
        }
        return true;
    }).map(element => <option key={element}>{element}</option>);

    return (
        <> {submitted ? <Redirect to='/' /> :
            <Container fluid className="text-center">
                {warningMessages.length > 0 ? <Alert variant='warning'>{warningMessages}</Alert> : ''}
                <Row>
                    <Col className="mb-5" md={6}>
                        <Form>
                            <FormGroup>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                            </FormGroup>
                             <FormGroup>
                                <Form.Label>Creator</Form.Label>
                                <Form.Control type="text" value={creator} onChange={(event) => setCreator(event.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Background</Form.Label>
                                <Form.Control as="select" value={background.title} onChange={handleBackgroundChange} disabled={location.state ? true : false} >
                                    {drawAvailableBackground}
                                </Form.Control>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Font</Form.Label>
                                <Form.Control as="select" value={font.font} onChange={handleFontChange}>
                                    {drawAvailableFont}
                                </Form.Control>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Color</Form.Label>
                                <Form.Control as="select" value={color} onChange={(event) => setColor(event.target.value)}>
                                    {drawAvailableColor}
                                </Form.Control>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Visibility</Form.Label>
                                <Form.Control as="select" value={visibility} onChange={(event) => setVisibility(event.target.value)}>
                                    {drawAvailableVisibility}
                                </Form.Control>
                            </FormGroup>
                            <FormGroup>
                                {drawTextArea}
                                <Form.Check type='checkbox' id='showBorders' label="Show textarea borders" value={showBorders} onChange={() => setShowBorders((oldValue) => !oldValue)} />
                            </FormGroup>
                            <Button variant="warning" type="submit" onClick={(event) => handleSubmit(event)}>Create</Button>
                        </Form>
                    </Col>
                    <Col className="mb-5" md={6}>
                        <MemeDisplay background={background} color={color} showBorders={showBorders} font={font} />
                    </Col>
                </Row>
            </Container>
        }
        </>

    )
}

export default MemeGeneration;
