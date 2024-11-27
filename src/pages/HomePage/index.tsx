import {Container, Row} from "reactstrap";
import { Navbar } from "../../components/Navbar";
import 'src/App.css';


const HomePage = () => {
	return (
			<>
        	<Navbar />
			<Container>
				<Row>
					<h1 className="mb-3">Добро пожаловать на сайт Выставок МГТУ!</h1>
					<p className="fs-5">Добро пожаловать на сайт Выставок МГТУ! Здесь вы можете узнать о предстоящих мероприятиях, познакомиться с уникальными проектами и инновациями студентов и преподавателей нашего университета. Следите за новыми выставками и не упустите шанс стать частью увлекательного мира науки и технологий!</p>
				</Row>
			</Container>
			</>
	)
}

export default HomePage 