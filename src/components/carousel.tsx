import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

function CarouselDarkVariant() {
    return (
        <Carousel>
            <Carousel.Item >
                <div className="d-flex justify-content-center w-full">
                    <Image className='w-full' src="https://www.bing.com/th?id=OIP.3EjsIYSeIz345vtXOiYBvAHaEC&w=w-full&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
                </div>
            </Carousel.Item>

            <Carousel.Item >
                <div className="d-flex justify-content-center w-full">
                    <Image className='w-full' src="https://www.bing.com/th?id=OIP.DcFbC7FwzvCJR2asJjmFmgHaEK&w=w-full&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselDarkVariant;