import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({images}) => {
  const [mainImage, setMainImage] = useState(images)
  useEffect(()=> {
    if (images){
      setMainImage(images[0].url)
    }
  }, [images])
  if (images){
    const handleClick = e => {
      setMainImage(e.target.src)
    }
    return (
      <Wrapper>
        <img src={mainImage} alt="img of product" className="main"/>
        <div className="gallery">{mainImage && images.map(image => (
          <img src={image.url} key={image.id} alt="a simple furniture" onClick={handleClick} className={image.url === mainImage ? 'active' : 'null'}/>
        ))}</div>
      </Wrapper>
    )

  }
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
// when user click change style
// and set the main image to be the one the user clicked