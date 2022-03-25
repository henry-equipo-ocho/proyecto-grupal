import React, { useRef, useEffect, useCallback } from "react";
import { ReactComponent as FlechaIzquierda } from "./images/iconmonstr-angel-left-thin.svg";
import { ReactComponent as FlechaDerecha } from "./images/iconmonstr-angel-right-thin.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import img1 from "./images/img25.jpg";
import img2 from "./images/img61.jpg";
import img3 from "./images/img60.jpg";
import img4 from "./images/img59.jpg";
import img5 from "./images/img1.jpeg";
import img6 from "./images/img55.jpg";
import img7 from "./images/img57.jpg";
import img8 from "./images/img56.jpg";
import img9 from "./images/img22.jpg";
import img10 from "./images/img37.jpg";

const Slideshow = () => {
  const slideshow = useRef(null);
  const intervaloSlideshow = useRef(null);
  const siguiente = () => {
    if (slideshow.current.children.length > 0) {
      console.log("Siguiente");

      // Obtenemos el primer elemento del slideshow.
      const primerElemento = slideshow.current.children[0];

      // Establecemos la transicion para el slideshow.
      slideshow.current.style.transition = `300ms ease-out all`;

      const tamañoSlide = slideshow.current.children[0].offsetWidth;

      // Movemos el slideshow
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      const transicion = () => {
        // Reiniciamos la posicion del Slideshow.
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;

        // Tomamos el primer elemento y lo mandamos al final.
        slideshow.current.appendChild(primerElemento);

        slideshow.current.removeEventListener("transitionend", transicion);
      };

      // Eventlistener para cuando termina la animacion.
      slideshow.current.addEventListener("transitionend", transicion);
    }
  };
  const anterior = () => {
    console.log("Anterior");
    if (slideshow.current.children.length > 0) {
      // Obtenemos el ultimo elemento del slideshow.
      const index = slideshow.current.children.length - 1;
      const ultimoElemento = slideshow.current.children[index];
      slideshow.current.insertBefore(
        ultimoElemento,
        slideshow.current.firstChild
      );

      slideshow.current.style.transition = "none";
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `300ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    intervaloSlideshow.current = setInterval(() => {
      siguiente();
    }, 5000);

    slideshow.current.addEventListener("mouseenter", () => {
      clearInterval(intervaloSlideshow.current);
    });

    slideshow.current.addEventListener("mouseleave", () => {
      intervaloSlideshow.current = setInterval(() => {
        siguiente();
      }, 5000);
    });
  }, []);

  return (
    <ContenedorPrincipal>
      <ContenedorSlideshow ref={slideshow}>
        <Slide>
          <a>
            <img src={img1} alt="" width="70" height="500" />
          </a>
          <TextoSlide colorFondo colorTexto>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img2} alt="" width="700" height="500" />
          </a>
          <TextoSlide>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img3} alt="" width="70" height="500" />
          </a>
          <TextoSlide>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img4} alt="" width="70" height="500" />
          </a>
          <TextoSlide>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img5} alt="" width="70" height="500" />
          </a>
          <TextoSlide>
            <p>
              Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
            </p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img6} alt="" width="70" height="500" />
          </a>
          <TextoSlide>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img7} alt="" width="70" height="500" />
          </a>
          <TextoSlide>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img8} alt="" width="70" height="500" />
          </a>
          <TextoSlide>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img9} alt="" width="70" height="500" />
          </a>
          <TextoSlide>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
        <Slide>
          <a>
            <img src={img10} alt="" width="70" height="500" />
          </a>
          <TextoSlide>
            <Link to="/home">
              <p>
                Sacale el maximo probecho a tu tiempo de vacasiones da clik aqui
              </p>
            </Link>
          </TextoSlide>
        </Slide>
      </ContenedorSlideshow>
      <Controles>
        <Boton onClick={anterior}>
          <FlechaIzquierda />
        </Boton>
        <Boton derecho onClick={siguiente}>
          <FlechaDerecha />
        </Boton>
      </Controles>
    </ContenedorPrincipal>
  );
};
const ContenedorPrincipal = styled.div`
  position: relative;
`;

const ContenedorSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: 0 0.3s ease all;
  z-index: 10;
  max-height: 500px;
  position: relative;
  img {
    width: 100%;
    vertical-align: top;
  }
`;

const TextoSlide = styled.div`
  background: ${(props) =>
    props.colorFondo ? props.colorFondo : "rgba(0,0,0,.3)"};
  color: ${(props) => (props.colorTexto ? props.colorTexto : "#fff")};
  width: 100%;
  padding: 10px 60px;
  text-align: center;
  position: absolute;
  bottom: 0;
  @media screen and (max-width: 700px) {
    position: relative;
    background: #000;
  }
`;

const Controles = styled.div`
  position: absolute;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Boton = styled.button`
  pointer-events: all;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  width: 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: 0.3s ease all;
  /* &:hover {
    background: rgba(0,0,0,.2);
		path {
			fill: #fff;
		}
  } */

  path {
    filter: ${(props) =>
      props.derecho
        ? "drop-shadow(-2px 0px 0px #fff)"
        : "drop-shadow(2px 0px 0px #fff)"};
  }
  ${(props) => (props.derecho ? "right: 0" : "left: 0")}
`;

export default Slideshow;
