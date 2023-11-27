import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import UserContext from './userContexts';
import { useContext } from 'react';


function MemeControls(props) {
    const userInfo = useContext(UserContext);

    return (
        <Row>
            {userInfo.username === props.meme.creator ?
                <Col className="text-right">
                    <span onClick={() => props.deleteMeme(props.meme)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash icons" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </span>
                </Col> : ''}
            <Col className="text-right">
                <span><Link to={{ pathname: '/create', state: { selectedMeme: props.meme } }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clipboard icons" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                </Link></span>
            </Col>
        </Row>
    )
}

function MemeRow(props) {
    let statusClass = null;
    const defaultClass = 'list-group-item';
    const userInfo = useContext(UserContext);


    switch (props.meme.status) {
        case 'added':
            statusClass = defaultClass + ' meme-added blink';
            break;
        case 'deleted':
            statusClass = defaultClass + ' meme-deleted blink';
            break;
        default:
            statusClass = defaultClass;
    }

    return (<li className={statusClass}>
        <Container fluid>
            <Row>
                <Col xs={9} className="selection"><b><Link to={{ pathname: "/show", state: { selectedMeme: props.meme } }}><p className={"meme-name-list link"}>{props.meme.title}</p></Link></b></Col>
                <Col xs={3} className="text-right">
                    {userInfo.id && props.meme.status === '' ? <MemeControls deleteMeme={props.deleteMeme} meme={props.meme} /> : ''}
                    {props.meme.status ? <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise loading-icon" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
                    </span> : ''}
                </Col>
            </Row>
            <Row>
                <Col xs={9} className="subtitle">
                    {props.meme.creator}
                </Col>
                <Col xs={3} className="subtitle text-right">
                    {props.meme.date}
                </Col>
            </Row>
        </Container>
    </li>)
}

function MemeList(props) {
    const userInfo = useContext(UserContext);

    return (
        <div>
            <Row className="m-2">
                <Col xs={11}>
                    <h3 className="title" >Memes</h3>
                </Col>
                <Col xs={1}>
                    <div className="float-right">
                   {userInfo.username ? 
                        <Link to="/create">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle icons" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </Link>:''}
                    </div>
                </Col>
            </Row>
            <ul className="list-group">
                {props.memes.map(m => <MemeRow key={m.id} meme={m} deleteMeme={props.deleteMeme} />)}
            </ul>
        </div>
    )
}

export default MemeList;