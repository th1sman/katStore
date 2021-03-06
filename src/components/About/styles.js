import { makeStyles } from "@material-ui/core/styles";
import aboutPic from '../../assests/aboutPic.jpg'


export default makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff0c2',
        height: '100vh',
    },
    content: {
        paddingTop: 85,
        justifyContent: 'space-around',
    },
    aboutPic: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        objectPosition: '50% 20%',
        filter: 'grayscale(20%)'
    },
    paragraph: {
        padding: '20px'
    }

}))
