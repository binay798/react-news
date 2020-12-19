import classes from './NewsSecondary.module.scss';
import { corona } from './../../assets/images/images';
import { withRouter } from 'react-router-dom';
import { useStore } from './../../store/store'
function NewsSecondary(props) {
    const dispatch = useStore()[1]
    const goToDetailsPage = () => {
        const {author,content,description,publishedAt,source,title,url,urlToImage} = props;
        const info = {author,content,description,publishedAt,source,title,url,urlToImage}
        dispatch({type: 'GET_SELECTED_NEWS',payload: info})
        props.history.push('/details')
    }
    return (
        <div className={classes.news} onClick={goToDetailsPage}>
            <img src={props.urlToImage || corona} alt="corona"/>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <p style={{color: 'gray'}}>--<em>Author </em>{props.author}</p>
        </div>
    )
}
export default withRouter(NewsSecondary);