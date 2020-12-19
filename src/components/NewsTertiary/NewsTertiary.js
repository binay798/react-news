import classes from './NewsTertiary.module.scss';
import { corona } from './../../assets/images/images';
import { withRouter } from 'react-router-dom';
import { useStore } from './../../store/store'

function NewsTertiary(props) {
    const dispatch = useStore()[1]

    const goToDetailsPage = () => {
        const {author,content,description,publishedAt,source,title,url,urlToImage} = props;
        const info = {author,content,description,publishedAt,source,title,url,urlToImage}
        dispatch({type: 'GET_SELECTED_NEWS',payload: info})
        props.history.push('/details')
    }
    return(
        <div className={classes.news} onClick={goToDetailsPage}>
            <img src={props.urlToImage || corona} alt="corona" className="col-4 d-block w-50" />
            <span className="col display-inline-block border-top">
                {`${props.title.slice(0,20)}...`}
            </span>
        </div>
    )
}

export default withRouter(NewsTertiary);