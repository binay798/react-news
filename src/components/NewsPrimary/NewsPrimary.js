import classes from './NewsPrimary.module.scss';
import { biden } from './../../assets/images/images';
import { withRouter } from 'react-router-dom';
import { useStore } from './../../store/store'

function NewsPrimary(props) {
    const dispatch = useStore()[1]
    const paragraphStyle = {
        color: '#bbb1b1'
    }

    const goToDetailsPage = () => {
        const {author,content,description,publishedAt,source,title,url,urlToImage} = props;
        const info = {author,content,description,publishedAt,source,title,url,urlToImage}
        dispatch({type: 'GET_SELECTED_NEWS',payload: info})
        props.history.push('/details')
    }
    return (
        <div className={classes.news} onClick={goToDetailsPage}>
            {/* image */}
            <img src={props.urlToImage || biden} alt="biden"/>
            <div className={classes.news__overlay}>
                <h2>{props.title}</h2>
                <p style={paragraphStyle}>-- <em>Author </em>{props.author}</p>
                <p style={paragraphStyle}>--<em>source </em>{props.source.name}</p>
            </div>
        </div>
    )
}

export default withRouter(NewsPrimary);