import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "react-slick";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import banner4 from "../images/banner4.jpg";
import banner5 from "../images/banner5.jpg";
import banner6 from "../images/banner6.jpg";
const useStyles = makeStyles((theme) => ({
  carousel: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    display: "block",
    flexWrap: "wrap",
  },
  img: {
    height: 400,
  },
  text: {
    color: theme.palette.secondary.main,
  },
}));

const CarouselBar = ({ bars }) => {
  const classes = useStyles();
  const sliderRef = useRef(null);
  // const RenderArrowsPrev = () => {
  //   return (
  //     <div>
  //       <Button
  //         variant="outlined"
  //         color="secondary"
  //         onClick={() => sliderRef.current.slickPrev()}
  //       >
  //         <NavigateBefore />
  //       </Button>
  //     </div>
  //   );
  // };
  // const RenderArrowsNext = () => {
  //   return (
  //     <div>
  //       <Button
  //         variant="outlined"
  //         color="secondary"
  //         onClick={() => sliderRef.current.slickNext()}
  //       >
  //         <NavigateNext />
  //       </Button>
  //     </div>
  //   );
  // };

  const settings = {
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchThreshold: 20,
  };
  //ben trong slider
  //           bars.map(s => {
  // <FilmCard data={s}/>
  //       })

  return (
    <div className={classes.carousel}>
      <Slider ref={sliderRef} {...settings}>
        <img className={classes.img} src={banner1} alt="bn1" />
        <img className={classes.img} src={banner2} alt="bn1" />
        <img className={classes.img} src={banner3} alt="bn1" />
        <img className={classes.img} src={banner4} alt="bn1" />
        <img className={classes.img} src={banner5} alt="bn1" />
        <img className={classes.img} src={banner6} alt="bn1" />
      </Slider>
    </div>
  );
};
export default CarouselBar;
