import "swiper/css";
import "swiper/css/pagination"
import "./Homepage.css"
import jeansvideos from '../../Resources/videos/jeans.mp4';
import menvideos from '../../Resources/videos/menVid.mp4'
import kidsVideo from '../../Resources/videos/kids.mp4';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Mousewheel, Pagination } from 'swiper/modules';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
SwiperCore.use([Mousewheel, Pagination]);
const Homepage = () => {
    const Women = [
        {
            path: 'women1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-woman-new/subhome-xmedia-38-3//w/1922/IMAGE-landscape-default-fill-3826ba34-9fad-4264-9ecd-6d2bc9295d9c-default_0.jpg?ts=1663773455159'
        },
        {
            video: jeansvideos
        },
        {
            path: 'women1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-woman-y2k-collection/subhome-xmedia-38//w/1922/IMAGE-landscape-fill-8ffe5012-f7c5-486e-a66a-9c017f1c4ddc-default_0.jpg?ts=1663790133732'
        },
        {
            path: 'women1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-woman-best-sellers/subhome-xmedia-38//w/1922/IMAGE-landscape-fill-c68605f6-1f94-4830-8f4a-0f3bf22017e2-default_0.jpg?ts=1663579002306'
        },
        {
            path: 'women1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-collection/subhome-xmedia-39//w/1922/IMAGE-landscape-fill-8a1ce69a-a1f6-4b5c-b04a-c3ea44664c19-default_0.jpg?ts=1663794685596'
        },
        {
            path: 'women1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-woman-basics/subhome-xmedia-38//w/1922/IMAGE-landscape-fill-f5302ebb-2ddc-4218-81c2-eb0464c2d73f-default_0.jpg?ts=1663576361647'
        },
        {
            path: 'women1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-woman-shoes-bags/subhome-xmedia-38//w/1922/IMAGE-landscape-default-fill-5c2d5cc1-7805-42c8-9238-635ec71551d3-default_0.jpg?ts=1663770211821'
        }
    ];
    const Men = [
        {
            path: 'men1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-man-origins/subhome-xmedia-34//w/1294/IMAGE-landscape-1-fill-23c9012f-bdc9-45c1-af3c-8f7c07f86626-default_0.jpg?ts=1664366171420'
        },
        {
            path: 'men1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-man-new/subhome-xmedia-39//w/1922/IMAGE-landscape-fill-fbb20929-1e45-4d24-8139-c6351a17419b-default_0.jpg?ts=1664208804884'
        },
        {
            video: menvideos
        },
        {
            path: 'men1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-man-thezexperience/subhome-xmedia-37//w/1034/IMAGE-landscape-60a9e632-924a-42ab-b7a3-9a87060d9999-default_0.jpg?ts=1663172982729'
        }
    ];
    const Kids = [
        {
            video: kidsVideo,
            cat: 'kids'
        },
        {
            path: 'kids1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-boy/subhome-xmedia-38-2//w/1922/IMAGE-landscape-fill-aa8667a5-4747-421a-8c66-2dba3d7b3afc-default_0.jpg?ts=1663870203073'
        },
        {
            path: 'kids1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-babygirl/subhome-xmedia-38//w/1922/IMAGE-landscape-fill-79e6baba-0718-4cda-bbb5-ff3f6fe0be62-default_0.jpg?ts=1663870712229'
        },
        {
            path: 'kids1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-girl/subhome-xmedia-39//w/1922/IMAGE-landscape-fill-ccf425f8-7d6e-447a-99b0-d5bafce56b94-default_0.jpg?ts=1664521449113'
        },
        {
            path: 'kids1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-join-life/subhome-xmedia-38//w/1922/IMAGE-landscape-fill-4e354fe1-c38f-4d4b-8e9c-d58f5718aefa-default_0.jpg?ts=1663763505030'
        },
        {
            path: 'kids1',
            img: 'https://static.zara.net/photos///contents/mkt/spots/aw22-north-kids-babyboy/subhome-xmedia-38//w/1922/IMAGE-landscape-fill-f9ab1b72-c48b-47fe-84c3-006e8f6141cb-default_0.jpg?ts=1663871170295'
        }
    ];
    const [activeIndexs, setactiveIndex] = useState<number>(0);
    const [indexNo, setIndex] = useState(0);
    const category = ['Women', 'Men', 'Kids'];
    return (
        <div className="app">
            <Navbar/>
                    <div className="Container" >
            <Navbar style={{ display: "none" }} activeIndexs={activeIndexs} setIndex={setIndex}/>
            <Swiper
                direction={'vertical'}
                slidesPerView={1}
                mousewheel={true}
                pagination={{
                    "clickable": true,
                }}
                onTouchMove={(e) => setactiveIndex(e.activeIndex===0?1:e.activeIndex===1?2:e.activeIndex)}
                className="mySwiper"
                onScroll={(e) => setactiveIndex(e.activeIndex)}
            >
                {eval(category[indexNo])?.map((ele:any, index:number) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                        <Link to={`/products`} state={{ query: ele.path }}>
                            {ele.img ?
                                <img src={ele.img} alt={ele.img} className={`main${category[indexNo]}${index}`}/>
                                :
                                <video autoPlay loop muted controls={ele.cat === 'kids' ? false : true} >
                                    <source src={ele.video} type="video/mp4" />
                                </video>
                            }
                        </Link>
                    </SwiperSlide>
                ))};
                <div className="nextPrevButtons">
                    {indexNo > 0 ?
                        <button onClick={() => setIndex(prev => prev - 1)}>
                            <ArrowBackIosIcon fontSize='small' />
                            <span>{category[indexNo - 1]}</span>
                        </button>
                        :
                        <span></span>
                    }
                    {indexNo !== category.length - 1 &&
                        <button onClick={() => setIndex(prev => prev + 1)}>
                            <span>{category[indexNo + 1]}</span>
                            <ArrowForwardIosIcon fontSize='small' />
                        </button>
                    }
                </div>
            </Swiper>
        </div >
        </div>

    );
}
export default Homepage