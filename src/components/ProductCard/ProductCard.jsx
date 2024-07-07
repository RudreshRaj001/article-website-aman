import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };
  const handelAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" ? (<span className="discount">-{productItem.discount}%</span>) : null}
      <img loading="lazy" onClick={() => handelClick()} src={productItem.imgUrl} alt="" />
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.productName}</h3>
        <div className="rate">
          {productItem.avgRating}
          <span> </span>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>₹ {productItem.price*80}</h4>
          {
            !!productItem.maxQuantity &&
            (<button aria-label="Add" type="submit" className="add" onClick={() => handelAdd(productItem)}>
            <ion-icon name="add"></ion-icon>
            </button>)
          }
          {
            !productItem.maxQuantity && (
              <p>Out of Stock</p>
            )
          }
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;