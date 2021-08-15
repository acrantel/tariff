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
  return (
    <div
      style={{
        margin: "5px 25px",
      }}
    >
      <a href={link}>
        <div className="product-card">
          <span style={{ margin: "5px 5px" }}>{name}</span>
          <PriceBadge price={price} badgeColor={badgeColor} />
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
