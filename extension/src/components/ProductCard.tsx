import { getWebsiteNameFromLink } from "../utils";

const PriceBadge = ({ price, badgeColor }: { price: number; badgeColor: string }): JSX.Element => {
  return (
    <div
      className="price-badge"
      style={{
        backgroundColor: badgeColor,
      }}
    >
      <span>${price}</span>
    </div>
  );
};

const ProductCard = ({
  link,
  name,
  price,
  badgeColor,
}: {
  link: string;
  name: string;
  price: number;
  badgeColor: string;
}): JSX.Element => {
  const websiteName = getWebsiteNameFromLink(link);
  return (
    <div
      style={{
        margin: "5px 25px",
      }}
    >
      <a href={link} target="_blank">
        <div className="product-card">
          <span className="product-card-name">{name}</span>
          <span className="product-card-website-name">{websiteName ? `(${websiteName})` : ""}</span>
          <PriceBadge price={price} badgeColor={badgeColor} />
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
