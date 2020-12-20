import { useEffect } from 'react'
import NewsPrimary from '../../components/NewsPrimary/NewsPrimary';
import NewsSecondary from '../../components/NewsSecondary/NewsSecondary';
import classes from './Homepage.module.scss';
import { biden } from './../../assets/images/images'
import NewsTertiary from '../../components/NewsTertiary/NewsTertiary';
import axios, { backendApi } from './../../axios/axiosInstance';
import Skeleton from 'react-loading-skeleton'
import { useStore } from './../../store/store'
import { withRouter } from 'react-router-dom'

const apiKey = 'ea6888d8a18c4f27bb31dea9a4bcf55e';

function Homepage(props) {
    const [globalStore,dispatch] = useStore();

    // fetch news
    useEffect(() => {
        const fetchData = async() => {
            try{
                let loginThroughCookie = await backendApi.post('api/v1/users/loginThroughCookie')
                let topNews = await axios.get(`/top-headlines?country=us&apiKey=${apiKey}`);
                let allNews = await axios.get(`/everything?q=us&apiKey=${apiKey}`);
                let getNews = await Promise.all([topNews,allNews])

                
                if(getNews) {
                    dispatch({type: 'GET_NEWS',payload: {
                        topNews: getNews[0].data.articles.slice(0,5),
                        allNews: getNews[1].data.articles.slice(0,15),
                        remainingNews: getNews[0].data.articles.slice(6,12)
                    }})
                }
                if(loginThroughCookie.data.status !== 'fail') {
                    
                    dispatch({type: 'AUTH_USER', payload: loginThroughCookie.data.user})
                }
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    },[dispatch])



    return (
        <div className={`${classes.homepage}`}>

            
            <h4>Welcome to News Portal</h4>
            {!globalStore.topNews ? <NewsPrimarySkeletonLoader /> : null}

            <div className={classes.homepage__top}>
                {globalStore.topNews && globalStore.topNews.map((news,id) => {
                    return (<NewsPrimary key={id} {...news} />)
                })}

                {/* show skeleton if result is not shown */}

            </div>


            <div className={classes.homepage__middle}>
                <h4>News</h4>
                <div className={classes.homepage__middle__container}>
                    {globalStore.remainingNews && globalStore.remainingNews.map((news,id) => {
                        return (<NewsSecondary key={id} {...news} />)
                    })}
                    {!globalStore.remainingNews ? <NewsSecondarySkeletonLoader /> : null}

                </div>
            </div>

            <div className={`container my-4`}>
                <div className="row justify-content-around g-5">
                    <div className="col-6 col-sm-3 ">

                        {globalStore.allNews && globalStore.allNews.slice(0,6).map((news,id) => {
                            if(id === 0) {
                                return (
                                    <div key={id} className='mb-4'>
                                        <img src={news.urlToImage || biden} alt="biden" className="d-block w-100 mb-3" />
                                        <h3>{news.title.slice(0,15)}</h3>
                                    </div>
                                )
                            } else {
                                return (<NewsTertiary key={id} {...news} />)
                            }
                        })}
                        

                    </div>
                    <div className="col-6 col-sm-5">
                    {globalStore.allNews && globalStore.allNews.slice(6,9).map((news,id) => {
                            if(id === 0) {
                                return (
                                    <div key={id} className='mb-4'>
                                        <img src={news.urlToImage || biden} alt="biden" className="d-block w-100 mb-3" />
                                        <h3>{news.title.slice(0,15)}</h3>
                                    </div>
                                )
                            } else {
                                return (<NewsTertiary key={id} {...news} />)
                            }
                        })}
                        
                    </div>
                    <div className="col-12 col-sm-3">
                    {globalStore.allNews && globalStore.allNews.slice(9,15).map((news,id) => {
                            if(id === 0) {
                                return (
                                    <div key={id} className='mb-4'>
                                        <img src={news.urlToImage || biden} alt="biden" className="d-block w-100 mb-3" />
                                        <h3>{news.title.slice(0,15)}</h3>
                                    </div>
                                )
                            } else {
                                return (<NewsTertiary key={id} {...news} />)
                            }
                        })}
                    </div>
                </div>
                
            </div>
        </div>
    )
}


function NewsPrimarySkeletonLoader() {
    
    return (
        <div  className={classes.loader}>
            {Array(5).fill().map((item, id) => {
                return <Skeleton key={id}  />
            })}
        </div>
    )
}

function NewsSecondarySkeletonLoader() {
    return (
        <>
            {Array(3).fill().map((item,id) => {
                return (
                    <div>
                        <Skeleton height={210} style={{marginBottom: '1rem'}} />
                        <Skeleton height={35} style={{marginBottom: '2rem'}}/>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />

                    </div>
                )
            })}
        </>
    )
}
export default withRouter(Homepage);